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

  
// Слайдер

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
let button1 = document.getElementById("open_game1");
let game = document.getElementById("game");
let game_menu = document.getElementById("game_menu");
let game_menu_btn = document.getElementById("game_menu_btn");
let close_btn = document.getElementById("cross");
var counter = 0;
var charSpeed = 600;
var houseSpeed = 2.5;

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
button1.addEventListener("click", function () {
  game.style.display = "flex";
});

close_btn.addEventListener("click", function () {
    game_stop();
    game.style.display = "none";
  
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
    close_btn.style.display = "block";
}
function game_start() {
    game_menu.style.display = "none";
    switch_animation();
    counter = 0;
    document.getElementById("scoreArea").style.display = "flex";
    close_btn.style.display = "none";
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


// ------  Смена языка -------

const select = document.querySelector('select');
const allLang = ['en', 'ru', 'ua'];

const langArr = {
  // Заголовки секций
  title1: {
    ru: "Об агенстве",
    en: "About agency",
    ua: "Про агенство",
  },
  title2: {
    ru: "Наши партнеры",
    en: "Our partners",
    ua: "Наші партнери",
  },
  title3: {
    ru: "Чем мы занимаемся?",
    en: "What are we doing?",
    ua: "Що ми робимо?",
  },
  title4: {
    ru: "Наши актуальные объекти",
    en: "Our current objects",
    ua: "Наші актуальні об'єкти",
  },
  title5: {
    ru: "Как нас найти?",
    en: "How to find us?",
    ua: "Як нас знайти?",
  },
  title6: {
    ru: "<h1>Консультация по любому вопросу</h1><h1>Свяжитесь с нами</h1>",
    en: "<h1>Consultation on any issue</h1><h1>Contact us</h1>",
    ua: "<h1>Консультація з будь-якого питання</h1><h1>Зв'яжіться з нами</h1>",
  },
  title7: {
    ru: "Часто задаваемые вопросы",
    en: "Frequently asked Questions",
    ua: "Часто задавані питання",
  },
  title8: {
    ru: "Мини-игра",
    en: "Mini-game",
    ua: "Міні-гра",
  },
  title9: {
    ru: "Если вы не нашли ответ на свой вопрос, можете связаться с менеджером",
    en: "If you did not find the answer to your question, you can contact the manager",
    ua: "Якщо ви не знайшли відповіді на своє запитання, можете зв'язатися з менеджером",
  },
// Подзаголовки первой секции
  subtitle1: {
    ru: "Професиональная команда экспертов на рынке премиальных объектов",
    en: "A professional team of experts in the premium property market",
    ua: "Професійна команда експертів на ринку преміальних об'єктів",
  },
  subtitle2: {
    ru: "Эффективно продаем и сдаем в аренду объекты недвижимости",
    en: "Effectively sell and rent real estate",
    ua: "Ефективно продаємо та здаємо в оренду об'єкти нерухомості",
  },
  subtitle3: {
    ru: "Экономим ваше время в вопросах недвижимости",
    en: "We save your time in real estate matters",
    ua: "Заощаджуємо ваш час у питаннях нерухомості",
  },
  about: {
    ru: "<p>Агентство недвижимости Грифон – это современная, дружная, позитивная и опытная команда специалистов  - экспертов на рынке недвижимости Украины и мира.</p><p> Наша главная задача – стать для вас специалистом, который обеспечит решение Вашего вопроса!</p><p> Агентство находится в условиях постоянного обучения, профессионального и личностного роста, позволяет нам качественно, грамотно, работать на достижение результата. Для решения Вашего вопроса нам потребуется – определить Ваш запрос, и максимально точно удовлетворить Вашу потребность, и осуществить ее!</p><p>Наша стратегия – это дружелюбные отношения с нашим клиентом, желание эффективно помочь, и сэкономить Ваше время с целью минимизировать риски и ресурсы. </p><p>С помощью нашей команды Вы сможете полностью лишиться волнений и получить решение Вашей задачи.Вместо обещаний, мы выбираем реальные действия!</p>",
    en: "<p>Gryphon Real Estate Agency is a modern, friendly, positive and experienced team of specialists - experts in the real estate market of Ukraine and the world.</p><p> Our main task is to become a specialist for you who will provide a solution to your question!</p><p> The agency is in conditions of constant learning, professional and personal growth, which allows us to work efficiently, competently, to achieve results. To solve your issue, we will need to define your request, and meet your need as accurately as possible, and implement it!</p><p>Our strategy is friendly relations with our client, the desire to help effectively, and save your time in order to minimize risks and resources. </p><p>With the help of our team, you can completely lose your worries and get a solution to your problem. Instead of promises, we choose real actions!</p>",
    ua: "<p>Агентство нерухомості Грифон – це сучасна, дружня, позитивна та досвідчена команда фахівців - експертів на ринку нерухомості України та світу.</p><p> Наше головне завдання – стати для вас фахівцем, який забезпечить вирішення Вашого питання!</p><p> Агентство перебуває в умовах постійного навчання, професійного та особистісного зростання, дозволяє нам якісно, ​​грамотно, працювати на досягнення результату. Для вирішення Вашого питання нам потрібно буде – визначити Ваш запит, і максимально точно задовольнити Вашу потребу, і здійснити її! ризики та ресурси. </p><p>За допомогою нашої команди Ви зможете повністю позбутися хвилювань і отримати вирішення Вашого завдання. Замість обіцянок, ми обираємо реальні дії!</p>",
  },
// Форма обратной связи
  callformbtn:{
    ru: "Заказать звонок",
    en: "Request a call",
    ua: "Замовити дзвінок",
  },
  callform1:{
    ru: "Оформить заявку",
    en: "Make a request",
    ua: "Оформити заявку",
  },
  callform2:{
    ru: "Имя",
    en: "Name",
    ua: "Ім'я",
  },
  callform3:{
    ru: "Номер телефона",
    en: "Phone number",
    ua: "Номер телефону",
  },
  callform4:{
    ru: "Комментарий (Необязательно)",
    en: "Comment (Optional)",
    ua: "Коментар (Необов'язково)",
  },
  callform5:{
    ru: "Отправить",
    en: "Send",
    ua: "Надіслати",
  },
  


  // Элементы меню
  menu1: {
    ru: "Главная",
    en: "Main",
    ua: "Головна",
  },
  menu2: {
    ru: "Застройщики",
    en: "Developers",
    ua: "Забудовники",
  },
  menu3: {
    ru: "Наши услуги &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    en: "Our services &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    ua: "Наші послуги &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
  },
  menu4: {
    ru: "Продажа квартир",
    en: "Sale of apartments",
    ua: "Продаж квартир",
  },
  menu5: {
    ru: "Продажа домов",
    en: "Sales of houses",
    ua: "Продаж будинків",
  },
  menu6: {
    ru: "Продажа коммерческой недвижимости",
    en: "Sale of commercial real estate",
    ua: "Продаж комерційної нерухомості",
  },
  menu7: {
    ru: "Продажа земельных участков",
    en: "Sale of land",
    ua: "Продаж земельних ділянок",
  },
  menu8: {
    ru: "Бизнес под ключ",
    en: "Turnkey business",
    ua: "Бізнес під ключ",
  },
  menu9: {
    ru: "Инвестиционное предложение",
    en: "Investment proposal",
    ua: "Інвестиційна пропозиція",
  },
  menu10: {
    ru: "Контакты",
    en: "Contacts",
    ua: "Контакти",
  },
  menu11: {
    ru: "Полезная информация &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    en: "Useful information &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
      ua: "Корисна інформація &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
  },
  menu12: {
    ru: "Наши партнеры",
    en: "Our partners",
    ua: "Наші партнери",
  },
  menu13: {
    ru: "Наши актуальные объекты",
    en: "Our current objects",
    ua: "Наші актуальні об'єкти",
  },
  menu14: {
    ru: "Часто задаваемые вопросы",
    en: "Frequently asked Questions",
    ua: "Часто задавані питання",
  },
  menu15: {
    ru: "Мини-игра",
    en: "Mini game",
    ua: "Міні-гра",
  },
};

select.addEventListener('change', changeURLLanguage);

// Перенаправление на url с указанным языком
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#ru';
        location.reload();
    }
    select.value = hash;
    
    document.querySelector('.lng-callform2').placeholder = langArr['callform2'][hash];
    document.querySelector(".lng-callform3").placeholder = langArr["callform3"][hash];
    document.querySelector(".lng-callform4").placeholder = langArr["callform4"][hash];
    
    let except = document.querySelector(".lng-callform4");
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            if (elem != except) {
                elem.innerHTML = langArr[key][hash];
            } 
        }
    }
    console.log("Hello3");
}

changeLanguage();

