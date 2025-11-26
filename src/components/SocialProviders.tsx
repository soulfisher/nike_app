import Image from "next/image";

export default function SocialProviders() {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-light-400 rounded-full bg-light-100 hover:bg-light-200 transition-colors duration-200 text-dark-900 font-medium"
        aria-label={`Continue with Google`}
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-light-400 rounded-full bg-light-100 hover:bg-light-200 transition-colors duration-200 text-dark-900 font-medium"
        aria-label={`Continue with Apple`}
      >
        <Image
          src="/apple.svg"
          alt="Apple"
          width={20}
          height={20}
        />
        <span>Continue with Apple</span>
      </button>
    </div>
  );
}
