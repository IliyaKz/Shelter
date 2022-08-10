const body = document.querySelector("body");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu-container");
const sliderContent = document.querySelector(".slider");
const menuBackground = document.querySelector(".menu-background");
let popupBackground = document.querySelector(".popup-background");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const twiceLeftArrow = document.querySelector(".twice-left-arrow");
const leftArrow = document.querySelector(".left-arrow");
const twiceRightArrow = document.querySelector(".twice-right-arrow");
const rightArrow = document.querySelector(".right-arrow");
const pageNumber = document.querySelector(".page-number");
let currentPageNumber = 1;
let counter = 0;
let indexArray = [0, 1, 2, 3, 4, 5, 6, 7];
let pagArray = [];
function calculateCounter(number) {
    if (window.screen.width < 768) {
        number = 3;
    } else if (window.screen.width >= 768 && window.screen.width < 1280) {
        number = 6;
    } else if (window.screen.width >= 1280) {
        number = 8;
    }
    return number
}
counter = calculateCounter(counter);

function createRandomArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}
function createPaginationArray(arr) {
    arr = createRandomArray(arr);
    arr = arr.concat(arr, arr, arr, arr, arr);
    for (let i = 0; i < arr.length; i += counter) {
        let part = arr.slice(i, i + counter);
        pagArray.push(createRandomArray(part));
    }
    pagArray = pagArray.flat();
    return pagArray;
}
createPaginationArray(indexArray)

async function getPets() { 
    cleanSlider();
    let url = '../pets/pets.json';
    let res = await fetch(url);
    let pets = await res.json();
    if (sliderContent.innerHTML == '') {
        addPets(pets);
        addPopup(pets);
        showPopup();
    }
}
getPets()
function addPets(data) {
    let array = [];
    for (let i = ((currentPageNumber - 1) * counter); i < (currentPageNumber * counter); i++) {
        array.push(pagArray[i])
    }
    array.forEach((item) => {
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
    let array = [];
    for (let i = ((currentPageNumber - 1) * counter); i < (currentPageNumber * counter); i++) {
        array.push(pagArray[i])
    }
    array.forEach((item) => {
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
function buttonInactive(firstButton, secondButton) {
        firstButton.classList.add('disable');
        firstButton.disabled = true;
        secondButton.classList.add('disable');
        secondButton.disabled = true;
}
function buttonActive(firstButton, secondButton) {
        firstButton.classList.remove('disable');
        firstButton.disabled = false;
        secondButton.classList.remove('disable');
        secondButton.disabled = false;
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
    body.classList.toggle('no-scroll');
    menuBackground.classList.toggle('active');
    header.classList.toggle('menu-open')
    if(document.querySelector(".logo-burger") == undefined) {
        addLogo();
    } else {
        removeLogo();
    }
})
menuBackground.addEventListener('click', () => {
    burger.classList.remove('burger-active'); 
    menu.classList.remove('menu-active');  
    body.classList.remove('no-scroll');  
    menuBackground.classList.remove('active')
    header.classList.remove('menu-open')
    if(document.querySelector(".logo-burger") !== undefined) {
        removeLogo();
    }
})
menu.addEventListener('click', (click) => {
    if (click.target.classList.contains('nav-link')) {
        burger.classList.remove('burger-active'); 
        menu.classList.remove('menu-active');  
        body.classList.remove('no-scroll');
        menuBackground.classList.remove('active')
        header.classList.remove('menu-open')
        if(document.querySelector(".logo-burger") !== undefined) {
            removeLogo();
        }
    }
})
rightArrow.addEventListener('click', (click) => {
    if (currentPageNumber < (48 / counter)) {
        buttonActive(twiceLeftArrow, leftArrow)
        currentPageNumber += 1;
        pageNumber.innerHTML = `<p>${currentPageNumber}</p>`;
        if (currentPageNumber === (48 / counter)) {
            buttonInactive(twiceRightArrow, rightArrow);
        }
        animateSlider("slider-right", "slider-left")
    }
})
twiceRightArrow.addEventListener('click', (click) => {
        buttonActive(twiceLeftArrow, leftArrow);
        currentPageNumber = (48 / counter);
        pageNumber.innerHTML = `<p>${currentPageNumber}</p>`;
        buttonInactive(twiceRightArrow, rightArrow)
        animateSlider("slider-right", "slider-left")
})
twiceLeftArrow.addEventListener('click', (click) => {
    buttonActive(twiceRightArrow, rightArrow);
    currentPageNumber = 1;
    pageNumber.innerHTML = `<p>${currentPageNumber}</p>`;
    buttonInactive(twiceLeftArrow, leftArrow)
    animateSlider("slider-left", "slider-right")
})
leftArrow.addEventListener('click', (click) => {
    if (currentPageNumber > 1) {
        buttonActive(twiceRightArrow, rightArrow);
        currentPageNumber -= 1;
        pageNumber.innerHTML = `<p>${currentPageNumber}</p>`;
        if (currentPageNumber === 1) {
            buttonInactive(twiceLeftArrow, leftArrow);
        }
        animateSlider("slider-left", "slider-right")
    }
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
