# Contact analytics

The existing GTM-WSWKMH5Z container loads Meta Pixel 2062553411337759, TikTok Pixel D823IBRC77UDUGTVFEI0, and Yandex Metrika 109235626. Keep their initialization in GTM; the application only records contact activations.

- Meta custom events: `WhatsAppClick`, `PhoneClick`, `TelegramClick`, targeted at the already installed pixel.
- Metrika JavaScript goals: `whatsapp_click`, `phone_click`, `telegram_click`, `lead_created`. Define these goals in the counter settings to use the corresponding goal reports.
- The same lowercase events are pushed to `dataLayer`; additional GTM tags are not required for Meta and Metrika contact events and would duplicate them.
- Parameters: contact channel, placement, page path and campaign attribution. Form values, names, phone numbers, messages and outbound URLs are not included in these parameters.
- WhatsApp text begins with `Здравствуйте! Пишу вам с сайта greatsteve.kz.` and keeps the request about a particular device. Recognized social or map sources appear as a readable sentence. Campaign identifiers are only sent to analytics.
- Attribution is retained for the browser session across internal page loads. Visits without UTM parameters use the referrer where available; unknown sources are `other`, direct visits are `direct`.
- These events count an attempted contact activation, not a delivered message, qualified lead, booking or sale. Browser blockers and unavailable trackers may prevent analytics delivery.

## OpenAI Ads

The approved GreatSteve advertising account uses Pixel ID `JzkshSDcaM3KWvkhE8vF8a`. Its async installation snippet is in `index.html`, once per HTML document, without API keys or debug logging.

- `page_viewed`: initial load and React Router pathname changes; repeated StrictMode effects do not duplicate the same page. Query strings are not included in the event contents.
- Custom contact events: `whatsapp_click`, `phone_click`, `telegram_click`. These are contact attempts, never completed orders or delivered messages.
- `lead_created`: only after `/api/contact` returns HTTP success with `ok: true` and no unconfigured-service note. Opening WhatsApp alone does not qualify.
- No `order_created` is sent: sales are completed outside this website and require reconciliation with actual paid orders.
- App-generated payloads contain no form names, telephone numbers or message text. OpenAI automatic advanced matching is enabled by the data source and can hash supported customer data found on the page; the owner explicitly approved this feature and the separate Conversion Terms on 03.11.2026.
- Events set `opt_out: true` for future user-level personalization. No additional user-matching identifiers are supplied by application code.

Sale campaign destination:
`https://greatsteve.kz/tradein?utm_source=chatgpt&utm_medium=cpc&utm_campaign=phones_almaty&utm_content=iphone_android`

Campaign budget authorized by the owner: 10,000 KZT total for five days. Campaign setup is separate from payment configuration and activation.

Example Instagram profile link:
`https://greatsteve.kz/?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=site`

Use distinct lowercase `utm_source` values for `tiktok`, `threads`, `youtube`, `2gis`. Use ASCII campaign identifiers without customer data. Direct social → WhatsApp links bypass the website and must be reconciled separately using the source sentence and the administrator's lead register.

ChatGPT search links with `utm_source=chatgpt.com` are normalized to `chatgpt`. Referrers from `chatgpt.com`, `chat.openai.com` and `gemini.google.com` identify the corresponding AI source, with Gemini checked before the broader Google domain. Google, Yandex and AI sources appear in the WhatsApp source sentence. Missing referrers without campaign data remain direct visits; they are not assumed to be AI referrals. Source parameters contain no referring user's identity.

Validation: `npm run lint`, `npm run build`, `node --test tests/contactTracking.test.mjs`.
