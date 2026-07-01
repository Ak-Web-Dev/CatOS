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
        if (popup.style.display === 'block') {
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
        if (popup.style.display === 'block') {
            if (popup.id === activeWindowId) {
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

document.addEventListener("DOMContentLoaded", () => {
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
    popup.style.display = 'block';
    popup.style.visibility = 'visible';
    popup.style.position = 'absolute';

    highestZIndex++;
    popup.style.zIndex = highestZIndex;
    updateTaskbarIndicators();
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
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
