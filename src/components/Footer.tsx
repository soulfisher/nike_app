import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Featured",
      links: [
        { label: "Air Force 1", href: "/featured/air-force-1" },
        { label: "Huarache", href: "/featured/huarache" },
        { label: "Air Max 90", href: "/featured/air-max-90" },
        { label: "Air Max 95", href: "/featured/air-max-95" },
      ],
    },
    {
      title: "Shoes",
      links: [
        { label: "All Shoes", href: "/shoes" },
        { label: "Custom Shoes", href: "/shoes/custom" },
        { label: "Jordan Shoes", href: "/shoes/jordan" },
        { label: "Running Shoes", href: "/shoes/running" },
      ],
    },
    {
      title: "Clothing",
      links: [
        { label: "All Clothing", href: "/clothing" },
        { label: "Modest Wear", href: "/clothing/modest-wear" },
        { label: "Hoodies & Pullovers", href: "/clothing/hoodies" },
        { label: "Shirts & Tops", href: "/clothing/shirts" },
      ],
    },
    {
      title: "Kids'",
      links: [
        { label: "Infant & Toddler Shoes", href: "/kids/infant-toddler" },
        { label: "Kids' Shoes", href: "/kids/shoes" },
        { label: "Kids' Jordan Shoes", href: "/kids/jordan" },
        { label: "Kids' Basketball Shoes", href: "/kids/basketball" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "/twitter-x.svg", href: "https://twitter.com/nike", label: "Twitter" },
    { icon: "/facebook.svg", href: "https://facebook.com/nike", label: "Facebook" },
    { icon: "/instagram.svg", href: "https://instagram.com/nike", label: "Instagram" },
  ];

  const legalLinks = [
    { label: "Guides", href: "/guides" },
    { label: "Terms of Sale", href: "/terms-of-sale" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Nike Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Nike"
                width={80}
                height={29}
              />
            </Link>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-dark-500 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-dark-500">
              <Image
                src="/location.svg"
                alt="Location"
                width={16}
                height={16}
                className="brightness-0 invert opacity-70"
              />
              <span>Croatia</span>
              <span className="ml-4">© 2025 Nike, Inc. All Rights Reserved</span>
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-light-200 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="text-dark-900"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 mt-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-dark-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
