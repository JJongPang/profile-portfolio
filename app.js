'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height; //navbar height check

//Make Navbar transparent when it is on the top
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

document.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

//Navbar drop menu
const navbarDropMenu = document.querySelector('.navbar__toggle-btn');
navbarDropMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

//Show arrow up button
const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
        arrowUp.addEventListener('click', () => {
            scrollIntoView('#home');
        });
    } else {
        arrowUp.classList.remove('visible');
    }
});

//My work filter
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    //Remove selector
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    target.classList.add('active');

    projectContainer.classList.add('ani-out');

    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('ani-out');
    }, 300);
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}
