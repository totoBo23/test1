(() => {
  const PASSWORD = "showmenow";
  const ACCESS_FLAG = "mrg_access_granted_v1";
  const MAX_ATTEMPTS = 5;
  const isLocalPreview =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "";

  if (isLocalPreview) {
    return;
  }

  if (sessionStorage.getItem(ACCESS_FLAG) === "1") {
    return;
  }

  const styles = `
    .access-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(20, 25, 33, 0.34);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .access-modal {
      position: relative;
      overflow: hidden;
      width: min(420px, 100%);
      border-radius: 18px;
      border: 1px solid rgba(220, 207, 190, 0.95);
      background: linear-gradient(180deg, rgba(255, 253, 250, 0.98) 0%, rgba(247, 241, 231, 0.92) 100%);
      box-shadow: 0 22px 48px rgba(15, 22, 31, 0.32);
      padding: 24px 22px 20px;
      font-family: "Source Sans 3", "Segoe UI", sans-serif;
      color: #1f2b35;
    }
    .access-modal::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #154f78 0%, #b86435 100%);
    }
    .access-eyebrow {
      margin: 0 0 6px;
      color: #154f78;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.74rem;
      font-weight: 700;
    }
    .access-modal h2 {
      margin: 0 0 10px;
      font-family: "Merriweather", Georgia, serif;
      font-size: clamp(1.28rem, 2.4vw, 1.5rem);
      line-height: 1.25;
      color: #1f2b35;
    }
    .access-modal p {
      margin: 0 0 15px;
      color: #556271;
      font-size: 1rem;
      line-height: 1.55;
    }
    .access-modal input {
      width: 100%;
      min-height: 46px;
      border: 1px solid #dccfbe;
      border-radius: 11px;
      padding: 10px 13px;
      font: inherit;
      color: #1f2b35;
      background: #fff;
    }
    .access-modal input:focus {
      outline: 3px solid rgba(21, 79, 120, 0.26);
      outline-offset: 1px;
    }
    .access-actions {
      margin-top: 13px;
      display: flex;
      justify-content: flex-end;
    }
    .access-modal button {
      border: 0;
      border-radius: 999px;
      min-height: 44px;
      padding: 0 18px;
      font: inherit;
      font-weight: 700;
      color: #fff;
      background: #154f78;
      cursor: pointer;
      transition: background-color 0.18s ease, transform 0.15s ease;
    }
    .access-modal button:hover {
      background: #0f3b5a;
      transform: translateY(-1px);
    }
    .access-error {
      min-height: 1.2em;
      margin-top: 11px;
      color: #a1363c;
      font-size: 0.95rem;
    }
    @media (max-width: 460px) {
      .access-modal {
        padding: 21px 16px 16px;
      }
      .access-actions {
        justify-content: stretch;
      }
      .access-modal button {
        width: 100%;
      }
    }
  `;

  function mountGate() {
    document.documentElement.style.overflow = "hidden";

    const styleTag = document.createElement("style");
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const overlay = document.createElement("div");
    overlay.className = "access-overlay";
    overlay.innerHTML = `
      <div class="access-modal" role="dialog" aria-modal="true" aria-labelledby="access-title">
        <p class="access-eyebrow">MietKontrolle.at</p>
        <h2 id="access-title">Password required</h2>
        <p>Please enter the password to access this website.</p>
        <form id="access-form">
          <input id="access-input" type="password" autocomplete="off" aria-label="Password" required />
          <div class="access-actions">
            <button type="submit">Continue</button>
          </div>
          <div id="access-error" class="access-error" aria-live="polite"></div>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);

    const form = document.getElementById("access-form");
    const input = document.getElementById("access-input");
    const error = document.getElementById("access-error");
    let attempts = 0;

    input.focus();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();

      if (value === PASSWORD) {
        sessionStorage.setItem(ACCESS_FLAG, "1");
        overlay.remove();
        styleTag.remove();
        document.documentElement.style.overflow = "";
        return;
      }

      attempts += 1;
      input.value = "";
      error.textContent = `Incorrect password. (${attempts}/${MAX_ATTEMPTS})`;
      input.focus();

      if (attempts >= MAX_ATTEMPTS) {
        window.location.replace("about:blank");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountGate, { once: true });
  } else {
    mountGate();
  }
})();
