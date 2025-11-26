"use client";

import { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = mode === "sign-up";

  const title = isSignUp ? "Join Nike Today!" : "Welcome Back!";
  const subtitle = isSignUp
    ? "Create your account to start your fitness journey"
    : "Sign in to continue your fitness journey";
  const submitText = isSignUp ? "Sign Up" : "Sign In";
  const alternateText = isSignUp
    ? "Already have an account?"
    : "Don't have an account?";
  const alternateLinkText = isSignUp ? "Sign In" : "Sign Up";
  const alternateLink = isSignUp ? "/sign-in" : "/sign-up";
  const dividerText = isSignUp ? "Or sign up with" : "Or sign in with";

  return (
    <div className="w-full">
      {/* Top link - alternate action */}
      <div className="text-right mb-8">
        <span className="text-sm text-dark-700">
          {alternateText}{" "}
          <Link
            href={alternateLink}
            className="text-dark-900 hover:underline font-medium"
          >
            {alternateLinkText}
          </Link>
        </span>
      </div>

      {/* Title and subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-900 mb-3">
          {title}
        </h1>
        <p className="text-dark-700">
          {subtitle}
        </p>
      </div>

      {/* Social providers */}
      <SocialProviders />

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-light-100 text-dark-700">{dividerText}</span>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {isSignUp && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-dark-900 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3.5 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark-900 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            className="w-full px-4 py-3.5 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-dark-900 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="minimum 8 characters"
              className="w-full px-4 py-3.5 pr-12 border border-light-400 rounded-lg bg-light-100 text-dark-900 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-700 hover:text-dark-900 transition-colors duration-200"
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

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-dark-900 text-light-100 font-medium rounded-full hover:bg-dark-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 mt-2"
        >
          {submitText}
        </button>
      </form>

      {/* Terms text at bottom */}
      <p className="mt-8 text-center text-sm text-dark-700">
        By signing {isSignUp ? "up" : "in"}, you agree to our{" "}
        <Link href="/terms" className="text-dark-900 hover:underline font-medium">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-dark-900 hover:underline font-medium">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
