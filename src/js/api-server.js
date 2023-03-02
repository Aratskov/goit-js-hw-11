import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api';

export default class ImageApiService{
constructor(){
    this.searchQuery = '';
    this.page = 1;
}

fetchArticles(){
    return fetch(
        `${BASE_URL}/?key=34039556-33388eb553809646fe0c9f5bf&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`
      ).then(response => response.json())
      .then(data =>{
        this.page += 1
        if(data.total === 0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
        else{Notify.success(`Hooray! We found ${data.total} images.`)}
        
        return data.hits
    });
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }

    set query(newSearchQuery){
     this.searchQuery = newSearchQuery;
    }

}


