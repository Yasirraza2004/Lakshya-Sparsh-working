LAKSHYA SPARSH - ADMIN DASHBOARD INTEGRATION

This ZIP is an update to the existing Lakshya-Sparsh-main project, not a separate dashboard app.

Start backend:
  cd Backend
  copy .env.example to .env and configure MONGODB_URI and SESSION_SECRET
  npm install
  npm run dev

Start frontend in another terminal:
  cd frontend
  npm install
  npm run dev

Create first owner account (only once):
  Set OWNER_NAME, OWNER_EMAIL, OWNER_PASSWORD (12+ chars), OWNER_DOB (YYYY-MM-DD), OWNER_MOBILE in Backend/.env
  Run npm run create-owner from Backend
  Remove OWNER_* variables after successful creation
  Sign in using Owner login, then create administrator accounts there.

Admin login redirects to /admin. The backend protects admin APIs with the existing express-session/Passport session and role middleware. Investor records and demo AUM are stored in MongoDB. All investment figures in this version are demo values. FinnSys, OTP and email integrations are not connected.

See ADMIN-DASHBOARD-INTEGRATION.md for security and production notes.
