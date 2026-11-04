/* ============================================================
   SUDARSHAN THORAT — PORTFOLIO
   Lenis smooth scroll · TextPressure title · clip-path reveal
   ============================================================ */

(function () {
  "use strict";

  /* =========================================================
     YOUR LINKS — sirf yahan badlo, poori site me apne aap lag jayega.
     Khaali ("") chhoda to wo icon faded ho jayega, dead link nahi banega.
     ========================================================= */
  var LINKS = {
    github: "https://github.com/thoratsudarshan2004",
    instagram: "https://www.instagram.com/sudarshan_4679/",
    linkedin: "",
    twitter: ""
  };

  function applyLinks() {
    document.querySelectorAll("[data-social]").forEach(function (a) {
      var url = LINKS[a.getAttribute("data-social")];
      if (url) {
        a.setAttribute("href", url);
        a.classList.remove("is-unset");
      } else {
        a.removeAttribute("href");
        a.classList.add("is-unset");
        a.setAttribute("title", "Link abhi set nahi hai");
      }
    });
  }
  applyLinks();

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* If GSAP didn't load, show the plain page rather than a stuck preloader. */
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    var pre = document.getElementById("preloader");
    if (pre) pre.style.display = "none";
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    ["heroEyebrow", "heroLine", "seOverlay"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.opacity = 1;
    });
    document.querySelectorAll(".hero__eyebrow,.hero__desc,.hero__actions,.hero__scroll,.hero__line")
      .forEach(function (el) { el.style.opacity = 1; });
    var f = document.getElementById("seFrame");
    if (f) f.style.clipPath = "inset(0 0 round 0)";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------
     1. LENIS — the inertial scroll the reference uses
     --------------------------------------------------------- */
  var lenis = null;
  function initLenis() {
    var L = window.Lenis || (window.lenis && window.lenis.default);
    if (!L || reduced) return;
    lenis = new L({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    // handle for jumping the page around from the console / other scripts
    window.__lenis = lenis;
  }

  function scrollTo(target) {
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------------------------------------------------------
     2. TEXT PRESSURE
     Each letter's Roboto Flex wdth/wght axis responds to how
     close the pointer is. Font size is fitted to the container:
     fontSize = containerWidth / (letters / 2)
     --------------------------------------------------------- */
  function textPressure() {
    var container = document.getElementById("tpContainer");
    var title = document.getElementById("tpTitle");
    if (!container || !title) return;

    var chars = Array.prototype.slice.call(title.querySelectorAll("span"));
    if (!chars.length) return;

    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var cursor = { x: mouse.x, y: mouse.y };

    // Fit the title to its container. The container can still be 0-wide on the
    // first frame (fonts, hidden tab, late layout), so keep retrying until it
    // reports a real width.
    var fitTries = 0;
    function setSize() {
      var rect = container.getBoundingClientRect();
      if (!rect.width) {
        if (fitTries++ < 240) requestAnimationFrame(setSize);
        return;
      }
      fitTries = 0;
      var fs = rect.width / (chars.length / 2);
      title.style.fontSize = Math.max(fs, 24) + "px";
      title.style.lineHeight = "1";
    }

    setSize();
    window.addEventListener("resize", setSize);
    window.addEventListener("load", setSize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setSize);
    if (window.ResizeObserver) new ResizeObserver(setSize).observe(container);

    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("touchmove", function (e) {
      var t = e.touches[0];
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY; }
    }, { passive: true });

    function attr(distance, maxDist, minVal, maxVal) {
      var v = maxVal - Math.abs((maxVal * distance) / maxDist);
      return Math.max(minVal, v + minVal);
    }

    function frame() {
      cursor.x += (mouse.x - cursor.x) / 15;
      cursor.y += (mouse.y - cursor.y) / 15;

      var tRect = title.getBoundingClientRect();
      if (tRect.width) {
        var maxDist = tRect.width / 2;
        for (var i = 0; i < chars.length; i++) {
          var r = chars[i].getBoundingClientRect();
          var dx = cursor.x - (r.left + r.width / 2);
          var dy = cursor.y - (r.top + r.height / 2);
          var d = Math.sqrt(dx * dx + dy * dy);
          var wdth = Math.floor(attr(d, maxDist, 5, 200));
          var wght = Math.floor(attr(d, maxDist, 100, 900));
          chars[i].style.fontVariationSettings =
            '"wght" ' + wght + ', "wdth" ' + wdth + ', "ital" 0';
        }
      }
      requestAnimationFrame(frame);
    }
    if (!reduced) frame();
  }

  /* ---------------------------------------------------------
     3. DUST + GLOW
     --------------------------------------------------------- */
  function heroAtmosphere() {
    var wrap = document.getElementById("heroDust");
    var glow = document.getElementById("heroGlow");

    if (wrap) {
      var n = window.innerWidth < 700 ? 10 : 18;
      for (var i = 0; i < n; i++) {
        var d = document.createElement("i");
        var size = 1 + Math.random() * 2;
        d.style.width = size + "px";
        d.style.height = size + "px";
        d.style.left = Math.random() * 100 + "%";
        d.style.top = Math.random() * 100 + "%";
        wrap.appendChild(d);
        if (reduced) { d.style.opacity = 0.3; continue; }
        gsap.to(d, {
          opacity: gsap.utils.random(0.15, 0.7),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1, yoyo: true, delay: Math.random() * 3
        });
        gsap.to(d, {
          y: gsap.utils.random(-60, -200),
          x: gsap.utils.random(-50, 50),
          duration: gsap.utils.random(14, 26),
          repeat: -1, ease: "none", delay: Math.random() * 6
        });
      }
    }

    if (glow && !reduced) {
      gsap.to(glow, { opacity: 1, duration: 2.4, ease: "power2.out", delay: 0.4 });
      gsap.to(glow, {
        scale: 1.18, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true
      });
    } else if (glow) {
      glow.style.opacity = 1;
    }
  }

  /* ---------------------------------------------------------
     4. PRELOADER + HERO INTRO
     --------------------------------------------------------- */
  function runPreloader(done) {
    var el = document.getElementById("preloader");
    var count = document.getElementById("preCount");
    var bar = document.getElementById("preBar");
    if (!el) return done();
    if (reduced) { el.style.display = "none"; return done(); }

    var obj = { v: 0 };
    gsap.to(obj, {
      v: 100, duration: 2.1, ease: "power2.inOut",
      onUpdate: function () {
        var n = Math.round(obj.v);
        count.textContent = n;
        bar.style.width = n + "%";
      },
      onComplete: function () {
        gsap.to(el, {
          opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.25,
          onComplete: function () { el.style.visibility = "hidden"; done(); }
        });
      }
    });
  }

  function heroIntro() {
    if (reduced) {
      document.querySelectorAll(".hero__eyebrow,.hero__desc,.hero__actions,.hero__scroll,.hero__line")
        .forEach(function (el) { el.style.opacity = 1; });
      return;
    }
    var tl = gsap.timeline();
    tl.from("#tpTitle span", {
      yPercent: 110, opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.05
    })
      .to(".hero__line", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.7")
      .from(".hero__line", { letterSpacing: "0.9em", duration: 1.1, ease: "expo.out" }, "<")
      .to(".hero__eyebrow", { opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.9")
      .from(".hero__eyebrow", { x: -24, duration: 0.8, ease: "power3.out" }, "<")
      .to(".hero__desc", { opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .from(".hero__desc", { y: 24, duration: 0.8, ease: "power3.out" }, "<")
      .to(".hero__actions", { opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.6")
      .from(".hero__actions > *", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 }, "<")
      .to(".hero__scroll", { opacity: 1, duration: 0.6 }, "-=0.4")
      .from(".nav__logo, .nav__toggle", { opacity: 0, y: -16, duration: 0.7, ease: "power3.out", stagger: 0.1 }, "-=0.9");
  }

  /* ---------------------------------------------------------
     5. SCROLL-EXPAND (philosophy)
     The frame is always full-bleed; a clip-path inset opens it up.
     --------------------------------------------------------- */
  function scrollExpand() {
    var track = document.getElementById("seTrack");
    var frame = document.getElementById("seFrame");
    var media = document.getElementById("seMedia");
    var title = document.getElementById("seTitle");
    var hint = document.getElementById("seHint");
    var overlay = document.getElementById("seOverlay");
    var statement = document.getElementById("seStatement");
    if (!track || !frame) return;

    // split the statement so it can come in word by word
    if (statement) {
      var words = statement.textContent.trim().split(/\s+/);
      statement.innerHTML = words.map(function (w) {
        return '<span class="w">' + w + "</span>";
      }).join(" ");
      gsap.set(".scroll-expand__statement .w", { display: "inline-block", opacity: 0.18 });
    }

    var small = window.innerWidth < 640;
    var startClip = small
      ? "inset(22% 8% round 22px)"
      : "inset(19% 27% round 26px)";

    if (reduced) {
      gsap.set(frame, { clipPath: "inset(0% 0% round 0px)" });
      gsap.set(overlay, { opacity: 1 });
      gsap.set(".scroll-expand__statement .w", { opacity: 1 });
      if (title) title.style.display = "none";
      if (hint) hint.style.display = "none";
      return;
    }

    gsap.set(frame, { clipPath: startClip });
    gsap.set(media, { scale: 1.25 });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8
      }
    });

    tl.to(frame, { clipPath: "inset(0% 0% round 0px)", ease: "none", duration: 1 }, 0)
      .to(media, { scale: 1, ease: "none", duration: 1 }, 0)
      .to(hint, { opacity: 0, y: 14, duration: 0.18 }, 0.34)
      .to(title, { opacity: 0, y: -60, scale: 0.94, duration: 0.26, ease: "power2.in" }, 0.5)
      .to(overlay, { opacity: 1, duration: 0.2 }, 0.6)
      .to(".scroll-expand__statement .w", {
        opacity: 1, duration: 0.5, ease: "none", stagger: { each: 0.012 }
      }, 0.66);
  }

  /* ---------------------------------------------------------
     6. CURSOR / MENU / REVEALS / FORM
     --------------------------------------------------------- */
  function cursor() {
    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");
    if (!dot || window.matchMedia("(hover: none)").matches || window.innerWidth < 860) return;

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;
    gsap.set([dot, ring], { opacity: 1 });

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    });
    gsap.ticker.add(function () {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      gsap.set(ring, { x: rx, y: ry });
    });
    document.querySelectorAll('[data-cursor="hover"]').forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
    });
  }

  function menu() {
    var btn = document.getElementById("navToggle");
    var label = document.getElementById("navToggleLabel");
    var box = document.getElementById("menu");
    var scrim = document.getElementById("menuScrim");
    if (!btn || !box) return;

    function open() {
      box.classList.add("is-open");
      btn.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      label.textContent = "Close";
      document.body.classList.add("is-locked");
      if (lenis) lenis.stop();
      gsap.fromTo(".menu__link",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.08, delay: 0.2 });
    }
    function close() {
      box.classList.remove("is-open");
      btn.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      label.textContent = "Dive In";
      document.body.classList.remove("is-locked");
      if (lenis) lenis.start();
    }

    btn.addEventListener("click", function () {
      box.classList.contains("is-open") ? close() : open();
    });
    scrim.addEventListener("click", close);
    document.querySelectorAll(".menu__link").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  function reveals() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (reduced) { gsap.set(el, { opacity: 1, y: 0 }); return; }
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
    if (!reduced) {
      gsap.from(".projects__title", {
        scale: 0.94, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: ".projects__head", start: "top 85%", once: true }
      });
    }
  }

  function form() {
    var f = document.getElementById("contactForm");
    var note = document.getElementById("formNote");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = f.querySelector("#contact-name").value.trim();
      var mail = f.querySelector("#contact-email").value.trim();
      var msg = f.querySelector("#contact-message").value.trim();
      if (!name || !mail || !msg) {
        note.style.color = "var(--ember-bright)";
        note.textContent = "Please fill in every field.";
        return;
      }
      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var body = encodeURIComponent(msg + "\n\n— " + name + " (" + mail + ")");
      window.location.href =
        "mailto:thoratsudarshan2004@gmail.com?subject=" + subject + "&body=" + body;
      note.style.color = "var(--live)";
      note.textContent = "Opening your mail app...";
      f.reset();
    });
  }

  function misc() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        scrollTo(target);
      });
    });
  }

  /* ---------------------------------------------------------
     BOOT
     --------------------------------------------------------- */
  initLenis();
  textPressure();
  heroAtmosphere();
  cursor();
  menu();
  scrollExpand();
  reveals();
  form();
  misc();

  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    runPreloader(heroIntro);
    ScrollTrigger.refresh();
  }
  window.addEventListener("load", boot);
  setTimeout(function () {
    boot();
    var p = document.getElementById("preloader");
    if (p && getComputedStyle(p).opacity !== "0") {
      gsap.to(p, { opacity: 0, duration: 0.5, onComplete: function () {
        p.style.visibility = "hidden";
      }});
    }
  }, 7000);
})();
