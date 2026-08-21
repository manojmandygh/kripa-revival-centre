(() => {
  const createStoryVisual = ({ className, src, mobileSrc, alt, kicker, title, body }) => {
    const figure = document.createElement("figure");
    figure.className = `story-visual ${className}`;

    const art = document.createElement("div");
    art.className = "story-visual__art";

    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.loading = "lazy";
    image.decoding = "async";
    const picture = document.createElement("picture");

    if (mobileSrc) {
      const source = document.createElement("source");
      source.media = "(max-width: 560px)";
      source.srcset = mobileSrc;
      picture.append(source);
    }

    picture.append(image);
    art.append(picture);

    const caption = document.createElement("figcaption");
    caption.className = "story-visual__caption";

    const label = document.createElement("span");
    label.textContent = kicker;

    const heading = document.createElement("strong");
    heading.textContent = title;

    const copy = document.createElement("p");
    copy.textContent = body;

    caption.append(label, heading, copy);
    figure.append(art, caption);

    return figure;
  };

  const createRhythmPhotoStory = () => {
    const rhythm = document.querySelector(".daily-rhythm");

    if (!rhythm || rhythm.querySelector(".rhythm-photo-story")) return;

    const photoStory = document.createElement("div");
    photoStory.className = "rhythm-photo-story";
    photoStory.setAttribute("aria-label", "A day at Kripa Revival Centre");

    const moments = [
      {
        src: "/assets/images/unit-2-room.jpg",
        alt: "An unaltered photograph of a residential room at Kripa Revival Centre",
        label: "Rest and readiness",
        detail: "A calm residential setting",
      },
      {
        src: "/assets/images/group-therapy.jpg",
        alt: "An unaltered photograph of group work at Kripa Revival Centre",
        label: "Community and reflection",
        detail: "Shared learning and support",
      },
      {
        src: "/assets/images/indoor-activity.jpg",
        alt: "An unaltered photograph of an indoor activity at Kripa Revival Centre",
        label: "Movement and recreation",
        detail: "Space to rebuild a daily rhythm",
      },
    ];

    moments.forEach(({ src, alt, label, detail }) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");
      const title = document.createElement("strong");
      const copy = document.createElement("span");

      image.src = src;
      image.alt = alt;
      image.loading = "lazy";
      image.decoding = "async";
      title.textContent = label;
      copy.textContent = detail;
      caption.append(title, copy);
      figure.append(image, caption);
      photoStory.append(figure);
    });

    rhythm.append(photoStory);
  };

  const createArrivalStory = () => {
    const contactPage = document.querySelector(".contact-page");

    if (!contactPage || document.querySelector(".arrival-story")) return;

    const mapLink =
      contactPage.querySelector('a[href*="google.com/maps"]')?.href ||
      "https://www.google.com/maps/search/?api=1&query=Kripa+Revival+Centre+Hebbal+Bengaluru";
    const section = document.createElement("section");
    section.className = "arrival-story";

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = "/assets/visuals/arrival-map.svg";
    image.alt = "Schematic location guide showing Kripa Revival Centre near Kempapura Circle in Hebbal";
    image.loading = "lazy";
    image.decoding = "async";
    figure.append(image);

    const copy = document.createElement("div");
    copy.className = "arrival-story__copy";

    const kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Arriving at Kripa";

    const heading = document.createElement("h2");
    heading.textContent = "A clear destination for the first step.";

    const body = document.createElement("p");
    body.textContent =
      "Kripa is located near Kempapura Circle in Hebbal. Open the live map for accurate turn-by-turn directions, or call the team if you would like help planning your arrival.";

    const address = document.createElement("address");
    address.textContent =
      "No. 1/1, Narayanswamy Building, Kempapura Main Road, Hebbal, Bengaluru 560024";

    const link = document.createElement("a");
    link.className = "button button-coral";
    link.href = mapLink;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Open the live map";

    copy.append(kicker, heading, body, address, link);
    section.append(figure, copy);
    contactPage.insertAdjacentElement("afterend", section);
  };

  const initVisualStorytelling = () => {
    const journeyPreview = document.querySelector(".journey-preview");
    const programmeIntro = document.querySelector(".programme-intro");
    const familyMessage = document.querySelector(".family-message");

    if (journeyPreview && !journeyPreview.querySelector(".story-visual--home-journey")) {
      journeyPreview.append(
        createStoryVisual({
          className: "story-visual--home-journey",
          src: "/assets/visuals/recovery-journey.svg",
          mobileSrc: "/assets/visuals/recovery-journey-mobile.svg",
          alt: "Illustrated four-stage pathway through treatment, therapy, awareness and planning",
          kicker: "The full recovery arc",
          title: "Each phase prepares the ground for the next.",
          body: "The programme moves deliberately from physical stability to lasting plans for life after residential care.",
        }),
      );
    }

    if (programmeIntro && !document.querySelector(".story-visual--programme-journey")) {
      programmeIntro.insertAdjacentElement(
        "afterend",
        createStoryVisual({
          className: "story-visual--programme-journey",
          src: "/assets/visuals/recovery-journey.svg",
          mobileSrc: "/assets/visuals/recovery-journey-mobile.svg",
          alt: "Illustrated four-stage pathway through treatment, therapy, awareness and planning",
          kicker: "One connected programme",
          title: "Four phases, one deliberate direction.",
          body: "The visual path makes the relationship between stabilisation, rebuilding, self-awareness and transition easier to understand at a glance.",
        }),
      );
    }

    if (familyMessage && !document.querySelector(".story-visual--family-support")) {
      familyMessage.insertAdjacentElement(
        "afterend",
        createStoryVisual({
          className: "story-visual--family-support",
          src: "/assets/visuals/family-support.svg",
          mobileSrc: "/assets/visuals/family-support-mobile.svg",
          alt: "Illustrated family support journey from conversation to clarity and participation",
          kicker: "A path for families",
          title: "Support begins before every answer is known.",
          body: "A confidential conversation can create clarity, identify the right options and help the family take part in a healthier recovery environment.",
        }),
      );
    }

    createRhythmPhotoStory();
    createArrivalStory();
  };

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
    initVisualStorytelling();
    initReviewCrawl();
    initScrollAwareActions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
