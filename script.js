let highestZIndex = 1050;

function makeWindowDraggable(windowEl) {
    const header = windowEl.querySelector('.window-header');
    if (!header) return;
    let currentX = windowEl.id === 'settings' ? 420 : 100;
    let currentY = 100;
    let startX = 0;
    let startY = 0;
    windowEl.style.transform = `translate(${currentX}px, ${currentY}px)`;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.closest('.close')) return;
        e.preventDefault();
        highestZIndex++;
        windowEl.style.zIndex = highestZIndex;
        startX = e.clientX;
        startY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let deltaX = e.clientX - startX;
        let deltaY = e.clientY - startY;
        startX = e.clientX;
        startY = e.clientY;
        currentX += deltaX;
        currentY += deltaY;
        windowEl.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function updateTaskbarIndicators() {
    let activeWindowId = null;
    let maxZ = -1;
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (popup.style.display === 'block' && popup.getAttribute('data-minimized') !== 'true') {
            let z = parseInt(popup.style.zIndex) || 0;
            if (z > maxZ) {
                maxZ = z;
                activeWindowId = popup.id;
            }
        }
    });
    
    popups.forEach(popup => {
        const btn = document.getElementById('btn-' + popup.id);
        if (!btn) return;
        const isVisible = popup.style.display === 'block';
        const isMinimized = popup.getAttribute('data-minimized') === 'true'
        if (isVisible || isMinimized) {
            if (popup.id === activeWindowId && !isMinimized) {
                btn.classList.add('active-window');
                btn.classList.remove('background-window');
            } else {
                btn.classList.remove('active-window');
                btn.classList.add('background-window');
            }
        } else {
            btn.classList.remove('active-window', 'background-window');
        }
    });
}

function startTaskbarClock() {
    const clockEl = document.getElementById('taskbar-clock');if (!clockEl) return;
    function updateClock() {
        const now = new Date();

        clockEl.innerText = now.toLocaleTimeString([], {
           hour: '2-digit',
           minute: '2-digit',
           second: '2-digit',
           hour12: true
        });
    }
    updateClock();
    setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    startTaskbarClock();

    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        makeWindowDraggable(popup);
        popup.addEventListener('mousedown', () => {
            highestZIndex++;
            popup.style.zIndex = highestZIndex
            updateTaskbarIndicators();
        });
    });
});

function showPopup(id) {
    const popup = document.getElementById(id);
    const taskbarBtn = document.getElementById("btn-" + id);
    if (taskbarBtn) {
        taskbarBtn.style.display = "flex";
    }

    popup.removeAttribute('data-minimized');
    popup.style.display = 'block';
    popup.style.visibility = 'visible';
    popup.style.position = 'absolute';

    highestZIndex++;
    popup.style.zIndex = highestZIndex;
    updateTaskbarIndicators();
}
function minimizePopup(id) {
    const popup = document.getElementById(id);
    popup.setAttribute('data-minimized', 'true');
    popup.style.display = 'none';
    updateTaskbarIndicators();
}

function closePopup(id) {
    const popupEl = document.getElementById(id);
    if (!popupEl) return;
    popupEl.removeAttribute('data-minimized');
    popupEl.style.display = 'none';

    const taskbarBtn = document.getElementById("btn-" + id);
    if (taskbarBtn) {
        taskbarBtn.style.display = "none";
    }
    updateTaskbarIndicators();
}

function calculate(op) {
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let result;
    if (op === '+') result = num1 + num2;
    else if (op === '-') result = num1 - num2;
    else if (op === '*') result = num1 * num2;
    else if (op === '/') result = num1 / num2;
    document.getElementById('calcResult').innerText = 'Result: ' + result;
}

const wallpapers = [
    'url(Assets/bd1.jpg)',
    'url(Assets/bd2.jpg)',
    'url(Assets/bd3.png)',
    'url(Assets/bd4.jpg)'
];

let currentWallpaperIndex = 1;
function changebd() {
    currentWallpaperIndex++;
    if (currentWallpaperIndex >= wallpapers.length) {
        currentWallpaperIndex = 0;
    }
    document.body.style.backgroundImage = wallpapers[currentWallpaperIndex];
}

function updateBrowserUrl() {
    let Url1 = document.getElementById('url1-input').value.trim();
    const app1 = document.getElementById('app1');
    const iframe1 = app1.querySelector('iframe');
    if (!iframe1) return;

    if (Url1 && !/^https?:\/\//i.test(Url1)) {
        Url1 = 'https://' + Url1;
        document.getElementById('url1-input').value = Url1
    }
    iframe1.src = Url1;
}

function updateBrowserUrl2() {
    let Url2 = document.getElementById('url2-input').value.trim();
    const app2 = document.getElementById('app2');
    const iframe2 = app2.querySelector('iframe');
    if (!iframe2) return;

    if (Url2 && !/^https?:\/\//i.test(Url2)) {
        Url2 = 'https://' + Url2;
        document.getElementById('url2-input').value = Url2
    }
    iframe2.src = Url2;
}

function login() {
    const username = document.getElementById("user-input").value.trim();
    document.getElementById("start-user").textContent = username || "Guest";

    const screen = document.getElementById("welcome-screen");
    screen.classList.add("hide");
    setTimeout(() => {
        screen.style.display = "none";
    }, 800);
}

function logout() {
    document.getElementById("user-input").value = "";
    document.getElementById("start-user").textContent = "Guest";

    const startMenu = document.getElementById("start");
    const offcanvas = bootstrap.Offcanvas.getInstance(startMenu);
    if (offcanvas) {
        offcanvas.hide();
    }

    document.querySelectorAll(".popup").forEach(popup => {
        popup.style.display = "none";
        popup.removeAttribute("data-minimized");
    });

    document.querySelectorAll(".apps-container .app").forEach(btn => {
        btn.style.display = "none";
        btn.classList.remove("active-window", "background-window");
    });

    const screen = document.getElementById("welcome-screen");
    screen.style.display = "flex";
    void screen.offsetWidth;
    screen.classList.remove("hide");
}

const sleeper = document.getElementById("sleep-screen");
function sleep() {
    sleeper.style.visibility = "visible";
}

sleeper.addEventListener("click", function() {
    sleeper.style.visibility = "hidden";
});