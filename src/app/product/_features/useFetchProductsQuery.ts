import { fetchProducts } from '@/lib/api';
import { handleError } from '@/lib/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { ProductResponse } from './useProductList';

export default function useFetchProductsQuery({
  initialProducts,
}: { initialProducts: ProductResponse }) {
  const { error, ...rest } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam }) => await fetchProducts(pageParam),
    initialPageParam: 1,
    initialData: {
      pages: [initialProducts],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 30 ? null : pages.length + 1,
    select: (data) => {
      if (data.pages.length === 0) return [];

      return data.pages.flatMap(
        (page) =>
          page.map((item) => ({
            productId: item.product_id,
            title: item.title,
            price: item.price,
            image: item.image,
            brand: item.brand?.name ?? '',
            category: item.category?.name ?? '',
          })) ?? [],
      );
    },

    enabled: !!initialProducts,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });

  return handleError({ data: rest, error });
}
