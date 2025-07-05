// shared-components/Header.js
import React from 'react';
import logo from '../assets/img/smcc.png';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded" />
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
          Social Media Calendar
        </h1>
      </div>
    </header>
  );
}

export default Header;
