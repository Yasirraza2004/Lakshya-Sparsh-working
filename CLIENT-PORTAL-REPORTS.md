# Client portal reports

The existing `/dashboard` now includes portfolio overview, allocation analysis,
investment summary, SIP/STP plans, ledger and transaction search. Search by scheme,
record ID or supplied folio; combine transaction type and inclusive date filters.
CSV exports contain the current filtered results and are prefixed `demo-` for sample data.

The existing login/session checks, investment targets, advisor requests and admin
routes are retained. The tax page shows statement availability and routes clients
to advisor contact. It does not fabricate capital gains, tax certificates, suggested
allocations or historical point-to-point returns.

`Backend/src/services/demoInvestment.service.js` supplies illustrative records.
Dashboard totals and asset allocation are now derived from those same holdings.
The additional `plans` array accepts `id`, `fund`, `type`, `amount`, `frequency`,
`nextDate` and `status`. Replace the demo service with an authorized data integration
to supply actual records. No private client portal records are included in source.

## Validation

From repository root: `node --test tests/portfolio-reports.test.mjs`.
From `frontend`: `npm ci` then `npm run build`.
Run the existing backend with MongoDB and the frontend to use authenticated accounts.
Browser QA used a temporary read-only sample API outside the repository; that
fixture is not part of the application and does not bypass production authentication.

The production build retains pre-existing warnings about a missing public tax
banner image and a large JavaScript bundle.
