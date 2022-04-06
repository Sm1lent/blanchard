window.addEventListener('DOMContentLoaded', function () {

  //Табы в "каталоге"

  const catalogTabs = document.querySelector('.tabs');
  const accordeons = document.querySelectorAll('.accordeon');
  const accordeonsContainer = document.querySelector('.tabs-content');
  const nationDescriptions = document.querySelectorAll('.catalog__description');
  const allAccordeonInnerLinks = document.querySelectorAll('.accordeon__panel a');

  accordeons.forEach(function (node) {
    node.classList.add('display-none');
  });
  accordeons[0].classList.add('active-accordeon');
  accordeons[0].classList.remove('display-none');

  nationDescriptions.forEach(function (description) {
    description.classList.add('display-none');
  });
  nationDescriptions[0].classList.add('active-description');
  nationDescriptions[0].classList.remove('display-none');

  allAccordeonInnerLinks.forEach(function (btn) {
    btn.classList.add('visibility-hidden');
  });


  catalogTabs.addEventListener('click', (event) => {

    if (event.target.classList.contains('tabs__flag')) {
      switchNationTab(event.target.parentNode)
    }
    if (event.target.classList.contains('tabs__btn')) {
      switchNationTab(event.target)
    }
  });

  function switchNationTab(targetBtn) {
    const activeTabsBtn = document.querySelector('.active-btn');
    const activeAccordeon = document.querySelector('.active-accordeon');
    const activeDescription = document.querySelector('.active-description');
    if (!targetBtn.classList.contains('active-btn')) {
      const path = targetBtn.dataset.path;
      const targetAccordeon = document.querySelector(`[data-target="${path}"]`);
      const targetDescription = document.querySelector(`[data-origin="${path}"]`);
      activeTabsBtn.classList.remove('active-btn');
      activeAccordeon.classList.remove('active-accordeon');
      activeDescription.classList.remove('active-description');
      targetBtn.classList.add('active-btn');
      activeAccordeon.classList.add('display-none');
      activeDescription.classList.add('display-none');
      targetDescription.classList.remove('display-none');
      targetAccordeon.classList.remove('display-none');
      setTimeout(() => {
        targetDescription.classList.add('active-description');
        targetAccordeon.classList.add('active-accordeon');
        const targetAccordeonPanel = targetAccordeon.querySelector('.accordeon-active .panel-opened');
        if (targetAccordeonPanel) {
          targetAccordeonPanel.style.maxHeight = targetAccordeonPanel.scrollHeight + 'px';
        }
        showTargetCountryPainterInfo(targetAccordeon);
      }, 10);
    }
  }

  // АККОРДЕОН


  accordeons.forEach(function(accordion) {
    myAccordeon(accordion);
  });

  function myAccordeon(accordion) {
    accordion.querySelectorAll('.accordeon__heading-wrap').forEach(function (heading) {
      heading.setAttribute('tabindex', 0);
    });

    accordion.querySelector('.accordeon__item').classList.add('accordeon-active');
    const accordeonPanels = accordion.querySelectorAll('.accordeon__panel');
    accordeonPanels.forEach(function (panel) {
      panel.classList.add('panel-closed');
      panel.setAttribute('aria-hidden', true);
      panel.parentNode.setAttribute('aria-expanded', false);
    });

    accordion.querySelector('.accordeon-active').setAttribute('aria-expanded', true);
    const firstPanel = accordion.querySelector('.accordeon-active .accordeon__panel')
    firstPanel.classList.remove('panel-closed');
    firstPanel.setAttribute('aria-hidden', false);
    firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
    firstPanel.classList.add('panel-opened');
    firstPanel.querySelectorAll('.painters-list__painter').forEach(function(btn) {
      btn.classList.remove('visibility-hidden')
    });
    const firstPainter = firstPanel.querySelector('.painters-list__painter');
    if (firstPainter) {
      firstPainter.classList.add('active-painter');
    }

    function togglePanels(eventTarget){
      const activeAccordeonItem = accordion.querySelector('.accordeon-active');
      if (activeAccordeonItem) {
        if (activeAccordeonItem === eventTarget.parentNode) {
          hideAccordeonItem(accordion)
        } else {
          hideAccordeonItem(accordion);
          showAccordeonItem(eventTarget)
        }
      } else {
        showAccordeonItem(eventTarget)
      }
    }

    // клавиатура

    accordion.addEventListener('keydown', function(event) {
      const eventTab = event.target.parentNode;
      if (event.target.classList.contains('accordeon__heading-wrap')) {
        if ((event.keyCode === 13) || (event.keyCode === 32)) {
          event.preventDefault();
          togglePanels(event.target)
        }
        if ((event.keyCode === 38) && (eventTab.previousElementSibling !== null)) {
          event.preventDefault();
          eventTab.previousElementSibling.firstElementChild.focus()
        }
        if ((event.keyCode === 40) && (eventTab.nextElementSibling !== null)) {
          event.preventDefault();
          eventTab.nextElementSibling.firstElementChild.focus()
        }
        if ((event.keyCode === 9) && !eventTab.classList.contains('accordeon-active')) {
          event.preventDefault();
          document.querySelector('.events a').focus();
        }
      }
    });

    accordion.addEventListener('click', (event) => {
      if (event.target.classList.contains('accordeon__heading-wrap')) {
        togglePanels(event.target)
      }
    });
  }

  function showAccordeonItem(accordeonControl) {
    accordeonControl.parentNode.classList.add('accordeon-active');
    accordeonControl.parentNode.setAttribute('aria-expanded', true);
    const panel = accordeonControl.nextElementSibling;
    panel.classList.remove('panel-closed');
    panel.setAttribute('aria-hidden', false);
    panel.classList.add('panel-opened');
    panel.querySelectorAll('.link').forEach(function(btn) {
      btn.classList.remove('visibility-hidden')
    });
    const scrollHeight = panel.firstElementChild.scrollHeight;

    const heightFraction =  scrollHeight / 30;

    let currentHight = 0;
    let timer = setInterval(() => {
      currentHight = currentHight + heightFraction;
      panel.style.maxHeight = currentHight + "px";
        if (currentHight > scrollHeight) {
          clearInterval(timer);
        };
    }, 1);
  }

  function hideAccordeonItem(accordion) {
    const activeHeader = accordion.querySelector('.accordeon-active');
    if (activeHeader) {
      const activePanel = activeHeader.lastElementChild;
      const activeLinks = activePanel.querySelectorAll('.link');
      setTimeout(() => {
        activeLinks.forEach(function (btn) {
          btn.classList.add('visibility-hidden');
        });
      }, 400);
      activePanel.classList.remove('panel-opened');
      activePanel.classList.add('panel-closed');
      activeHeader.setAttribute('aria-expanded', false);
      activePanel.setAttribute('aria-hidden', true);
      activePanel.style.maxHeight = null;
      activeHeader.classList.remove('accordeon-active');
    }
  }

  // табы внутри аккордеона художников
  paintersTabs();

  const artStylesList = document.querySelector('.art-styles-list');
  const paintings = document.querySelectorAll('.painter');

  paintings.forEach(function (panel) {
    panel.classList.add('display-none');
    panel.setAttribute('aria-hidden', true);
  });

  paintings[0].classList.remove('display-none');
  paintings[0].classList.add('panel-opened');
  paintings[0].setAttribute('aria-hidden', false);

  function hidePainterInfo(currentPaint, countriesSwitchedFlag = false) {
    if (!countriesSwitchedFlag) {  //защита на случай, когда переключаются страны, а не закладки. Тогда менять подсветку художников нельзя.
      document.querySelector('.active-accordeon .active-painter').classList.remove('active-painter'); // художник аккордеона, карточка которого показывалась до ивента
    }
    currentPaint.classList.remove('panel-opened');
    currentPaint.setAttribute('aria-hidden', true);
    currentPaint.classList.add('display-none');
  }

  function showPainterInfo(targetPaint, targetPainter) {
    targetPaint.classList.remove('display-none');
    setTimeout(() => {
      targetPaint.classList.add('panel-opened');
      targetPaint.setAttribute('aria-hidden', false);
      if (targetPainter) {
        targetPainter.classList.add('active-painter');//защита на случай, когда переключаются страны, а не закладки. Тогда менять подсветку художников нельзя.
      }
      const activePainting = document.querySelector('.tabs-content__pictures-block .panel-opened');
      accordeonsContainer.style.minHeight = activePainting.scrollHeight + "px"; //это на случай, когда высота аккордеона оказывается меньше блока о выбранном художнике
    }, 10);
  }

  function showTargetCountryPainterInfo(activeAccordeon) {
    let path = activeAccordeon.querySelector('.active-painter').dataset.path;
    const targetPaint = document.querySelector(`[data-target="${path}"]`);
    const currentPaint = document.querySelector('.painter.panel-opened');
    hidePainterInfo(currentPaint, true);
    showPainterInfo(targetPaint);
  }

  function paintersTabs(){
    document.querySelector('.tabs-content').addEventListener('click', (e) => {
      if (e.target.classList.contains('painters-list__painter')){
        const currentPaint = document.querySelector('.painter.panel-opened');
        const currentPainter = document.querySelector('.active-accordeon .active-painter');
        const path = e.target.dataset.path;
        if (e.target !== currentPainter) {
          hidePainterInfo(currentPaint);
          const targetPaint = document.querySelector(`[data-target="${path}"]`);
          showPainterInfo(targetPaint, e.target);
        }
        if (window.innerWidth < 1024) {
          document.getElementById('pictureblock').scrollIntoView(
            {
              behavior: 'smooth',
              block: 'start',
            }
          );
        }
      }
    })
  }

  // переключение художников по клику на ссылки нижнего хэдэра

  artStylesList.addEventListener('click', (event) => {

    if (event.target.classList.contains('artists-list__link')) {

      const targetPainterName = event.target.dataset.painter;
      const targetPainter = document.querySelector(`#${targetPainterName}`);
      const currentPainter = document.querySelector('.active-accordeon .active-painter');

      if (targetPainter !== currentPainter) {

        const targetPaint = document.querySelector(`[data-target="${targetPainter.dataset.path}"]`);
        const currentPaint = document.querySelector('.painter.panel-opened');

        flag = checkFlag(targetPainterName);
        const targetAccordeon = document.querySelector(`.accordeon[data-target="${flag.targetNation}"]`);
        const localCurrentPainter = targetAccordeon.querySelector('.active-painter');
        const currentPanel = localCurrentPainter.parentNode.parentNode;
        const targetPanel = targetPainter.parentNode.parentNode;
        const targetItem = targetPanel.parentNode.parentNode.firstElementChild;

        if (flag.isChanged) {
          const targetBtn = document.querySelector(`.tabs__btn[data-path="${flag.targetNation}"]`);
          const targetAccordeonActivePainter = targetAccordeon.querySelector('.active-painter');

          switchNationTab(targetBtn);
          targetAccordeonActivePainter.classList.remove('active-painter');
          targetPainter.classList.add('active-painter');
          hideAccordeonItem(targetAccordeon);
          setTimeout(() => {
            showAccordeonItem(targetItem)
          }, 400);
        } else {
          if (currentPanel !== targetPanel) {
            hideAccordeonItem(targetAccordeon);
            showAccordeonItem(targetItem)
          }
          hidePainterInfo(currentPaint);
          showPainterInfo(targetPaint, targetPainter);
        }
      }
    }
  });

  function checkFlag(targetPainterName) {
    let targetNation = undefined;
    accordeons.forEach(function (node) {
      if (node.querySelector(`#${targetPainterName}`)) {
        targetNation = node.dataset.target;
      }
    });
    const currentNation = document.querySelector('.accordeon.active-accordeon').dataset.target;
    if (targetNation === currentNation) {
      return {isChanged: false, targetNation}
    } else{
      return {isChanged: true, targetNation}
    }
  }

  // адаптация открытых панелей под изменение экрана

  window.addEventListener('resize', () => {
    const openedPanels = document.querySelectorAll('.accordeon__panel.panel-opened');
    openedPanels.forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });
})

