'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import { guest } from '@/lib/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

const GUEST_SESSION_COOKIE = 'guest_session';
const GUEST_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export type AuthActionResult = {
  success: boolean;
  error?: string;
  redirectTo?: string;
};

export async function signUp(input: SignUpInput): Promise<AuthActionResult> {
  const validation = signUpSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { name, email, password } = validation.data;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!response) {
      return {
        success: false,
        error: 'Failed to create account',
      };
    }

    const cookieStore = await cookies();
    const guestToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

    if (guestToken) {
      await mergeGuestCartWithUserCart(guestToken, response.user.id);
      await removeGuestSession(guestToken);
    }

    return {
      success: true,
      redirectTo: '/',
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        return {
          success: false,
          error: 'An account with this email already exists',
        };
      }
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function signIn(input: SignInInput): Promise<AuthActionResult> {
  const validation = signInSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'Invalid input',
    };
  }

  const { email, password } = validation.data;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!response) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    const cookieStore = await cookies();
    const guestToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

    if (guestToken) {
      await mergeGuestCartWithUserCart(guestToken, response.user.id);
      await removeGuestSession(guestToken);
    }

    return {
      success: true,
      redirectTo: '/',
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Invalid') || error.message.includes('credentials')) {
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function signOut(): Promise<AuthActionResult> {
  try {
    await auth.api.signOut({
      headers: await getAuthHeaders(),
    });

    return {
      success: true,
      redirectTo: '/',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'Failed to sign out',
    };
  }
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });
    return session;
  } catch {
    return null;
  }
}

export async function guestSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (existingToken) {
    const existingGuest = await db.query.guest.findFirst({
      where: eq(guest.sessionToken, existingToken),
    });

    if (existingGuest && new Date(existingGuest.expiresAt) > new Date()) {
      return existingToken;
    }
  }

  return null;
}

export async function createGuestSession(): Promise<string> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (existingToken) {
    const existingGuest = await db.query.guest.findFirst({
      where: eq(guest.sessionToken, existingToken),
    });

    if (existingGuest && new Date(existingGuest.expiresAt) > new Date()) {
      return existingToken;
    }
  }

  const sessionToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + GUEST_SESSION_MAX_AGE * 1000);

  await db.insert(guest).values({
    sessionToken,
    expiresAt,
  });

  cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: GUEST_SESSION_MAX_AGE,
  });

  return sessionToken;
}

export async function mergeGuestCartWithUserCart(
  guestToken: string,
  userId: string
): Promise<void> {
  // This function will be implemented when the cart schema is added
  // For now, it's a placeholder that logs the merge attempt
  // In the future, this will:
  // 1. Find all cart items associated with the guest session
  // 2. Transfer them to the user's cart
  // 3. Handle any conflicts (e.g., same product in both carts)
  console.log(`Merging guest cart (${guestToken}) with user cart (${userId})`);

  // Example implementation when cart table exists:
  // const guestCartItems = await db.query.cartItem.findMany({
  //   where: eq(cartItem.guestId, guestToken),
  // });
  //
  // for (const item of guestCartItems) {
  //   const existingUserItem = await db.query.cartItem.findFirst({
  //     where: and(
  //       eq(cartItem.userId, userId),
  //       eq(cartItem.productId, item.productId)
  //     ),
  //   });
  //
  //   if (existingUserItem) {
  //     await db.update(cartItem)
  //       .set({ quantity: existingUserItem.quantity + item.quantity })
  //       .where(eq(cartItem.id, existingUserItem.id));
  //     await db.delete(cartItem).where(eq(cartItem.id, item.id));
  //   } else {
  //     await db.update(cartItem)
  //       .set({ userId, guestId: null })
  //       .where(eq(cartItem.id, item.id));
  //   }
  // }
}

async function removeGuestSession(guestToken: string): Promise<void> {
  const cookieStore = await cookies();

  await db.delete(guest).where(eq(guest.sessionToken, guestToken));

  cookieStore.delete(GUEST_SESSION_COOKIE);
}

async function getAuthHeaders(): Promise<Headers> {
  const cookieStore = await cookies();
  const headers = new Headers();

  const allCookies = cookieStore.getAll();
  const cookieString = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  headers.set('cookie', cookieString);

  return headers;
}

export async function requireAuth(redirectTo: string = '/auth/signin'): Promise<void> {
  const session = await getSession();

  if (!session) {
    redirect(redirectTo);
  }
}

export async function requireGuest(redirectTo: string = '/'): Promise<void> {
  const session = await getSession();

  if (session) {
    redirect(redirectTo);
  }
}

export async function getOrCreateGuestSession(): Promise<string> {
  const existingSession = await guestSession();

  if (existingSession) {
    return existingSession;
  }

  return createGuestSession();
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}
