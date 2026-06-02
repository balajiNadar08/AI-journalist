import React from "react";

function AboutPage() {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .navbar {
          background: #222;
          color: white;
          padding: 20px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
        }

        .nav-links a {
          color: white;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: #db2626;
        }

        .about-section {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 85vh;
          padding: 50px;
          gap: 50px;
        }

        .content {
          flex: 1;
        }

        .content h1 {
          font-size: 45px;
          margin-bottom: 15px;
          text-decoration: underline;
          color: #e02424;
        }

        .content p {
          font-size: 18px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 15px;
        }

        .image-container {
          flex: 1;
          text-align: center;
        }

        .image-container img {
          width: 100%;
          max-width: 500px;
          height: 500px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          background-color: #007bff
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 10px;
          }

          .about-section {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Contact</a></li>
        </ul>

        <div className="logo">AI Journalist</div>

      </nav>

      {/* About Section */}
      <section className="about-section">
        <div className="content">
          <h1>About Us</h1>
        <p class="bg-red-200">
            Welcome to <strong>Ai journalist</strong>, your personalized destination for
            staying informed about the stories that matter most to you. Our platform
            is designed to deliver accurate, timely, and relevant news from a wide
            range of categories, including technology, business, sports,
            entertainment, health, and world affairs.
        </p>

        <p>
            We believe that every reader has unique interests. That's why our website
            allows you to customize your news experience by selecting the categories
            and topics you want to follow. Instead of scrolling through unwanted
            content, you receive news that matches your preferences.
        </p>
        </div>
        <div className="image-container">
          <img
            src="/newspaper.webp "
            alt="About Us"
          />
        </div>
      </section>
    </>
  );
}

export default AboutPage;