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
    if (body.style.backgroundImage === 'url("Assets/1.png")') {
        body.style.backgroundImage = 'url("Assets/2.png")';
    } else {
        body.style.backgroundImage = 'url("Assets/1.png")';
    }
}
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.backgroundColor = document.body.classList.contains('dark-theme') ? 'black' : 'white';
        popup.style.color = document.body.classList.contains('dark-theme') ? 'white' : 'black';
    });
}