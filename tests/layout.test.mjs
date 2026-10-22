import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('floating contact buttons are not hidden on the homepage', () => {
  const contacts = readFileSync(new URL('../src/components/FloatingContacts.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(contacts, /useLocation|pathname|return null/);
  assert.match(contacts, /href="https:\/\/t\.me\/kzgreatsteve"/);
  assert.match(contacts, /aria-label="Написать в WhatsApp"/);
  assert.match(contacts, /flex-row gap-3 md:bottom-6 md:right-6 md:flex-col/);
});

test('page clipping does not create an extra auto-scrolling body or a white homepage gutter', () => {
  const styles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  const page = styles.split('html, body {')[1].split('}')[0];
  assert.match(page, /overflow-x: clip/);
  assert.match(styles, /html:has\(\.gs-hero\) \{[^}]*background-color: #123a6b;[^}]*scrollbar-color: #a0b2c6 #123a6b;/);
});

test('company wordmark leaves room for glyph edges inside its reveal mask', () => {
  const company = readFileSync(new URL('../src/pages/CompanyPage.tsx', import.meta.url), 'utf8');
  assert.match(company, /leading-\[1\.05\] px-\[0\.08em\]/);
});
