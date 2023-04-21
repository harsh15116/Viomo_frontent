import React, { useState } from 'react';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);

        const chunks = [];
        recorder.addEventListener('dataavailable', event => {
          chunks.push(event.data);
        });

        recorder.addEventListener('stop', () => {
          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const playAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioURL;
    link.download = 'recording.wav';
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      {audioURL && (
        <div>
          <button onClick={playAudio}>Play Audio</button>
          <button onClick={downloadAudio}>Download Audio</button>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
