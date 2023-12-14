import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useFetch(endpoint) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log('NEXT_PUBLIC_API_URL: ', apiUrl);
  const { data, error } = useSWR(`${apiUrl}/${endpoint}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
