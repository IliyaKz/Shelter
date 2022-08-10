const body = document.querySelector("body");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu-container");
const activeLink = document.querySelector(".link-active");
const sliderContent = document.querySelector(".slider-content");
const slider = document.querySelector(".slider");
const menuBackground = document.querySelector(".menu-background");
const nav = document.querySelector(".nav");
let arrStart = [];
arrStart = fullStartArr(arrStart);
let arrowLeft = document.querySelector(".left-arrow");
let arrowRight = document.querySelector(".right-arrow");
let popupBackground = document.querySelector(".popup-background");

function genRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function fullStartArr(arr) {
    while (arr.length < 3) {
       let item = genRand(0, 8);
       if (!arr.includes(item)) {
           arr.push(item);
       }
    }
    return arr;
}
function createRandArr(arr, stop) {
while (arr.length < 6) {
   let item = genRand(0, 8);
   if (!arr.includes(item)) {
       arr.push(item);
   }
}
arrStart = arr.splice(arr.length - stop);
return arrStart;
}
async function getPets() { 
    cleanSlider();
    let url = '../main/pets.json';
    let res = await fetch(url);
    let pets = await res.json();
    console.log(pets);
    if (sliderContent.innerHTML == '') {
        fullSlider(pets);
        addPopup(pets);
        showPopup()
    }
}
getPets()
function fullSlider(data) {
    let counterStop  = 0;
    if (window.screen.width < 768) {
        counterStop = 1;
    } else if (window.screen.width >= 768 && window.screen.width < 1280) {
        counterStop = 2;
    } else if (window.screen.width >= 1280) {
        counterStop = 3;
    } 
    arr = createRandArr(arrStart, counterStop);
    arr.forEach((item) => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-item');
        sliderItem.dataset.pet = `${data[item].name}`;
        const sliderImage = document.createElement('img');
        sliderImage.classList.add('slider-pet-image');
        sliderImage.src = `${data[item].img}`;
        sliderImage.alt = 'pet-image';
        sliderImage.width = '270';
        sliderImage.height= '270';
        const sliderName = document.createElement('p');
        sliderName.classList.add('slider-pet-name');
        sliderName.textContent = `${data[item].name}`;
        const sliderButton = document.createElement('button');
        sliderButton.classList.add('button-type2');
        sliderButton.classList.add('slider-pet-button');
        const sliderButtonText = document.createElement('p');
        sliderButtonText.textContent = 'Learn more';
        sliderContent.append(sliderItem);
        sliderItem.append(sliderImage);
        sliderItem.append(sliderName);
        sliderItem.append(sliderButton);
        sliderButton.append(sliderButtonText);
    })
}
function addPopup(data) {
    arrStart.forEach((item) => {
        const popupWrapper = document.createElement('div');
        popupWrapper.classList.add('popup-wrapper');
        popupWrapper.dataset.pet = `${data[item].name}`;
        const popupCloseButton = document.createElement('button');
        popupCloseButton.classList.add('popup-close-button');
        popupCloseButton.classList.add('button-type2');
        popupCloseButton.addEventListener('click', () => {
            popupBackground.classList.remove("active")
            body.classList.remove("no-scroll")
        })
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.addEventListener('click', function(event) {
            event.stopPropagation(); 
        })
        popup.addEventListener('mouseenter', (mouseenter) => {
            const closeButton = document.querySelectorAll(".popup-close-button");
            closeButton.forEach((item) => {
                item.classList.remove('hover')
            })
        })
        popup.addEventListener('mouseleave', (mouseleave) => {
            const closeButton = document.querySelectorAll(".popup-close-button");
            closeButton.forEach((item) => {
                item.classList.add('hover')
            })
        })
        const popupImg = document.createElement('img');
        popupImg.classList.add('popup-img');
        popupImg.src = `${data[item].img}`;
        popupImg.alt = 'pets-photo';
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        const popupHeader = document.createElement('div');
        popupHeader.classList.add('popup-header');
        const popupTitle = document.createElement('h3');
        popupTitle.classList.add('popup-title');
        popupTitle.textContent = `${data[item].name}`
        const popupSubtitle = document.createElement('h4');
        popupSubtitle.classList.add('popup-subtitle');
        popupSubtitle.textContent = `${data[item].type} - ${data[item].breed}`;
        const popupText = document.createElement('div');
        popupText.classList.add('popup-text');
        popupText.textContent = `${data[item].description}`;
        const popupList = document.createElement('ul');
        popupList.classList.add('popup-list');
        const popupListItem1 = document.createElement('li');
        popupListItem1.classList.add('popup-list-item');
        popupListItem1.innerHTML = `<b>Age:</b> ${data[item].age}`;
        const popupListItem2 = document.createElement('li');
        popupListItem2.classList.add('popup-list-item');
        popupListItem2.innerHTML = `<b>Inoculations:</b> ${data[item].inoculations.join(', ')}`;
        const popupListItem3 = document.createElement('li');
        popupListItem3.classList.add('popup-list-item');
        popupListItem3.innerHTML = `<b>Diseases:</b> ${data[item].diseases.join(', ')}`;
        const popupListItem4 = document.createElement('li');
        popupListItem4.classList.add('popup-list-item');
        popupListItem4.innerHTML = `<b>Parasites:</b> ${data[item].parasites.join(', ')}`;
        popupBackground.append(popupWrapper);
        popupWrapper.append(popupCloseButton);
        popupWrapper.append(popup);
        popup.append(popupImg);
        popup.append(popupContent);
        popupContent.append(popupHeader);
        popupContent.append(popupText);
        popupContent.append(popupList);
        popupHeader.append(popupTitle);
        popupHeader.append(popupSubtitle);
        popupList.append(popupListItem1);
        popupList.append(popupListItem2);
        popupList.append(popupListItem3);
        popupList.append(popupListItem4);
    })
}
function cleanSlider() {
    sliderContent.innerHTML = '';
    popupBackground.innerHTML = '';
}
function addLogo() {
    const burgerLogo = document.createElement('a');
    burgerLogo.href = 'https://rolling-scopes-school.github.io/iliyakz-JSFE2022Q1/shelter/pages/main/';
    burgerLogo.target = '_self';
    burgerLogo.classList.add('logo-burger');
    const burgerLogoTitle = document.createElement('h2');
    burgerLogoTitle.textContent = 'Cozy House';
    burgerLogoTitle.classList.add('title');
    const burgerLogoSubtitle = document.createElement('div');
    burgerLogoSubtitle.textContent = 'Shelter for pets in Boston';
    burgerLogoSubtitle.classList.add('subtitle');
    nav.prepend(burgerLogo);
    burgerLogo.append(burgerLogoTitle);
    burgerLogo.append(burgerLogoSubtitle);
}
function removeLogo() {
    const burgerLogo = document.querySelector('.logo-burger');
    burgerLogo.remove();
}
function showPopup() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const popupItems = document.querySelectorAll('.popup-wrapper');
    sliderItems.forEach((item) => {
        item.addEventListener('click', (click) => {
            popupBackground.classList.add('active');
            body.classList.toggle('no-scroll');
            const screenY = window.scrollY;
            popupBackground.style.top = `${screenY}px`
            popupItems.forEach((elem) => {
                if (click.target.closest('div').dataset.pet === elem.dataset.pet) {
                    elem.classList.add("active");
                }
            })
        })
    })
}
function animateSlider(firstClass, secondClass) {
    sliderContent.classList.add(`${firstClass}`);
    setTimeout(function() {
        sliderContent.style.transition = "0s";
        sliderContent.classList.remove(`${firstClass}`)
        sliderContent.classList.add(`${secondClass}`)
    }, 300)
    setTimeout(getPets, 400);
    setTimeout(function() {
        sliderContent.style.transition = "0.3s";
        sliderContent.classList.remove(`${secondClass}`)
    }, 400)
}

