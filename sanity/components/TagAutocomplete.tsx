import type { ArrayOfPrimitivesInputProps } from 'sanity';
import { useClient } from 'sanity';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TrashIcon } from '@sanity/icons';
import { Box, Button, Card, Flex, Stack, Text, TextInput } from '@sanity/ui';

export function TagAutocomplete(props: ArrayOfPrimitivesInputProps) {
  const { value, onItemAppend, onItemRemove, readOnly } = props;
  const client = useClient({ apiVersion: '2024-01-01' });

  const selectedTags = useMemo(
    () => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []),
    [value]
  );

  const [draft, setDraft] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('[TagAutocomplete] loading tags...');
    client
      .fetch(
        'array::unique(*[_type in ["article", "video", "dossier"] && defined(tags)].tags[])'
      )
      .then((tags: unknown) => {
        const normalized = (Array.isArray(tags) ? tags : [])
          .filter((tag): tag is string => typeof tag === 'string')
          .map((tag) => tag.trim())
          .filter(Boolean);

        const uniqueSorted = Array.from(new Set(normalized)).sort((a, b) =>
          a.localeCompare(b, 'nl', { sensitivity: 'base' })
        );

        console.log('[TagAutocomplete] loaded tags:', uniqueSorted.length);
        setAllTags(uniqueSorted);
      })
      .catch((error: unknown) => {
        console.error('[TagAutocomplete] failed to load tags:', error);
      });
  }, [client]);

  const recomputeSuggestions = useCallback(
    (inputValue: string) => {
      const q = inputValue.trim().toLowerCase();
      if (!q) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const selectedSet = new Set(selectedTags.map((tag) => tag.toLowerCase()));
      const filtered = allTags
        .filter((tag) => !selectedSet.has(tag.toLowerCase()))
        .filter((tag) => tag.toLowerCase().includes(q))
        .slice(0, 10);

      console.log('[TagAutocomplete] suggestions:', filtered.length);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    },
    [allTags, selectedTags]
  );

  const addTag = useCallback(
    (rawTag: string) => {
      const tag = rawTag.trim();
      if (!tag) return;

      const alreadyExists = selectedTags.some(
        (t) => t.trim().toLowerCase() === tag.toLowerCase()
      );
      if (alreadyExists) return;

      onItemAppend(tag);
      setDraft('');
      setSuggestions([]);
      setShowSuggestions(false);
      inputRef.current?.focus();
    },
    [onItemAppend, selectedTags]
  );

  const handleDraftChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value;
      console.log('[TagAutocomplete] input:', inputValue);
      setDraft(inputValue);
      recomputeSuggestions(inputValue);
    },
    [recomputeSuggestions]
  );

  const handleSuggestionClick = useCallback(
    (tag: string) => {
      addTag(tag);
      inputRef.current?.blur();
    },
    [addTag]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addTag(draft);
      }
    },
    [addTag, draft]
  );

  const handleFocus = useCallback(() => {
    if (!draft.trim() && allTags.length > 0) {
      const selectedSet = new Set(selectedTags.map((tag) => tag.toLowerCase()));
      const initial = allTags.filter((t) => !selectedSet.has(t.toLowerCase())).slice(0, 10);
      setSuggestions(initial);
      setShowSuggestions(initial.length > 0);
    }
  }, [allTags, draft, selectedTags]);

  const handleBlur = useCallback(() => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 200);
  }, []);

  return (
    <Stack space={3}>
      {selectedTags.length > 0 && (
        <Flex gap={2} wrap="wrap">
          {selectedTags.map((tag, index) => (
            <Card key={`${tag}-${index}`} padding={2} radius={2} border>
              <Flex gap={2} align="center">
                <Text size={1}>{tag}</Text>
                <Button
                  mode="bleed"
                  type="button"
                  icon={TrashIcon}
                  tone="critical"
                  title="Verwijder"
                  aria-label="Verwijder tag"
                  disabled={readOnly}
                  onClick={() => onItemRemove(index)}
                />
              </Flex>
            </Card>
          ))}
        </Flex>
      )}

      <Box style={{ position: 'relative' }}>
        <TextInput
          ref={inputRef}
          value={draft}
          onChange={handleDraftChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readOnly}
          placeholder="Tag toevoegen..."
        />

        {showSuggestions && suggestions.length > 0 && (
          <Card
            border
            padding={2}
            radius={2}
            shadow={1}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Stack space={1}>
              {suggestions.map((tag) => (
                <Card
                  key={tag}
                  padding={2}
                  radius={2}
                  style={{ cursor: 'pointer' }}
                  tone="default"
                  onClick={() => handleSuggestionClick(tag)}
                >
                  <Text size={1}>{tag}</Text>
                </Card>
              ))}
            </Stack>
          </Card>
        )}
      </Box>
    </Stack>
  );
}
