'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import image from './freshcart-logo.svg';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'next-i18next';

function Navbar() {
  const { t } = useTranslation('translation'); // Use the 'translation' namespace
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth();
  const pathName = isMounted ? usePathname() : '';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { path: '/', link: t('home') }, // Use translation for 'Home'
    { path: '/products', link: t('products') }, // Use translation for 'Products'
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Image className="w-24" src={image} alt="Logo" />
        <button
          onClick={toggleNavbar}
          className="md:hidden p-2 text-gray-600 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            {links.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathName === link.path ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-100'
                    }`}
                  href={link.path}
                  onClick={() => {
                    setIsOpen(false); // Close the menu on link click
                    document.body.scrollTop = 0; // Scroll to the top for smooth UX
                    document.documentElement.scrollTop = 0; // For Safari
                  }}
                >
                  {link.link}
                </Link>
              </li>
            ))}
            {token ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathName === '/DashboardLayout' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-100'
                      }`} href="/DashboardLayout"
                    onClick={() => {
                      setIsOpen(false);
                      document.body.scrollTop = 0; // Scroll to the top for smooth UX
                      document.documentElement.scrollTop = 0; // For Safari
                    }}
                  >
                    {t('dashboard')} {/* Use translation for 'Dashboard' */}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 transition-colors duration-200"
                  >
                    {t('logout')} {/* Use translation for 'Logout' */}
                  </button>
                </li>
              </>
            ) : (
              <Link
                className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 transition-colors duration-200"
                href="/login"
                onClick={() => {
                  setIsOpen(false);
                  document.body.scrollTop = 0; // Scroll to the top for smooth UX
                  document.documentElement.scrollTop = 0; // For Safari
                }}
              >
                {t('login')} {/* Use translation for 'Login' */}
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
