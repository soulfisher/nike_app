import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Dark branding section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-dark-900 text-white flex-col justify-between p-8 lg:p-12">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={60}
              height={21}
              priority
              className="brightness-0 invert"
            />
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold">Just Do It</h1>
          <p className="text-lg text-dark-500 max-w-md">
            Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs.
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-dark-700"></span>
            <span className="w-2 h-2 rounded-full bg-dark-700"></span>
          </div>
        </div>

        <div>
          <p className="text-sm text-dark-500">
            &copy; {new Date().getFullYear()} Nike. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Form section */}
      <div className="flex-1 md:w-1/2 bg-light-100 flex flex-col min-h-screen md:min-h-0">
        {/* Mobile header (shown only on mobile) */}
        <header className="md:hidden w-full py-6 px-4 bg-dark-900">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={60}
              height={21}
              priority
              className="brightness-0 invert"
            />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
