import { Card, Stack, Text, Flex, Box, Select } from "@sanity/ui";
import { useEffect, useState, useMemo } from "react";
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
  const [selectedPartner, setSelectedPartner] = useState<string>("all");
  const [now, setNow] = useState(() => Date.now());

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
    
    // Update now every minute for accurate countdown
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, [client]);

  const partners = useMemo(() => {
    const uniquePartners = [...new Set(campaigns.map((c) => c.partner?.name).filter(Boolean))];
    return uniquePartners.sort();
  }, [campaigns]);

  const filteredCampaigns = useMemo(() => {
    if (selectedPartner === "all") return campaigns;
    return campaigns.filter((c) => c.partner?.name === selectedPartner);
  }, [campaigns, selectedPartner]);

  if (loading) {
    return <Text>Loading campaigns...</Text>;
  }

  return (
    <Stack space={5}>
      <Card padding={5} tone="primary">
        <Flex justify="space-between" align="center">
          <Text size={4} weight="bold">
            Campaign Dashboard
          </Text>
          <Box style={{ minWidth: "200px" }}>
            <Select
              fontSize={2}
              padding={3}
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.currentTarget.value)}
            >
              <option value="all">Alle partners</option>
              {partners.map((partner) => (
                <option key={partner} value={partner}>
                  {partner}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Card>

      {filteredCampaigns.map((campaign) => {
        const progress =
          campaign.maxImpressions > 0
            ? (campaign.currentImpressions / campaign.maxImpressions) * 100
            : 0;
        const ctr =
          campaign.currentImpressions > 0
            ? ((campaign.impressionClicks / campaign.currentImpressions) * 100).toFixed(2)
            : "0.00";

        const daysLeft = Math.ceil(
          (new Date(campaign.endDate).getTime() - now) / (1000 * 60 * 60 * 24)
        );

        const status = !campaign.active
          ? "⏸️ Paused"
          : progress >= 100
          ? "✅ Completed"
          : daysLeft < 0
          ? "⏰ Expired"
          : "🟢 Active";

        return (
          <Card key={campaign._id} padding={5} shadow={1} radius={2}>
            <Stack space={4}>
              <Flex justify="space-between" align="center">
                <Text size={3} weight="bold">
                  {campaign.title}
                </Text>
                <Text size={2}>{status}</Text>
              </Flex>

              <Flex gap={4} wrap="wrap">
                <Box flex={1}>
                  <Text size={1} muted style={{ marginBottom: "0.25rem" }}>
                    Partner
                  </Text>
                  <Text size={2} weight="medium">{campaign.partner?.name || "No partner"}</Text>
                </Box>
                <Box flex={1}>
                  <Text size={1} muted style={{ marginBottom: "0.25rem" }}>
                    Slot
                  </Text>
                  <Text size={2} weight="medium">{campaign.slot}</Text>
                </Box>
              </Flex>

              <Box style={{ marginTop: "0.5rem" }}>
                <Flex justify="space-between" style={{ marginBottom: "0.5rem" }}>
                  <Text size={2} weight="semibold">
                    Progress: {progress.toFixed(0)}%
                  </Text>
                  <Text size={2}>
                    {campaign.currentImpressions} / {campaign.maxImpressions}
                  </Text>
                </Flex>
                <Box
                  style={{
                    height: "12px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "6px",
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

              <Flex gap={5} style={{ marginTop: "0.5rem" }}>
                <Box>
                  <Text size={1} muted style={{ marginBottom: "0.25rem" }}>
                    Clicks
                  </Text>
                  <Text size={2} weight="semibold">{campaign.impressionClicks}</Text>
                </Box>
                <Box>
                  <Text size={1} muted style={{ marginBottom: "0.25rem" }}>
                    CTR
                  </Text>
                  <Text size={2} weight="semibold">{ctr}%</Text>
                </Box>
                <Box>
                  <Text size={1} muted style={{ marginBottom: "0.25rem" }}>
                    Days Left
                  </Text>
                  <Text size={2} weight="semibold">{daysLeft > 0 ? daysLeft : "Ended"}</Text>
                </Box>
              </Flex>
            </Stack>
          </Card>
        );
      })}

      {filteredCampaigns.length === 0 && (
        <Card padding={5}>
          <Text size={2}>
            {selectedPartner === "all" 
              ? "No campaigns yet." 
              : `Geen campagnes gevonden voor ${selectedPartner}.`}
          </Text>
        </Card>
      )}
    </Stack>
  );
}
