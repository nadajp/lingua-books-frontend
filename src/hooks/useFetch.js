import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useFetch(endpoint) {
  const { data, error } = useSWR(`${apiUrl}/${endpoint}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
