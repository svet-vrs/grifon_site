import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

'use strict'

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile    .iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow')
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.parentElement.classList.toggle('_active')
            });
        }
    }
}
else {
    document.body.classList.add('_pc');
}

// Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// Прокрутка при клике

const menuLinks = document.querySelectorAll('a[data-goto]');
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}
var mobs = window.matchMedia("(max-width: 320px)");
var mobl = window.matchMedia("(max-width: 425px)");
var tablets = window.matchMedia("(max-width: 768px)");
var laptop = window.matchMedia("(max-width: 1024px)");

var slidesNum = 1;

if (mobs.matches) { // Если медиа запрос совпадает
    slidesNum = 1;
} 
else{
    if (mobl.matches) {
        slidesNum = 2;
    }
    else {
        if (tablets.matches) {
            slidesNum = 3;
        }
        else {
            if (laptop.matches) {
                slidesNum = 4;
            }
            else {
                slidesNum = 5;
            }
        }
    }
}

// Слайдер
new Swiper(".image-slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
        // dynamicBullets: true,
    },
    slidesPerView: slidesNum,
    // Управление клавиатурой
    keyboard: {
        // Включить\выключить
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    // Бесконечный слайдер
    loop: true,

    // Свободный режим
    freeMode: true,

    // Автопрокрутка

    autoplay: {
        // Пауза между прокруткой
        delay: 1000,
        // Закончить на последнем слайде
        stopOnLastSlide: true,
        // Отключить после ручного переключения
        disableOnInteraction: false
    },

    // Скорость
    speed: 1000,

    // Эффекты переключения слайдов.
    // Листание
    effect: 'slide',
});


// Модальное окно
MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-custom-open',
    closeTrigger: 'data-custom-close',
    openClass: 'is-open', // [5]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // [10]
})
   
// Спойлеры
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    for (let j = 0; j < acc.length; j++){
        if(acc[j] != this){
          acc[j].classList.remove("active");
          acc[j].nextElementSibling.style.maxHeight = null;
      }
    }
    let panel = this.nextElementSibling; 
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

document.onkeydown = function(e){
  var keyCode = e.keyCode || e.charCode;
  if (keyCode == 32) e.preventDefault();
};

// Игра динозаврик
let character = document.getElementById("character")
let block = document.getElementById("block")

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 32 || event.keyCode == 38 || event.keyCode == 87) {
        if (character.classList == "animate") { return }
        character.classList.add("animate");
        setTimeout(function () {
            character.classList.remove("animate");
        }, 1000);
    }
});

let check = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 152 && blockLeft > 30 && characterTop >= 510) {
        block.style.animation = "none";
        alert("Game over. Try again!");
        block.style.animation = "goLeft 3s infinite linear";
    }
}) 

