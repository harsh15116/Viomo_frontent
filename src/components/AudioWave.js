import React, { useEffect, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioWaveform = ({ fileUrl }) => {
  const waveformRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // create a new WaveSurfer instance
    const waveform = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'hsl(51.24, 100%, 63.73%)',
      progressColor: 'hsl(51.24, 100%, 40%)',
      cursorColor: 'hsl(51.24, 100%, 40%)',
      barWidth: 2,
      barHeight: 1,
      barGap: null,
      height: 100,
    });
  
    // load the audio file
    waveform.load(fileUrl);
  
    // initialize the timer
    const timer = waveformRef.current.appendChild(document.createElement('div'));
    timer.className = 'timer';
    timer.textContent = '00:00';
    timerRef.current = timer;
  
    // initialize the play/pause button
    const but = document.createElement("button");
    but.setAttribute("type", "button");
    but.className = "recording-btn";
    const playPauseButton = waveformRef.current.appendChild(but);
    playPauseButton.className = 'play-pause-button recording-btn';
    playPauseButton.textContent = 'Play';
    playPauseButton.addEventListener('click', () => {
      if (waveform.isPlaying()) {
        waveform.pause();
        playPauseButton.textContent = 'Play';
      } else {
        waveform.play();
        playPauseButton.textContent = 'Pause';
      }
    });
  
    // update the timer on playback progress
    waveform.on('audioprocess', () => {
      const currentTime = waveform.getCurrentTime();
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
      timerRef.current.textContent = `${minutes}:${seconds}`;
    });
  
    // clean up the WaveSurfer instance, timer, and buttons on unmount
    return () => {
      waveform.destroy();
      timerRef.current.remove();
      playPauseButton.remove();
    };
  }, [fileUrl]);
  

  return (
    <>
      <div ref={waveformRef}></div>
    </>
  );
};

export default AudioWaveform;
