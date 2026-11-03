import { Link } from 'react-router-dom';
import PreFooter from '../PreFooter';

function AboutUs() {
  return (
    <>
      <style>
        {`
          .about-page {
            font-family: sans-serif;
            color: #222;
          }

          /* Banner with Background Image */
          .about-hero {
            width: 100%;
            height: 250px;
            background-image: url('/media/images/about-banner.png');
            background-color: #458ff0; /* Fallback color */
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 32px;
            font-weight: 500;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
          }

          /* Padding and max-width for better left/right spacing */
          .about-content {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 50px 20px;
            line-height: 1.8;
          }

          .about-content p {
            margin-bottom: 20px;
            font-size: 15px;
            text-align: justify;
            color: #333;
          }

          .services-heading {
            color: #458ff0; 
            font-size: 24px;
            font-weight: 500;
            margin-top: 60px;
            margin-bottom: 10px;
          }

          .services-subtext {
            font-size: 15px;
            margin-bottom: 40px !important;
          }

          .services-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 25px;
            justify-content: center; 
          }

          /* Card Styling updated for <Link> */
          .service-card {
            position: relative;
            display: block; /* Important for Link tags */
            width: calc(33.333% - 25px);
            min-width: 300px; 
            height: 200px;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            cursor: pointer;
            text-decoration: none; /* Removes underline from links */
          }

          /* Added transition for smooth zoom effect */
          .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.4s ease-in-out; 
          }

          /* Zoom in the image when hovering over the card */
          .service-card:hover .card-img {
            transform: scale(1.1);
          }

          /* Dark gradient over the image */
          .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%);
            z-index: 1;
            /* Prevents the overlay from blocking the hover trigger */
            pointer-events: none; 
          }

          .service-card h3 {
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            text-align: center;
            color: white;
            font-size: 20px;
            font-weight: 500;
            margin: 0;
            z-index: 2;
            pointer-events: none;
          }
        `}
      </style>

      <div className="about-page">
        {/* Banner */}
        <div className="about-hero">
          <h1>About Us</h1>
        </div>

        <div className="about-content">
          <p>Founded by Mr. Gaurav Mehrotra - an expert in the field of Financial Services for the last 21 years, Lakshya Sparsh was created in 2017. The last 21 years have been a wonderful & satisfying journey of helping clients in meeting their Short Term & Long Term Goals through Financial Planning. In the years goneby, the effort has always been to Learn as much as possible through various Training programs facilitated by the leading mutual funds.</p>
          
          <p>Recently he got the opportunity to attend a "Transformational Leadership" program at IIM Ahmedabad on conducted over 3 days. In May 2018, he was awarded <strong>"Financial Advisor of The Year Award"</strong> in the IFA category instituted by the CNBC TV 18. We have a very dedicated and sincere team of 5 executives operating out of our newly setup Office at Budha Marg, Patna for support & services.</p>
          
          <p>At <strong>Lakshya Sparsh</strong> we adopt a structured and disciplined advisory approach and provide you portfolio solutions which meet your desired financial goals and milestones.</p>
          
          <p>At <strong>Lakshya Sparsh</strong>, we offer you a complete range of solutions that complement our advisory services. The range includes a combination of best of breed proprietary and non proprietary (third party) products. The approach is to recommend you product solutions within your overall asset allocation in an unbiased manner after evaluating all the options available in the market.</p>
          
          <p>Work with us to develop a wealth creation and protection plan that provides you with the best chance to reach your financial goals according to your specific needs and comfort levels. Our estate planning, insurance, and wealth management expertise will put you in the best position to succeed while allowing you to maximize your time devoted to focusing on the pursuits that are most important to you.</p>

          <h2 className="services-heading">We offer following specific solutions to our clients:</h2>
          <p className="services-subtext">Below are the service offered by us to help you in investing for your various stages of your life so that you can live your life freely</p>

          <div className="services-grid">
            
            <Link to="/wealth" className="service-card">
              <img src="/media/images/financial-planning.png" alt="Financial Planning" className="card-img" />
              <div className="card-overlay"></div>
              <h3>Financial Planning</h3>
            </Link>
            
            <Link to="/start" className="service-card">
              <img src="/media/images/mutual-fund.png" alt="Mutual Fund" className="card-img" />
              <div className="card-overlay"></div>
              <h3>Mutual Fund</h3>
            </Link>
            
            <Link to="/elss" className="service-card">
              <img src="/media/images/tax-planning.png" alt="Tax Planning" className="card-img" />
              <div className="card-overlay"></div>
              <h3>Tax Planning</h3>
            </Link>
            
            <Link to="/insurance/life_insurance" className="service-card">
              <img src="/media/images/life-insurance.png" alt="Life Insurance" className="card-img" />
              <div className="card-overlay"></div>
              <h3>Life Insurance</h3>
            </Link>
            
            <Link to="/general_insurance" className="service-card">
              <img src="/media/images/general-insurance.png" alt="General Insurance" className="card-img" />
              <div className="card-overlay"></div>
              <h3>General Insurance</h3>
            </Link>

          </div>
        </div>
      </div>

      <PreFooter/>
    </>
  );
}

export default AboutUs;