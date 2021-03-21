import './css/reset.css'
import './css/main.css'
import './css/main.scss'

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);
import 'swiper/swiper-bundle.css';

let swiper = new Swiper('.swiper-container.swiper-container_intro', {
  centeredSlides: true,
  autoplay: {
    delay: 4820,
    disableOnInteraction: false
  },
  simulateTouch: true,
  loop: true,
  preloadImages: true,
  speed: 200,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletActiveClass: 'swiper-pagination-bullet-active',
    bulletClass: 'swiper-pagination-bullet',
  },
});

new Swiper('.swiper-container.swiper-comment', {
  centeredSlides: true,
  simulateTouch: true,
  loop: true,
  preloadImages: true,
  speed: 200,
  slideClass: 'swiper-slide',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

(function () {
  const headerBurger = document.querySelector('.header__burger');
  const headerNav = document.querySelector('.header__nav');
  const mapBtn = document.querySelector('.open-map__google-map');
  const map = document.querySelector('.open-map__block');
  const intro = document.querySelector('.intro');
  const header = document.querySelector('.header');

  header.onclick = () => {
    headerBurger.classList.toggle('header__burger_active');
    headerNav.classList.toggle('header__nav_show');
  };

  map.onclick = () => {
    map.classList.add('open-map__block_active');
    mapBtn.classList.add('open-map__google-map_active');
  };

  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('header_active')
    } else {
      header.classList.remove('header_active')
    }
  }  
  
}());

