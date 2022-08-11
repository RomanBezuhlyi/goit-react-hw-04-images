export async function fetchImagesBundle({ query, page, perPage }) {
  const ACCESS_KEY = '27848161-51d07553dd50aee0263252abb';
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${ACCESS_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(
    new Error(`There are no images, corresponding your request.`)
  );
}
