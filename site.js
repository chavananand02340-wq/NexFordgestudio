// Menu toggle, WhatsApp form, and hiding the floating button near the form.
(function () {
  var menu = document.querySelector(".menu");
  var nav = document.getElementById("nav");
  if (menu && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menu.addEventListener("click", function () {
      setOpen(menu.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Preselect a service from ?service=slug (used by service pages linking to /start-project)
  var params = new URLSearchParams(location.search);
  var pre = params.get("service");

  document.querySelectorAll(".wa-form").forEach(function (form) {
    if (pre) {
      var map = {
        "website-development": "Website development",
        "custom-software": "Custom software",
        "social-media-management": "Social media management",
        "branding-creative": "Branding and creative",
      };
      form.querySelectorAll('input[name="need"]').forEach(function (box) {
        if (box.value === map[pre]) box.checked = true;
      });
    }

    var nameInput = form.querySelector('input[name="name"]');
    var error = form.querySelector(".form-error");
    nameInput.addEventListener("input", function () {
      nameInput.removeAttribute("aria-invalid");
      error.hidden = true;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").trim();
      if (!name) {
        nameInput.setAttribute("aria-invalid", "true");
        error.hidden = false;
        nameInput.focus();
        return;
      }
      var business = (data.get("business") || "").trim();
      var needs = data.getAll("need");
      var message = (data.get("message") || "").trim();

      var lines = ["Hi NexForge! I'd like to start a project.", "", "Name: " + name];
      if (business) lines.push("Business: " + business);
      if (needs.length) lines.push("Looking for: " + needs.join(", "));
      if (message) lines.push("", message);

      var url = "https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  });

  // Hide the floating WhatsApp button while a form is on screen (it would cover the submit button)
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
})();
