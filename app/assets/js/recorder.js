Tone.context.addAudioWorkletModule('/assets/js/recorderWorkletProcessor.js', 'recorder-worklet');

class MFPRecorder {
  constructor(){
    this.data = [];
    this.source = new Tone.UserMedia();
    this.source.open().then(() => {console.log("mic opened!")})
  }

  start() {
    this.recorderNode = Tone.context.createAudioWorkletNode('recorder-worklet');
    this.source.connect(this.recorderNode);
    this.recorderNode.port.onmessage = (e) => {
      if (e.data.eventType === 'data') {
        this.data = this.data.concat(e.data.audioBuffer);
      }
    };

    this.recorderNode.parameters.get('isRecording').setValueAtTime(1, 0);
  }

  stop() {
    this.recorderNode.parameters.get('isRecording').setValueAtTime(0, 0);
  }

  getBuffer(){
    var data = concatenate(Float32Array, this.data)
    return Tone.ToneAudioBuffer.fromArray(data);
  }

  reset() {
    this.data = [];
  }
}

function concatenate(resultConstructor, arrays) {
    let totalLength = 0;
    for (let arr of arrays) {
        totalLength += arr.length;
    }
    let result = new resultConstructor(totalLength);
    let offset = 0;
    for (let arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
