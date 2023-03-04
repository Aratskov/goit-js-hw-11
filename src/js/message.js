import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function promisMessage(data) {
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

  if (data.total > 1) {
    Notify.success(`Hooray! We found ${data.total} images.`);
  }

  return data.hits;
}
