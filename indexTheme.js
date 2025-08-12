let themeCur = false;
let themeWatcher = document.getElementById('lighting_mode');
let firstThemeSwitch = true;

window.addEventListener('load', () => {
    hideLoader();
});

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('fade-out');
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

themeWatcher.addEventListener('click', () => {
    switchTheme();
});


function switchTheme(){
    if (firstThemeSwitch) showLoader();

    const newHref = themeCur ? "indexLightStyle.css" : "indexDarkStyle.css";
    const newThemeLink = document.createElement('link');
    newThemeLink.rel = "stylesheet";
    newThemeLink.href = newHref;

    newThemeLink.onload = async () => {
        const oldLink = document.getElementById("pagestyle");
        if (oldLink) oldLink.remove();
        newThemeLink.id = "pagestyle";

        if(firstThemeSwitch){
            //await waitForImagesToLoad();
            await preloadBackgroundImages([
                'img/Lawrencium.jpg',
                'img/github-mark/github-mark-white.png',
                'img/in-logo/in-logo/InBug-White.png',
                'img/github-mark/github-mark.png',
                'img/in-logo/in-logo/InBug-Black.png',
                'img/badges/x86 Assembly-525252_2.svg',
                'img/badges/MIPS Assembly-525252.svg',
                'img/badges/C-A8B9CC.svg',
                'img/badges/C++-00599C.svg',
                'img/badges/C%23-239120.svg',
                'img/badges/Python-3776AB.svg',
                'img/badges/javascript.svg',
                'img/badges/Windows-0078D6.svg',
                'img/badges/Linux-FCC624.svg',
                'img/badges/Unix-000000.svg',
                'img/badges/Git-F05032.svg',
                'img/badges/GitHub-181717.svg',
                'img/badges/OpenSSL-721412.svg',
                'img/badges/Spring Boot-6DB33F.svg',
                'img/badges/HTML5-E34F26.svg',
                'img/badges/CSS3-1572B6.svg',
                'img/badges/Node.svg',
                'img/badges/Electron-47848F.svg'
            ]);
            firstThemeSwitch = !firstThemeSwitch;
        }

        themeWatcher.textContent = themeCur ? "☼" : "☾";
        themeCur = !themeCur;
        applyMobileStyles();
        hideLoader();
    };
    document.head.appendChild(newThemeLink);
}

function preloadBackgroundImages(urls) {
    return Promise.all(urls.map(url => new Promise((res, rej) => {
        const img = new Image();
        img.src = url;
        img.onload = res;
        img.onerror = res;
    })));
}

function waitForImagesToLoad() {
    return new Promise((resolve, reject) => {
        const images = Array.from(document.images);  // All <img> tags in the document
        const svgs = Array.from(document.querySelectorAll('svg'));  // Inline SVGs
        let loaded = 0;
        let failed = 0;

        if (images.length === 0 && svgs.length === 0) {
            resolve();  // Resolve immediately if there are no images
            return;
        }

        // Handle <img> elements (including SVG images used as <img>)
        images.forEach((img) => {
            if (img.complete && img.naturalHeight !== 0) {
                loaded++;
                // console.log("Loaded (preloaded):", img);
            } else {
                img.addEventListener('load', check);
                img.addEventListener('error', check);
                // console.log("Waiting for:", img);
            }
        });
        function check(event) {
            loaded++;
            if (event && event.type === 'error') {
                failed++;
                console.error("Failed to load image:", event.target);
            }

            // Check if all images are loaded (or failed)
            if (loaded + failed === images.length + svgs.length) {
                if (failed > 0) {
                    reject(`Failed to load ${failed} image(s)`); // Reject if any image failed to load
                } else {
                    resolve();  // Resolve only if all images are loaded
                }
            }
        }
    });
}





function applyMobileStyles() {
    if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        let buttons = document.getElementsByClassName('buttons');
        let top = document.getElementById('top');
        let intro = document.querySelector('.intro');
        // let content = document.querySelector('.cont')
        console.log(window.location.pathname);

        top.style.marginTop = "4em";

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.flexDirection = "column";
            buttons[i].style.gap = "6em";
        }

        intro.style.transformOrigin = "top";
        intro.style.transform = "scale(1.3)";
        intro.style.marginBottom = window.innerHeight - intro.getBoundingClientRect().bottom + 45  + "px";
        console.log()
        // content.style.transformOrigin = "top";
        // content.style.transform = "scale(0.65)";

        let header = document.querySelector('header');
        let themeWatcher = document.getElementById('lighting_mode');
        let home = document.getElementById('home');

        themeWatcher.style.height = "4.063rem";
        themeWatcher.style.fontSize="2.813rem";

        header.style.width = "78%";
        header.style.height = "5rem"

        home.style.width = "2.813rem";
        home.style.height = "4.063rem";

        header.style.transformOrigin = "top";
        header.style.transform = "scale(1.3)";
    }
}


document.addEventListener('DOMContentLoaded', function () {
    applyMobileStyles();
});
