/****************************************************
 *
 * ✅ UNIVERSAL SAFETY WRAPPER
 *
 ****************************************************/
(function () {
  "use strict";

  // Helper to safely run optional sections
  function safeRun(callback) {
    try {
      callback();
    } catch (err) {
      console.warn("Optional block skipped:", err.message);
    }
  }

  /****************************************************
   *
   * ? SMOOTH SCROLL LENIS
   *
   ****************************************************/
  safeRun(function () {
    if (typeof Lenis === "undefined") return;
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

    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
    }
  });

  /****************************************************
   *
   * ? CLIENTS TESTIMONIAL (Splide)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof Splide === "undefined") return;
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
          1240: {
            perPage: 2,
            gap: "1.5rem",
            padding: { left: "5%", right: "5%" },
          },
          992: {
            perPage: 2,
            focus: 0,
            padding: { left: "3%", right: "3%" },
          },
          768: {
            perPage: 1,
            gap: "3rem",
            focus: 0,
            padding: { left: "2%", right: "2%" },
          },
        },
      });

      splide.mount();

      const prevBtn = document.querySelector(".custom-prev");
      const nextBtn = document.querySelector(".custom-next");
      if (prevBtn) prevBtn.addEventListener("click", () => splide.go("<"));
      if (nextBtn) nextBtn.addEventListener("click", () => splide.go(">"));

      const slides = splide.Components.Slides.get().filter((s) => !s.isClone);
      const uniqueSrcs = slides
        .map((slide) => slide.slide.querySelector(".testimonial-author img")?.src)
        .filter(Boolean);

      paginationContainer.innerHTML = "";
      uniqueSrcs.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.dataset.slide = i;
        if (i === 0) img.classList.add("active");
        paginationContainer.appendChild(img);
      });

      const paginationImgs = paginationContainer.querySelectorAll("img");

      splide.on("mounted move", () => {
        const currentIndex = splide.index % uniqueSrcs.length;
        paginationImgs.forEach((img, i) => {
          img.classList.toggle("active", i === currentIndex);
        });
      });

      paginationImgs.forEach((img) =>
        img.addEventListener("click", () =>
          splide.go(parseInt(img.dataset.slide))
        )
      );
    });
  });

  /****************************************************
   *
   * ? SERVICES SLIDER (Swiper)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof Swiper === "undefined") return;
    document.addEventListener("DOMContentLoaded", function () {
      const el = document.querySelector(".services__slider");
      if (!el) return;
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        pagination: { el: ".swiper-pagination", clickable: true },
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
    });
  });

  /****************************************************
   *
   * ? WORK ACCORDION TAB (GSAP)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;
    const target = document.querySelector(".work__accordion__image");
    if (!target) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(target, {
      width: "100%",
      scale: 1,
      ease: "power3.out",
      duration: 1.5,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        end: "center 50%",
        scrub: false,
      },
    });
  });

  /****************************************************
   *
   * ? IMG GALLERY (Fancybox)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof Fancybox === "undefined") return;
    Fancybox.bind("[data-fancybox='gallery']", {
      Thumbs: { autoStart: true },
      Toolbar: { display: ["zoom", "close"] },
      animationEffect: "zoom-in-out",
      transitionEffect: "fade",
    });
  });

  /****************************************************
   *
   * ? MIX GALLERY (IMG + VIDEO)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof Fancybox === "undefined") return;
    Fancybox.bind("[data-fancybox='mixGallery']", {
      Thumbs: { autoStart: true },
      Toolbar: { display: ["zoom", "close"] },
      animationEffect: "zoom-in-out",
      transitionEffect: "fade",
    });
  });

  /****************************************************
   *
   * ? HERO 4 ANIMATION (GSAP)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;
    const video = document.querySelector(".hero-4__video");
    if (!video) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.matchMedia().add("(min-width: 1200px)", () => {
      gsap.to(video, {
        xPercent: -45,
        scale: 1.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".hero-4",
          start: "top top",
          end: "bottom -100%",
          scrub: 1.5,
          pin: true,
        },
      });
    });
  });

  /****************************************************
   *
   * ? HERO 2 ANIMATION (GSAP)
   *
   ****************************************************/
  safeRun(function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;
    const video2 = document.querySelector(".hero__video-2");
    if (!video2) return;

    ScrollTrigger.matchMedia({
      "(min-width: 1400px)": function () {
        gsap.to(video2, {
          borderRadius: "10px",
          scale: 3.7,
          xPercent: -95,
          yPercent: 190,
          y: "-10%",
          scrollTrigger: {
            trigger: ".hero",
            start: "top -30%",
            end: "top -90%",
            scrub: 1,
          },
        });
      },
    });
  });
})();
