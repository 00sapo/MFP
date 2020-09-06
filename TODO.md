# MFP - Music For Poors

MFP is an experimental live-coding environmnet completely written in HTML5.

MFP can be run from any sufficiently modern web browser.

MFP allows to play sound objects by pressing the keyboard keys.

MFP allows to change sound object parameters according to the key being pressed.

MFP provides external JavaScript libraries to create sound objects (for now: Tone.js).

MFP provides a flexible library to map JavaScript functions to the keyboard.

MFP provides a coding area with the ACE editor.

MFP's editor can be configured from `./js/ace-config.js`.

MFP works with the US layout for now.

## How to

Imagine the keyboard as a matrix. Keys from `1` to `/` (US layout) are the matrix cells. We have 4 rows and 10 columns. We can map sound objects to sub-matrices by specifying the top-left and bottom-right corners.

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

## TODO

1. Add utility to easily record sounds
2. Add utility to create loops with a modifier key
3. Add tabs to the editor
4. Add mouse support to control parameters


