export default async function fetchData(dataType) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${dataType}`;
    let data = [];
    try {
      const res = await fetch(apiUrl);
      data =  await res.json();
    } catch (error) {
      console.error('Error loading data of type :', error, dataType);
    }
    return data
}