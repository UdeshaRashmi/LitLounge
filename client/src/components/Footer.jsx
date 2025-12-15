import React from "react";

const Footer = () => (
  <footer className="bg-white border-t mt-8 py-4 text-center text-gray-500 text-sm">
    <div>
      &copy; {new Date().getFullYear()} LitLounge. All rights reserved.
    </div>
    <div>
      Created with <span className="text-pink-500">♥</span> by Book Lovers.
    </div>
  </footer>
);

export default Footer;