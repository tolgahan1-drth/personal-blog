const darkModeBtn = document.getElementById("darkModeBtn");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const topBtn = document.getElementById("topBtn");
const progressBar = document.getElementById("progressBar");
const counters = document.querySelectorAll(".counter");
const faqItems = document.querySelectorAll(".faq-item");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
}

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const increment = Math.ceil(target / 60);

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target + "+";
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });

  countersStarted = true;
}

function checkCounters() {
  const statsSection = document.querySelector(".stats-section");

  if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
    startCounters();
  }
}

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
  revealElements();
  updateProgressBar();
  checkCounters();
});

revealElements();
updateProgressBar();
checkCounters();