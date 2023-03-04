import ImageApiService from './api-server';
// import promisMessage from './message';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { scroll } from './scroll';
import { cardImage } from './cardimage';
import SimpleLightbox from 'simplelightbox';
import { LoadMoreBtn } from './btn';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';
const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadingMore = document.querySelector('.load-more');

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

const gallery = new SimpleLightbox('.gallery a');

function searchItem(event) {
  event.preventDefault();

  imageApiService.query = event.currentTarget.searchQuery.value;
  imageApiService.resetPage();

  if (imageApiService.query === '') {
    return;
  }

  clearGallery();
  fetchImages();
}


async function promisRenderImages() {
  try {
    const data = await imageApiService.fetchArticles();
    return promisMessage(data);
  } catch {
    console.log(error);
  }
}

function promisMessage(data) {
  if (data.total === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    this.length += data.hits.length;
  }

  if (data.total === this.length && data.total > 1) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }

  // if (data.total > 1 || this.length <= 40) {
  //   Notify.success(`Hooray! We found ${data.total} images.`);
  // }

  return data.hits;
}

async function fetchImages() {
  try {
    const renderHits = await promisRenderImages();
    return loadingImages(renderHits);
  } catch (error) {
    console.log(error);
  }
}

function loadingImages(image) {
  insertImages(image);
  gallery.refresh();
  if (image.length < 40) {
    loadMoreBtn.hide();
    return;
  } else {
    loadMoreBtn.show();
  }
  scroll();
}

function insertImages(image) {
  galleryRef.insertAdjacentHTML('beforeend', cardImage(image));
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

form.addEventListener('submit', searchItem);
loadingMore.addEventListener('click', fetchImages);
