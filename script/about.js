import { birdsData } from "./birds.js";

let birdsArray = birdsData.flat();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(birdsArray);

document.querySelector('.gallery__img').src = `${birdsArray[0].image}`;
document.querySelector('.gallery__birdname').innerHTML = `${birdsArray[0].name}`;
document.querySelector('.gallery__species').innerHTML = `${birdsArray[0].species}`;
document.querySelector('.gallery__source').src = `${birdsArray[0].audio}`;
document.querySelector('.gallery__description').innerHTML = `${birdsArray[0].description}`;

function animateGalleryImg() {
  document.querySelector('.gallery__img').classList.add('animation');
  setTimeout(function() {
    document.querySelector('.gallery__img').classList.remove('animation');
  }, 1000);
}

const playBtn = document.querySelector('.to-play__btn');
const vows = document.querySelectorAll('.vow');
const linkPlay = document.querySelector('.link__to-play');
let birdsLength = birdsArray.length;
const birdGallery = document.querySelector('.gallery__items');
birdGallery.innerHTML = '<li><a href="#0" title=""><img src="#0" class="items__mini-photo"></a></li>'.repeat(birdsLength);
const birdsItems = document.querySelectorAll('.gallery__items li');

birdsItems.forEach((items, i) => {
  birdsArray.forEach((birds, j) => {
    if (i === j) {
      items.innerHTML = `<a href="${birdsArray[j].image}" title="${birdsArray[j].name}"><img src="${birdsArray[j].image}" class="items__mini-photo"></a>`;
    }
  });
  birdsArray.forEach((birds, j) => {
    items.addEventListener('click', () => {
      if (i === j) {
        document.querySelector('.gallery__img').src = `${birdsArray[j].image}`;
        document.querySelector('.gallery__birdname').innerHTML = `${birdsArray[j].name}`;
        document.querySelector('.gallery__species').innerHTML = `${birdsArray[j].species}`;
        document.querySelector('.gallery__source').src = `${birdsArray[j].audio}`;
        document.querySelector('.gallery__description').innerHTML = `${birdsArray[j].description}`;
        animateGalleryImg();
      }
    });
  });
});

thumbs.onclick = function(event) {
  let thumbnail = event.target.closest('a');
  if (!thumbnail) return;
  showThumbnail(thumbnail.href, thumbnail.title);
  event.preventDefault();
}

function showThumbnail(href, title) {
  largeImg.src = href;
  largeImg.alt = title;
}

let count = 0;
vows.forEach((vow, i) => {
  vow.addEventListener('click', (e) => {
    if (vow.checked === true) {
      count += 1;
    } else {
      count -= 1;
    }
    if (count == 3) {
      playBtn.disabled = false;
    } else {
      playBtn.disabled = true;
    }
  });

  linkPlay.addEventListener('click', () => {
    if (playBtn.disabled) {
      playBtn.classList.add('to-play__btn-cramp');
    } else {
      linkPlay.href = 'pages/main.html';
    }
  });
  playBtn.addEventListener('animationend', AnimationHandler, false);

  function AnimationHandler () {
    playBtn.classList.remove('to-play__btn-cramp');
  }

  playBtn.addEventListener('click', () => {
    if (!playBtn.disabled) {
      window.location.href = 'pages/main.html';
    }
  });
});