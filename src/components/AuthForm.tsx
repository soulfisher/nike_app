"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialProviders from "./SocialProviders";
import { signIn, signUp, type SignInInput, type SignUpInput } from "@/lib/auth/actions";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
  callbackUrl?: string;
}

export default function AuthForm({ mode, callbackUrl }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isSignUp = mode === "sign-up";

    const title = isSignUp ? "Create your account" : "Sign in to your account";
    const subtitle = isSignUp
      ? "Join Nike to get the best products and exclusive member benefits."
      : "Welcome back! Enter your credentials to access your account.";
    const submitText = isSignUp ? "Create Account" : "Sign In";
    const alternateText = isSignUp
      ? "Already have an account?"
      : "Don't have an account?";
    const alternateLinkText = isSignUp ? "Sign in" : "Sign up";
    const alternateLink = isSignUp ? "/sign-in" : "/sign-up";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      startTransition(async () => {
        const redirectTo = callbackUrl || '/';
        
        if (isSignUp) {
          const name = formData.get("name") as string;
          const input: SignUpInput = { name, email, password };
          const result = await signUp(input);

          if (result.success) {
            router.push(redirectTo);
            router.refresh();
          } else if (result.error) {
            setError(result.error);
          }
        } else {
          const input: SignInInput = { email, password };
          const result = await signIn(input);

          if (result.success) {
            router.push(redirectTo);
            router.refresh();
          } else if (result.error) {
            setError(result.error);
          }
        }
      });
    };

    return (
    <div className="bg-light-100 rounded-2xl shadow-sm border border-light-300 p-6 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-900 mb-2">
          {title}
        </h1>
        <p className="text-dark-700 text-sm sm:text-base">
          {subtitle}
        </p>
      </div>

      <SocialProviders mode={mode} />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-light-100 text-dark-700">or continue with email</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        {isSignUp && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-dark-900 mb-1.5"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark-900 mb-1.5"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-dark-900 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder={isSignUp ? "Create a password" : "Enter your password"}
              className="w-full px-4 py-3 pr-12 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-700 hover:text-dark-900 transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {isSignUp && (
            <p className="mt-1.5 text-xs text-dark-700">
              Must be at least 8 characters
            </p>
          )}
        </div>

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                className="w-4 h-4 rounded border-light-400 text-dark-900 focus:ring-dark-900 focus:ring-offset-0"
              />
              <span className="text-sm text-dark-700">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-dark-900 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {isSignUp && (
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              className="w-4 h-4 mt-0.5 rounded border-light-400 text-dark-900 focus:ring-dark-900 focus:ring-offset-0"
              required
            />
            <span className="text-sm text-dark-700">
              I agree to the{" "}
              <Link href="/terms" className="text-dark-900 hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-dark-900 hover:underline font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>
        )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-dark-900 text-light-100 font-medium rounded-lg hover:bg-dark-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Please wait..." : submitText}
                </button>
      </form>

      <p className="mt-6 text-center text-sm text-dark-700">
        {alternateText}{" "}
        <Link
          href={alternateLink}
          className="text-dark-900 hover:underline font-medium"
        >
          {alternateLinkText}
        </Link>
      </p>
    </div>
  );
}
