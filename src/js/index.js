import ImageApiService from './api-server';
import { cardImage } from './cardimage';
import SimpleLightbox from 'simplelightbox';
import { scroll } from './scroll';
import { LoadMoreBtn } from './btn';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const btnMain = document.querySelector('button');

form.addEventListener('submit', searchItem);
loadMore.addEventListener('click', onLoadMore);

const imageApiService = new ImageApiService();

const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
const gallery = new SimpleLightbox('.gallery a');

loadMore.classList.add('is-hidden');
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
    if (image.length < 40) {
      loadMoreBtn.hide()
      return
    } else {
      loadMoreBtn.show()
    }
      scroll();
  });
}

function onLoadMore() {
  imageApiService.fetchArticles().then(image => {
    insertImage(image);
    gallery.refresh();
    scroll();
    if (image.length < 40) {
      loadMoreBtn.hide()
    }
  });
}

function insertImage(image) {
  gallery.refresh();
  galleryRef.insertAdjacentHTML('beforeend', cardImage(image));
}

function clearGallery() {
  galleryRef.innerHTML = '';
}
