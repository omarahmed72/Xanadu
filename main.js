// 1. Initialize AOS Animations
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// 2. Animated Number Counters
const counters = document.querySelectorAll(".counter-num");
const speed = 200;

const startCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const counterSection = document.querySelector(".counter-box");
if (counterSection) {
  observer.observe(counterSection);
}

// 3. Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 4. Initialize Swiper for Hero Section (بناءً على طلبك ومطابق للفيديو)
new Swiper(".heroSwiper", {
  loop: true, // تكرار لا نهائي
  grabCursor: true, // يظهر مؤشر السحب باليد
  speed: 1000, // سرعة حركة الشريحة
  autoplay: {
    delay: 6000, // التحول التلقائي كل 6 ثوانٍ ليتناسب مع وقت الانيميشن
    disableOnInteraction: false, // الاستمرار في اللف حتى بعد سحب المستخدم
  },
  navigation: {
    nextEl: ".heroSwiper .swiper-button-next",
    prevEl: ".heroSwiper .swiper-button-prev",
  },
});

// 5. Initialize Swiper for Clients Section
new Swiper(".clientsSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  speed: 1500,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    576: { slidesPerView: 3, spaceBetween: 40 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    992: { slidesPerView: 5, spaceBetween: 50 },
  },
});

// 6. Initialize Swiper for Testimonial Content
new Swiper(".testimonialSwiper", {
  loop: true,
  grabCursor: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".testimonialSwiper .swiper-pagination",
    clickable: true,
  },
});

// 7. Initialize Swiper for Services Section (Mobile Only)
new Swiper(".servicesSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".servicesSwiper .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      enabled: false,
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});

// 8. Initialize Swiper for Events Section (Mobile Only dynamically)
let eventsSwiperInstance = null;

function toggleEventsSwiper() {
  const isMobile = window.innerWidth < 768;
  const wrapperDiv = document.querySelector(".events-swiper-wrapper");
  if (!wrapperDiv) return;

  const rowDiv = wrapperDiv.querySelector("#events-row");
  if (!rowDiv) return;

  const cards = rowDiv.querySelectorAll(".col-lg-4");

  if (isMobile) {
    if (!eventsSwiperInstance) {
      wrapperDiv.classList.add("swiper", "eventsSwiper");
      rowDiv.classList.add("swiper-wrapper");
      rowDiv.classList.remove("row", "g-4");

      cards.forEach((card) => card.classList.add("swiper-slide"));

      let pagination = wrapperDiv.querySelector(".eventsSwiper-pagination");
      if (!pagination) {
        pagination = document.createElement("div");
        pagination.className =
          "swiper-pagination eventsSwiper-pagination mt-4 position-relative";
        wrapperDiv.appendChild(pagination);
      }

      eventsSwiperInstance = new Swiper(".eventsSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".eventsSwiper-pagination",
          clickable: true,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    }
  } else {
    if (eventsSwiperInstance) {
      eventsSwiperInstance.destroy(true, true);
      eventsSwiperInstance = null;

      wrapperDiv.classList.remove("swiper", "eventsSwiper");
      rowDiv.classList.remove("swiper-wrapper");
      rowDiv.classList.add("row", "g-4");

      cards.forEach((card) => card.classList.remove("swiper-slide"));

      const pagination = wrapperDiv.querySelector(".eventsSwiper-pagination");
      if (pagination) {
        pagination.remove();
      }
    }
  }
}
// Pass Conference Title via URL Parameter
document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtns = document.querySelectorAll(".btn-read-more");
  readMoreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const cardBody = btn.closest(".card-body");
      const titleElement = cardBody.querySelector(".event-title");
      if (titleElement) {
        const title = titleElement.innerText.trim();
        const url = new URL(btn.href, window.location.href);
        url.searchParams.set("title", title);
        window.location.href = url.toString();
      } else {
        window.location.href = btn.href;
      }
    });
  });
});

window.addEventListener("load", toggleEventsSwiper);
window.addEventListener("resize", toggleEventsSwiper);
