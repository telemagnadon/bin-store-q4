/**
 * Rex Moran Loba Portfolio - SPA Router
 * This script handles seamless transitions between sections.
 */

const SPA = {
    contentDiv: null,
    currentPath: '',
    
    init() {
        this.contentDiv = document.getElementById('spa-content');
        this.bindEvents();
        this.handleRouting();
        console.log('SPA Initialized');
    },

    bindEvents() {
        // Intercept all clicks on <a> tags that point to our pages
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.href && anchor.href.includes(window.location.origin) && !anchor.target) {
                const url = new URL(anchor.href);
                const path = url.pathname.split('/').pop() || 'index.html';
                
                // If it's one of our internal pages
                if (['index.html', 'experiences.html', 'engagement.html', 'RecognitionCertificates.html'].includes(path)) {
                    e.preventDefault();
                    this.navigate(path, url.hash);
                }
            }
        });

        // Handle back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRouting();
        });
    },

    navigate(path, hash = '') {
        if (window.location.pathname.endsWith(path) && window.location.hash === hash) return;
        
        history.pushState(null, '', path + hash);
        this.handleRouting();
    },

    async handleRouting() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const hash = window.location.hash;

        this.showTransition();
        
        // Wait a bit for the fade out
        await new Promise(r => setTimeout(r, 300));

        this.updateActiveLinks(path);

        switch (path) {
            case 'index.html':
            case '':
                this.renderHome();
                break;
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

        // Scroll to top or hash
        if (hash) {
            const el = document.getElementById(hash.substring(1));
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        this.hideTransition();
    },

    showTransition() {
        document.body.classList.add('spa-transitioning');
    },

    hideTransition() {
        setTimeout(() => {
            document.body.classList.remove('spa-transitioning');
        }, 100);
    },

    updateActiveLinks(path) {
        document.querySelectorAll('.cv_menus a').forEach(a => {
            const aPath = a.getAttribute('href').split('/').pop();
            if (aPath === path || (path === '' && aPath === 'index.html')) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    },

    // --- View Renderers ---

    renderHome() {
        this.contentDiv.innerHTML = `
            <div class="cv_banner_wrapper">
                <div class="cv_container container-fluid">
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="cv_banner_img">
                                <img src="${Maindata.mainprofilephoto}" id="MainProfilePic" class="img-fluid bnr-boy" loading="lazy">
                                <img src="./Portfolio Responsive HTML Template_files/bnr-line.png" class="bnr-line" loading="lazy">
                                <img src="./Portfolio Responsive HTML Template_files/bnr-star.png" class="bnr-star" loading="lazy">
                                <img src="./Portfolio Responsive HTML Template_files/bnr-sqr.png" class="bnr-sqr" loading="lazy">
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="cv_banner_text">
                                <h1>Hello! <span><img src="./Portfolio Responsive HTML Template_files/hand.svg" class="img-fluid"></span> I Am</h1>
                                <h1 class="cv_profile_name">Rex Moran Loba</h1>
                                <br>
                                <div class="cv_banner_box">
                                    <div class="row">
                                        <div class="col-12"><a href="tel:+639497776001">
                                            <img src="./icons/mobile.png" style="width: 20px;height: 20px; filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="">
                                            <h5 style="background-color: transparent; color:white;  text-transform: lowercase;"> <span style="text-transform: capitalize;">Mobile / WhatsApp / Viber:</span> 0949 777 6001</h5>
                                        </a></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12"><a href="mailto:rexm.loba@gmail.com">
                                            <img src="./icons/email.png" style="width: 20px;height: 20px; filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="">
                                            <h5 style="background-color: transparent; color:white;   text-transform: lowercase; "> <span style="text-transform: capitalize;">Email:</span> rexm.loba@gmail.com</h5>
                                        </a></div>
                                    </div>
                                </div>
                                <br>
                                <div class="row cv_banner_box" style="background-color: transparent; border: 0;">
                                    <div class="col"><a href="./files/cv.pdf" target="_blank">
                                        <center><img src="./icons/resume.png" style="width: 75%; height:75%; filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="" loading="lazy"><br>
                                        <h6 class="banner_box_icon_text" style="color: white; font-size: 2dvw;">CV</h6></center>
                                    </a></div>
                                    <div class="col"><a href="engagement.html">
                                        <center><img src="./icons/engagements.png" style="width: 75%; height:75%; filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="" loading="lazy"><br>
                                        <h6 class="banner_box_icon_text" style="color: white; font-size: 2dvw;">Engagement</h6></center>
                                    </a></div>
                                    <div class="col"><a href="experiences.html">
                                        <center><img src="./icons/careers.png" style="width: 75%; height:75%;  filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="" loading="lazy"><br>
                                        <h6 class="banner_box_icon_text" style="color: white;  font-size: 2dvw;">Career</h6></center>
                                    </a></div>
                                    <div class="col"><a href="RecognitionCertificates.html">
                                        <center><img src="./icons/recognitions.png" style="width: 75%; height:75%;  filter: brightness(0) invert(1);" class="cv_toggle_btn" alt="" loading="lazy"><br>
                                        <h6 class="banner_box_icon_text" style="color: white; font-size: 2dvw;">Recognition</h6></center>
                                    </a></div>
                                </div>
                                <br>
                            </div>
                            <div class="cv_banner_box">
                                <h3><b>Technical Specialist</b>  - Presidential Commission for the Urban Poor</h3>
                                <p style="font-size: 1.1rem; line-height: 1.6; font-family: 'Arial', sans-serif; ">
                                    With over 20 years of experience in Business Operations Management,
                                    I specialize in overseeing day-to-day operations. My
                                    responsibilities include analyzing business processes, identifying
                                    customer needs, and formulating effective business strategies
                                    based on thorough feasibility studies in line with current industry
                                    trends.
                                </p>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div class="cv_banner_box">
                        <center><h2 class="">I have worked for the following</h2></center>
                        <br><br>
                        <div class="row">
                            ${IndexCompanyList.map(comp => `
                                <div class="${comp.col || 'col-4'}">
                                    <a href="${comp.href}">
                                        <center>
                                            <img src="${comp.imgsrc}" style="width: 60%;height: 60%;" class="cv_toggle_btn" alt="" loading="lazy"><br><br>
                                            <h4 style="color: white; font-size:2vw;">${comp.name}</h4>
                                        </center>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                        <br><br>
                        <center>
                            <a href="experiences.html" class="btn btn-default" style="color:white ; background-color: transparent; border: 1px solid white; font-size: 90%;">View My Experiences</a>
                        </center>
                    </div>
                </div>
            </div>
        `;
        this.initTyping();
    },

    initTyping() {
        const el = document.querySelector('.cv_profile_name');
        if (el) {
            window.ityped.init(el, {
                strings: ['Rex M. Loba', 'Technical Specialist', 'Presidential Commission for the Urban Poor'],
                loop: true,
                typeSpeed: 200,
                backSpeed: 100,
                showCursor: false,
            });
        }
    },

    renderExperiences(targetKey) {
        this.contentDiv.innerHTML = `
            <div class="cv_banner_wrapper">
                <div class="cv_container container-fluid">
                    <div class="cv_banner_box">
                        <div class="cv_banner_box" style="background-color: transparent; opacity: 0.4;">
                            <center><h2 id="Company-Name"></h2></center>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="cv_banner_box CompanyLogoBox">
                                    <img src="" id="photobox" class="CompanyLogoIMG" loading="lazy">
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="cv_banner_box" style="width: 100%; height: 100%; overflow: hidden;">
                                    <center><h4 id="Position-Title"></h4></center>
                                    <br>
                                    <h5 id="Position-Description" style="font-weight: lighter;"></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div class="cv_banner_box">
                        <center><h2 class="">I have worked for the following</h2></center>
                        <br><br>
                        <div class="row">
                            ${Object.keys(experiencesdata).map(key => {
                                const photoData = experiencesdata[key].photo;
                                const isHtml = photoData.trim().startsWith('<');
                                const photoHtml = isHtml
                                    ? `<div style="width: 60%; margin: 0 auto;">${photoData}</div>`
                                    : `<img src="${photoData}" style="width: 60%;height: 100%;" class="cv_toggle_btn" alt="">`;
                                return `
                                <div class="col-xl-4">
                                    <div class="cv_banner_box" style="width: 100%; height: 100%; object-fit: cover;">
                                        <a href="javascript:void(0);" onclick="SPA.loadExperienceData('${key}')">
                                            <center>
                                                ${photoHtml}<br><br>
                                                <h4 style="color: white;">${experiencesdata[key].name}</h4>
                                            </center>
                                        </a>
                                    </div>
                                </div>
                            `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.loadExperienceData(targetKey || Object.keys(experiencesdata)[0]);
    },

    loadExperienceData(key) {
        const data = experiencesdata[key];
        if (!data) return;

        const photoBox = document.getElementById('photobox');
        const isHtml = data.photo.trim().startsWith('<');
        if (isHtml) {
            // Replace the img element with a container for the HTML logos
            const container = document.createElement('div');
            container.id = 'photobox';
            container.className = 'CompanyLogoIMG';
            container.style.cssText = 'width:100%; display:flex; justify-content:center; align-items:center;';
            container.innerHTML = data.photo;
            photoBox.replaceWith(container);
        } else {
            // If photobox was replaced with a div, restore the img element
            const currentBox = document.getElementById('photobox');
            if (currentBox.tagName !== 'IMG') {
                const img = document.createElement('img');
                img.id = 'photobox';
                img.className = 'CompanyLogoIMG';
                img.loading = 'lazy';
                img.src = data.photo;
                currentBox.replaceWith(img);
            } else {
                currentBox.src = data.photo;
            }
        }

        document.getElementById('Company-Name').innerHTML = data.name;
        document.getElementById('Position-Title').innerHTML = data.title;
        document.getElementById('Position-Description').innerHTML = data.description;
        
        // Scroll to top to see the loaded data
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderEngagements() {
        this.contentDiv.innerHTML = `
            <div class="cv_banner_wrapper">
                <div class="cv_container container-fluid">
                    <div class="cv_banner_box">
                        <div class="cv_banner_box" style="background-color: transparent; opacity: 0.4;">
                            <center><h2 id="Company-Name"></h2></center>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="cv_banner_box CompanyLogoBox">
                                    <img src="" id="photobox" class="CompanyLogoIMG" style="cursor:pointer" onclick="LoadImageIntoModal(this.src);" loading="lazy">
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="cv_banner_box" style="width: 100%; height: 100%; overflow: hidden;">
                                    <center><h4 id="Position-Title"></h4></center>
                                    <br>
                                    <h5 id="Position-Description" style="font-weight: lighter;"></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div class="cv_banner_box">
                        <center><h2 class="">Important Meetings and Engagements</h2></center>
                        <br><br>
                        <div id="EngagementSections"></div>
                    </div>
                </div>
            </div>
        `;

        const sectionsDiv = document.getElementById('EngagementSections');
        let html = '';
        let globalIndex = 0;
        const flatEngagements = [];

        for (const company in engagementsdata) {
            html += `<div class="cv_banner_box"><h3>${company}</h3><br><div class="row">`;
            engagementsdata[company].forEach(eng => {
                const currentIdx = globalIndex++;
                flatEngagements.push({...eng, companyname: company});
                html += `
                    <div class="${window.innerWidth < 430 ? 'col-6' : 'col-2'}">
                        <div class="cv_banner_box" style="width: 100%; height: 100%; object-fit: cover; padding:5px;">
                            <a href="javascript:void(0);" onclick="SPA.loadEngagementData(${currentIdx})">
                                <center>
                                    <img src="${eng.photo}" style="width: 50%; height: 100%;" class="cv_toggle_btn" loading="lazy"><br>
                                    <h6 style="color: white; font-size:1.2vw; padding-top:10px;">${eng.meetingname}</h6>
                                </center>
                            </a>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        sectionsDiv.innerHTML = html;
        this.flatEngagements = flatEngagements;
        this.loadEngagementData(0);
    },

    loadEngagementData(index) {
        const data = this.flatEngagements[index];
        if (!data) return;
        document.getElementById('photobox').src = data.photo;
        document.getElementById('Company-Name').innerHTML = data.companyname;
        document.getElementById('Position-Title').innerHTML = data.meetingname;
        document.getElementById('Position-Description').innerHTML = data.description;

        // Scroll to top to see the loaded data
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderRecognitions() {
        this.contentDiv.innerHTML = `
            <div class="cv_banner_wrapper">
                <div class="cv_container container-fluid">
                    <div class="cv_banner_box">
                        <div class="cv_banner_box" style="background-color: transparent; opacity: 0.4;">
                            <center><h2 id="Company-Name">Recognition and Certificates</h2></center>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="cv_banner_box CompanyLogoBox">
                                    <img src="" id="photobox" class="CompanyLogoIMG" style="cursor:pointer" onclick="LoadImageIntoModal(this.src);" loading="lazy">
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="cv_banner_box" style="width: 100%; height: 100%; overflow: hidden;">
                                    <center><h4 id="Position-Title"></h4></center>
                                    <br>
                                    <h5 id="Position-Description" style="font-weight: lighter;"></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div class="cv_banner_box">
                        <center><h2 class="">Recognition And Certificates</h2></center>
                        <br><br>
                        <div id="RecognitionSections"></div>
                    </div>
                </div>
            </div>
        `;

        const sectionsDiv = document.getElementById('RecognitionSections');
        let html = '';
        let globalIndex = 0;
        const flatRecognitions = [];

        for (const type in recognitioncertificates) {
            html += `<div class="cv_banner_box"><h3>${type}</h3><br><div class="row">`;
            recognitioncertificates[type].forEach(item => {
                const currentIdx = globalIndex++;
                flatRecognitions.push(item);
                html += `
                    <div class="${window.innerWidth < 430 ? 'col-6' : 'col-2'}">
                        <div class="cv_banner_box" style="width: 100%; height: 100%; object-fit: cover; padding:5px;">
                            <a href="javascript:void(0);" onclick="SPA.loadRecognitionData(${currentIdx})">
                                <center>
                                    <img src="${item.photo}" style="width: 50%; height: 100%;" class="cv_toggle_btn" loading="lazy"><br>
                                    <h6 style="color: white; font-size:1.2vw; padding-top:10px;">${item.name}</h6>
                                </center>
                            </a>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        sectionsDiv.innerHTML = html;
        this.flatRecognitions = flatRecognitions;
        this.loadRecognitionData(0);
    },

    loadRecognitionData(index) {
        const data = this.flatRecognitions[index];
        if (!data) return;
        document.getElementById('photobox').src = data.photo;
        document.getElementById('Position-Title').innerHTML = data.name;
        document.getElementById('Position-Description').innerHTML = data.description;

        // Scroll to top to see the loaded data
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Initialize SPA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SPA.init();
});
