import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <span className="logo-icon">🌱</span>
        <span className="logo-text">CarbonCalc</span>
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#calculator">Calculator</a>
        </li>
        <li>
          <a href="#projects">Offsets</a>
        </li>
        <li>
          <a href="#resources">Resources</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#faqs">FAQs</a>
        </li>
      </ul>

      <div className="navbar-actions">
        <button className="signup-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
