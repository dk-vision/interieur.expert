import { StringInputProps, set, unset } from 'sanity';
import { useState, useCallback, useRef, useEffect } from 'react';
import { TextInput, Card, Stack, Text } from '@sanity/ui';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uf111z1c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

export function TagAutocomplete(props: StringInputProps) {
  const { onChange, value = '', elementProps } = props;
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load all existing tags on mount
  useEffect(() => {
    client
      .fetch(`array::unique(*[_type in ["article", "video", "dossier"] && defined(tags)].tags[] | order(@))`)
      .then((tags: string[]) => setAllTags(tags))
      .catch(console.error);
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      onChange(inputValue ? set(inputValue) : unset());

      // Filter suggestions
      if (inputValue.trim()) {
        const filtered = allTags.filter((tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 10));
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    },
    [onChange, allTags]
  );

  const handleSuggestionClick = useCallback(
    (tag: string) => {
      onChange(set(tag));
      setSuggestions([]);
      setShowSuggestions(false);
      inputRef.current?.blur();
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    if (allTags.length > 0 && !value) {
      setSuggestions(allTags.slice(0, 10));
      setShowSuggestions(true);
    }
  }, [allTags, value]);

  const handleBlur = useCallback(() => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  }, []);

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Begin te typen..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <Card border padding={2} radius={2} shadow={1} style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', maxHeight: '200px', overflowY: 'auto' }}>
          <Stack space={1}>
            {suggestions.map((tag) => (
              <Card
                key={tag}
                padding={2}
                radius={2}
                style={{ cursor: 'pointer' }}
                tone="default"
                onClick={() => handleSuggestionClick(tag)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f3f3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Text size={1}>{tag}</Text>
              </Card>
            ))}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
