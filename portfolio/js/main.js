/* Alishba Tanveer — shared site behaviour */

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* Mark the active nav link based on current filename */
  const current = (location.pathname.split("/").pop() || "index.html") || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
    if (a.dataset.page === current) a.classList.add("active");
  });

  /* Scroll-reveal for anything with .reveal */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("in"));
  }

  /* Contact form — submits to Formspree so messages actually land in
     Alishba's inbox, with no backend of her own required. A local copy
     is also kept so the admin panel can show recent enquiries. */
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const status = document.querySelector("#form-status");
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        status.textContent = "Please fill in every field before sending.";
        status.style.color = "#ff7a3c";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      status.textContent = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          try {
            const key = "alishba_messages";
            const existing = JSON.parse(localStorage.getItem(key) || "[]");
            existing.unshift({ name, email, message, date: new Date().toISOString() });
            localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
          } catch (err) {
            /* localStorage unavailable — safe to ignore */
          }

          status.textContent = "Message sent — thank you! I'll get back to you soon.";
          status.style.color = "#3e8eff";
          form.reset();
        } else {
          throw new Error("Formspree responded with an error");
        }
      } catch (err) {
        status.textContent =
          "Something went wrong sending that. Please email alishbatanveer25@gmail.com directly.";
        status.style.color = "#ff7a3c";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }
    });
  }
});
