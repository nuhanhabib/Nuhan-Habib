// script.js
// mobile menu toggle + smooth scroll + active link highlight

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  
  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // smooth scroll is handled separately
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // offset for sticky navbar
        const offsetTop = target.offsetTop - 80; // 80px accounts for sticky header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        // update url hash without jumping
        history.pushState(null, null, href);
      }
    });
  });

  // Optional: highlight active section while scrolling (simple)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // offset
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      const linkHref = link.getAttribute('href').substring(1); // remove #
      if (linkHref === current) {
        link.classList.add('active-nav');
      }
    });
  });

  // small style addition for active link (can be in css too)
  const style = document.createElement('style');
  style.innerHTML = `
    .nav-link.active-nav {
      color: #2b7a8a;
      font-weight: 600;
    }
    .nav-link.active-nav::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
});
