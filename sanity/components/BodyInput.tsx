'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Stack, Button, Card, Flex, Badge } from '@sanity/ui'
import { CodeIcon, EditIcon } from '@sanity/icons'
import { type ArrayOfObjectsInputProps, set, unset } from 'sanity'
import { toHTML } from '@portabletext/to-html'
import { htmlToBlocks } from '@portabletext/block-tools'

export function BodyInput(props: ArrayOfObjectsInputProps) {
  const [mode, setMode] = useState<'wysiwyg' | 'html'>('wysiwyg')
  const [htmlValue, setHtmlValue] = useState('')

  // Use refs to avoid stale closures and unnecessary effect retriggers
  const onChangeRef = useRef(props.onChange)
  const schemaTypeRef = useRef(props.schemaType)

  useEffect(() => {
    onChangeRef.current = props.onChange
    schemaTypeRef.current = props.schemaType
  })

  const convertHtmlToPt = useCallback((html: string) => {
    if (!html.trim()) {
      onChangeRef.current(unset())
      return
    }

    const blocks = htmlToBlocks(
      html,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      schemaTypeRef.current as any,
      {
        parseHtml: (h: string) =>
          new DOMParser().parseFromString(h, 'text/html'),
        rules: [
          {
            deserialize(el: Node) {
              if (el.nodeType !== Node.ELEMENT_NODE) return undefined
              const elem = el as Element
              const tag = elem.tagName?.toUpperCase()
              if (tag === 'TABLE' || tag === 'IFRAME') {
                return {
                  _type: 'rawHtml',
                  _key: Math.random().toString(36).slice(2, 8),
                  code: elem.outerHTML,
                }
              }
              return undefined
            },
          },
        ],
      },
    )
    onChangeRef.current(set(blocks))
  }, [])

  // Auto-save HTML → PT while in HTML mode (debounced)
  useEffect(() => {
    if (mode !== 'html') return
    const timeout = setTimeout(() => convertHtmlToPt(htmlValue), 1500)
    return () => clearTimeout(timeout)
  }, [htmlValue, mode, convertHtmlToPt])

  const switchToHtml = useCallback(() => {
    if (!props.value || props.value.length === 0) {
      setHtmlValue('')
      setMode('html')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html = toHTML(props.value as any, {
      components: {
        marks: {
          highlight: ({ children }) => `<mark>${children}</mark>`,
          link: ({ value, children }) =>
            `<a href="${value?.href || '#'}">${children}</a>`,
          internalArticleLink: ({ children }) => children || '',
        },
        types: {
          image: () => '<!-- afbeelding -->',
          rawHtml: ({ value }: { value?: Record<string, unknown> }) =>
            (value?.code as string) || '',
        },
      },
    })
    setHtmlValue(html)
    setMode('html')
  }, [props.value])

  const switchToWysiwyg = useCallback(() => {
    convertHtmlToPt(htmlValue)
    setMode('wysiwyg')
  }, [htmlValue, convertHtmlToPt])

  if (mode === 'html') {
    return (
      <Stack space={3}>
        <Flex gap={2} align="center">
          <Button
            text="Terug naar WYSIWYG"
            icon={EditIcon}
            mode="ghost"
            onClick={switchToWysiwyg}
            tone="primary"
          />
          <Badge tone="caution">HTML</Badge>
        </Flex>
        <Card border padding={3} radius={2} tone="transparent">
          <textarea
            value={htmlValue}
            onChange={(e) => setHtmlValue(e.target.value)}
            rows={24}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.5',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              color: 'inherit',
            }}
            spellCheck={false}
          />
        </Card>
      </Stack>
    )
  }

  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Button
          text="Bewerk als HTML"
          icon={CodeIcon}
          mode="ghost"
          onClick={switchToHtml}
        />
      </Flex>
      {props.renderDefault(props)}
    </Stack>
  )
}
