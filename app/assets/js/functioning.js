cellSeparator = "^////$";
clicked = false;
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
        let text = editor.getSelectedText();
        if (!text) {
            // if no text was selected...
            // find previous cell separator
            let findOpts = {
                start: editor.getCursorPosition(),
                backwards: true,
                regExp: true,
                wrap: false
            }
            let objStart = editor.find(cellSeparator, findOpts);
            if (objStart == null)
                objStart = {row: 0, column: 0};
            else
                objStart = objStart.end

            // find next cell separator
            findOpts.backwards = false;
            let objEnd = editor.find(cellSeparator, findOpts);
            if (objEnd == null)
                objEnd = {row: editor.session.getLength(), column: 0};
            else
                objEnd = objEnd.start
            text = editor.session.getTextRange({start: objStart, end: objEnd});
        }
        eval(text);
    }
    toggle();
}
