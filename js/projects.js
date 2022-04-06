const projectsSwiper = new Swiper('.projects__swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: '.projects__swiper-btn_next',
    prevEl: '.projects__swiper-btn_prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15
    },
    761: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 35
    },
    1000: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50
    },
    1460: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50
    }
  },
  a11y: {
  prevSlideMessage: 'Предыдущие слайды',
  nextSlideMessage: 'Следующие слайды',
  }
});
