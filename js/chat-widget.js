/* Alishba Tanveer — portfolio AI chat widget
   Talks ONLY to a backend proxy (chat-server/), never directly to OpenAI.
   The API key must never appear in this file or anywhere in this repo. */

const CHAT_API_URL = "https://portfolio-server-ai.vercel.app/api/chat";

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#chat-toggle");
  const panel = document.querySelector("#chat-panel");
  const closeBtn = document.querySelector("#chat-close");
  const body = document.querySelector("#chat-body");
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#chat-input");

  if (!toggle || !panel) return;

  let history = [];
  let hasOpened = false;

  function openPanel() {
    panel.classList.add("open");
    toggle.classList.add("open");
    if (!hasOpened) {
      hasOpened = true;
      addBubble("bot", "Hi! I'm Alishba's portfolio assistant. Ask me about her skills, projects, or experience.");
    }
    input.focus();
  }
  function closePanel() {
    panel.classList.remove("open");
    toggle.classList.remove("open");
  }

  toggle.addEventListener("click", () => {
    panel.classList.contains("open") ? closePanel() : openPanel();
  });
  closeBtn.addEventListener("click", closePanel);

  function addBubble(role, text) {
    const div = document.createElement("div");
    div.className = `chat-bubble ${role === "user" ? "user" : "bot"}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function addTypingIndicator() {
    const div = document.createElement("div");
    div.className = "chat-bubble bot typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addBubble("user", message);
    input.value = "";
    input.disabled = true;

    const typingEl = addTypingIndicator();

    try {
      if (CHAT_API_URL.includes("PASTE_YOUR_RENDER_URL_HERE")) {
        throw new Error("not-configured");
      }

      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      if (!res.ok) throw new Error("bad-response");

      const data = await res.json();
      typingEl.remove();
      addBubble("bot", data.reply || "Sorry, I didn't catch that.");

      history.push({ role: "user", content: message });
      history.push({ role: "assistant", content: data.reply || "" });
      history = history.slice(-10);
    } catch (err) {
      typingEl.remove();
      if (err.message === "not-configured") {
        addBubble("bot", "This assistant isn't connected yet — Alishba still needs to deploy the backend and add its URL here. In the meantime, feel free to use the contact form!");
      } else {
        addBubble("bot", "Sorry, I'm having trouble connecting right now. Please try again in a moment, or use the contact form.");
      }
    } finally {
      input.disabled = false;
      input.focus();
    }
  });
});
