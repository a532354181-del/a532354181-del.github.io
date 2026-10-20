/* ============================================================
   小佑 · 站点交互与渲染
   依赖 data.js 中的 window.SITE_DATA，无需构建工具。
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.SITE_DATA || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- 图标库 ---------- */
  var P = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.4 3.9 5.6 3.9 9S14.5 18.6 12 21c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3z"/>',
    app: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    wave: '<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m7 9 3 3-3 3M13 15h4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    code: '<path d="m9 8-5 4 5 4M15 8l5 4-5 4"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    play: '<path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    download: '<path d="M12 4v11M8 11l4 4 4-4M4 19h16"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };

  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : "") + ">" + (P[name] || P.spark) + "</svg>";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- 作品卡片 ---------- */
  function workCard(w, i) {
    var num = String(i + 1).padStart(2, "0");
    var href = w.link || "#";
    var external = /^https?:/i.test(href);
    return '' +
      '<a class="work-card" href="' + esc(href) + '" style="--h:' + (w.hue || 168) + ';--d:' + (i % 3) * 70 + 'ms"' +
        (external ? ' target="_blank" rel="noopener"' : "") + ' data-reveal>' +
        '<div class="cover">' +
          '<span class="cover-num">' + num + '</span>' +
          '<span class="cover-glyph">' + icon(w.icon) + '</span>' +
          '<span class="chip is-accent cover-type">' + esc(w.type) + '</span>' +
        '</div>' +
        '<div class="work-body">' +
          '<h3>' + esc(w.title) + icon("arrow") + '</h3>' +
          '<p>' + esc(w.summary) + '</p>' +
          '<div class="work-meta">' +
            (w.tags || []).slice(0, 2).map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join("") +
            '<span class="year">' + esc(w.year) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  function mountWorks() {
    var box = $("[data-works]");
    if (!box) return;
    var list = (DATA.works || []).slice();
    if (box.hasAttribute("data-featured")) list = list.filter(function (w) { return w.featured; });
    var limit = Number(box.getAttribute("data-limit") || 0);
    if (limit > 0) list = list.slice(0, limit);
    box.innerHTML = list.map(workCard).join("");

    /* 筛选器 */
    var filterBox = $("[data-filters]");
    if (filterBox) {
      var types = ["全部"];
      (DATA.works || []).forEach(function (w) {
        if (types.indexOf(w.type) === -1) types.push(w.type);
      });
      filterBox.innerHTML = types.map(function (t, i) {
        return '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button" data-filter="' + esc(t) + '">' + esc(t) + "</button>";
      }).join("");

      filterBox.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter");
        if (!btn) return;
        $$(".filter", filterBox).forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var val = btn.getAttribute("data-filter");
        $$(".work-card", box).forEach(function (card) {
          var type = $(".cover-type", card).textContent.trim();
          card.style.display = val === "全部" || type === val ? "" : "none";
        });
      });
    }
  }

  /* ---------- Skills ---------- */
  function skillCard(s, i) {
    var id = "copy-" + i;
    return '' +
      '<article class="skill-card" data-reveal style="--d:' + (i % 2) * 80 + 'ms">' +
        '<div class="skill-top">' +
          '<span class="skill-icon">' + icon(s.icon) + '</span>' +
          '<div><h3>' + esc(s.name) + '</h3><div class="skill-en">' + esc(s.en) + ' · ' + esc(s.category) + '</div></div>' +
        '</div>' +
        '<p class="desc">' + esc(s.desc) + '</p>' +
        '<div class="snippet"><button class="copy-btn" type="button" data-copy="' + esc(s.snippet) + '" aria-label="复制命令" title="复制命令">' + icon("copy") + '</button>' + esc(s.snippet) + '</div>' +
        '<div class="skill-tags">' + (s.tags || []).map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + '</div>' +
      '</article>';
  }

  function mountSkills() {
    var box = $("[data-skills]");
    if (!box) return;
    var limit = Number(box.getAttribute("data-limit") || 0);
    var list = (DATA.skills || []).slice();
    if (limit > 0) list = list.slice(0, limit);
    box.innerHTML = list.map(skillCard).join("");
  }

  /* ---------- 配音列表 ---------- */
  function voiceRow(v, i) {
    var bars = (v.wave || []).map(function (h) {
      return "<i style=\"height:" + Math.max(4, Math.min(30, h)) + "px\"></i>";
    }).join("");
    return '' +
      '<div class="voice-row" data-voice="' + i + '">' +
        '<button class="play-btn" type="button" data-play aria-label="播放 ' + esc(v.title) + '">' +
          '<span class="icon-play">' + icon("play") + '</span>' +
          '<span class="icon-pause">' + icon("pause") + '</span>' +
        '</button>' +
        '<div class="voice-main">' +
          '<div class="voice-title"><strong>' + esc(v.title) + '</strong><span>' + esc(v.voice) + '</span></div>' +
          '<div class="voice-sub">' + esc(v.desc) + '</div>' +
          '<div class="wave" aria-hidden="true">' + bars + '</div>' +
          '<div class="progress" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
            '<span class="bar"></span><span class="knob"></span>' +
          '</div>' +
        '</div>' +
        '<div class="voice-actions">' +
          '<div class="voice-dur"><span class="time">' + esc(v.duration) + '</span><small>' + esc(v.format) + " · " + esc(v.size) + '</small></div>' +
          '<a class="download-btn" href="' + esc(v.file) + '" download>' + icon("download") + '下载</a>' +
        '</div>' +
      '</div>';
  }

  function mountVoices() {
    var boxes = $$("[data-voices]");
    if (!boxes.length) return;
    boxes.forEach(function (box) {
      var list = (DATA.voices || []).slice();
      var limit = Number(box.getAttribute("data-limit") || 0);
      if (limit > 0) list = list.slice(0, limit);
      box.innerHTML = list.map(function (v, i) { return voiceRow(Object.assign({}, v, { _i: i }), i); }).join("");
    });

    var current = null; // { audio, row }

    function fmt(sec) {
      if (!isFinite(sec)) return "00:00";
      var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
      return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    }

    function reset(row) {
      row.classList.remove("is-playing");
      var bar = $(".bar", row), knob = $(".knob", row);
      if (bar) bar.style.width = "0%";
      if (knob) knob.style.left = "0%";
      var t = $(".time", row);
      var idx = row.getAttribute("data-voice");
      if (t && DATA.voices[idx]) t.textContent = DATA.voices[idx].duration;
      var btn = $("[data-play]", row);
      if (btn) btn.setAttribute("aria-label", "播放");
    }

    $$(".voice-row").forEach(function (row) {
      var idx = Number(row.getAttribute("data-voice"));
      var data = (DATA.voices || [])[idx];
      if (!data) return;
      var audio = new Audio(data.file);
      audio.preload = "none";
      var btn = $("[data-play]", row);
      var progress = $(".progress", row);
      var bar = $(".bar", row);
      var knob = $(".knob", row);
      var timeEl = $(".time", row);

      function paint() {
        var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        bar.style.width = pct + "%";
        knob.style.left = pct + "%";
        progress.setAttribute("aria-valuenow", Math.round(pct));
        if (timeEl) timeEl.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
      }

      btn.addEventListener("click", function () {
        if (current && current.audio !== audio) {
          current.audio.pause();
          reset(current.row);
        }
        if (audio.paused) {
          audio.play().then(function () {
            row.classList.add("is-playing");
            btn.setAttribute("aria-label", "暂停");
            current = { audio: audio, row: row };
          }).catch(function () {
            /* 音频缺失或被浏览器拦截时，直接提示下载 */
            window.open(data.file, "_blank");
          });
        } else {
          audio.pause();
          row.classList.remove("is-playing");
          btn.setAttribute("aria-label", "播放");
        }
      });

      audio.addEventListener("timeupdate", paint);
      audio.addEventListener("loadedmetadata", paint);
      audio.addEventListener("ended", function () { reset(row); current = null; });

      progress.addEventListener("click", function (e) {
        if (!audio.duration) return;
        var r = progress.getBoundingClientRect();
        audio.currentTime = Math.min(audio.duration, Math.max(0, (e.clientX - r.left) / r.width) * audio.duration);
        paint();
      });
      progress.addEventListener("keydown", function (e) {
        if (!audio.duration) return;
        if (e.key === "ArrowRight") { audio.currentTime = Math.min(audio.duration, audio.currentTime + 3); e.preventDefault(); }
        if (e.key === "ArrowLeft") { audio.currentTime = Math.max(0, audio.currentTime - 3); e.preventDefault(); }
      });
    });
  }

  /* ---------- 复制命令 ---------- */
  function bindCopy() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy]");
      if (!btn) return;
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.classList.add("is-done");
        btn.innerHTML = icon("check");
        setTimeout(function () { btn.classList.remove("is-done"); btn.innerHTML = icon("copy"); }, 1600);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------- 数字滚动 ---------- */
  function countUp(el, shouldReduce) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\d+)(.*)$/);
    if (!m) return;
    var target = Number(m[1]), suffix = m[2] || "", start = null;
    function step(ts) {
      if (shouldReduce && shouldReduce()) { el.textContent = raw; return; }
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / 900);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = "0" + suffix;
    requestAnimationFrame(step);
  }

  /* ---------- 导航 / 滚动 / 动效 ---------- */
  function bindUI() {
    var motionQuery = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)");
    var reduceMotion = !!(motionQuery && motionQuery.matches);
    var header = $(".site-header");
    var progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);
    var scrollFrame = 0;
    function updateScroll() {
      if (header) header.classList.toggle("is-stuck", window.scrollY > 12);
      var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var ratio = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      progress.style.transform = "scaleX(" + ratio + ")";
    }
    function onScroll() {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(function () { scrollFrame = 0; updateScroll(); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    var toggle = $(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$(".mobile-menu a").forEach(function (a) {
        a.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    var page = document.body.getAttribute("data-page");
    if (page) {
      $$(".nav a, .mobile-menu a").forEach(function (a) {
        if (a.getAttribute("data-nav") === page) a.classList.add("is-active");
      });
    }

    $$(".term-body .ln").forEach(function (line, i) {
      line.style.setProperty("--line-delay", (220 + i * 65) + "ms");
    });
    $$(".voice-row, .stat, .tl-item").forEach(function (el, i) {
      el.setAttribute("data-reveal", "");
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", (i % 4) * 65 + "ms");
    });
    var items = $$("[data-reveal]");
    var io = null;
    if (!reduceMotion && "IntersectionObserver" in window) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: "0px 0px -5% 0px", threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("is-in"); });
    }

    var resetCards = [];
    $$(".work-card, .skill-card").forEach(function (card) {
      var frame = 0, x = 0, y = 0;
      function reset() {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        card.classList.remove("is-pointing");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
      }
      resetCards.push(reset);
      card.addEventListener("pointermove", function (e) {
        if (reduceMotion || !finePointer || !finePointer.matches || e.pointerType !== "mouse") return;
        x = e.clientX; y = e.clientY;
        if (frame) return;
        frame = requestAnimationFrame(function () {
          frame = 0;
          if (reduceMotion || !finePointer.matches) { reset(); return; }
          var rect = card.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          var px = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
          var py = Math.max(0, Math.min(1, (y - rect.top) / rect.height));
          card.classList.add("is-pointing");
          card.style.setProperty("--rx", ((0.5 - py) * 6).toFixed(2) + "deg");
          card.style.setProperty("--ry", ((px - 0.5) * 6).toFixed(2) + "deg");
          card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        });
      }, { passive: true });
      card.addEventListener("pointerleave", reset);
      card.addEventListener("pointercancel", reset);
    });
    window.addEventListener("blur", function () { resetCards.forEach(function (reset) { reset(); }); });

    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    var stats = $$(".stat b");
    var so = null;
    if (stats.length && !reduceMotion && "IntersectionObserver" in window) {
      so = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            countUp(en.target, function () { return reduceMotion; });
            so.unobserve(en.target);
          }
        });
      }, { threshold: 0.6 });
      stats.forEach(function (el) { so.observe(el); });
    }
    function syncMotionPreference() {
      reduceMotion = !!(motionQuery && motionQuery.matches);
      document.body.classList.toggle("motion-ready", !reduceMotion);
      if (reduceMotion) {
        if (io) io.disconnect();
        if (so) so.disconnect();
        items.forEach(function (el) { el.classList.add("is-in"); });
        resetCards.forEach(function (reset) { reset(); });
      }
    }
    if (motionQuery) {
      if (motionQuery.addEventListener) motionQuery.addEventListener("change", syncMotionPreference);
      else if (motionQuery.addListener) motionQuery.addListener(syncMotionPreference);
    }
    syncMotionPreference();
  }

  /* ---------- 个人信息绑定 ---------- */
  function mountProfile() {
    var p = DATA.profile || {};

    $$("[data-bind]").forEach(function (el) {
      var k = el.getAttribute("data-bind");
      if (p[k] != null && p[k] !== "") el.textContent = p[k];
    });
    $$("[data-bind-html]").forEach(function (el) {
      var k = el.getAttribute("data-bind-html");
      if (p[k]) el.innerHTML = p[k];
    });

    $$("[data-email]").forEach(function (a) {
      if (!p.email) return;
      a.href = "mailto:" + p.email;
      if (a.hasAttribute("data-email-text")) a.textContent = p.email;
    });

    var statBox = $("[data-stats]");
    if (statBox && p.stats) {
      statBox.innerHTML = p.stats.map(function (s) {
        return '<div class="stat"><b>' + esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
      }).join("");
    }

    $$("[data-socials]").forEach(function (box) {
      if (!p.socials) return;
      box.innerHTML = p.socials.map(function (s) {
        var ext = /^https?:/i.test(s.href);
        return '<a href="' + esc(s.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(s.label) + "</a>";
      }).join("");
    });

    var nowBox = $("[data-now]");
    if (nowBox && p.now) {
      nowBox.innerHTML = p.now.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    }

    var tl = $("[data-timeline]");
    if (tl && DATA.timeline) {
      tl.innerHTML = DATA.timeline.map(function (it) {
        return '<div class="tl-item"><span class="tl-year">' + esc(it.year) + "</span>" +
          "<h4>" + esc(it.title) + "</h4><p>" + esc(it.desc) + "</p></div>";
      }).join("");
    }
  }

  /* ---------- 自我介绍 ---------- */
  function mountIntro() {
    var p = DATA.profile || {};
    var intro = p.intro || {};

    $$("[data-intro-title]").forEach(function (el) {
      if (intro.title) el.textContent = intro.title;
    });
    $$("[data-intro-lead]").forEach(function (el) {
      if (intro.lead) el.textContent = intro.lead;
    });
    $$("[data-intro-facts]").forEach(function (box) {
      if (!intro.facts) return;
      box.innerHTML = intro.facts.map(function (f) {
        return "<li><span>" + esc(f.k) + "</span><b>" + esc(f.v) + "</b></li>";
      }).join("");
    });
    $$("[data-about]").forEach(function (box) {
      if (!p.about) return;
      box.innerHTML = p.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    });
    $$("[data-doing]").forEach(function (box) {
      if (!p.doing) return;
      box.innerHTML = p.doing.map(function (d, i) {
        return '<article class="step" data-reveal style="--d:' + i * 80 + 'ms">' +
          '<span class="step-num">0' + (i + 1) + "</span>" +
          "<h3>" + esc(d.title) + "</h3><p>" + esc(d.desc) + "</p></article>";
      }).join("");
    });
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    mountProfile();
    mountIntro();
    mountWorks();
    mountSkills();
    mountVoices();
    bindCopy();
    bindUI();
  });
})();
