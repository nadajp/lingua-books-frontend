import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useLanguages() {
  const { data, error } = useSWR(`${apiUrl}/languages`, fetcher);

  return {
    languages: data,
    isLoading: !error && !data,
    isError: error
  }
}