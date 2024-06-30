import { fetchImages } from './js/pixabay-api.js';
import {
  marcupImage,
  showLoader,
  hideLoader,
  formReset,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
  formSearch: document.querySelector('#search'),
  inputImgSearch: document.querySelector('.input-img-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.getElementById('load-more'),
};

let currentPage = 1;
let currentQuery = '';

refs.formSearch.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = event.currentTarget.elements.search.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Enter a word for the query, please.',
      layout: 2,
      position: 'topRight',
      displayMode: 'once',
    });
    return;
  }

  currentPage = 1;
  refs.imgGallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';

  try {
    showLoader();
    const data = await fetchImages(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        layout: 2,
        position: 'topRight',
        displayMode: 'once',
      });
      hideLoader();
      return;
    }
    hideLoader();
    marcupImage(data.hits);
    if (data.totalHits > 15) {
      refs.loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.log(error);
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  try {
    showLoader();
    const data = await fetchImages(currentQuery, currentPage);
    marcupImage(data.hits);

    if (currentPage * 15 >= data.totalHits) {
      refs.loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    hideLoader();
    scrollPage();
  } catch (error) {
    console.log(error);
  }
});

function scrollPage() {
  const { height: cardHeight } =
    refs.imgGallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
