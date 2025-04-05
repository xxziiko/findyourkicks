import type { ConfirmOrderPayload } from '@/app/(checkout)/checkout/[id]/useCheckout';
import type { CartItem } from '@/app/api/cart/route';
import type { OrderSheetResponse } from '@/app/api/checkout/[id]/route';
import type { OrderSheetItemPayload } from '@/app/api/checkout/route';

interface RawProduct {
  product_id: string;
  title: string;
  price: number;
  image: string;

  brand: {
    name: string;
  } | null;

  category: {
    name: string;
  } | null;
}
export interface AddCartRequest {
  product_id: string;
  size: string;
  quantity: number;
  price: number;
}
[];

export const fetchProducts = async (page = 1): Promise<RawProduct[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}`,
    {
      next: { revalidate: 3600 * 2 },
    },
  ).then((res) => res.json());
  return data;
};

// detail
export const fetchProductById = async (productId: string) =>
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
  ).then((res) => res.json());

// login
export const signInWithGoogle = async (next = '/') =>
  await fetch(`/api/auth/google?next=${encodeURIComponent(next)}`).then((res) =>
    res.json(),
  );

export const signInWithKakao = async (next = '/') =>
  await fetch(`/api/auth/kakao?next=${encodeURIComponent(next)}`).then((res) =>
    res.json(),
  );

export const signOutUser = async () =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`, {
    method: 'POST',
  });

// cart
export const addToCart = async ({
  body,
  userId,
}: { body: AddCartRequest[]; userId: string }) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart?userId=${userId}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const fetchCartItems = async (userId: string): Promise<CartItem[]> =>
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart?userId=${userId}`,
  ).then((res) => res.json());

export const updateCartQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: string;
  quantity: number;
}) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartItemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });

export const deleteCartItem = async (cartItemId: string) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${cartItemId}`, {
    method: 'DELETE',
  });

// checkout
export const createOrderSheet = async ({
  userId,
  body,
}: {
  userId: string;
  body: OrderSheetItemPayload[];
}): Promise<OrderSheetResponse> =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
    method: 'POST',
    body: JSON.stringify({ userId, body }),
  }).then((res) => res.json());

export const fetchOrderSheet = async (orderSheetId: string) =>
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/checkout/${orderSheetId}`,
  ).then((res) => res.json());

export const confirmOrder = async (payload: ConfirmOrderPayload) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comfirm`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }).then((res) => res.json());
