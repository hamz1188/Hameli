# Email setup — hello@hameli.io

Cheap custom-domain mail without Google Workspace. **Chosen: Zoho Mail Lite** (~$1/user/month).

Domain DNS today: Vercel nameservers (`ns1/ns2.vercel-dns.com`) for [hameli.io](https://hameli.io). Add Zoho MX/TXT records in the DNS host that controls the domain (Vercel DNS or Name.com — wherever the records live).

## Why Zoho (not Google Workspace)

You need a professional inbox for Hameli, not Drive/Docs/Meet. Zoho Mail Lite is a real mailbox at a fraction of Workspace cost.

Alternatives (not chosen now): Migadu Micro (~$19/year flat), free forward-only (ImprovMX → Gmail) as a temporary bridge.

## Steps

1. **Sign up** at [Zoho Mail](https://www.zoho.com/mail/) → add domain `hameli.io` → pick **Mail Lite** (or free trial then Lite).
2. **Verify domain** with the TXT record Zoho shows.
3. **Add MX records** Zoho provides (replace any old MX). Typical pattern (confirm in Zoho’s wizard — values can change):
   - `mx.zoho.com` (priority 10)
   - `mx2.zoho.com` (priority 20)
   - `mx3.zoho.com` (priority 50)
4. **SPF** — TXT on `@`:
   - `v=spf1 include:zohomail.com ~all`
5. **DKIM** — add the CNAME/TXT Zoho gives you for signing.
6. **DMARC** (after SPF/DKIM work) — TXT on `_dmarc`:
   - `v=DMARC1; p=none; rua=mailto:hello@hameli.io`
7. **Create mailbox** `hello@hameli.io` (optional: `ahmed@hameli.io`).
8. **Test** — send from Gmail → hello@; reply from Zoho.
9. **Site** — contact already targets `hello@hameli.io` in `app/data/hameli.ts`. Optional: set `NEXT_PUBLIC_FORMSPREE_ID` so the contact form posts via Formspree to that inbox.

## After setup

- Paste confirmation in README Links (email row).
- Do not migrate personal Gmail; keep it personal.

## Out of scope

Google Drive replacement, full Workspace suite, migrating old mail history.
