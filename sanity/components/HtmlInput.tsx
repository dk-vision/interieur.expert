import { useCallback } from "react";
import { Stack, Text, Card } from "@sanity/ui";
import { set, unset, type StringInputProps } from "sanity";

export function HtmlInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange]
  );

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Plak hier HTML-broncode. Dit wordt 1-op-1 weergegeven op de website.
      </Text>
      <Card border padding={3} radius={2} tone="transparent">
        <textarea
          value={value || ""}
          onChange={handleChange}
          readOnly={readOnly}
          rows={12}
          style={{
            width: "100%",
            fontFamily: "monospace",
            fontSize: "13px",
            lineHeight: "1.5",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "vertical",
            color: "inherit",
          }}
          placeholder="<p>Plak hier je HTML...</p>"
          spellCheck={false}
        />
      </Card>
    </Stack>
  );
}
