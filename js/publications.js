document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_WIDTH = 580;

  function getWindowWidthForPub() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  (() => {
      const publicationsSliderParamsNotMobile = {
      sliderWrap: "publications__swiper-wrap",
      cardsContainerName: "publications__swiper",
      cardsWrapName: "publications__swiper-wrapper",
      card: "publications__slide",
      paginationClassName: "publications-swiper__pagination",
      navClassName: "publications-swiper__navigation",
      navBtnClassName: "publications-swiper__nav-btn",
      navPrev: "publications-swiper__prev",
      navNext: "publications-swiper__next"
    };

    function activatePublicationSlider(params) {
      const navigation = document.createElement("div");
      const pagination = document.createElement("div");
      const navBtnPrev = document.createElement("button");
      const navBtnNext = document.createElement("button");

      navigation.classList.add(params.navClassName);

      navBtnPrev.classList.add(params.navBtnClassName);
      navBtnPrev.classList.add(params.navPrev);
      navigation.prepend(navBtnPrev);

      pagination.classList.add(params.paginationClassName);
      navigation.append(pagination);

      navBtnNext.classList.add(params.navBtnClassName);
      navBtnNext.classList.add(params.navNext);
      navigation.append(navBtnNext);

      params.sliderWrapElem.prepend(navigation);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
        breakpoints: {
          581: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 35,
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50
          },
        },

        direction: 'horizontal',

        pagination: {
          el: `.${params.sliderWrap} .${params.paginationClassName}`,
          type: "fraction"
        },

        navigation: {
          nextEl: `.${params.navNext}`,
          prevEl: `.${params.navPrev}`
        },

        a11y: {
          prevSlideMessage: 'Предыдущие слайды',
          nextSlideMessage: 'Следующие слайды',
        },

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
            navigation.remove();
          }
        }
      });
    }

    function destroyPublicationsSlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function checkWindowWidthForPublications(params) {
      const currentWidth = getWindowWidthForPub();
      params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth > MOBILE_WIDTH &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activatePublicationSlider(params);
      } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
        destroyPublicationsSlider(params);
      }
    }

    checkWindowWidthForPublications(publicationsSliderParamsNotMobile);

    window.addEventListener("resize", function () {
      checkWindowWidthForPublications(publicationsSliderParamsNotMobile);
    });
  })();

  // маска для инпутов

  document.querySelectorAll('.price__input').forEach(function(input){
    input.addEventListener('input', function(){

      const maskID  = input.id;
      const mask = document.querySelector(`[data-mask="${maskID}"]`);
      let stringInputValue = input.value.toString();

      if (stringInputValue.length > 4) {   // защита от переполнения
        input.value = parseInt(input.value);
      }
      if (input.value >= 100000) {
        input.value = 50000;
      }
      if (input.value < 0) {
        input.value = 0;
      }
      let purifiedStringInputValue = input.value.toString();
      if (input.value >= 1000) { //непосредственно, маска
        let firstPartLength = purifiedStringInputValue.length - 3;
        let maskedValue = purifiedStringInputValue.slice(0, firstPartLength) + " " + purifiedStringInputValue.slice(-3);
        mask.textContent = maskedValue;
      } else {
        mask.textContent = purifiedStringInputValue;
      }
    });
  });


});

