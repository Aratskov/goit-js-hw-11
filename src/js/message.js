import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function promisMessage(data) {
  if (data.total === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    currentLenght += data.hits.length;
  }

  if (currentLenght <= 40 && data.total > 1) {
    Notify.success(`Hooray! We found ${data.total} images.`);
  }

  if (data.total === currentLenght && data.total > 1) {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }

  return data.hits;
}
