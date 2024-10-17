'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import image from './freshcart-logo.svg';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'next-i18next';

function Navbar() {
  const { t } = useTranslation('translation');
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth(); // Get token and logout from the auth context
  const pathName = isMounted ? usePathname() : '';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { path: '/', link: t('home') },
    { path: '/products', link: t('products') },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 p-2 z-50">
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
                  className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathName === link.path ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-100'}`}
                  href={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {link.link}
                </Link>
              </li>
            ))}
            {token ? (
              // Show these links only if the user is logged in (token exists)
              <>
                <li className="nav-item">
                  <Link
                    className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathName === '/DashboardLayout' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-blue-100'}`}
                    href="/DashboardLayout"
                    onClick={() => {
                      setIsOpen(false);
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                    }}
                  >
                    {t('dashboard')}
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
                    {t('logout')}
                  </button>
                </li>
              </>
            ) : (
              // Show the login link if the user is not logged in
              <li className="nav-item">
                <Link
                  className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-100 transition-colors duration-200"
                  href="/login"
                  onClick={() => {
                    setIsOpen(false);
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  {t('login')}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
