import Image from "next/image";

interface SocialProvidersProps {
  mode: "sign-in" | "sign-up";
}

export default function SocialProviders({ mode }: SocialProvidersProps) {
  const actionText = mode === "sign-in" ? "Sign in" : "Sign up";

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-400 rounded-lg bg-light-100 hover:bg-light-200 transition-colors duration-200 text-dark-900 font-medium"
        aria-label={`${actionText} with Google`}
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span>{actionText} with Google</span>
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-light-400 rounded-lg bg-light-100 hover:bg-light-200 transition-colors duration-200 text-dark-900 font-medium"
        aria-label={`${actionText} with Apple`}
      >
        <Image
          src="/apple.svg"
          alt="Apple"
          width={20}
          height={20}
        />
        <span>{actionText} with Apple</span>
      </button>
    </div>
  );
}
