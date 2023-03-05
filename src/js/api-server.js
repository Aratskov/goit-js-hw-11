import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34039556-33388eb553809646fe0c9f5bf&q';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // this.length = 0;
  }

  async fetchArticles() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const response = await axios.get(url);
    this.page += 1;
    const res = await response.data;

    return res;
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
