/* =============================================
   HARRY SHAH PORTFOLIO — script.js
   ============================================= */

"use strict";

/* ---- NAVBAR: scroll behaviour + active link ---- */
const navbar   = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateNavbar() {
  const scrolled = window.scrollY > 40;
  navbar.classList.toggle("scrolled", scrolled);
}

function updateActiveLink() {
  let current = "";
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", () => {
  updateNavbar();
  updateActiveLink();
}, { passive: true });

updateNavbar();
updateActiveLink();

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", open);
});

// Close menu when a link is clicked
mobileNav.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", e => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
  }
});

/* ---- SMOOTH SCROLL (extra insurance for older browsers) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Animate skill bars when skills section is visible
        if (entry.target.classList.contains("skill-card")) {
          const bar   = entry.target.querySelector(".skill-bar");
          const width = bar?.getAttribute("data-width");
          if (bar && width) {
            requestAnimationFrame(() => {
              bar.style.width = width + "%";
            });
          }
        }
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---- BACK TO TOP ---- */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---- CONTACT FORM VALIDATION ---- */
const form         = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError    = document.getElementById("nameError");
const emailError   = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess  = document.getElementById("formSuccess");

function clearError(input, errorEl) {
  input.classList.remove("error");
  errorEl.textContent = "";
}

function showError(input, errorEl, message) {
  input.classList.add("error");
  errorEl.textContent = message;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validateMessage(msg) {
  return msg.trim().length >= 10;
}

// Live validation on blur
nameInput.addEventListener("blur", () => {
  if (!validateName(nameInput.value)) {
    showError(nameInput, nameError, "Name must be at least 2 characters.");
  } else {
    clearError(nameInput, nameError);
  }
});

emailInput.addEventListener("blur", () => {
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
  } else {
    clearError(emailInput, emailError);
  }
});

messageInput.addEventListener("blur", () => {
  if (!validateMessage(messageInput.value)) {
    showError(messageInput, messageError, "Message must be at least 10 characters.");
  } else {
    clearError(messageInput, messageError);
  }
});

// Clear error on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  formSuccess.classList.remove("show");

  let valid = true;

  if (!validateName(nameInput.value)) {
    showError(nameInput, nameError, "Name must be at least 2 characters.");
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  if (!validateMessage(messageInput.value)) {
    showError(messageInput, messageError, "Message must be at least 10 characters.");
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (!valid) return;

  // Simulate submission (replace with real endpoint e.g. Formspree)
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    formSuccess.classList.add("show");
    setTimeout(() => formSuccess.classList.remove("show"), 5000);
  }, 1200);
});

/* ---- HERO PARALLAX (subtle) ---- */
const heroName = document.querySelector(".hero-name");
const heroGrid = document.querySelector(".hero-grid-lines");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (heroName && y < window.innerHeight) {
    heroName.style.transform = `translateY(${y * 0.08}px)`;
  }
  if (heroGrid && y < window.innerHeight) {
    heroGrid.style.transform = `translateY(${y * 0.04}px)`;
  }
}, { passive: true });
