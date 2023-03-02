import ImageApiService from './api-server';
import { cardImage } from './cardimage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', searchItem);
loadMore.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiService();

const gallery = new SimpleLightbox('.gallery a');

function searchItem(event) {
  event.preventDefault();

  imageApiService.query = event.currentTarget.searchQuery.value;
  imageApiService.resetPage();

  if (imageApiService.query === '') {
    return;
  }

  imageApiService.fetchArticles().then(image => {
    clearGallery();
    insertImage(image);
    gallery.refresh();
  });
}

function onLoadMore() {
  imageApiService.fetchArticles().then(image => {
    insertImage(image);
    gallery.refresh();
  });
}

function insertImage(image) {
  gallery.refresh();
  galleryRef.insertAdjacentHTML('beforeend', cardImage(image));
}

function clearGallery() {
  galleryRef.innerHTML = '';
}
