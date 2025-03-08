import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-4">
        <div className="footer-box p-4 rounded">
          <div className="row">
            {/* Information Section */}
            <div className="col-sm-3">
              <h6 className="footer-heading">Information</h6>
              <ul className="footer-link">
                <li><Link to="/">📄 Pages</Link></li>
                <li><Link to="/">🏆 Our Team</Link></li>
                <li><Link to="/">⚡ Features</Link></li>
                <li><Link to="/">💰 Pricing</Link></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="col-sm-3">
              <h6 className="footer-heading">Resources</h6>
              <ul className="footer-link">
                <li><Link to="/">📚 Wikipedia</Link></li>
                <li><Link to="/">📘 React Blog</Link></li>
                <li><Link to="/">📝 Terms & Service</Link></li>
                <li><Link to="/">🎯 Angular Dev</Link></li>
              </ul>
            </div>

            {/* Help Section */}
            <div className="col-sm-2">
              <h6 className="footer-heading">Help</h6>
              <ul className="footer-link">
                <li><Link to="/">🔑 Sign Up</Link></li>
                <li><Link to="/">🔓 Login</Link></li>
                <li><Link to="/">⚖️ Terms of Services</Link></li>
                <li><Link to="/">🔒 Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-sm-4">
              <h6 className="footer-heading">Contact Us</h6>
              <p className="contact-info"><FaEnvelope /> Need help? Reach out to us!</p>
              <p className="contact-info"><FaPhoneAlt /> +91 9999999999</p>
              <div className="social-icons">
                <a href="#" className="social-icon"><FaFacebookF /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center py-3 text-light">
        <p className="footer-alt mb-0">2025 © VNRVJIET, All Rights Reserved</p>
      </div>

      {/* Footer CSS */}
      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1e1e2f, #343a40);
          padding: 40px 0;
          color: #fff;
        }
        .footer-box {
          background: #2e2e38;
          color: #f8f9fa;
          border-radius: 12px;
        }
        .footer-heading {
          font-size: 1.2rem;
          font-weight: bold;
          color: #ffcc00;
          margin-bottom: 10px;
        }
        .footer-link li a {
          color: #e0e0e0;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 1rem;
        }
        .footer-link li a:hover {
          color: #ffcc00;
        }
        .social-icons {
          display: flex;
          gap: 15px;
        }
        .social-icon {
          color: #ffcc00;
          font-size: 1.4rem;
          transition: transform 0.3s ease;
        }
        .social-icon:hover {
          transform: scale(1.2);
          color: #ff6600;
        }
        .contact-info {
          font-size: 1rem;
          color: #f8f9fa;
        }
        .footer-alt {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
