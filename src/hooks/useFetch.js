import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useFetch(endpoint) {
  const apiUrl = process.env.BASE_URL;

  console.log('BASE_URL: ', apiUrl);
  const { data, error } = useSWR(`${apiUrl}/api/v1/${endpoint}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
