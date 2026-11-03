# Lakshya Sparsh admin dashboard integration

The admin dashboard is integrated into the existing React/Vite frontend and Express/Mongoose backend.

## Features
- `/admin` is the admin dashboard route. It checks the logged-in session and calls the protected admin API.
- Admin and owner roles can read the dashboard and investor records. The backend checks the role for every protected API request; hiding a page in React is not the security boundary.
- Demo investor records are stored in the MongoDB `investorrecords` collection and seeded when that collection is empty.
- Admin/owner can add demo investor records. Search and CSV export work from the dashboard.
- Public signup assigns `role: "user"`; it does not accept a role from the client.
- Only the owner role can call `POST /api/admin/admins` to create an administrator.
- FinnSys, real investment imports, email delivery and OTP are not connected. Do not enter real client financial data in demo mode.

## Local setup
1. Copy `Backend/.env.example` to `Backend/.env` and set a MongoDB URI and a long random `SESSION_SECRET`.
2. In a terminal: `cd Backend`, then `npm install`, then `npm run dev`.
3. In another terminal: `cd frontend`, then `npm install`, then `npm run dev`.
4. Open the Vite URL (normally `http://localhost:5173`). The backend defaults to `http://localhost:8080`.
5. To create the first owner, temporarily add `OWNER_NAME`, `OWNER_EMAIL`, `OWNER_PASSWORD` (12+ characters), `OWNER_DOB` (YYYY-MM-DD) and `OWNER_MOBILE` (10 digit Indian number) to `Backend/.env`, run `npm run create-owner` from `Backend`, then remove those temporary variables.
6. Sign in using the existing login page and select the Owner login type to use the owner account. Use the owner dashboard to create admin accounts. Admin users should sign in using Admin login and will land at `/admin`.

## Security and production notes
- Use HTTPS in production and set `NODE_ENV=production`; configure `FRONTEND_URL` to the exact frontend origin.
- Keep `.env` out of Git. Rotate any credentials that were previously committed.
- Use a strong unique session secret and a restricted MongoDB user.
- Add rate limiting, audit logging, monitoring and backups before production use.
- Demo portfolio values are illustrative and should not be represented as actual AUM. A real FinnSys integration requires authorized API access and verified field mappings.
