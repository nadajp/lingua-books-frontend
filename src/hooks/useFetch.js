import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = process.env.BASE_URL;

export default function useFetch(endpoint) {
  const { data, error } = useSWR(`${apiUrl}/api/v1/${endpoint}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
