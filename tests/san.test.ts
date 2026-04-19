import { describe, it, expect } from 'vitest'
import { san } from '../lib/generate-pdf'

describe('san() – WinAnsi sanitiser', () => {
  it('passes plain ASCII through unchanged', () => {
    expect(san('Hello World 123')).toBe('Hello World 123')
  })

  it('passes Latin-1 characters (umlauts, accents) through unchanged', () => {
    expect(san('äöü ÄÖÜ ß é à ñ')).toBe('äöü ÄÖÜ ß é à ñ')
  })

  it('replaces newline (\\n) with space', () => {
    expect(san('line one\nline two')).toBe('line one line two')
  })

  it('replaces carriage-return+newline with space', () => {
    expect(san('line one\r\nline two')).toBe('line one line two')
  })

  it('replaces tab with space', () => {
    expect(san('col1\tcol2')).toBe('col1 col2')
  })

  it('replaces → with >', () => {
    expect(san('A → B')).toBe('A > B')
  })

  it('replaces ← with <', () => {
    expect(san('A ← B')).toBe('A < B')
  })

  it('replaces ↑ with ^', () => {
    expect(san('go ↑')).toBe('go ^')
  })

  it('replaces ↓ with v', () => {
    expect(san('go ↓')).toBe('go v')
  })

  it('replaces en-dash (–) with hyphen', () => {
    expect(san('10–20 m²')).toBe('10-20 m²')
  })

  it('replaces em-dash (—) with hyphen', () => {
    expect(san('now—then')).toBe('now-then')
  })

  it('replaces left single quote (\u2018) with apostrophe', () => {
    expect(san('\u2018hello\u2019')).toBe("'hello'")
  })

  it('replaces left/right double quotes with straight quotes', () => {
    expect(san('\u201CHello\u201D')).toBe('"Hello"')
  })

  it('replaces ellipsis (\u2026) with three dots', () => {
    expect(san('wait\u2026')).toBe('wait...')
  })

  it('replaces middle dot (\u00B7) with pipe', () => {
    expect(san('a\u00B7b')).toBe('a|b')
  })

  it('strips control characters (0x00–0x08); tab (0x09) becomes a space', () => {
    // \x00 and \x01 are stripped; \x09 (tab) is first converted to space by the \t rule
    expect(san('\x00\x01\x09hello')).toBe(' hello')
  })

  it('strips control characters (0x0B–0x1F) but keeps 0x0A as replaced space', () => {
    // 0x0B = vertical tab, stripped; 0x0A = newline, replaced with space
    expect(san('\x0Bhello\x0A')).toBe('hello ')
  })

  it('strips DEL (0x7F)', () => {
    expect(san('abc\x7Fdef')).toBe('abcdef')
  })

  it('strips characters above 0xFF (e.g. emoji, CJK)', () => {
    expect(san('hello \uD83D\uDE00 world')).toBe('hello  world')
  })

  it('strips the ☑ character (causes WinAnsi encoding errors)', () => {
    const result = san('✓ done')
    expect(result).not.toMatch(/[^\x00-\xFF]/)
  })

  it('output never contains characters outside WinAnsi range', () => {
    const tricky = 'em—dash, →arrows←, "quotes", \n newline, \t tab, ☑✓✗ emoji 😊'
    const result = san(tricky)
    for (let i = 0; i < result.length; i++) {
      const code = result.charCodeAt(i)
      expect(code, `char at ${i}: "${result[i]}" (U+${code.toString(16)})`).toBeLessThanOrEqual(0xFF)
    }
  })

  it('handles empty string', () => {
    expect(san('')).toBe('')
  })
})
