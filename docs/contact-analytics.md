# Contact analytics

The existing GTM-WSWKMH5Z container loads Meta Pixel 2062553411337759, TikTok Pixel D823IBRC77UDUGTVFEI0, and Yandex Metrika 109235626. Keep their initialization in GTM; the application only records contact activations.

- Meta custom events: `WhatsAppClick`, `PhoneClick`, targeted at the already installed pixel.
- Metrika JavaScript goals: `whatsapp_click`, `phone_click`. Define these goals in the counter settings to use the corresponding goal reports.
- The same lowercase events are pushed to `dataLayer`; additional GTM tags are not required for Meta and Metrika contact events and would duplicate them.
- Parameters: contact channel, placement, page path and campaign attribution. Form values, names, phone numbers, messages and outbound URLs are not included in these parameters.
- WhatsApp text begins with `Здравствуйте! Пишу вам с сайта greatsteve.kz.` and keeps the request about a particular device. Recognized social or map sources appear as a readable sentence. Campaign identifiers are only sent to analytics.
- Attribution is retained for the browser session across internal page loads. Visits without UTM parameters use the referrer where available; unknown sources are `other`, direct visits are `direct`.
- These events count an attempted contact activation, not a delivered message, qualified lead, booking or sale. Browser blockers and unavailable trackers may prevent analytics delivery.

Example Instagram profile link:
`https://greatsteve.kz/?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=site`

Use distinct lowercase `utm_source` values for `tiktok`, `threads`, `youtube`, `2gis`. Use ASCII campaign identifiers without customer data. Direct social → WhatsApp links bypass the website and must be reconciled separately using the source sentence and the administrator's lead register.

ChatGPT search links with `utm_source=chatgpt.com` are normalized to `chatgpt`. Referrers from `chatgpt.com`, `chat.openai.com` and `gemini.google.com` identify the corresponding AI source, with Gemini checked before the broader Google domain. Google, Yandex and AI sources appear in the WhatsApp source sentence. Missing referrers without campaign data remain direct visits; they are not assumed to be AI referrals. Source parameters contain no referring user's identity.

Validation: `npm run lint`, `npm run build`, `node --test tests/contactTracking.test.mjs`.
