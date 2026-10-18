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
      header.classList.toggle("is-scrolled", y > 8);
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Hero board: a signal that travels the copper bus ---------- */
  var board = document.querySelector(".board ul");
  if (board) {
    var setBus = function () {
      var items = board.querySelectorAll("li");
      var last = items[items.length - 1];
      if (last) board.style.setProperty("--bus", last.offsetTop + 26 + "px");
    };
    setBus();
    window.addEventListener("resize", setBus);
    if (!reduce) setTimeout(function () { board.classList.add("live"); }, 1300);

    // Light up the trace for whichever service is hovered or focused
    board.querySelectorAll("li").forEach(function (li) {
      var on = function () { li.classList.add("lit"); };
      var off = function () { li.classList.remove("lit"); };
      li.addEventListener("pointerenter", on);
      li.addEventListener("pointerleave", off);
      li.addEventListener("focusin", on);
      li.addEventListener("focusout", off);
    });
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

  /* ---------- Work list: live screenshot preview that follows the cursor (desktop) ---------- */
  var rows = document.querySelectorAll(".work-list a");
  if (finePointer && rows.length) {
    var peek = document.createElement("div");
    peek.className = "peek";
    peek.setAttribute("aria-hidden", "true");
    peek.innerHTML =
      '<div class="peek-bar"><i></i><i></i><i></i><span></span></div>' +
      '<div class="peek-shot"><img alt="" width="400" height="250"></div>';
    document.body.appendChild(peek);
    var img = peek.querySelector("img");
    var label = peek.querySelector(".peek-bar span");
    var shot = peek.querySelector(".peek-shot");
    img.addEventListener("load", function () { shot.classList.add("ready"); });
    img.addEventListener("error", function () { shot.classList.remove("ready"); });

    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, showing = false;
    var loop = function () {
      cx += (tx - cx) * (reduce ? 1 : 0.18);
      cy += (ty - cy) * (reduce ? 1 : 0.18);
      peek.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      raf = showing ? requestAnimationFrame(loop) : null;
    };
    var place = function (e) {
      var w = 420, h = 300;
      tx = Math.min(e.clientX + 28, window.innerWidth - w - 16);
      ty = Math.min(Math.max(e.clientY - h / 2, 16), window.innerHeight - h - 16);
    };

    rows.forEach(function (row) {
      row.addEventListener("pointerenter", function (e) {
        var url = row.getAttribute("href");
        var src = "https://s0.wp.com/mshots/v1/" + encodeURIComponent(url) + "?w=800&h=500";
        label.textContent = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        if (img.getAttribute("src") !== src) { shot.classList.remove("ready"); img.src = src; }
        place(e);
        if (!showing) { cx = tx; cy = ty; }
        showing = true;
        peek.classList.add("show");
        if (!raf) raf = requestAnimationFrame(loop);
      });
      row.addEventListener("pointermove", place);
      row.addEventListener("pointerleave", function () {
        showing = false;
        peek.classList.remove("show");
      });
    });
  }

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

  /* ---------- Hide the floating WhatsApp button while a form is on screen ---------- */
  var floatBtn = document.querySelector(".wa-float");
  var forms = document.querySelectorAll(".wa-form");
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
