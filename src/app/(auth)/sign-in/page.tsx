import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to your account to continue
        </p>
      </div>

      <SocialProviders />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-300 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-zinc-50 px-2 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
            Or continue with email
          </span>
        </div>
      </div>

      <AuthForm type="signin" />

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
