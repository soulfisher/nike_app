import AuthForm from "@/components/AuthForm";

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { callbackUrl } = await searchParams;
  return <AuthForm mode="sign-up" callbackUrl={callbackUrl} />;
}
