import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/actions';

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect('/sign-in?callbackUrl=/checkout');
  }

  return (
    <div className="min-h-screen bg-light-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-8">Checkout</h1>
        <div className="bg-light-100 rounded-2xl shadow-sm border border-light-300 p-6 sm:p-8">
          <p className="text-dark-700">
            Welcome, {session.user.name || session.user.email}! You can now proceed with your checkout.
          </p>
          <p className="text-dark-500 mt-4 text-sm">
            Checkout functionality will be implemented in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
