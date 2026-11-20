// NexForge Studio: hand-written, no frameworks.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ---------- Menu ---------- */
  var menu = document.querySelector(".menu");
  var nav = document.getElementById("nav");
  var setOpen = function (open) {
    if (!menu || !nav) return;
    nav.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  if (menu && nav) {
    menu.addEventListener("click", function () { setOpen(menu.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------- Scroll: progress bar + header that hides on the way down ---------- */
  var bar = document.querySelector(".progress");
  var header = document.querySelector(".top");
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (header) {
      var menuOpen = nav && nav.classList.contains("open");
      var hide = y > 160 && y > lastY + 4 && !menuOpen;
      if (hide) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 160) header.classList.remove("is-hidden");
      root.classList.toggle("hdr-hidden", header.classList.contains("is-hidden"));
      header.classList.toggle("is-scrolled", y > 8);
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Services board: traces power up in view, then a signal travels the copper bus ---------- */
  var boardEl = document.querySelector(".board");
  if (boardEl) {
    var bus = boardEl.querySelector(":scope > ul");
    var setBus = function () {
      var items = bus.querySelectorAll(":scope > li");
      var last = items[items.length - 1];
      if (last) bus.style.setProperty("--bus", last.offsetTop + 40 + "px");
    };
    setBus();
    window.addEventListener("resize", setBus);
    var start = function () {
      boardEl.classList.add("go");
      if (!reduce) setTimeout(function () { boardEl.classList.add("live"); }, 1400);
    };
    if ("IntersectionObserver" in window && !reduce) {
      var bio = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { start(); bio.disconnect(); }
      }, { rootMargin: "0px 0px -20% 0px" });
      bio.observe(boardEl);
    } else { start(); }
    bus.querySelectorAll(":scope > li").forEach(function (li) {
      var on = function () { li.classList.add("lit"); };
      var off = function () { li.classList.remove("lit"); };
      li.addEventListener("pointerenter", on);
      li.addEventListener("pointerleave", off);
      li.addEventListener("focusin", on);
      li.addEventListener("focusout", off);
    });
  }

  /* ---------- Screenshot frames: show the site name if an image can't load ---------- */
  document.querySelectorAll("img[data-shot]").forEach(function (img) {
    var fail = function () { img.parentNode.classList.add("noimg"); };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ---------- Where am I: highlight the current section in the section bar and header ---------- */
  var secLinks = document.querySelectorAll('.secnav a, .nav a[href^="/#"]');
  var secIds = ["work", "services", "social", "why", "process", "faq", "contact"];
  var secEls = secIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var secBar = document.querySelector(".secnav ul");
  if (secEls.length && secLinks.length) {
    var current = null;
    var mark = function () {
      var line = window.innerHeight * 0.35, cur = null;
      secEls.forEach(function (el) { if (el.getBoundingClientRect().top <= line) cur = el.id; });
      if (cur === current) return;
      current = cur;
      secLinks.forEach(function (a) {
        var on = cur && a.getAttribute("href").replace("/", "") === "#" + cur;
        a.classList.toggle("on", !!on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        if (on && secBar && a.closest(".secnav")) {
          var left = a.offsetLeft - (secBar.clientWidth - a.offsetWidth) / 2;
          secBar.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" });
        }
      });
    };
    var mTick = false;
    window.addEventListener("scroll", function () {
      if (!mTick) { mTick = true; requestAnimationFrame(function () { mark(); mTick = false; }); }
    }, { passive: true });
    mark();
  }

  /* ---------- Process steps light up as you scroll past them ---------- */
  if ("IntersectionObserver" in window) {
    var stepIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("on"); stepIO.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -35% 0px" });
    document.querySelectorAll(".steps li").forEach(function (li, i) {
      li.style.transitionDelay = finePointer ? i * 120 + "ms" : "0ms";
      stepIO.observe(li);
    });
  } else {
    document.querySelectorAll(".steps li").forEach(function (li) { li.classList.add("on"); });
  }

  /* ---------- Section headings: copper trace draws in on arrival ---------- */
  root.classList.add("js");
  var heads = document.querySelectorAll(".block-head");
  if ("IntersectionObserver" in window && !reduce) {
    var headIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); headIO.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -15% 0px" });
    heads.forEach(function (h) { headIO.observe(h); });
  } else {
    heads.forEach(function (h) { h.classList.add("in"); });
  }

  /* ---------- Work carousel: arrows, counter, keyboard, screenshot fallback ---------- */
  document.querySelectorAll("[data-car]").forEach(function (car) {
    var track = car.querySelector(".car-track");
    var cards = track.querySelectorAll(".card");
    var prev = car.querySelector('[data-dir="-1"]');
    var next = car.querySelector('[data-dir="1"]');
    var count = car.querySelector(".car-count b");

    var step = function () {
      var c = cards[0];
      return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 16) : track.clientWidth;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
      var idx = Math.round(track.scrollLeft / step());
      if (track.scrollLeft >= max) idx = cards.length - 1 - Math.max(0, Math.round(track.clientWidth / step()) - 1);
      if (count) count.textContent = String(Math.min(cards.length, idx + 1));
      var allFit = track.scrollWidth <= track.clientWidth + 2;
      car.querySelector(".car-ctrl").hidden = allFit;
    };
    [prev, next].forEach(function (btn) {
      btn.addEventListener("click", function () {
        track.scrollBy({ left: Number(btn.dataset.dir) * step(), behavior: reduce ? "auto" : "smooth" });
      });
    });
    track.addEventListener("scroll", function () { requestAnimationFrame(update); }, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    update();

    // If a live screenshot can't load, show the domain instead of a broken image
    track.querySelectorAll(".card-img img").forEach(function (img) {
      var fail = function () { img.parentNode.classList.add("noimg"); };
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") fail();
    });
  });

  /* ---------- WhatsApp form with live message preview ---------- */
  var params = new URLSearchParams(location.search);
  var pre = params.get("service");
  var serviceNames = {
    "website-development": "Website development",
    "custom-software": "Custom software",
    "social-media-management": "Social media management",
    "branding-creative": "Branding and creative",
  };

  function buildMessage(form) {
    var data = new FormData(form);
    var name = (data.get("name") || "").trim();
    var business = (data.get("business") || "").trim();
    var needs = data.getAll("need");
    var message = (data.get("message") || "").trim();
    var lines = ["Hi NexForge! I'd like to start a project.", ""];
    lines.push("Name: " + (name || "…"));
    if (business) lines.push("Business: " + business);
    if (needs.length) lines.push("Looking for: " + needs.join(", "));
    var when = data.get("when");
    var have = data.getAll("have");
    if (when) lines.push("Timeline: " + when);
    if (have.length) lines.push("Already have: " + have.join(", "));
    if (message) lines.push("", message);
    return { name: name, text: lines.join("\n") };
  }

  document.querySelectorAll(".wa-form").forEach(function (form) {
    if (pre && serviceNames[pre]) {
      form.querySelectorAll('input[name="need"]').forEach(function (box) {
        if (box.value === serviceNames[pre]) box.checked = true;
      });
    }

    var nameInput = form.querySelector('input[name="name"]');
    var error = form.querySelector(".form-error");
    var textEl = form.querySelector(".wa-text");
    var timeEl = form.querySelector(".wa-bubble time");
    var bubble = form.querySelector(".wa-bubble");

    var render = function () {
      if (!textEl) return;
      textEl.textContent = buildMessage(form).text;
      var d = new Date();
      timeEl.textContent = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      if (!reduce && bubble) {
        bubble.classList.remove("tick");
        void bubble.offsetWidth;
        bubble.classList.add("tick");
      }
    };
    form.addEventListener("input", render);
    form.addEventListener("change", render);
    render();

    nameInput.addEventListener("input", function () {
      nameInput.removeAttribute("aria-invalid");
      error.hidden = true;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = buildMessage(form);
      if (!msg.name) {
        nameInput.setAttribute("aria-invalid", "true");
        error.hidden = false;
        nameInput.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.classList.add("sent");
      setTimeout(function () { btn.classList.remove("sent"); }, 1600);
      window.open("https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(msg.text), "_blank", "noopener");
    });
  });

  /* ---------- Hide the floating WhatsApp button while the hero or a form is on screen
     (both already have their own WhatsApp button, and the float would cover content) ---------- */
  var floatBtn = document.querySelector(".wa-float");
  var forms = document.querySelectorAll(".hero, .page-hero, .wa-form");
  if (floatBtn && forms.length && "IntersectionObserver" in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      });
      floatBtn.classList.toggle("hide", visible.size > 0);
    });
    forms.forEach(function (f) { io.observe(f); });
  }

  /* ---------- For the developers reading the console ---------- */
  try {
    console.log(
      "%cNexForge Studio%c\nYou're looking at hand-written HTML, CSS and JS. No framework, no template.\nWant one like this? https://wa.me/919405370657",
      "font: 700 18px sans-serif; color: #cf8c5d;",
      "font: 13px sans-serif; color: inherit;"
    );
  } catch (e) {}
})();
