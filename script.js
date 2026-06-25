function toggleStartMenu() {
    let menu = document.getElementById('startMenu');
    if (menu.style.bottom === '90px') {
        menu.style.bottom = '-300px';
        setTimeout(() => menu.style.display = 'none', 300);
    } else {
        menu.style.display = 'block';
        setTimeout(() => menu.style.bottom = '90px', 10);
    }
}
function showPopup(id) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id).style.visibility = 'visible';
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

let highestZ = 1;

document.querySelectorAll('.popup').forEach(windowE1 => {
    const titlebar = windowE1.querySelector('.titlebar');

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titlebar.addEventListener('pointerdown', (e) => {
        dragging = true;
        offsetX = e.clientX - windowE1.offsetLeft;
        offsetY = e.clientY - windowE1.offsetTop;
        highestZ++;
        windowE1.style.zIndex = highestZ
        titlebar.style.cursor = 'grabbing';
    });
    document.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        windowE1.style.left = (e.clientX - offsetX) + 'px';
        windowE1.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('pointerup', () => {
        dragging = false;
        titlebar.style.cursor = 'grab';
    });
});