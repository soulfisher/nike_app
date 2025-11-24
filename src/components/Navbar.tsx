"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/kids", label: "Kids" },
    { href: "/collections", label: "Collections" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-light-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/nike-logo.svg"
                alt="Nike"
                width={60}
                height={21}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark-900 hover:text-dark-700 transition-colors duration-200 text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              className="text-dark-900 hover:text-dark-700 transition-colors duration-200"
              aria-label="Search"
            >
              <Image src="/search.svg" alt="Search" width={24} height={24} />
            </button>
            <Link
              href="/cart"
              className="text-dark-900 hover:text-dark-700 transition-colors duration-200 text-base font-medium flex items-center space-x-2"
            >
              <Image src="/cart.svg" alt="Cart" width={24} height={24} />
              <span>My Cart (2)</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-900 hover:text-dark-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Image
                src={isMobileMenuOpen ? "/close.svg" : "/menu.svg"}
                alt="Menu"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-light-300 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-light-300 pt-2 mt-2">
              <Link
                href="/cart"
                className="block px-3 py-2 text-base font-medium text-dark-900 hover:text-dark-700 hover:bg-light-200 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Cart (2)
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
