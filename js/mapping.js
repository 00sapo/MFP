  // the keyboard layout
let keyboardLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
]

let playMap = {
  stop: function () {
    for (let el in this) {
      if (typeof(el) === 'string'){
        let [obj, playfunc, stopfunc, i, j] = this[el]
        stopfunc(obj, i, j)
      }
    }
  },
  '1': null,
  '2': null,
  '3': null,
  '4': null,
  '5': null,
  '6': null,
  '7': null,
  '8': null,
  '9': null,
  '0': null,
  'q': null,
  'w': null,
  'e': null,
  'r': null,
  't': null,
  'y': null,
  'u': null,
  'i': null,
  'o': null,
  'p': null,
  'a': null,
  's': null,
  'd': null,
  'f': null,
  'g': null,
  'h': null,
  'j': null,
  'k': null,
  'l': null,
  ';': null,
  'z': null,
  'x': null,
  'c': null,
  'v': null,
  'b': null,
  'n': null,
  'm': null,
  ',': null,
  '.': null,
  '/': null
}

function charToTable(c) {
  for (i = 0; i < keyboardLayout.length; i++) {
    for (j = 0; j < keyboardLayout[i].length; j++) {
      if (keyboardLayout[i][j] == c) {
        return [i, j]
      }
    }
  }
  throw "Character not found!"
}

function tableToChar(i, j) {
  if (i > keyboardLayout.length)
    throw "i index too large"
  if (j > keyboardLayout[i].length)
    throw "j index too large"
  return keyboardLayout[i][j]
}

function getRectangle(tl, br) {

  var tl = charToTable(tl)
  var br = charToTable(br)

  var out = []
  for (i = tl[0]; i < br[0] + 1; i++) {
    var newRow = []

    for (j = tl[1]; j < br[1] + 1; j++) {
      newRow.push(keyboardLayout[i][j])
    }
    out.push(newRow)
  }

  return out

}

function defaultPlayfunc(obj, i, j) {
  if ("start" in obj)
    obj.start()
  if ("triggerAttack" in obj)
    obj.triggerAttack()
}

function defaultStopfunc(obj, i, j) {
  if ("stop" in obj)
    obj.stop()
  if ("triggerRelease" in obj)
    obj.triggerRelease()
}

/**
 * 
 * @param {char} tl - the top left character.
 * @param {char} br - the bottom right character.
 * @param {function} generator - a function which returns an object with
 *   a `start()` and a `stop()` method or a `triggerAttack` and 
 *  `triggerRelease`; it accepts `i` and `j` being the 
 *   indices of the key in the rectangle defined by `tl` and `br`; each
 *   key is then associated with the output of this function at the 
 *   corresponding indices.
 * @param {function} playfunc - similar to `generator`, but called each 
 *  time a key is pressed; it must also accept the object produced by 
 *  `generator`; by default it just call the method `start` or 
 *  `triggerAttack` on that object.
 * @param {function} stopfunc - same as `playfunc` but called when the
 *  key is released; by default calls the method `stop` or `triggerRelease`.
 * 
 */
function map(tl, br, generator,
  playfunc = defaultPlayfunc,
  stopfunc = defaultStopfunc) {

  rect = getRectangle(tl, br)
  for (var i = 0; i < rect.length; i++) {
    for (var j = 0; j < rect[i].length; j++) {
      var obj = generator(i, j)
      playMap[rect[i][j]] = [obj, playfunc, stopfunc, i, j]
    }
  }
}

var keyMap = [];

window.addEventListener('keydown', (e) => {
  if (clicked) {
    e.preventDefault()
    if (!keyMap.includes(e.key)) {
      keyMap.push(e.key)
      var [obj, playfunc, stopfunc, i, j] = playMap[e.key]
      playfunc(obj, i, j)
    }
  }
})

window.addEventListener('keyup', (e) => {
  if (clicked) {
    e.preventDefault()
    if (keyMap.includes(e.key)) {
      keyMap.splice(keyMap.indexOf(e.key), 1)
      var [obj, playfunc, stopfunc, i, j] = playMap[e.key]
      stopfunc(obj, i, j)  
    }
  }
})
