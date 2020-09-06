var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

editor.commands.addCommand({
  name: 'execute',
  bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
  exec: function(editor) {
    eval(editor.getValue());
    toggle();
  },
  readOnly: true // false if this command should not apply in readOnly mode
});
