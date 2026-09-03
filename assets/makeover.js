/* Kripa makeover: dropdown menus + WhatsApp-style enquiry bot */
(function () {
  "use strict";

  /* ---------- dropdown menus (touch / keyboard) ---------- */
  var navItems = document.querySelectorAll(".desktop-nav .nav-item > button");
  navItems.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var item = btn.parentElement;
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".desktop-nav .nav-item.open").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".desktop-nav .nav-item")) {
      document.querySelectorAll(".desktop-nav .nav-item.open").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector("button").setAttribute("aria-expanded", "false");
      });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".desktop-nav .nav-item.open").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector("button").setAttribute("aria-expanded", "false");
      });
    }
  });

  /* ---------- enquiry bot ---------- */
  var CENTRE_EMAIL = "info@kriparevivalcentre.org";
  var WA_NUMBER = "919485310070";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CENTRE_EMAIL;

  var CATEGORIES = {
    alcohol: "Alcohol addiction",
    drug: "Drug addiction",
    family: "Family support & intervention",
    admission: "Admission, fees & availability",
    other: "Something else"
  };

  var bot = document.getElementById("kripa-bot");
  var launcher = document.getElementById("kripa-bot-launcher");
  if (!bot || !launcher) return;
  var body = bot.querySelector(".kb-body");
  var state = { step: "category", category: null, started: false };

  function timeNow() {
    var d = new Date();
    var h = d.getHours(), m = ("0" + d.getMinutes()).slice(-2);
    var ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12;
    return h + ":" + m + " " + ap;
  }
  function scrollDown() { body.scrollTop = body.scrollHeight; }
  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "kb-msg " + who;
    div.textContent = text;
    var t = document.createElement("span");
    t.className = "kb-time"; t.textContent = timeNow();
    div.appendChild(t);
    body.appendChild(div); scrollDown();
    return div;
  }
  function typing(cb, ms) {
    var t = document.createElement("div");
    t.className = "kb-typing"; t.innerHTML = "<i></i><i></i><i></i>";
    body.appendChild(t); scrollDown();
    setTimeout(function () { t.remove(); cb(); }, ms || 700);
  }
  function askCategory() {
    typing(function () {
      addMsg("Namaste. You have reached Kripa Revival Centre, Bengaluru. This chat is confidential.\n\nWhat can we help you with today?", "bot");
      var opts = document.createElement("div");
      opts.className = "kb-options";
      Object.keys(CATEGORIES).forEach(function (key) {
        var b = document.createElement("button");
        b.type = "button"; b.textContent = CATEGORIES[key];
        b.addEventListener("click", function () { pickCategory(key, b.textContent); });
        opts.appendChild(b);
      });
      body.appendChild(opts); scrollDown();
    }, 800);
  }
  function pickCategory(key, label) {
    state.category = key; state.step = "details";
    addMsg(label, "user");
    var replies = {
      alcohol: "Thank you for reaching out. Alcohol dependence is treatable, and asking is the hardest step.",
      drug: "Thank you for reaching out. Recovery from drug dependence is possible with the right structure and support.",
      family: "Families carry a lot. We will guide you, whether your loved one is ready for treatment or not yet.",
      admission: "Happy to help with admission, fees and availability questions.",
      other: "Happy to help."
    };
    typing(function () {
      addMsg(replies[key] + "\n\nPlease share a few details and our team will contact you. You can also call us any time on +91 94853 10070 - we are open 24/7.", "bot");
      showForm();
    }, 800);
  }
  function showForm() {
    var f = document.createElement("form");
    f.className = "kb-form";
    f.innerHTML =
      '<label for="kb-name">Your name</label><input id="kb-name" name="name" type="text" autocomplete="name" required />' +
      '<label for="kb-phone">Phone / WhatsApp number</label><input id="kb-phone" name="phone" type="tel" autocomplete="tel" required />' +
      '<label for="kb-msg">Briefly, what is happening? (optional)</label><textarea id="kb-msg" name="message"></textarea>' +
      '<p class="kb-err" hidden></p>' +
      '<button class="kb-send" type="submit">Send enquiry</button>';
    f.addEventListener("submit", function (e) { e.preventDefault(); submitForm(f); });
    body.appendChild(f); scrollDown();
    var n = f.querySelector("#kb-name"); if (n) n.focus();
  }
  function submitForm(f) {
    var name = f.name.value.trim();
    var phone = f.phone.value.trim();
    var msg = f.message.value.trim();
    var err = f.querySelector(".kb-err");
    if (name.length < 2) { err.textContent = "Please enter your name."; err.hidden = false; return; }
    if (!/^[+()\-.\s0-9]{8,16}$/.test(phone)) { err.textContent = "Please enter a valid phone number."; err.hidden = false; return; }
    err.hidden = true;
    var btn = f.querySelector(".kb-send");
    btn.disabled = true; btn.textContent = "Sending...";
    var catLabel = CATEGORIES[state.category] || "General";
    var payload = {
      _subject: "Website enquiry: " + catLabel + " - " + name,
      _template: "table",
      _captcha: "false",
      _replyto: "",
      category: catLabel,
      name: name,
      phone: phone,
      message: msg || "(none given)",
      page: location.href
    };
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (!r.ok) throw new Error("send failed");
      addMsg(name + ", " + phone, "user");
      typing(function () {
        addMsg("Thank you, " + name + ". Your enquiry has been sent to our team. We usually respond quickly - and we are available 24/7 on +91 94853 10070 if it cannot wait.", "bot");
        showAlt(name, phone, msg, catLabel);
      }, 700);
      f.remove();
    }).catch(function () {
      addMsg("The message could not be sent from here. Please use one of these instead - we respond on both:", "bot");
      showAlt(name, phone, msg, catLabel);
      btn.disabled = false; btn.textContent = "Send enquiry";
    });
  }
  function showAlt(name, phone, msg, catLabel) {
    var text = "Enquiry: " + catLabel + "\nName: " + name + "\nPhone: " + phone + (msg ? "\nDetails: " + msg : "");
    var alt = document.createElement("div");
    alt.className = "kb-alt";
    var wa = document.createElement("a");
    wa.className = "kb-wa";
    wa.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
    wa.target = "_blank"; wa.rel = "noreferrer";
    wa.textContent = "Continue on WhatsApp";
    var mail = document.createElement("a");
    mail.className = "kb-mail";
    mail.href = "mailto:" + CENTRE_EMAIL + "?subject=" + encodeURIComponent("Website enquiry: " + catLabel) + "&body=" + encodeURIComponent(text);
    mail.textContent = "Send by email instead";
    alt.appendChild(wa); alt.appendChild(mail);
    body.appendChild(alt); scrollDown();
  }
  function openBot(category) {
    bot.classList.add("open");
    launcher.setAttribute("aria-expanded", "true");
    if (!state.started) {
      state.started = true;
      if (category && CATEGORIES[category]) {
        addMsg("Namaste. You have reached Kripa Revival Centre, Bengaluru. This chat is confidential.", "bot");
        state.step = "details"; state.category = category;
        typing(function () {
          addMsg("You asked about: " + CATEGORIES[category] + ".\n\nPlease share a few details and our team will contact you. You can also call us any time on +91 94853 10070 - we are open 24/7.", "bot");
          showForm();
        }, 700);
      } else {
        askCategory();
      }
    }
  }
  function closeBot() {
    bot.classList.remove("open");
    launcher.setAttribute("aria-expanded", "false");
  }
  launcher.addEventListener("click", function () {
    if (bot.classList.contains("open")) closeBot(); else openBot();
  });
  bot.querySelector(".kb-close").addEventListener("click", closeBot);
  document.querySelectorAll(".js-enquire").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openBot(el.getAttribute("data-category"));
    });
  });
})();


/* v2: fold the topbar into one pinned menu once the visitor starts reading */
/* v6: hysteresis - fold the topbar only well past the header, reopen only near the top;
   without a dead zone the fold/unfold fought the browser's scroll anchoring and the menu vibrated */
(function(){var folded=false;
addEventListener('scroll',function(){var y=window.scrollY||0;
if(!folded&&y>140){folded=true;document.documentElement.classList.add('scrolled');}
else if(folded&&y<50){folded=false;document.documentElement.classList.remove('scrolled');}},{passive:true});})();
