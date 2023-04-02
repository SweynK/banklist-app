'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////
///scroll btn

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///
//////////page navigation
///

//1. add event listener to common parent element
//2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  //matchin startegy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;
  //remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  //active classes
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
////////
//menu animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//////
//   sticky navigation
// const initialCoordinants = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoordinants.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
/////
////

const stickyNav = function (enteries) {
  const [entry] = enteries;
  entry.isIntersecting
    ? nav.classList.remove('sticky')
    : nav.classList.add('sticky');
};
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);

//////
//reveal sections

const revealSection = function (enteries, observer) {
  const [entry] = enteries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  treshold: 0.3,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////
/// laze images loading

const loadImg = function (enteries, observer) {
  const [entry] = enteries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshold: 0,
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

///////////////
///////
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'we use cookies for improved functionality and analytics';
// message.innerHTML =
//   'we use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// //
// const header = document.querySelector('.header');
// header.append(message);
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.remove();
// });

// message.style.backgroundColor = '#37383d';
// message.style.width = '100%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
