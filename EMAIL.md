# Email setup — hello@hameli.io

**Live.** `hello@hameli.io` is on Zoho Mail Lite. DNS (MX, SPF, DKIM, Zoho verify TXT) is on Vercel. Do not migrate personal Gmail.

Cheap custom-domain mail without Google Workspace. **Chosen: Zoho Mail Lite** (~$1/user/month).

Domain DNS: Vercel nameservers (`ns1/ns2.vercel-dns.com`) for [hameli.io](https://hameli.io).

## Why Zoho (not Google Workspace)

You need a professional inbox for Hameli, not Drive/Docs/Meet. Zoho Mail Lite is a real mailbox at a fraction of Workspace cost.

## Done

1. Domain verified (TXT `zoho-verification=…` on `@`).
2. MX: `mx.zoho.com` 10, `mx2.zoho.com` 20, `mx3.zoho.com` 50.
3. SPF on `@`: `v=spf1 include:zohomail.com ~all`
4. DKIM on `zmail._domainkey`.
5. Mailbox `hello@hameli.io` created and receiving.
6. Site contact already targets `hello@hameli.io` in `app/data/hameli.ts`. Optional later: `NEXT_PUBLIC_FORMSPREE_ID` so the form posts via Formspree.

## Optional leftover

**DMARC** after mail has been running — TXT on `_dmarc`:

- `v=DMARC1; p=none; rua=mailto:hello@hameli.io`

## Out of scope

Google Drive replacement, full Workspace suite, migrating old mail history.
