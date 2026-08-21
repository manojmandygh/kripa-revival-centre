(() => {
  const createStoryVisual = ({ className, images, kicker, title, body, steps, representative }) => {
    const section = document.createElement("section");
    section.className = `story-visual ${className}`;

    const intro = document.createElement("div");
    intro.className = "story-visual__intro";

    const label = document.createElement("p");
    label.className = "section-kicker";
    label.textContent = kicker;

    const heading = document.createElement("h2");
    heading.textContent = title;

    const copy = document.createElement("p");
    copy.textContent = body;

    intro.append(label, heading, copy);

    const art = document.createElement("div");
    art.className = "story-visual__art";

    images.forEach(({ src, alt, label: imageLabel }) => {
      const photo = document.createElement("figure");
      const image = document.createElement("img");
      const caption = document.createElement("figcaption");

      photo.className = "story-visual__photo";
      image.src = src;
      image.alt = alt;
      image.loading = "lazy";
      image.decoding = "async";
      caption.textContent = imageLabel;
      photo.append(image, caption);
      art.append(photo);
    });

    const disclosure = document.createElement("p");
    disclosure.className = "story-visual__disclosure";
    disclosure.textContent =
      "Representative imagery — real centre photographs elsewhere on this site remain unaltered.";

    const stepList = document.createElement("ol");
    stepList.className = "story-visual__steps";

    steps.forEach(({ number, timing, title: stepTitle, summary, prompt, instruction }) => {
      const step = document.createElement("li");
      const meta = document.createElement("div");
      const count = document.createElement("span");
      const time = document.createElement("small");
      const stepHeading = document.createElement("h3");
      const stepCopy = document.createElement("p");
      const direction = document.createElement("div");
      const directionLabel = document.createElement("span");
      const directionCopy = document.createElement("strong");

      meta.className = "story-step__meta";
      direction.className = "story-step__direction";
      count.textContent = number;
      time.textContent = timing;
      stepHeading.textContent = stepTitle;
      stepCopy.textContent = summary;
      directionLabel.textContent = prompt;
      directionCopy.textContent = instruction;

      meta.append(count, time);
      direction.append(directionLabel, directionCopy);
      step.append(meta, stepHeading, stepCopy, direction);
      stepList.append(step);
    });

    section.append(intro, art);

    if (representative) section.append(disclosure);

    section.append(stepList);

    return section;
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
    const map = document.createElement("iframe");
    const mapQuery =
      "Kripa Revival Centre, No. 1/1 Narayanswamy Building, Kempapura Main Road, Hebbal, Bengaluru 560024";
    map.className = "arrival-story__map";
    map.src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
    map.title = "Google Map showing Kripa Revival Centre in Hebbal, Bengaluru";
    map.loading = "lazy";
    map.referrerPolicy = "no-referrer-when-downgrade";
    map.allowFullscreen = true;
    figure.append(map);

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

    if (journeyPreview && !document.querySelector(".story-visual--home-journey")) {
      journeyPreview.insertAdjacentElement(
        "afterend",
        createStoryVisual({
          className: "story-visual--home-journey",
          images: [
            {
              src: "/assets/images/recovery-overview-representative.jpg",
              alt: "Representative photograph of a recovery mentor and resident walking together in a garden",
              label: "A steady way forward",
            },
          ],
          representative: true,
          kicker: "The full recovery arc",
          title: "Each phase prepares the ground for the next.",
          body: "A four-month residential pathway moves deliberately from physical stability to a practical plan for recovery beyond Kripa.",
          steps: [
            {
              number: "01",
              timing: "Month 1",
              title: "Treatment",
              summary: "Medical review, detoxification and a protected daily routine establish safety.",
              prompt: "Focus for this phase",
              instruction: "Settle in, share relevant health information and begin participating in the daily programme.",
            },
            {
              number: "02",
              timing: "Month 2",
              title: "Therapy",
              summary: "Individual, group and 12-Step work begin to rebuild honesty, discipline and trust.",
              prompt: "Focus for this phase",
              instruction: "Attend consistently, speak openly and practise the tools introduced in sessions.",
            },
            {
              number: "03",
              timing: "Month 3",
              title: "Awareness",
              summary: "Triggers, thinking patterns and relationships are explored with greater clarity.",
              prompt: "Focus for this phase",
              instruction: "Recognise warning signs and build a personal set of healthier responses.",
            },
            {
              number: "04",
              timing: "Month 4",
              title: "Planning",
              summary: "Aftercare, support groups and family preparation turn learning into a plan for home.",
              prompt: "Focus for this phase",
              instruction: "Leave with agreed routines, support contacts and a written transition plan.",
            },
          ],
        }),
      );
    }

    if (programmeIntro && !document.querySelector(".story-visual--programme-journey")) {
      programmeIntro.insertAdjacentElement(
        "afterend",
        createStoryVisual({
          className: "story-visual--programme-journey",
          images: [
            {
              src: "/assets/images/recovery-treatment-representative.jpg",
              alt: "Representative photograph of a calm admissions conversation",
              label: "Stabilise",
            },
            {
              src: "/assets/images/recovery-therapy-representative.jpg",
              alt: "Representative photograph of a small supported group conversation",
              label: "Rebuild",
            },
            {
              src: "/assets/images/recovery-awareness-representative.jpg",
              alt: "Representative photograph of a resident reflecting in a journal",
              label: "Understand",
            },
            {
              src: "/assets/images/recovery-planning-representative.jpg",
              alt: "Representative photograph of a resident and counsellor preparing an aftercare plan",
              label: "Prepare",
            },
          ],
          representative: true,
          kicker: "One connected programme",
          title: "Four phases, one deliberate direction.",
          body: "The purpose of each month is clear: stabilise, rebuild, understand and prepare for continued recovery.",
          steps: [
            {
              number: "01",
              timing: "Month 1",
              title: "Treatment",
              summary: "Medical review, detoxification and a protected daily routine establish safety.",
              prompt: "Focus for this phase",
              instruction: "Settle in, share relevant health information and begin participating in the daily programme.",
            },
            {
              number: "02",
              timing: "Month 2",
              title: "Therapy",
              summary: "Individual, group and 12-Step work begin to rebuild honesty, discipline and trust.",
              prompt: "Focus for this phase",
              instruction: "Attend consistently, speak openly and practise the tools introduced in sessions.",
            },
            {
              number: "03",
              timing: "Month 3",
              title: "Awareness",
              summary: "Triggers, thinking patterns and relationships are explored with greater clarity.",
              prompt: "Focus for this phase",
              instruction: "Recognise warning signs and build a personal set of healthier responses.",
            },
            {
              number: "04",
              timing: "Month 4",
              title: "Planning",
              summary: "Aftercare, support groups and family preparation turn learning into a plan for home.",
              prompt: "Focus for this phase",
              instruction: "Leave with agreed routines, support contacts and a written transition plan.",
            },
          ],
        }),
      );
    }

    if (familyMessage && !document.querySelector(".story-visual--family-support")) {
      familyMessage.insertAdjacentElement(
        "afterend",
        createStoryVisual({
          className: "story-visual--family-support",
          images: [
            {
              src: "/assets/images/family-support-representative.jpg",
              alt: "Representative photograph of an Indian family in a supported counselling conversation",
              label: "Conversation, clarity and participation",
            },
          ],
          representative: true,
          kicker: "A path for families",
          title: "You do not need every answer before you begin.",
          body: "Kripa helps families move from an urgent first conversation to clear decisions and practical participation in recovery.",
          steps: [
            {
              number: "01",
              timing: "Begin privately",
              title: "Tell us what is happening",
              summary: "A confidential first conversation helps the team understand the immediate situation.",
              prompt: "Come prepared to share",
              instruction: "Current concerns, previous treatment, relevant health information and the questions worrying you most.",
            },
            {
              number: "02",
              timing: "Choose the next step",
              title: "Understand the options",
              summary: "The team explains whether residential treatment or a guided intervention may be appropriate.",
              prompt: "Leave with clarity about",
              instruction: "Who will speak, what happens next and how the family can respond consistently.",
            },
            {
              number: "03",
              timing: "Take part steadily",
              title: "Support recovery at home",
              summary: "Education and counselling prepare the family for healthier life after residential care.",
              prompt: "Practise together",
              instruction: "Clearer communication, healthier boundaries and agreed support for the aftercare plan.",
            },
          ],
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
