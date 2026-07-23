/**
 * Rex Moran Loba — Executive Portfolio SPA
 * Vanilla JS router + renderers. No jQuery / Bootstrap dependency.
 */

const SPA = {
    contentDiv: null,
    flatEngagements: [],
    flatRecognitions: [],
    typeTimer: null,
    revealObserver: null,

    init() {
        this.contentDiv = document.getElementById('spa-content');
        this.bindEvents();
        this.initModal();
        this.handleRouting();
    },

    bindEvents() {
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.href && anchor.href.includes(window.location.origin) && !anchor.target) {
                const url = new URL(anchor.href);
                const path = url.pathname.split('/').pop() || 'index.html';
                if (['index.html', 'experiences.html', 'engagement.html', 'RecognitionCertificates.html'].includes(path)) {
                    e.preventDefault();
                    document.body.classList.remove('menu-open');
                    this.navigate(path, url.hash);
                }
            }
        });

        window.addEventListener('popstate', () => this.handleRouting());
    },

    navigate(path, hash = '') {
        if (window.location.pathname.endsWith(path) && window.location.hash === hash) return;
        history.pushState(null, '', path + hash);
        this.handleRouting();
    },

    async handleRouting() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const hash = window.location.hash;

        document.body.classList.add('spa-transitioning');
        await new Promise(r => setTimeout(r, 280));

        this.updateActiveLinks(path);
        if (this.typeTimer) { clearTimeout(this.typeTimer); this.typeTimer = null; }

        switch (path) {
            case 'experiences.html':
                this.renderExperiences(hash.substring(1));
                break;
            case 'engagement.html':
                this.renderEngagements();
                break;
            case 'RecognitionCertificates.html':
                this.renderRecognitions();
                break;
            default:
                this.renderHome();
        }

        window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
        this.initReveals();

        setTimeout(() => document.body.classList.remove('spa-transitioning'), 60);
    },

    updateActiveLinks(path) {
        document.querySelectorAll('.site-nav a').forEach(a => {
            const aPath = a.getAttribute('href').split('/').pop();
            a.classList.toggle('active', aPath === path || (path === '' && aPath === 'index.html'));
        });
    },

    initReveals() {
        if (this.revealObserver) this.revealObserver.disconnect();
        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('in');
                    this.revealObserver.unobserve(en.target);
                }
            });
        }, { threshold: 0.08 });
        this.contentDiv.querySelectorAll('.reveal').forEach((el, i) => {
            el.style.setProperty('--reveal-delay', `${Math.min(i % 8, 5) * 0.07}s`);
            this.revealObserver.observe(el);
        });
    },

    initModal() {
        const modal = document.getElementById('imageModal');
        if (!modal) return;
        modal.addEventListener('click', () => modal.classList.remove('open'));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') modal.classList.remove('open');
        });
    },

    // --- View renderers ---

    renderHome() {
        const h = heroData;
        this.contentDiv.innerHTML = `
            <section class="hero">
                <div class="wrap">
                    <div class="hero-portrait reveal">
                        <div class="portrait-seal"><img data-cdn-src="logos/BIGKIS LOGO" alt="BIGKIS"></div>
                        <img src="${Maindata.mainprofilephoto}" alt="Rex Moran Loba" loading="eager">
                    </div>
                    <div class="hero-text">
                        <span class="kicker reveal">${h.kicker}</span>
                        <h1 class="reveal">${h.name}</h1>
                        <div class="hero-roles reveal"><span id="typeTarget"></span><span class="type-cursor"></span></div>
                        <p class="hero-summary reveal">${h.summary}</p>
                        <div class="hero-actions reveal">
                            <a class="btn btn-gold" data-cdn-href="files/cv" target="_blank">Download CV</a>
                            <a class="btn" href="./experiences.html">View Career</a>
                            <a class="btn" href="./engagement.html">Engagements</a>
                        </div>
                        <div class="hero-contacts reveal">
                            <a href="${h.contacts.phoneHref}">
                                <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
                                ${h.contacts.phone} <span style="opacity:.55;font-size:.78rem;">(WhatsApp / Viber)</span>
                            </a>
                            <a href="mailto:${h.contacts.email}">
                                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                ${h.contacts.email}
                            </a>
                            <a href="${h.contacts.facebook}" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z"/></svg>
                                BIGKIS Inc. on Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="stats-band">
                <div class="wrap">
                    ${h.stats.map(s => `
                        <div class="stat reveal">
                            <div class="stat-value">${s.value}</div>
                            <div class="stat-label">${s.label}</div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section">
                <div class="wrap">
                    <div class="section-head reveal">
                        <span class="kicker">Affiliations</span>
                        <h2>Organizations &amp; Institutions Served</h2>
                    </div>
                    <div class="card-grid">
                        ${IndexCompanyList.map(comp => `
                            <a href="${comp.href}" class="org-card reveal">
                                <span class="org-logo"><img src="${comp.imgsrc}" alt="" loading="lazy"></span>
                                <h4>${comp.name}</h4>
                                <span class="org-role">${comp.role}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        this.startTypewriter(h.roles);
    },

    startTypewriter(strings) {
        const el = document.getElementById('typeTarget');
        if (!el) return;
        let si = 0, ci = 0, deleting = false;
        const tick = () => {
            const target = document.getElementById('typeTarget');
            if (!target) return; // navigated away
            const str = strings[si];
            if (!deleting) {
                ci++;
                target.textContent = str.substring(0, ci);
                if (ci === str.length) {
                    deleting = true;
                    this.typeTimer = setTimeout(tick, 2200);
                    return;
                }
                this.typeTimer = setTimeout(tick, 55);
            } else {
                ci--;
                target.textContent = str.substring(0, ci);
                if (ci === 0) {
                    deleting = false;
                    si = (si + 1) % strings.length;
                }
                this.typeTimer = setTimeout(tick, 26);
            }
        };
        tick();
    },

    renderExperiences(targetKey) {
        this.contentDiv.innerHTML = `
            <section class="section">
                <div class="wrap">
                    <div class="section-head reveal">
                        <span class="kicker">Career</span>
                        <h2>Professional Experience</h2>
                    </div>
                    <div class="detail-panel reveal">
                        <div class="detail-media" id="expMedia"></div>
                        <div class="detail-body">
                            <div class="detail-org" id="expName"></div>
                            <h3 id="expTitle"></h3>
                            <div class="detail-period" id="expPeriod"></div>
                            <div class="detail-rule"></div>
                            <div class="detail-desc" id="expDesc"></div>
                        </div>
                    </div>
                    <br><br>
                    <div class="section-head reveal">
                        <span class="kicker">Select a role</span>
                        <h2 style="font-size:1.5rem;">Positions Held</h2>
                    </div>
                    <div class="card-grid">
                        ${Object.keys(experiencesdata).map(key => {
                            const exp = experiencesdata[key];
                            const isHtml = exp.photo.trim().startsWith('<');
                            const logo = isHtml ? exp.photo : `<img src="${exp.photo}" alt="" loading="lazy">`;
                            return `
                                <div class="org-card reveal" id="${key}" data-key="${key}" onclick="SPA.loadExperienceData('${key}')">
                                    <span class="org-logo">${logo}</span>
                                    <h4>${exp.name}</h4>
                                    <span class="org-role">${exp.period || ''}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </section>
        `;
        this.loadExperienceData(targetKey && experiencesdata[targetKey] ? targetKey : Object.keys(experiencesdata)[0], !targetKey);
    },

    loadExperienceData(key, skipScroll) {
        const data = experiencesdata[key];
        if (!data) return;

        const media = document.getElementById('expMedia');
        const isHtml = data.photo.trim().startsWith('<');
        media.innerHTML = isHtml
            ? `<div class="logo-pair" style="width:100%;">${data.photo}</div>`
            : `<img src="${data.photo}" alt="">`;
        if (window.cdnSwapDataAttrs) cdnSwapDataAttrs(media);

        document.getElementById('expName').innerHTML = data.name.replace(/<br\s*\/?>/gi, ' ');
        document.getElementById('expTitle').innerHTML = data.title;
        document.getElementById('expPeriod').innerHTML = data.period || '';
        document.getElementById('expDesc').innerHTML = data.description;

        document.querySelectorAll('.org-card[data-key]').forEach(c =>
            c.classList.toggle('selected', c.dataset.key === key));

        if (!skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderEngagements() {
        const flat = [];
        let idx = 0;
        let groupsHtml = '';

        for (const company in engagementsdata) {
            const cards = engagementsdata[company].map(eng => {
                const i = idx++;
                flat.push({ ...eng, companyname: company });
                return `
                    <div class="thumb-card reveal" data-idx="${i}" onclick="SPA.loadEngagementData(${i})">
                        <div class="thumb-img"><img src="${eng.photo}" alt="" loading="lazy"></div>
                        <div class="thumb-label">${eng.meetingname}</div>
                    </div>
                `;
            }).join('');
            groupsHtml += `
                <div class="group-block">
                    <h3 class="group-title reveal">${company}</h3>
                    <div class="thumb-grid">${cards}</div>
                </div>
            `;
        }
        this.flatEngagements = flat;

        this.contentDiv.innerHTML = `
            <section class="section">
                <div class="wrap">
                    <div class="section-head reveal">
                        <span class="kicker">Engagements</span>
                        <h2>Meetings, Programs &amp; Public Service</h2>
                    </div>
                    <div class="detail-panel reveal">
                        <div class="detail-media">
                            <img src="" id="engPhoto" class="zoomable" alt="" onclick="LoadImageIntoModal(this.src)">
                        </div>
                        <div class="detail-body">
                            <div class="detail-org" id="engCompany"></div>
                            <h3 id="engTitle"></h3>
                            <div class="detail-rule"></div>
                            <div class="detail-desc" id="engDesc"></div>
                        </div>
                    </div>
                    <br><br>
                    ${groupsHtml}
                </div>
            </section>
        `;
        this.loadEngagementData(0, true);
    },

    loadEngagementData(index, skipScroll) {
        const data = this.flatEngagements[index];
        if (!data) return;
        document.getElementById('engPhoto').src = data.photo;
        document.getElementById('engCompany').innerHTML = data.companyname;
        document.getElementById('engTitle').innerHTML = data.meetingname;
        document.getElementById('engDesc').innerHTML = data.description;
        document.querySelectorAll('.thumb-card[data-idx]').forEach(c =>
            c.classList.toggle('selected', Number(c.dataset.idx) === index));
        if (!skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderRecognitions() {
        const flat = [];
        let idx = 0;
        let groupsHtml = '';

        for (const type in recognitioncertificates) {
            const cards = recognitioncertificates[type].map(item => {
                const i = idx++;
                flat.push(item);
                return `
                    <div class="thumb-card reveal" data-idx="${i}" onclick="SPA.loadRecognitionData(${i})">
                        <div class="thumb-img"><img src="${item.photo}" alt="" loading="lazy"></div>
                        <div class="thumb-label">${item.name}</div>
                    </div>
                `;
            }).join('');
            groupsHtml += `
                <div class="group-block">
                    <h3 class="group-title reveal">${type}</h3>
                    <div class="thumb-grid">${cards}</div>
                </div>
            `;
        }
        this.flatRecognitions = flat;

        this.contentDiv.innerHTML = `
            <section class="section">
                <div class="wrap">
                    <div class="section-head reveal">
                        <span class="kicker">Honors</span>
                        <h2>Recognitions &amp; Certificates</h2>
                    </div>
                    <div class="detail-panel reveal">
                        <div class="detail-media">
                            <img src="" id="recPhoto" class="zoomable" alt="" onclick="LoadImageIntoModal(this.src)">
                        </div>
                        <div class="detail-body">
                            <div class="detail-org">Recognition</div>
                            <h3 id="recTitle"></h3>
                            <div class="detail-rule"></div>
                            <div class="detail-desc" id="recDesc"></div>
                        </div>
                    </div>
                    <br><br>
                    ${groupsHtml}
                </div>
            </section>
        `;
        this.loadRecognitionData(0, true);
    },

    loadRecognitionData(index, skipScroll) {
        const data = this.flatRecognitions[index];
        if (!data) return;
        document.getElementById('recPhoto').src = data.photo;
        document.getElementById('recTitle').innerHTML = data.name;
        document.getElementById('recDesc').innerHTML = data.description;
        document.querySelectorAll('.thumb-card[data-idx]').forEach(c =>
            c.classList.toggle('selected', Number(c.dataset.idx) === index));
        if (!skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

function LoadImageIntoModal(imgsrc) {
    if (!imgsrc) return;
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    if (!modal || !fullImage) return;
    fullImage.src = imgsrc;
    modal.classList.add('open');
}

function startSPA() {
    if (window.SPA_INITIALIZED) return;
    if (typeof heroData === 'undefined' || typeof Maindata === 'undefined') return;
    window.SPA_INITIALIZED = true;
    SPA.init();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startSPA();
} else {
    document.addEventListener('DOMContentLoaded', startSPA);
}
window.addEventListener('cdn:ready', startSPA);

/* ============================================================
   PWA install — beforeinstallprompt + appinstalled (Android/Chromium),
   with an iOS Safari add-to-home-screen fallback hint.
   The button + hint markup live in index.html and start hidden;
   this script reveals them only when an install path is available.
   ============================================================ */
(function () {
    var IOS_HINT_DISMISSED_KEY = 'pwa:ios-hint-dismissed';

    function isStandalone() {
        return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
               window.navigator.standalone === true;
    }

    function isIosSafari() {
        var ua = window.navigator.userAgent || '';
        var isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        // Exclude in-app browsers (FB, Twitter, GMail webview, Chrome on iOS, etc.) — those can't add to home screen.
        var isStandaloneCapable = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Twitter|Instagram|Line/.test(ua);
        return isIos && isStandaloneCapable;
    }

    function showButton(btn) { if (btn) btn.hidden = false; }
    function hideButton(btn) { if (btn) btn.hidden = true; }

    function init() {
        if (isStandalone()) return; // Already installed — nothing to do.

        var btn = document.getElementById('pwaInstallBtn');
        var hint = document.getElementById('iosInstallHint');
        var hintClose = document.getElementById('iosInstallHintClose');

        // beforeinstallprompt is captured by an inline script in index.html so the
        // event isn't missed if it fires before spa.js loads. We consume the cached
        // event (if already fired) and listen for future installable events.
        function refresh() {
            if (window.__pwaDeferredPrompt) showButton(btn); else hideButton(btn);
        }
        refresh();
        window.addEventListener('pwa:installable', refresh);
        window.addEventListener('beforeinstallprompt', function (e) {
            // Defensive — if index.html's listener didn't run for some reason, capture here too.
            e.preventDefault();
            window.__pwaDeferredPrompt = e;
            showButton(btn);
        });

        if (btn) {
            btn.addEventListener('click', function () {
                var prompted = window.__pwaDeferredPrompt;
                if (!prompted) return;
                window.__pwaDeferredPrompt = null;
                hideButton(btn);
                prompted.prompt();
                if (prompted.userChoice && typeof prompted.userChoice.then === 'function') {
                    prompted.userChoice.catch(function () { /* noop */ });
                }
            });
        }

        function onInstalled() {
            window.__pwaDeferredPrompt = null;
            hideButton(btn);
            if (hint) hint.hidden = true;
        }
        window.addEventListener('appinstalled', onInstalled);
        window.addEventListener('pwa:installed', onInstalled);

        // iOS fallback: Safari doesn't fire beforeinstallprompt. If we're on iOS Safari, not
        // already installed, and the user hasn't dismissed the hint, show the add-to-home-screen banner.
        if (hint && isIosSafari()) {
            var dismissed = false;
            try { dismissed = window.localStorage.getItem(IOS_HINT_DISMISSED_KEY) === '1'; } catch (e) { /* private mode */ }
            if (!dismissed) {
                // Slight delay so the banner doesn't fight with first paint.
                setTimeout(function () { hint.hidden = false; }, 1200);
            }
            if (hintClose) {
                hintClose.addEventListener('click', function () {
                    hint.hidden = true;
                    try { window.localStorage.setItem(IOS_HINT_DISMISSED_KEY, '1'); } catch (e) { /* noop */ }
                });
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* ============================================================
   Share button — navigator.share (Web Share API) with a
   navigator.clipboard.writeText fallback. Hidden only when
   neither API is usable (very old browsers / insecure context).
   Toast notification gives the user feedback for the fallback path.
   ============================================================ */
(function () {
    function canShare() { return typeof navigator !== 'undefined' && typeof navigator.share === 'function'; }
    function canCopy() {
        return typeof navigator !== 'undefined' &&
               navigator.clipboard &&
               typeof navigator.clipboard.writeText === 'function' &&
               window.isSecureContext === true;
    }

    var toastEl = null;
    var toastTimer = null;
    var toastHideTimer = null;
    function showToast(message) {
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'pwaShareToast';
            toastEl.className = 'pwa-share-toast';
            toastEl.setAttribute('role', 'status');
            toastEl.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastEl);
        }
        if (toastTimer) clearTimeout(toastTimer);
        if (toastHideTimer) clearTimeout(toastHideTimer);
        toastEl.textContent = message;
        toastEl.hidden = false;
        // Force a reflow so re-triggering the animation works.
        void toastEl.offsetWidth;
        toastEl.classList.add('is-visible');
        toastTimer = setTimeout(function () {
            toastEl.classList.remove('is-visible');
            // Hide after the fade-out finishes so it doesn't catch pointer events.
            toastHideTimer = setTimeout(function () { if (toastEl) toastEl.hidden = true; }, 250);
        }, 2000);
    }

    function fallbackCopy(url) {
        if (!canCopy()) {
            showToast("Sharing isn't supported on this browser");
            return;
        }
        navigator.clipboard.writeText(url).then(function () {
            showToast('Link copied to clipboard');
        }).catch(function () {
            showToast("Couldn't copy link");
        });
    }

    function buildShareData() {
        var desc = '';
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && typeof metaDesc.content === 'string') desc = metaDesc.content.trim();
        var data = { title: document.title, url: window.location.href };
        if (desc) data.text = desc;
        return data;
    }

    function init() {
        var btn = document.getElementById('pwaShareBtn');
        if (!btn) return;

        // No share path available at all — hide the button.
        if (!canShare() && !canCopy()) {
            btn.hidden = true;
            return;
        }

        btn.addEventListener('click', function () {
            var data = buildShareData();
            // When canShare is present (Chromium), validate the payload first.
            // If it rejects the shape, drop straight to the clipboard fallback.
            var canShareData = (typeof navigator.canShare === 'function')
                ? navigator.canShare(data)
                : canShare();
            if (canShare() && canShareData) {
                // navigator.share() can throw SYNCHRONOUSLY (TypeError on bad
                // payload, NotAllowedError when the user gesture was consumed).
                // Wrap in try/catch so a sync throw falls through to clipboard,
                // and chain .catch() for async rejections.
                try {
                    var p = navigator.share(data);
                    if (p && typeof p.catch === 'function') {
                        p.catch(function (err) {
                            // AbortError = user dismissed the share sheet — silent.
                            if (err && err.name === 'AbortError') return;
                            // Other failures (NotAllowedError, etc.) — fall back to clipboard.
                            fallbackCopy(data.url);
                        });
                    }
                } catch (err) {
                    fallbackCopy(data.url);
                }
                return;
            }
            fallbackCopy(data.url);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
