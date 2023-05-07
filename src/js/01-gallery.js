import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

// STEP 1. СТВОРЕННЯ ТА ДОДАННЯ РОЗМІТКИ СІТКИ ЗОБРАЖЕНЬ
const createGalleryMarkup = items => {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>
      `;
    })
    .join('');
};

gallery.innerHTML += createGalleryMarkup(galleryItems);

// STEP 2. ІНІЦІАЛІЗАЦІЯ БІБЛІОТЕКИ SimpleLightbox
const lightboxOptions = {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', lightboxOptions);

// STEP 3. СТВОРЕННЯ ТА ДОДАННЯ РОЗМІТКИ ВІДКРТИХ ЗОБРАЖЕНЬ
const openImage = event => {
  event.preventDefault();
  lightbox.open({
    source: event.target.parentNode.href,
    caption: event.target.alt,
  });
};

// STEP 4. ПРІКРІПЛЕННЯ СЛУХАЧА ПОДІЙ НА КОНТЕЙНЕР З ЗОБРАЖЕННЯМИ (gallery)
gallery.addEventListener('click', openImage);
