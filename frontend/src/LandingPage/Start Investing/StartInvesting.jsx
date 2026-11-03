import { Link } from 'react-router-dom';
import PreFooter from '../PreFooter';

function StartInvesting() {
  return (
    <>
      <style>
        {`
          .mf-page {
            font-family: sans-serif;
            color: #222;
            min-height: 80vh; 
            display: flex;
            flex-direction: column;
          }

          /* Hero Section (Background Image) */
          .mf-hero {
            width: 100%;
            background-color: #3b4b5a; 
            /* Here goes the dark background image */
            background-image: url('/media/images/mf-banner-bg.png'); 
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 50px 10%;
            box-sizing: border-box;
            min-height: 350px;
          }

          .hero-text {
            color: white;
            flex: 1;
            max-width: 55%;
          }

          .hero-text h1 {
            font-size: 55px;
            font-weight: 600;
            margin: 0 0 10px 0;
            letter-spacing: 1px;
          }

          .hero-text h2 {
            font-size: 26px;
            font-weight: 400;
            margin: 0;
            line-height: 1.4;
          }

          .hero-text .highlight {
            color: #ffc107; /* Yellow text */
          }

          /* Right side foreground image (Signpost) */
          .hero-graphic {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            max-width: 45%;
          }

          .hero-graphic img {
            max-width: 100%;
            height: auto;
            max-height: 280px; /* Keeps the signpost from getting too big */
            object-fit: contain;
          }

          /* Split Content Section */
          .split-section {
            width: 90%;
            max-width: 1200px;
            margin: 80px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1; 
          }

          .split-column {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 40px;
          }

          .split-icon {
            width: 100px;
            height: 100px;
            margin-bottom: 30px;
            object-fit: contain;
          }

          .split-column p {
            font-size: 18px;
            font-weight: 600;
            line-height: 1.5;
            margin-bottom: 40px;
            min-height: 60px;
            color: #111;
          }

          .split-btn {
            background-color: #458ff0; 
            color: white;
            border: none;
            padding: 12px 25px;
            font-size: 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
            text-decoration: none;
          }

          .split-btn:hover {
            background-color: #ffc107; /* Yellow Hover */
            color: #111;
          }

          .divider {
            position: relative;
            width: 1px;
            background-color: #ddd;
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .divider-text {
            background-color: white;
            padding: 10px;
            color: #555;
            font-weight: bold;
            border-radius: 50%;
            position: absolute;
          }

          /* Pre-Footer */
          .pre-footer-wrapper {
            width: 90%;
            max-width: 1500px;
            margin: 40px auto 30px auto;
            padding-top: 25px;
            border-top: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .pre-footer-links { display: flex; gap: 30px; }
          .pre-footer-links a { color: #555; text-decoration: none; font-size: 14px; }
          .pre-footer-socials { display: flex; gap: 15px; color: #999; font-size: 18px; }
        `}
      </style>

      <div className="mf-page">
        {/* Hero Section */}
        <div className="mf-hero">
          <div className="hero-text">
            <h1>Mutual Funds</h1>
            <h2>are the best Investment Vehicle</h2>
            <h2 className="highlight">To reach all your Financial destination</h2>
          </div>
          
          {/* Signpost Image on Top of Background */}
          <div className="hero-graphic">
            <img src="/media/images/mf-signpost.png" alt="Financial Destinations Signpost" />
          </div>
        </div>

        {/* Main Split Section */}
        <div className="split-section">
          
          <div className="split-column">
            <img src="/media/images/grad-cap.png" alt="Learn" className="split-icon" />
            <p>If you are new to Mutual Funds<br />and wish to learn before investing</p>
            <Link to="/knowledge_center" className="split-btn">Click here &#10140;</Link>
          </div>

          <div className="divider">
            <span className="divider-text">Or</span>
          </div>

          <div className="split-column">
            <img src="/media/images/tools-icon.png" alt="Tools" className="split-icon" />
            <p>If you are aware about Mutual Funds<br />then use our fund selector tools</p>
            <Link to="/fundselector" className="split-btn">Start here &#10140;</Link>
          </div>

        </div>

        {/* Bottom Links (Pre-Footer) */}
        <PreFooter />

      </div>
    </>
  );
}

export default StartInvesting;