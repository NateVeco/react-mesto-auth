import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__autor">&#169; {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
