const BASE_URL = 'https://pixabay.com/api';
// const option = {
// Authorization:
// }

function fetchImage(search) {
  return fetch(
    `${BASE_URL}/?key=34039556-33388eb553809646fe0c9f5bf&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  ).then(response => response.json());
}

export default { fetchImage };
