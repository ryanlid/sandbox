const photo = document.getElementById('photo');

const figcaption = document.getElementById('figcaption');
const gralleryList = document
  .getElementById('grallery')
  .getElementsByTagName('ul')[0];
const mask = document.getElementById('mask');
const listImg = gralleryList.getElementsByTagName('img');
const len = listImg.length;
let curImg = 0;
gralleryList.addEventListener(
  'click',
  function (e) {
    var target = e.target;
    console.log(target);
    if (target.nodeName !== 'IMG') {
      return;
    }

    mask.style.display = 'block';
    scrollTo(0, 0);
    photo.src = target.getAttribute('src');
    figcaption.innerHTML = target.getAttribute('title');
    for (let i = 0; i < len; i++) {
      // const element = array[i];
      if (listImg[i].src === photo.src) {
        curImg = i;
      }
    }
  },
  false
);

var btnClose = document.getElementsByClassName('mask-close')[0];
btnClose.addEventListener('click', close, false);
document.addEventListener('keydown', jumpPage, false);

// 上一页
const btnPrev = document.getElementsByClassName('mask-prev')[0];
btnPrev.addEventListener('click', prev, false);

// 下一页
const btnNext = document.getElementsByClassName('mask-next')[0];
btnNext.addEventListener('click', next, false);

function close() {
  mask.style.display = 'none';
}

function jumpPage() {
  console.log(event);
  if (event.keyCode === 37) {
    next();
  }
  if (event.keyCode === 39) {
    prev();
  }

  if (event.keyCode === 27) {
    close();
  }
}

function changePhoto() {
  photo.src = listImg[curImg].src;
  photo.setAttribute('title', listImg[curImg].title);
  figcaption.innerHTML = photo.getAttribute('title');
}

function prev() {
  if (curImg < 1) {
    curImg = len;
  }
  curImg--;
  changePhoto();
}

function next() {
  if (curImg + 1 >= len) {
    curImg = 0;
  }
  curImg++;
  changePhoto();
}
