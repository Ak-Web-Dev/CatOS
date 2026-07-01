let highestZIndex = 1050;
function makeWindowDraggable(windowEl) {
    const header = windowEl.querySelector('.window-header');
    if (!header) return;
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.closest('.close')) return;
        e.preventDefault();

        highestZIndex++;
        windowEl.style.zIndex = highestZIndex;
        mouseX = e.clientX;
        mouseY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        posX = mouseX - e.clientX;
        posY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        windowEl.style.top = (windowEl.offsetTop - posY) + "px";
        windowEl.style.left = (windowEl.offsetLeft - posX) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.addEventListener ("DOMContentLoaded", () => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        makeWindowDraggable(popup);
        popup.addEventListener('mousedown', () => {
            highestZIndex++;
            popup.style.zIndex = highestZIndex;
        });
    });
});

function showPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'block'; 

    if (!popup.style.top) {
        popup.style.top = "100px";
    }
    if (!popup.style.left) {
        popup.style.left = id === 'settings' ? "420px" : "100px"; 
    }
    highestZIndex++;
    popup.style.zIndex = highestZIndex;
}
function closePopup(id) {
    document.getElementById(id).style.display = 'none';
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

function changeBackground() {
    let body = document.body;
    if (body.classList.contains("bdtwo")) {
        body.classList.remove("bdtwo");
    } else {
        body.classList.add("bdtwo");
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.backgroundColor = document.body.classList.contains('dark-theme') ? 'black' : 'white';
        popup.style.color = document.body.classList.contains('dark-theme') ? 'white' : 'black';
    });
}