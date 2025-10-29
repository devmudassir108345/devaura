document.addEventListener("DOMContentLoaded", () => {
  //* /****************************************************
  //  *
  //  * !         HEADER NAVIGATIONS
  //  *
  //  ****************************************************/

  function initNavigationMenu() {
    const dropdownsAll = document.querySelectorAll(
      ".dropdown > a, .sub-dropdown > a"
    );
    const headerNav = document.querySelector(".header__nav");
    const menuBtn = document.querySelector(".header__menu");
    const closeBtn = document.querySelector(".header__close");

    if (!headerNav || !menuBtn || !closeBtn) return; // skip if not found

    const openSideBar = () => headerNav.classList.remove("header__nav-hidden");
    const closeSideBar = () => headerNav.classList.add("header__nav-hidden");

    menuBtn.addEventListener("click", openSideBar);
    closeBtn.addEventListener("click", closeSideBar);

    function appendArrow(link) {
      const arrow = document.createElement("i");
      arrow.classList.add("fa-solid", "fa-chevron-down");
      link.appendChild(arrow);
    }

    function toggleMenu(link) {
      link.parentElement.classList.toggle("active");
    }

    dropdownsAll.forEach((link) => {
      appendArrow(link);
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (link.parentElement.classList.contains("sub-dropdown"))
          e.stopPropagation();
        toggleMenu(link);
      });
    });
  }
  //* /****************************************************
  //  *
  //  * !         CUSTOM TOOLTIP CURSOR
  //  *
  //  ****************************************************/
  function initTooltipCursor() {
    const btns = document.querySelectorAll("a");
    if (!btns.length) return;

    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    document.body.appendChild(tooltip);

    let mouseX = 0,
      mouseY = 0,
      currentX = 0,
      currentY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      tooltip.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });

    btns.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "scale(0)";
      });
      btn.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "scale(1)";
      });
    });

    function animateTooltip() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      tooltip.style.left = `${currentX}px`;
      tooltip.style.top = `${currentY}px`;
      requestAnimationFrame(animateTooltip);
    }
    animateTooltip();
  }

  //* /****************************************************
  //  *
  //  *!         WORK ACCORDION
  //  *
  //  ****************************************************/
  function initWorkAccordion() {
    const accordionItems = document.querySelectorAll(".work__accordion__item");
    const imgElement = document.getElementById("work__accordion-img");
    if (!accordionItems.length || !imgElement) return;

    accordionItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) return;
        accordionItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        const newImg = item.getAttribute("data-img");
        imgElement.classList.remove("active");

        setTimeout(() => {
          imgElement.src = newImg;
          imgElement.classList.add("active");
        }, 400);
      });
    });
  }
  //* /****************************************************
  //  *
  //  * !       CUSTIOM  COMMON ALLS ACCODIONS
  //  *
  //  ****************************************************/
  function initAccordions() {
    const accordions = document.querySelectorAll(".accordion");
    if (!accordions.length) return;

    accordions.forEach((scope) => {
      const items = scope.querySelectorAll(".accordion-item");
      if (!items.length) return;

      items.forEach((item) => {
        const content = item.querySelector(".accordion-content");
        const inner = item.querySelector(".accordion-inner");
        const arrow = item.querySelector(".accordion-arrow");
        if (item.classList.contains("active")) {
          content.style.height = inner.scrollHeight + "px";
          arrow?.classList.add("rotate");
        } else content.style.height = 0;
      });

      scope.addEventListener("click", (e) => {
        const header = e.target.closest(".accordion-header");
        if (!header) return;
        const item = header.closest(".accordion-item");
        const content = item.querySelector(".accordion-content");
        const inner = item.querySelector(".accordion-inner");
        const arrow = item.querySelector(".accordion-arrow");
        const isOpen = item.classList.contains("active");

        items.forEach((i) => {
          i.classList.remove("active");
          i.querySelector(".accordion-content").style.height = 0;
          i.querySelector(".accordion-arrow")?.classList.remove("rotate");
        });

        if (!isOpen) {
          item.classList.add("active");
          arrow?.classList.add("rotate");
          content.style.height = inner.scrollHeight + "px";
        }
      });

      window.addEventListener("resize", () => {
        items.forEach((item) => {
          if (item.classList.contains("active")) {
            const content = item.querySelector(".accordion-content");
            const inner = item.querySelector(".accordion-inner");
            content.style.height = inner.scrollHeight + "px";
          }
        });
      });
    });
  }

  //* /****************************************************
  //  *
  //  * !        AUTO SCROLL TEXT ANIMATION (GSAP)
  //  *
  //  ****************************************************/
  function initScrollingText() {
    if (typeof gsap === "undefined" || !document.querySelector(".rail")) return;
    gsap.registerPlugin(ScrollTrigger);

    const rail = document.querySelector(".rail");
    const clone = rail.cloneNode(true);
    rail.parentElement.appendChild(clone);

    function setRailMargin() {
      const margin = window.innerWidth < 767 ? "40px" : "100px";
      gsap.set(".rail h1", { marginRight: margin });
    }

    setRailMargin();
    window.addEventListener("resize", setRailMargin);

    const scrollingText = gsap.utils.toArray(".rail h1");
    const tl = horizontalLoop(scrollingText, {
      repeat: -1,
      speed: 1,
      paddingRight: 150,
    });

    let speedTween;
    ScrollTrigger.create({
      trigger: ".scrolling-text",
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        speedTween && speedTween.kill();
        speedTween = gsap
          .timeline()
          .to(tl, { timeScale: 3 * self.direction, duration: 0.25 })
          .to(tl, { timeScale: 1 * self.direction, duration: 1.5 }, "+=0.5");
      },
    });

    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;

      gsap.set(items, {
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });

      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);

      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }

      tl.progress(1, true).progress(0, true);
      return tl;
    }
  }

  //* /****************************************************
  //  *
  //  * !         VIDEO POPUP GALLERY
  //  *
  //  ****************************************************/
  function initVideoPopup() {
    const btns = document.querySelectorAll(".video__play-btn");
    if (!btns.length || typeof Fancybox === "undefined") return;

    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const videoUrl = this.getAttribute("data-src");
        if (videoUrl) {
          Fancybox.show([{ src: videoUrl, type: "video" }], {
            Toolbar: true,
            smallBtn: false,
            video: { autoStart: true },
            Keyboard: { Escape: "close" },
          });
        }
      });
    });
  }

  //* /****************************************************
  //  *
  //  * !         DYNAMIC HEADINGS
  //  *
  //  ****************************************************/
  function initDynamicHeading() {
    const sections = document.querySelectorAll(".data__title");
    const heading = document.getElementById("dynamic-heading");
    if (!sections.length || !heading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heading.textContent = entry.target.getAttribute("data-title");
          }
        });
      },
      { rootMargin: "-40% 0px -30% 0px", threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  //* /****************************************************
  //  *
  //  * !          TABS FILTER MOMMENTS
  //  *
  //  ****************************************************/

  function initTabsFilter() {
    const tabs = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");
    const underline = document.querySelector(".tab-underline");
    if (!tabs.length || !underline) return;

    function moveUnderline(activeTab) {
      const { left, width } = activeTab.getBoundingClientRect();
      const parentLeft = activeTab.parentElement.getBoundingClientRect().left;
      underline.style.width = `${width}px`;
      underline.style.left = `${left - parentLeft}px`;
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.tab;
        panes.forEach((pane) => pane.classList.remove("active"));
        document.getElementById(target)?.classList.add("active");
        moveUnderline(tab);
      });
    });

    window.addEventListener("load", () => {
      const active = document.querySelector(".tab-btn.active");
      if (active) moveUnderline(active);
    });
  }

  //* /****************************************************
  //  *
  //  * !         CUSTOM SCROLL COUNTER
  //  *
  //  ****************************************************/





  function initScrollCounter(containerSelector = ".counter", countSelector = ".count") {
  if (!$(containerSelector).length) return;

  // helper: run animation for one container
  function animateCounts($container) {
    $container.find(countSelector).each(function () {
      const $this = $(this);
      const countTo = parseInt($this.attr("data-count")) || 0;
      $({ countNum: 0 }).animate(
        { countNum: countTo },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    $container.data("counted", true);
  }

  // helper: is element visible in viewport (partial visibility counts)
  function isVisible($el) {
    const top = $el.offset().top;
    const bottom = top + $el.outerHeight();
    const viewTop = $(window).scrollTop();
    const viewBottom = viewTop + window.innerHeight;
    return bottom > viewTop && top < viewBottom;
  }

  // Initial check (page load). This ensures hero section (if visible) starts immediately.
  $(containerSelector).each(function () {
    const $c = $(this);
    if ($c.data("counted")) return;
    // If already visible -> animate
    if (isVisible($c)) {
      animateCounts($c);
    } else {
      // Extra safety: if user is at very top (scrollTop === 0) and this container is the top-most section
      // treat it as visible so hero always starts even if sticky header hides a bit.
      if ($(window).scrollTop() === 0) {
        const topOffset = $c.offset().top;
        // if container is within the first viewport height (i.e., near top), start it
        if (topOffset <= window.innerHeight * 0.9) {
          animateCounts($c);
        }
      }
    }
  });

  // On scroll: animate containers as they enter view
  $(window).on("scroll.counter", function () {
    $(containerSelector).each(function () {
      const $c = $(this);
      if ($c.data("counted")) return;
      if (isVisible($c)) {
        animateCounts($c);
      }
    });

    // if all counted, remove listener
    const remaining = $(containerSelector).filter(function () {
      return !$(this).data("counted");
    }).length;
    if (remaining === 0) {
      $(window).off("scroll.counter");
    }
  });
}


  //* /****************************************************
  //  *
  //  * !         SCROLL OBSERVER FADEIN
  //  *
  //  ****************************************************/

  // Select all sections
  const sections = document.querySelectorAll(".fade-section");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active"); // Add fadeIn class
          observer.unobserve(entry.target); // Optional: observe only once
        }
      });
    },
    { threshold: 0.2 }
  ); // 10% of section visible

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });

  // !/****************************************************
  //  !
  //  !           FUNTION CALL BACKS
  //  !
  //!  ****************************************************/

  initNavigationMenu();
  initTooltipCursor();

  initWorkAccordion();
  initAccordions();
  initScrollingText();
  initVideoPopup();
  initDynamicHeading();
  initTabsFilter();
  $(document).ready(function () {
    initScrollCounter(".counter", ".count");
  });

  console.clear();
});



