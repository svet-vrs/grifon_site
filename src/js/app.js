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
let character = document.getElementById("character");
let characterImg = document.getElementById("charimg");
let block1 = document.getElementById("house1");
let block2 = document.getElementById("car1");
let block3 = document.getElementById("house2");
let border = document.getElementById("border");
let button = document.getElementById("open_game"); 
let game = document.getElementById("game");
let game_menu = document.getElementById("game_menu");
let game_menu_btn = document.getElementById("game_menu_btn");
var counter = 0;
var charSpeed = 600;
var houseSpeed = 2;

button.addEventListener('click', function () {
    game.style.display = "flex";
    const gotoBlock = document.querySelector(".page__section_9");
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

});
function game_stop() {
    block1.style.animation = "none";
    block2.style.animation = "none";
    block3.style.animation = "none";
    characterImg.src = "/img/grifon_stop.png";
    border.style.backgroundImage = "url('/img/game_road_stop.jpg')";
    game_menu.style.display = "flex";
    document.getElementById("gameScore").innerHTML = "&nbsp;" + Math.floor(counter / 100);
    document.getElementById("scoreArea").style.display = "none";
}
function game_start() {
    game_menu.style.display = "none";
    switch_animation();
    counter = 0;
    document.getElementById("scoreArea").style.display = "flex";
    block1.style.animation = "goLeft " + houseSpeed + "s infinite linear";
    setTimeout(function () {
        block2.style.animation = "goLeft " + houseSpeed + "s infinite linear";
    }, 500);
    setTimeout(function () {
        block3.style.animation = "goLeft "+houseSpeed+"s infinite linear";
    }, 1100);
    characterImg.src = "/img/grifon.gif";
    border.style.backgroundImage = "url('/img/game_bg.gif')";
}
function switch_animation() {
    if (character.classList == "animate") { return }
    character.classList.add("animate");
    setTimeout(function () {
        character.classList.remove("animate");
    }, charSpeed);
}


// Пробел, стрелочка вверх, буква w
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 32 || event.keyCode == 38 || event.keyCode == 87) {
        if (border.classList == "game_run") {
            switch_animation();
        }
        else {
            game_start()
            border.classList.add("game_run");
        }
    }
});
// Для клика и мобилок
border.addEventListener('click', function () {
    if (border.classList == "game_run") {
        switch_animation();
    }
    else {
        game_start()
        border.classList.add("game_run");
    }
});
game_menu_btn.addEventListener('click', function () {
    game_start();
});


let check = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let block1Left = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
    let block2Left = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    let block3Left = parseInt(window.getComputedStyle(block3).getPropertyValue("left"));
    if (block1Left < 40 && block1Left > 0 && characterTop <= 150) {
        game_stop();
    }
    else if (block2Left <= -70 && block2Left >= -110 && characterTop <= 50) {
        game_stop();
    }
    else if (block3Left <= -204 && block3Left >= -232 && characterTop <= 150) {
        game_stop();
    }
    else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = "&nbsp;"+Math.floor(counter/100);
    }
}) 

// Кнопка наверх


function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('showbtn');
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove('showbtn');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}

var goTopBtn = document.getElementById('scrollupbutton');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);


//loader//

let loaderwrapper = document.querySelector('.loaderwrapper');

window.addEventListener('load', () => {
    loaderwrapper.classList.add('hide');
    setTimeout(() => {
        loaderwrapper.remove();
     },600)
});
