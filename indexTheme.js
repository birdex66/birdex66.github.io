var themeCur = false;
var themeWatcher = document.getElementById('lighting_mode');

themeWatcher.addEventListener('click', () => {
    if(!themeCur){
        document.getElementById("pagestyle").setAttribute("href", "style/indexDarkStyle.css");
        themeWatcher.textContent="☾";
        themeCur = true;
    }else{
        document.getElementById("pagestyle").setAttribute("href", "style/indexLightStyle.css");
        themeWatcher.textContent="☼"
        themeCur = false;
    }
});

document.addEventListener('DOMContentLoaded', function () {
        if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var buttons = document.getElementsByClassName('buttons');
        var top = document.getElementById('top')
        top.style.marginTop = "8em";
        themeWatcher.style.height = "80px"
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.flexDirection = "column";
            buttons[i].style.gap = "5em";
        }
    }
});



