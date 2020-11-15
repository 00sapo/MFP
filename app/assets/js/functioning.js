clicked = false
function toggle() {
    if (!clicked) {
        document.getElementById("press_area").style["background"] = "white"
        document.getElementById('header').innerHTML = 'Pressed keys: '
        clicked = true
        showkeys()
    } else {
        document.getElementById("press_area").style["background"] = "grey"
        document.getElementById("header").innerHTML = "Click me to start playing"
        document.getElementById("pressed_keys").innerHTML = '';
        clicked = false
    }
}

function showkeys() {
    if (clicked) {
        document.getElementById("pressed_keys").innerHTML = keyMap.join(', ');
        setTimeout(showkeys, 100);
    }
}

function execute(editor) {
    if (!clicked) {
        text = editor.getSelectedText();
        eval(text);
    }
    toggle();
}