burger.addEventListener('click', () => {
    burger.classList.toggle('burger-active'); 
    menu.classList.toggle('menu-active');  
    body.classList.toggle('no-scroll')
    menuBackground.classList.toggle('active')
    if(document.querySelector(".logo-burger") == undefined) {
        addLogo();
    } else {
        removeLogo();
    }
})
menuBackground.addEventListener('click', () => {
    burger.classList.remove('burger-active'); 
    menu.classList.remove('menu-active');  
    body.classList.remove('no-scroll') 
    menuBackground.classList.remove('active')
    if(document.querySelector(".logo-burger") !== undefined) {
        removeLogo();
    }     
})
activeLink.addEventListener('click', (click) => {
        burger.classList.remove('burger-active'); 
        menu.classList.remove('menu-active');  
        body.classList.remove('no-scroll') 
        menuBackground.classList.remove('active')
        if(document.querySelector(".logo-burger") !== undefined) {
            removeLogo();
        }
})
arrowLeft.addEventListener('click', (click) => {
    animateSlider("slider-left", "slider-right");
})
arrowRight.addEventListener('click', (click) => {
    animateSlider("slider-right", "slider-left");
})
popupBackground.addEventListener('click', (click) => {
    const popupWrapper = document.querySelectorAll('.popup-wrapper');
    popupWrapper.forEach((item) => {
        item.classList.remove('active')
    })
    popupBackground.classList.remove("active")
    body.classList.remove("no-scroll")
})
popupBackground.addEventListener('mouseenter', (mouseenter) => {
    const closeButton = document.querySelectorAll(".popup-close-button");
    closeButton.forEach((item) => {
        item.classList.add('hover')
    })
})
popupBackground.addEventListener('mouseleave', (mouseleave) => {
    const closeButton = document.querySelectorAll(".popup-close-button");
    closeButton.forEach((item) => {
        item.classList.remove('hover')
    })
})
menu.addEventListener('click', (click) => {
    if (click.target.classList.contains('nav-link')) {
        burger.classList.remove('burger-active'); 
        menu.classList.remove('menu-active');  
        body.classList.remove('no-scroll');
        menuBackground.classList.remove('active')
        if(document.querySelector(".logo-burger") !== undefined) {
            removeLogo();
        }
    }
})
// window.addEventListener('resize', () => {
//     // let screenWidth = window.screen.width;
//         getPets();
//         // setTimeout(getPets(), 1000);
// })
