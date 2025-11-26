import AuthForm from "@/components/AuthForm";

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  return <AuthForm mode="sign-in" callbackUrl={callbackUrl} />;
}
