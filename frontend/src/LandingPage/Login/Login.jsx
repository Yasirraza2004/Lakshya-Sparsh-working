import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

function Login() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    fullName: "",
    mobile: "",
    dob: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loginRole, setLoginRole] = useState("user");

  const [signupMessage, setSignupMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setSignup((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLogin((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // CREATE ACCOUNT
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupMessage("");

    if (!/^[6-9]\d{9}$/.test(signup.mobile.trim())) {
      setSignupError(true);
      setSignupMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (signup.password.length < 8) {
      setSignupError(true);
      setSignupMessage("Password must contain at least 8 characters.");
      return;
    }

    try {
      setSignupLoading(true);

      const response = await axios.post(
        `${API_URL}/signup`,
        {
          fullName: signup.fullName.trim(),
          mobile: signup.mobile.trim(),
          dob: signup.dob,
          email: signup.email.trim().toLowerCase(),
          password: signup.password,
        },
        {
          withCredentials: true,
        }
      );

      setSignupError(false);
      setSignupMessage(
        response.data.message || "Your account was created successfully."
      );

      setSignup({
        fullName: "",
        mobile: "",
        dob: "",
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error) {
      setSignupError(true);
      setSignupMessage(
        error.response?.data?.message ||
          "Unable to create your account. Check your connection and try again."
      );
    } finally {
      setSignupLoading(false);
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMessage("");

    try {
      setLoginLoading(true);

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: login.email.trim().toLowerCase(),
          password: login.password,
          role: loginRole,
        },
        {
          withCredentials: true,
        }
      );

      setLoginError(false);
      setLoginMessage(
        response.data.message || "You have logged in successfully."
      );

      // Verify the session cookie works.
      const meResponse = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
      });

      const roleRoutes = {
        user: "/dashboard",
        admin: "/admin",
        owner: "/owner",
      };
      if (meResponse.data.user.role === loginRole) {
        navigate(roleRoutes[loginRole], { replace: true });
      } else {
        setLoginError(true);
        setLoginMessage("Your account does not have access to this login option.");
      }
    } catch (error) {
      setLoginError(true);
      setLoginMessage(
        error.response?.data?.message ||
          "Unable to log in. Please check your details and try again."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <main className="ls-auth-page">
      <header className="ls-auth-brand">
        <a href="/" className="ls-brand-name">
          <span className="ls-brand-mark">L</span>
          <span>
            Lakshya <strong>Sparsh</strong>
            <small>Plan today. Secure tomorrow.</small>
          </span>
        </a>

        <a href="/" className="ls-back-home">
          Back to home <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="ls-auth-intro">
        <span className="ls-eyebrow">YOUR FINANCIAL JOURNEY STARTS HERE</span>
        <h1>
          Make your money
          <br />
          <span>work for your future.</span>
        </h1>
        <p>
          Access your account or create one to begin your financial journey
          with Lakshya Sparsh.
        </p>
      </section>

      <section className="ls-auth-grid">
        {/* SIGNUP */}
        <article className="ls-auth-card ls-signup-card">
          <div className="ls-card-heading">
            <span className="ls-card-icon" aria-hidden="true">✳</span>
            <div>
              <h2>Create account</h2>
              <p>Start building your financial future.</p>
            </div>
          </div>

          <form onSubmit={handleSignup}>
            <div className="ls-field">
              <label htmlFor="signup-fullName">Full name</label>
              <input
                id="signup-fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                value={signup.fullName}
                onChange={handleSignupChange}
                required
              />
            </div>

            <div className="ls-field-row">
              <div className="ls-field">
                <label htmlFor="signup-mobile">Mobile number</label>
                <input
                  id="signup-mobile"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit number"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={signup.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setSignup((previous) => ({
                      ...previous,
                      mobile: value,
                    }));
                  }}
                  required
                />
              </div>

              <div className="ls-field">
                <label htmlFor="signup-dob">Date of birth</label>
                <input
                  id="signup-dob"
                  name="dob"
                  type="date"
                  max={today}
                  autoComplete="bday"
                  value={signup.dob}
                  onChange={handleSignupChange}
                  required
                />
              </div>
            </div>

            <div className="ls-field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={signup.email}
                onChange={handleSignupChange}
                required
              />
            </div>

            <div className="ls-field">
              <label htmlFor="signup-password">Create password</label>
              <div className="ls-password-wrap">
                <input
                  id="signup-password"
                  name="password"
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  value={signup.password}
                  onChange={handleSignupChange}
                  required
                />
                <button
                  type="button"
                  className="ls-show-password"
                  onClick={() => setShowSignupPassword((value) => !value)}
                  aria-label={
                    showSignupPassword ? "Hide password" : "Show password"
                  }
                >
                  {showSignupPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {signupMessage && (
              <p
                className={`ls-form-message ${
                  signupError ? "ls-error" : "ls-success"
                }`}
                role="status"
              >
                {signupMessage}
              </p>
            )}

            <button
              type="submit"
              className="ls-primary-button"
              disabled={signupLoading}
            >
              {signupLoading ? "Creating account..." : "Create account"}
              {!signupLoading && <span aria-hidden="true">→</span>}
            </button>

            <p className="ls-terms">
              By creating an account, you agree to our applicable terms and
              privacy policy.
            </p>
          </form>
        </article>

        {/* LOGIN */}
        <article className="ls-auth-card ls-login-card">
          <div className="ls-login-decoration" aria-hidden="true">
            <span className="ls-decoration-circle ls-circle-one" />
            <span className="ls-decoration-circle ls-circle-two" />
            <span className="ls-decoration-line" />
          </div>

          <div className="ls-card-heading">
            <span className="ls-card-icon ls-login-icon" aria-hidden="true">
              ↗
            </span>
            <div>
              <h2>Welcome back</h2>
              <p>Sign in to continue where you left off.</p>
            </div>
          </div>

          <div className="ls-role-picker" role="group" aria-label="Choose login type">
            <button type="button" className={loginRole === "user" ? "active" : ""} onClick={() => { setLoginRole("user"); setLoginMessage(""); }}> <span>♙</span> User Login </button>
            <button type="button" className={loginRole === "admin" ? "active" : ""} onClick={() => { setLoginRole("admin"); setLoginMessage(""); }}> <span>▦</span> Admin Login </button>
            <button type="button" className={loginRole === "owner" ? "active" : ""} onClick={() => { setLoginRole("owner"); setLoginMessage(""); }}> <span>♛</span> Owner Login </button>
          </div>
          <p className="ls-role-hint">{loginRole === "user" ? "Access your personal investment portfolio." : loginRole === "admin" ? "Authorized administrators only." : "Owner access for system and administrator management."}</p>

          <form onSubmit={handleLogin}>
            <div className="ls-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="username"
                value={login.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="ls-field">
              <label htmlFor="login-password">Password</label>
              <div className="ls-password-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={login.password}
                  onChange={handleLoginChange}
                  required
                />
                <button
                  type="button"
                  className="ls-show-password"
                  onClick={() => setShowLoginPassword((value) => !value)}
                  aria-label={
                    showLoginPassword ? "Hide password" : "Show password"
                  }
                >
                  {showLoginPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="ls-login-options">
              <span className="ls-secure-note">
                <span aria-hidden="true">⌑</span> Secure sign-in
              </span>
              <span className="ls-forgot-password">
                Forgot password?
              </span>
            </div>

            {loginMessage && (
              <p
                className={`ls-form-message ${
                  loginError ? "ls-error" : "ls-success"
                }`}
                role="status"
              >
                {loginMessage}
              </p>
            )}

            <button
              type="submit"
              className="ls-primary-button"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign in"}
              {!loginLoading && <span aria-hidden="true">→</span>}
            </button>
          </form>

          <div className="ls-login-footer">
            <span className="ls-footer-dot" />
            Your financial goals, all in one place.
          </div>
        </article>
      </section>

      <footer className="ls-auth-footer">
        <span>© {new Date().getFullYear()} Lakshya Sparsh</span>
        <span>Helping you plan with confidence.</span>
      </footer>
    </main>
  );
}

export default Login;

