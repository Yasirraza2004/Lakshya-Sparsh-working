# Lakshya Sparsh client dashboard integration

The client dashboard is integrated into the existing Vite/React app at `/dashboard`. The existing public website and `/login` route remain in place.

## What was added

- `frontend/src/ClientDashboard/ClientDashboard.jsx` and `.css`: responsive client portal UI inspired by the supplied reference screenshot.
- `/dashboard` route in `frontend/src/main.jsx`.
- Login redirects a client account to `/dashboard` after confirming the session.
- `GET /api/investments/me`: session-protected demo portfolio endpoint. It only allows users whose role is `user` and returns demo holdings, summary figures, allocation, transactions, and alerts.
- API routes are mounted under `/api/investments` and `/api/admin`.
- `Backend/.env.example` and `frontend/.env.example` templates.

## Run locally

### 1. Configure backend

Open a terminal in `Backend` and install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string and `SESSION_SECRET` to a long random value. Never commit `.env` to Git.

```bash
npm run dev
```

The API should start at `http://localhost:8080`. MongoDB must be available.

### 2. Run frontend

Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Important limitations

- Portfolio numbers, allocation, holdings, transactions, and alerts are static illustrative demo data, not actual client investment data.
- OTP verification is disabled/not included for now. Signup and login use email and password only. Password reset and a complete admin dashboard are not included yet.
- Real FinnSys data must only be connected through an API or export method explicitly authorized by FinnSys/ARM Fintech. Do not scrape private account pages or share login credentials.
- Do not use this demo dashboard for live financial records until production security, authorization, audit logging, data handling, and deployment settings have been reviewed.

## Separate login options: User, Admin, Owner

The `/login` page now provides three distinct options:

- **User Login** → `/dashboard`
- **Admin Login** → `/admin`
- **Owner Login** → `/owner`

The backend checks the requested login type against the account's stored MongoDB `role`. Selecting Admin or Owner in the UI does not grant that role. Public signup always creates a `user` account. Admin and owner accounts must be provisioned securely by the project owner; do not add a public role selector to signup or manually trust a role sent from the browser.

The Admin and Owner pages are currently protected UI previews, not complete management systems. Admin creation, audit logs, and live FinnSys integration still need implementation and testing before production.



## Owner-only administrator creation

Sign in with an account whose MongoDB `role` is `owner`, then open `/owner`. The owner dashboard includes a **Create administrator account** form. It submits to `POST /api/admin/admins`; the backend enforces `authorizeRole("owner")` and always assigns `role: "admin"` itself. Public signup remains hard-coded to `role: "user"`. An admin cannot create another admin or owner.

The owner account must be provisioned securely by the project owner/operator (for example, using the project's `Backend/scripts/createOwner.js` script after reviewing its environment requirements). Never add a public owner-signup route or commit credentials to source control. OTP remains disabled as requested; use a strong password and secure HTTPS/session settings in production.
