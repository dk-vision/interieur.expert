import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Heading,
  Stack,
  Text,
  TextInput,
  Spinner,
  Badge,
} from "@sanity/ui";

type Status = "pass" | "warn" | "fail" | "info";

interface Check {
  status: Status;
  label: string;
  detail?: string;
  fix?: string;
}

interface Category {
  id: string;
  title: string;
  weight: number;
  checks: Check[];
}

interface AuditResult {
  url: string;
  pageType: string;
  overall: number;
  categories: Category[];
}

const STATUS_TONE: Record<Status, "positive" | "caution" | "critical" | "default"> = {
  pass: "positive",
  warn: "caution",
  fail: "critical",
  info: "default",
};

const STATUS_ICON: Record<Status, string> = { pass: "✓", warn: "!", fail: "✕", info: "i" };

function categoryScore(cat: Category): number | null {
  const scores = cat.checks
    .map((c) => ({ pass: 100, warn: 55, fail: 0, info: null }[c.status]))
    .filter((s): s is number => s !== null);
  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function scoreColor(score: number): "positive" | "caution" | "critical" {
  if (score >= 80) return "positive";
  if (score >= 50) return "caution";
  return "critical";
}

const ADMIN_KEY_STORAGE = "geo-audit-admin-key";

export function GeoAuditTool() {
  const [path, setPath] = useState("/advies/");
  const [adminKey, setAdminKey] = useState(
    () => (typeof window !== "undefined" && sessionStorage.getItem(ADMIN_KEY_STORAGE)) || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function runAudit() {
    setLoading(true);
    setError(null);
    setResult(null);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_KEY_STORAGE, adminKey);
    }
    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-geo-audit-key": adminKey },
        body: JSON.stringify({ url: path }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setResult(data as AuditResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Onbekende fout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Card padding={4} radius={2} shadow={1} tone="primary">
          <Stack space={4}>
            <Heading size={2}>GEO/SEO Audit</Heading>
            <Text size={1} muted>
              Diepgaande GEO/SEO-analyse van één live pagina, met fixes die rechtstreeks naar de
              verantwoordelijke bestanden in de codebase wijzen.
            </Text>
            <Stack space={3}>
              <TextInput
                value={path}
                onChange={(e) => setPath(e.currentTarget.value)}
                placeholder="/advies/mijn-artikel-slug of volledige URL"
              />
              <TextInput
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.currentTarget.value)}
                placeholder="Admin-sleutel (alleen nodig in productie)"
              />
              <Button
                text={loading ? "Analyseren..." : "Analyseer"}
                tone="primary"
                disabled={loading || !path.trim()}
                onClick={runAudit}
              />
            </Stack>
          </Stack>
        </Card>

        {loading && (
          <Flex justify="center" padding={4}>
            <Spinner muted />
          </Flex>
        )}

        {error && (
          <Card padding={4} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {result && (
          <Stack space={4}>
            <Card padding={4} radius={2} shadow={1}>
              <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
                <Stack space={2}>
                  <Text size={1} muted>
                    {result.url}
                  </Text>
                  <Badge tone="primary">{result.pageType}</Badge>
                </Stack>
                <Badge tone={scoreColor(result.overall)} fontSize={2} padding={3}>
                  {result.overall}/100
                </Badge>
              </Flex>
            </Card>

            {result.categories.map((cat) => {
              const score = categoryScore(cat);
              return (
                <Card key={cat.id} padding={4} radius={2} shadow={1}>
                  <Stack space={3}>
                    <Flex align="center" justify="space-between">
                      <Text size={2} weight="semibold">
                        {cat.title}
                      </Text>
                      {score !== null && <Badge tone={scoreColor(score)}>{score}/100</Badge>}
                    </Flex>
                    <Stack space={3}>
                      {cat.checks.map((check, i) => (
                        <Box key={i}>
                          <Flex gap={2} align="flex-start">
                            <Badge tone={STATUS_TONE[check.status]} fontSize={0}>
                              {STATUS_ICON[check.status]}
                            </Badge>
                            <Stack space={2} flex={1}>
                              <Text size={1}>{check.label}</Text>
                              {check.detail && (
                                <Text size={1} muted>
                                  {check.detail}
                                </Text>
                              )}
                              {check.fix && (
                                <Code size={1} language="text">
                                  FIX -&gt; {check.fix}
                                </Code>
                              )}
                            </Stack>
                          </Flex>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default GeoAuditTool;
