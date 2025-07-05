import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-4 text-sm  bg-white dark:bg-gray-900 shadow-m shadow-md py-4 px-6 ">
      © {new Date().getFullYear()} Made with ❤️ by Vinay Mali
    </footer>
  );
}

export default Footer;
