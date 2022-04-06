window.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  const header = document.querySelector('.header');
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navigation');
  const headerSearchForm = document.querySelector('.search');
  const headerSearch = document.querySelector('.search__input');
  const searchBtn = document.querySelector('.search__button');
  const showSearchBtn = document.querySelector('.loupe-btn');
  const galleryFilter = document.querySelector('.choices');
  const gallerySwiper = document.querySelector('.gallery__swiper-wrapper');
  const galleryModalPlug = document.querySelector('.pictureblock_plug');
  const popupBtn = document.querySelector('.contacts-form-popup__btn');
  const contactsPopup = document.querySelector('.contacts-form-popup');

  // lazy load

  const lazyImg = document.querySelector('img');
  const observer = lozad(lazyImg);
  observer.observe();

  //smooth scroll

  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const bolckId = anchor.getAttribute('href').substring(1);

      document.getElementById(bolckId).scrollIntoView(
        {
          behavior: 'smooth',
          block: 'start',
        }
      );
    });
  });


  // бургер и меню навигации

  burger.addEventListener('click', () => {

    toggleBurgerAndMenu();
    setTimeout(() => {
      if (nav.classList.contains('is-active')) {
        adaptHeader();
      } else {
        resetHeader();
      }
    }, 10);

  });

  window.addEventListener('resize', () => {
    if ((window.innerWidth > 1200) && nav.classList.contains('is-active')) {
      toggleBurgerAndMenu();
      resetHeader();
    }
  });

  nav.addEventListener('click', (event) => {
    if ((event.target.classList.contains('navigation__link') || (event.target.classList.contains('authentication'))) &&  burger.classList.contains('is-active')) {
      toggleBurgerAndMenu();
      resetHeader();
    }
  });

  // активация/скрытие окна поиска на 1200рх и ниже

  showSearchBtn.addEventListener('click', () => {
    toggleSearch();
  });

  // события по клику

  document.addEventListener('click', (event) => {

    //инициализация нижнего хэдера

    const activeArtBtn = document.querySelector('.art-style-is-active');
    const activeDropdown = document.querySelector('.active-dropdown');

    function hideDropdown() {
      activeDropdown.classList.add('hide');
      setTimeout(function () {
        activeDropdown.classList.add('display-none');
        activeDropdown.classList.remove('hide');
        activeDropdown.classList.remove('active-dropdown');
        activeArtBtn.classList.remove('art-style-is-active');
      }, 300)
    }

    if (event.target.classList.contains('art-styles-list__art-style-name')) {
      const targetDropdown = event.target.nextElementSibling;

      function showDropdown(event) {
        targetDropdown.classList.remove('display-none');
        setTimeout(function () {
          event.target.classList.add('art-style-is-active');
          targetDropdown.classList.add('active-dropdown');
        }, 10);
      }

      if (activeArtBtn) {
        if (event.target !== activeArtBtn) {
          hideDropdown();
          showDropdown(event);
        }
        else {
          hideDropdown()
        }
      }
      else {
        showDropdown(event);
      }
    }
    else if (activeArtBtn) {
      hideDropdown()
    }

    //поиск в хэдэре -  пропадание плэйсхолдера при клике + покраска бордера

    if ((event.target === headerSearch) || (event.target === searchBtn)) {
      if (!headerSearch.classList.contains('search-is-active')) {
        headerSearch.classList.add('search-is-active');
        headerSearch.placeholder = '';
      }
    }
    else if (headerSearch.classList.contains('search-is-active')) {
      headerSearch.classList.remove('search-is-active');
      headerSearch.placeholder = "Поиск по сайту";
    }
  });


  //модалки в свайпере галареи

  gallerySwiper.addEventListener('click', (event) => {
    if (event.target.classList.contains('gallery__slide')) {
      const slide = event.target.dataset.slide;
      const targetPicture = document.querySelector(`[data-art="${slide}"]`);

      if (targetPicture) {
        targetPicture.classList.add('is-active');
      } else {
        galleryModalPlug.classList.add('is-active');
      }
      blockScroll();
      let listenModal = function (event) {
        const activePictureblock = document.querySelector('.pictureblock.is-active');
        if (event.target.classList.contains('pictureblock__button') || event.target.classList.contains('body')) {
          activePictureblock.classList.remove('is-active');
          unblockScroll();
          document.removeEventListener('click', listenModal);
        }
      };
      event.target = document.querySelector('.pictureblock.is-active');
      document.addEventListener('click', listenModal);
    }
  });

  function blockScroll() {
    const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
    body.classList.add('is-active');
    body.style.paddingRight = paddingOffset;
  }

  function unblockScroll() {
    const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
    body.classList.remove('is-active');
    body.removeAttribute("style");
  }

  function toggleBurgerAndMenu() {
    if (nav.classList.contains('display-none')){
      nav.classList.remove('display-none');
      setTimeout(() => {
        burger.classList.add('is-active');
        nav.classList.add('is-active');
      }, 10);
    } else {
      burger.classList.remove('is-active');
      nav.classList.remove('is-active');
      setTimeout(() => {
        nav.classList.add('display-none');
      }, 300);
    }
  }

  function resetHeader() {
    header.removeAttribute("style");
    unblockScroll();
  }

  function adaptHeader() {
    const paddingOffset = window.innerWidth - body.offsetWidth + 'px';
    blockScroll();
    header.style.paddingRight = paddingOffset;
  }

  function toggleSearch() {
    showSearchBtn.classList.toggle('is-active');
    headerSearchForm.classList.toggle('is-active');
    if (showSearchBtn.classList.contains('is-active')){
      headerSearchForm.classList.add('is-visible');
    } else {
      setTimeout(() => {
        headerSearchForm.classList.remove('is-visible');
      }, 250);
    }
  }

  // кастомный селект  в галерее

  const choices = new Choices(galleryFilter, {
    searchEnabled: false,
    classNames: {
      containerOuter: 'choices',
    },
  });


  //инициализация кастомного скролла
  const scrollTargets = document.getElementsByClassName('simplebar-wrap');
  for (let scrollTarget of scrollTargets) {
    new SimpleBar(scrollTarget, );
  }

  //инициализация свайпера в хиро
  const heroSwiper = new Swiper('.hero__swiper', {
    autoplay: true,
    slidesPerView: 1,
    speed: 3000,
    delay: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
  });

  // чекбоксы изданий на  MOBILE_WIDTH
  const publicationsHeader = document.querySelector(".publications__minor-heading");
  publicationsHeader.addEventListener("click", ()=>{
    publicationsHeader.classList.toggle("is-active");
  });

  //настройки типпи-подсказок
  tippy('.projects__tip-btn_one', {
    trigger: 'click',
    maxWidth: 264,
    content: 'Пример современных тенденций - современная методология разработки',
  });

  tippy('.projects__tip-btn_two', {
    trigger: 'click',
    maxWidth: 264,
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  });

  tippy('.projects__tip-btn_three', {
    trigger: 'click',
    maxWidth: 264,
    content: 'В стремлении повысить качество',
  });

  // секция КОНТАКТЫ

  ymaps.ready(init);
  function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map1",     {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
    }

  );
  // убираем скролл карты при скролле страницы и добавляем при клике на карту
  myMap.behaviors.disable('scrollZoom')
  myMap.events.add('click', function(){
    myMap.behaviors.enable('scrollZoom')
  })
  var myPlacemark = new ymaps.Placemark( [55.75843057677773,37.60116099202832], {}, {

      iconLayout: "default#image",
      iconImageHref: "img/marker.svg",
      iconImageSize: [20, 20],

    }
  );
  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
  }


  //инициализация маски инпута телефона
  Inputmask("+7(999)-999-99-99").mask(document.querySelector('#phone'));

  // настройка валидации формы

  const validLettersRu = /^[А-Яа-я]+$/;
  const validLettersEn = /^[A-Za-z]+$/;

  const phoneInput = document.querySelector('#phone');
  const nameInput = document.querySelector('#name');

  new JustValidate('.contacts__form', {
    colorWrong: '#D11616',
    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 25,
        function: () => {
          const userName = nameInput.value;
          return userName.match(validLettersRu)||userName.match(validLettersEn)
        }
      },
      phone: {
        required: true,
        function: (name, value) => {
          const tel = phoneInput.inputmask.unmaskedvalue()
          return Number(tel)&&( tel.length === 10)
        }
      },
    },
    messages: {
      name: {
        required: 'Как вас зовут?',
        minLength: 'Введите минимум 3 символа',
        maxLength: 'Введите не более 25 символов',
        function: 'Допустимы только буквы кириллицы или латыни'
      },
      phone: {
        required: 'Укажите ваш телефон',
        function: 'Введите номер в десятизначном формате',
      },
    },
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            //console.log('Отправлено');
            showFormPopup();
          }
        }
      }
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
    }
  });

  // попап  успешной отправки формы в "контактах"
  let popupListener =  function (event) {
    if (event.target === popupBtn || event.target.classList.contains('contacts-form-popup')) {
      hideFormPopup();
    }
  }

  function showFormPopup() {
    const userName = document.querySelector('#name').value;
    blockScroll();
    contactsPopup.classList.remove('display-none');
    contactsPopup.querySelector('.contacts-form-popup__message').textContent = `Спасибо за обращение, ${userName}!`;
    contactsPopup.classList.add('is-active');
    document.addEventListener("click", popupListener);
    nameInput.value = "";
    phoneInput.value = "";
  }

  function hideFormPopup() {
    unblockScroll();
    contactsPopup.classList.remove('is-active');
    setTimeout(() => {
      contactsPopup.classList.add('display-none');
    }, 250);
    document.removeEventListener("click", popupListener);
  }

});










