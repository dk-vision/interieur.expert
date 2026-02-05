import { Card, Stack, Text, Flex, Box, Button } from "@sanity/ui";
import { useEffect, useState } from "react";
import { useClient } from "sanity";

interface Campaign {
  _id: string;
  title: string;
  currentImpressions: number;
  maxImpressions: number;
  impressionClicks: number;
  startDate: string;
  endDate: string;
  active: boolean;
  partner: { name: string };
  slot: string;
}

export function CampaignDashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "adCampaign"] | order(active desc, currentImpressions desc) {
      _id,
      title,
      currentImpressions,
      maxImpressions,
      impressionClicks,
      startDate,
      endDate,
      active,
      slot,
      "partner": partner->{name}
    }`;

    client.fetch(query).then((data) => {
      setCampaigns(data);
      setLoading(false);
    });
  }, [client]);

  if (loading) {
    return <Text>Loading campaigns...</Text>;
  }

  return (
    <Stack space={4}>
      <Card padding={4} tone="primary">
        <Text size={2} weight="bold">
          Campaign Dashboard
        </Text>
      </Card>

      {campaigns.map((campaign) => {
        const progress =
          campaign.maxImpressions > 0
            ? (campaign.currentImpressions / campaign.maxImpressions) * 100
            : 0;
        const ctr =
          campaign.currentImpressions > 0
            ? ((campaign.impressionClicks / campaign.currentImpressions) * 100).toFixed(2)
            : "0.00";

        const daysLeft = Math.ceil(
          (new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );

        const status = !campaign.active
          ? "⏸️ Paused"
          : progress >= 100
          ? "✅ Completed"
          : daysLeft < 0
          ? "⏰ Expired"
          : "🟢 Active";

        return (
          <Card key={campaign._id} padding={4} shadow={1} radius={2}>
            <Stack space={3}>
              <Flex justify="space-between" align="center">
                <Text size={1} weight="bold">
                  {campaign.title}
                </Text>
                <Text size={1}>{status}</Text>
              </Flex>

              <Flex gap={3} wrap="wrap">
                <Box flex={1}>
                  <Text size={0} muted>
                    Partner
                  </Text>
                  <Text size={1}>{campaign.partner?.name || "No partner"}</Text>
                </Box>
                <Box flex={1}>
                  <Text size={0} muted>
                    Slot
                  </Text>
                  <Text size={1}>{campaign.slot}</Text>
                </Box>
              </Flex>

              <Box>
                <Flex justify="space-between">
                  <Text size={1} weight="semibold">
                    Progress: {progress.toFixed(0)}%
                  </Text>
                  <Text size={1}>
                    {campaign.currentImpressions} / {campaign.maxImpressions}
                  </Text>
                </Flex>
                <Box
                  marginTop={2}
                  style={{
                    height: "8px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      height: "100%",
                      backgroundColor: progress >= 100 ? "#4caf50" : "#2196f3",
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
              </Box>

              <Flex gap={4}>
                <Box>
                  <Text size={0} muted>
                    Clicks
                  </Text>
                  <Text size={1}>{campaign.impressionClicks}</Text>
                </Box>
                <Box>
                  <Text size={0} muted>
                    CTR
                  </Text>
                  <Text size={1}>{ctr}%</Text>
                </Box>
                <Box>
                  <Text size={0} muted>
                    Days Left
                  </Text>
                  <Text size={1}>{daysLeft > 0 ? daysLeft : "Ended"}</Text>
                </Box>
              </Flex>
            </Stack>
          </Card>
        );
      })}

      {campaigns.length === 0 && (
        <Card padding={4}>
          <Text>No campaigns yet.</Text>
        </Card>
      )}
    </Stack>
  );
}
