//Como activar la cámara:

//let 

//Colocar un tag video en el HTML
//<video></video>


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'video'
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });
});