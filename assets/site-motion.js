(() => {
  const initReviewCrawl = () => {
    const viewport = document.querySelector(".testi-scroll");

    if (!viewport || viewport.dataset.crawlReady === "true") return;

    const reviews = Array.from(viewport.children).filter((item) =>
      item.classList.contains("testi-card"),
    );

    if (reviews.length < 2) return;

    const track = document.createElement("div");
    track.className = "testi-track";
    track.setAttribute("aria-live", "off");

    reviews.forEach((review) => track.append(review));
    reviews.forEach((review) => {
      const clone = review.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((item) => {
        item.setAttribute("tabindex", "-1");
      });
      track.append(clone);
    });

    viewport.replaceChildren(track);
    viewport.classList.add("is-marquee");
    viewport.dataset.crawlReady = "true";
    viewport.style.setProperty("--review-crawl-duration", `${Math.max(60, reviews.length * 12)}s`);
  };

  const initScrollAwareActions = () => {
    const actions = document.querySelector(".mobile-actions");

    if (!actions) return;

    const mobileQuery = window.matchMedia("(max-width: 560px)");
    let settleTimer;

    const revealWhenSettled = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => actions.classList.remove("is-scrolling"), 700);
    };

    const hideWhileMoving = () => {
      if (!mobileQuery.matches) return;
      actions.classList.add("is-scrolling");
      revealWhenSettled();
    };

    const syncMode = () => {
      actions.classList.toggle("is-scroll-aware", mobileQuery.matches);

      if (mobileQuery.matches) {
        hideWhileMoving();
      } else {
        actions.classList.remove("is-scrolling");
        window.clearTimeout(settleTimer);
      }
    };

    window.addEventListener("scroll", hideWhileMoving, { passive: true });
    mobileQuery.addEventListener?.("change", syncMode);
    syncMode();
  };

  const init = () => {
    initReviewCrawl();
    initScrollAwareActions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
