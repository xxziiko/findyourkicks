import type { CartItem } from '@/lib/types';
import type { User } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const cartItemsAtom = atomWithStorage<CartItem[]>('cart', []);

export const userAtom = atom<User | null>(null);
export const userIdAtom = atom((get) => get(userAtom)?.id ?? '');
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
