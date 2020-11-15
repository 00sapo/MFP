# MFP - Music For Poors

MFP is an experimental live-coding environmnet completely written in HTML5.

MFP can be run from any sufficiently modern web browser.

MFP has a coding mode and a performance mode.

MFP allows to play sound objects by pressing the keyboard keys in the performance mode.

MFP allows to change sound object parameters according to the key being pressed.

MFP provides external JavaScript libraries to create sound objects (for now: Tone.js).

MFP provides a flexible library to map JavaScript functions to the keyboard in the coding mode.

MFP provides a coding area with the ACE editor.

MFP's editor can be configured from `./js/ace-config.js`.

MFP works with the US layout for now.

## How to

Imagine the keyboard as a matrix. Keys from `1` to `/` (US layout) are the matrix cells. We have 4 rows and 10 columns. We can map sound objects to sub-matrices by specifying the top-left and bottom-right corners.

MFP works by letting the user defining its own mapping. The user can select the
code and press `Ctrl+Enter` to evaluate it and go to performance mode, where he
can play music by pressing the keyboard keys. Cells are supported too: that
way, if user doesn't select any text, the current cell will be evaluated. If no
cell exists, the whole text is used.  Cells are delimited by lines containing
`////`.

In the following you will learn how to map sounds to the keys.

### Changing parameters at mapping time

To map objects, we use the function `map`:

```js
map(
  '1', 'v',
  function (i, j) {
    // with parameter computed during mapping
    return new Tone.Oscillator(220 + (i*j + j) * 50).toDestination();
  }
);

```

This maps an `Oscillator` object to the keys between `1` and `v` (`1` and `v` are the top-left and bottom-right corners). The third argument of `map` must be a function which takes as input two integers. These two integers are the indices in the sub-matrix in row-major order (that is: first argument is the row, second is the column). Thus, the function must return a sound object which is tied to that key in the sub-matrix. In this example, the pitch of the sound is computed only once: when it is mapped.

### Changing parameters at playing time

We can also define the function that will be used to start the sound object and to stop it. For instance:
```js
map(
  '5', '/',
  generator=function (i, j) {
    // with parameter computed at playing-time
    return new Tone.Synth().toDestination();
  },
  playfunc=function(obj, i, j) {
    obj.triggerAttack(220 + (i*j + j) * 50);
  }
);

```
In this example, the function that will play the sound objects is passed as third argument and will compute the parameters of the pitch each time the sound-object is played; in this way you can do even more complex things, such as modifying parameters based on other factors which can change from time to time. Similarly, a fifth argument is accepted for stopping the function.

If the fourth and fifth arguments are not passed, then MFP will try to call the `start` and `stop` or `triggerAttack` and `triggerRelease` functions.

### Recording sounds live

You can also record sounds and use them as sources. For this, we will use the Ton.js `AudioBuffer` object. First, type

```js
var rec = new MFPRecorder();
map('1', '1', function(){return rec});
```
Now, press `Ctrl+Enter` to enter the performance mode, then press `1` for recording the sound. Now, copy the buffer and remap it:

```js
var buffer = rec.getBuffer();

map('q', 's', function(i, j){ 
    // one different player for each key
    // you can also create effects to pipe sounds one into the other
    var effect = new Tone.Chorus(4 * (i + 1), 2.5 * (j + 1), 0.5 * (i + 1) / 2);
    return new Tone.Player(buffer).connect(effect).toDestination();
  }
);

## Developing

Important files:
* `app/assets/js/functioning.js`: utilities to toggle the running mode
    (coding/performance) and running user code
* `app/assets/js/mapping.js`: core stuffs for mapping objects to the keyboard usng Tone.js
* `app/assets/js/recorder.js`: utilities to record sounds using Tone.js
* `app/assets/js/recorderWorkletProcessor.js`: utilities to record sounds using Tone.js
* `app/assets/js/Tone.js`: the Tone.js library
* `app/assets/js/ace-config.js`: utilities to configure the editor
* `app/assets/css`: css styles for the app
* `app/index.html`: the base html with interface and included scripts
* `app/settings.json`: settings for neutralinojs

## TODO

1. Add utility to create loops with a modifier key
2. Add mouse support to control parameters
3. Add tabs to the editor
4. Add graphical representation of sounds and players
5. Add configuration yaml or json
