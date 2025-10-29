/****************************************************
 *
 * ?         smooth scrll lenis
 *
 ****************************************************/

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1,
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ✅ Tell ScrollTrigger to update on smooth scroll
lenis.on("scroll", ScrollTrigger.update);

/****************************************************
 *
 * ?         CLIENTS TESTIMONIAL
 *
 ****************************************************/

// document.addEventListener("DOMContentLoaded", function () {
//   const sliderEl = document.querySelector("#testimonial-slider");
//   if (!sliderEl) return; // safety check

//   const splide = new Splide(sliderEl, {
//     type: "loop",
//     perPage: 3,
//     focus: "center",
//     autoplay: true,
//     interval: 3500,
//     speed: 800,
//     easing: "ease-in-out",
//     gap: "2rem",
//     padding: { left: "10%", right: "10%" },
//     pagination: false,
//     arrows: false,

//     breakpoints: {
//       1240: {
//         perPage: 2,
//         gap: "1.5rem",
//         padding: { left: "5%", right: "5%" },
//       },
//       992: {
//         perPage: 2,
//         focus: 0,
//         padding: { left: "3%", right: "3%" },
//       },
//       768: {
//         perPage: 1,
//         gap: "1rem",
//         focus: 0,
//         padding: { left: "2%", right: "2%" },
//       },
//     },
//   });

//   // Mount safely
//   splide.mount();

//   // ✅ Custom navigation
//   const prevBtn = document.querySelector(".custom-prev");
//   const nextBtn = document.querySelector(".custom-next");

//   if (prevBtn) prevBtn.addEventListener("click", () => splide.go("<"));
//   if (nextBtn) nextBtn.addEventListener("click", () => splide.go(">"));

//   // ✅ Custom pagination with active state
//   const paginationImgs = document.querySelectorAll(".custom-pagination img");

//   splide.on("mounted move", function () {
//     const currentIndex = splide.index % splide.length;
//     paginationImgs.forEach((img, i) => {
//       img.classList.toggle("active", i === currentIndex);
//     });
//   });

//   paginationImgs.forEach((img) => {
//     img.addEventListener("click", () => {
//       const index = parseInt(img.dataset.slide);
//       splide.go(index);
//     });
//   });
// });


// ✅ Corrected version
document.addEventListener("DOMContentLoaded", function () {
  const sliderEl = document.querySelector("#testimonial-slider");
  const paginationContainer = document.querySelector(".custom-pagination");
  if (!sliderEl || !paginationContainer) return;

  const splide = new Splide(sliderEl, {
    type: "loop",
    perPage: 3,
    focus: "center",
    autoplay: true,
    interval: 3500,
    speed: 800,
    easing: "ease-in-out",
    gap: "2rem",
    padding: { left: "10%", right: "10%" },
    pagination: false,
    arrows: false,
    breakpoints: {
      1240: { perPage: 2, gap: "1.5rem", padding: { left: "5%", right: "5%" } },
      992: { perPage: 2, focus: 0, padding: { left: "3%", right: "3%" } },
      768: { perPage: 1, gap: "1rem", focus: 0, padding: { left: "2%", right: "2%" } },
    },
  });

  splide.mount();

  const prevBtn = document.querySelector(".custom-prev");
  const nextBtn = document.querySelector(".custom-next");
  if (prevBtn) prevBtn.addEventListener("click", () => splide.go("<"));
  if (nextBtn) nextBtn.addEventListener("click", () => splide.go(">"));

  // ✅ Get only NON-clone slides
  const slides = splide.Components.Slides.get().filter(s => !s.isClone);

  const uniqueSrcs = slides.map(slide => {
    const img = slide.slide.querySelector(".testimonial-author img");
    return img ? img.src : null;
  }).filter(Boolean);

  // Debug count
  console.log("Original slides:", uniqueSrcs.length);

  // ✅ Build pagination dynamically
  paginationContainer.innerHTML = "";
  uniqueSrcs.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.slide = i;
    if (i === 0) img.classList.add("active");
    paginationContainer.appendChild(img);
  });

  const paginationImgs = paginationContainer.querySelectorAll("img");

  splide.on("mounted move", function () {
    const currentIndex = splide.index % uniqueSrcs.length;
    paginationImgs.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
  });

  paginationImgs.forEach((img) => {
    img.addEventListener("click", () => {
      const index = parseInt(img.dataset.slide);
      splide.go(index);
    });
  });
});


/****************************************************
 *
 * ?         services slider
 *
 ****************************************************/

const swiper = new Swiper(".services__slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 800, // 👈 custom slide speed (800ms). You can use 300–1500
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1200: { slidesPerView: 4 },
    992: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    480: { slidesPerView: 1 },
  },
});


/****************************************************
 *
 * ?         WORK ACCORDION TAB 
 *
 ****************************************************/

gsap.registerPlugin(ScrollTrigger);

gsap.to(".work__accordion__image", {
  width: "100%",
  // opacity: 1,
  scale: 1,
  ease: "power3.out",
  duration: 1.5,
  scrollTrigger: {
    trigger: ".work__accordion__image",
    start: "top 85%",
    end: "center 50%",
    scrub: false, // smooth timed animation (not linked to scroll)
    // markers: true, // enable for debug
  },
});



Fancybox.bind("[data-fancybox='gallery']", {
  Thumbs: false,
  Toolbar: {
    display: [
      { id: "counter", position: "center" },
      "close",
    ],
  },
});
