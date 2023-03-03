import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.length = 0;
  }

  fetchArticles() {
    return fetch(
      `${BASE_URL}/?key=34039556-33388eb553809646fe0c9f5bf&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.length += data.hits.length;
        }

        if (data.total === this.length && data.total > 1) {
          Notify.info(
            `We're sorry, but you've reached the end of search results.`
          );
        }

        if (this.page === 1 && data.total > 1) {
          Notify.success(`Hooray! We found ${data.total} images.`);
        }

        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
