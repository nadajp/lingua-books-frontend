import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useCategories() {
  const { data, error } = useSWR(`${apiUrl}/categories`, fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error
  }
}
