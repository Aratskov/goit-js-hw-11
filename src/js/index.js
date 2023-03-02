import ImageApiService from "./api-server";
import { cardImage } from "./cardimage";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/style.css';

const form = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', searchItem);
loadMore.addEventListener('click', onLoadMore)


const imageApiService = new ImageApiService();

const gallery = new SimpleLightbox('.gallery a', {
    // captionsData: 'alt',
    // captionDelay: 250
  });

function searchItem(event){
    event.preventDefault()
    imageApiService.query = event.currentTarget.searchQuery.value;
    imageApiService.resetPage();
    if(imageApiService.query === ''){
    return
    }
    
    imageApiService.fetchArticles().then(image =>{
        clearGallery()
        appendImage(image)
    })
    gallery.refresh()
    // const gallery = new SimpleLightbox('.photo-card a').refresh();
};



function onLoadMore(){
    imageApiService.fetchArticles().then(appendImage)
}

function appendImage(image){
galleryRef.insertAdjacentHTML('beforeend', cardImage(image))
}

function clearGallery(){
galleryRef.innerHTML=''
}
