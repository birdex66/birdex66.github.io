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
            await preloadBackgroundImages([
                'img/Handshake_avatar_round.png',
                'img/Lawrencium.jpg',
                'img/Petrol.jpg',
                'img/octy.jpg',
                'img/badges/Csharp.svg',
                'img/badges/html5.svg',
                'img/badges/java.svg',
                'img/badges/C++-00599C.svg',
                'img/badges/IntelliJIDEA-000000.svg',
                'img/badges/python.svg',
                'img/badges/javascript.svg',
                'img/badges/C-A8B9CC.svg',
                'img/badges/Linux.svg',
                'img/badges/springBoot.svg',
                'img/badges/Ubuntu.svg',
                'img/badges/x86 Assembly-525252_2.svg',
                'img/badges/Electron-47848F.svg',
                'img/badges/NeoVim.svg',
                'img/badges/Windows-0078D6.svg',
                'img/badges/Git-F05032.svg',
                'img/badges/Node.svg',
                'img/badges/androidStudio.svg',
                'img/badges/GitHub-181717.svg',
                'img/badges/Notepad++.svg',
                'img/badges/githubPages.svg',
                'img/github-mark/github-mark-white.png',
                'img/github-mark/github-mark-white.svg',
                'img/github-mark/github-mark.png',
                'img/github-mark/github-mark.svg',
                'img/in-logo/in-logo',
                'img/projects/calcJS.png',
                'img/projects/checkIn.png',
                'img/projects/computeConvert.png',
                'img/projects/passwordManager.png',
                'img/projects/tetris.png',
                'img/projects/website.png'
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
        intro.style.marginBottom = "30em";
        //intro.style.marginBottom = window.innerHeight - intro.getBoundingClientRect().bottom + 45  + "px";
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

const form = document.getElementById("contactForm");
const err = document.getElementById("err");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const token = await turnstile.getResponse();
    if (!token) {
        showMessage("Please complete the CAPTCHA.", "error");
        return;
    }

    const formData = new FormData(form);
    formData.append("cf-turnstile-response", token);

    emailjs.sendForm("service_nzfyjiy", "template_0rwa4v9", this)
        .then(() => {
            showMessage("Message sent successfully!", "errorGood");
        }, (error) => {
            showMessage(`Failed to send message: ${error.text}`, "error");
        });

    form.reset();
    turnstile.reset();
});

function showMessage(message, className) {
    err.className = "";
    err.classList.add(className);
    err.innerHTML = `<strong>${message}</strong>`;
    err.style.display = "block";
    err.style.opacity = "1";

    setTimeout(() => {
        err.classList.add("fade-out");
        setTimeout(() => {
            err.innerHTML = "";
            err.className = "";
            // err.style.display = "none";
            err.style.opacity = "0";
        }, 500);
    }, 3000);
}
