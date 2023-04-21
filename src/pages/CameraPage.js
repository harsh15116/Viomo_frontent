import React, { Fragment, useState } from "react";
import "./CameraPage.css";
import Sidenav from "./Sidenav";
import Recorder from "./Recorder";
import AudioRecorder from "./AudioRecorder";
import artist from "../assests/Artists";
function CameraPage() {
  const [audioFile, setAudioFile] = useState(null);
  const [theme, setTheme] = useState("");
  const [option, setOption] = useState("music");
  const [option1, setOption1] = useState("");
  const [upscale, setUpscale] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleThemeClick = (selectedTheme) => {
    setTheme(selectedTheme);
  };
  const handleradioButton = (option) => {
    setOption1(option);
  };

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };

  const handleUpscaleCheckbox = (event) => {
    const checked = event.target.checked;
    setUpscale(checked);
  };

  var myArray = artist
  
  //audio recorder function
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingButtonClass, setRecordingButtonClass] =
    useState("recording-button");

  const chunks = [];
  const startRecording = () => {
    setRecordingButtonClass("recording-btn recording");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);

        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    mediaRecorder.stop();
    setRecordingButtonClass("recording-btn");
  };

  const playAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = audioURL;
    link.download = "recording.wav";
    document.body.appendChild(link);
    link.click();
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioURL(url);
  };

  const handleAudioPlay = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const audio = new Audio(audioURL);
    console.log(audio, "audio");
    console.log("theme id--", theme);
    console.log("options--", option);
    console.log("upscale--", upscale);
  };
  return (
    <>
      <Sidenav />
      <div className="Form">
        <div className="heading">Create your own music</div>
        <form onSubmit={handleSubmit}>
          <div className="Form-group">
            <label>Record or Upload Audio:</label>
            <div >
              <div className="optionsgg">
              <input
                type="radio"
                name="audioOption"
                value="record"
                onClick={() => handleradioButton("record")}
              />{" "}
              Record
              <input
                type="radio"
                name="audioOption"
                value="upload"
                onClick={() => handleradioButton("upload")}
              />{" "}
              Upload
              </div>
              {console.log(option1, "option1")}
              {option1 === "record" && (
                <div>
                  {" "}
                  <div>
                    <label htmlFor="record">Record Audio:</label>
                    {audioURL && (
                      <div>
                        {/* <button onClick={playAudio}>Play Audio</button> */}
                        <audio src={audioURL} controls />
                        <button onClick={downloadAudio} className="download-button" >Download Audio</button>
                      </div>
                    )}

                    {recording ? (
                      <div>
                        Recording...
                        <div className="Stop">
                          <button
                            className={recordingButtonClass}
                            onClick={stopRecording}
                          >
                            Stop Recording
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="recording-btn"
                        onClick={startRecording}
                      >
                        Start Recording
                      </button>
                    )}
                    {!recording && (
                      <button
                        type="button"
                        onClick={() => setAudioURL(null)}
                        className="recording-btn"
                      >
                        Record Another
                      </button>
                    )}
                  </div>
                </div>
              )}
              {option1 === "upload" && (
                <div>
                  <label class="choose-file-button" htmlFor="audio">
                    Choose file
                  </label>
                  <input
                    type="file"
                    id="audio"
                    name="audio"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{ display: "none" }}
                  />

                  {audioURL && (
                    <div>
                      {/* <button
                        onClick={handleAudioPlay}
                        disabled={audioURL ? false : true}
                      >
                        Play
                      </button> */}
                      <audio src={audioURL} controls />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="Form-group">
            <label>Theme:</label>
            <div className="Themes">
              {myArray.map((item) => (
                <div className={item.id === theme ? "gg" : ""}>
                  <div
                    // key={item.id}
                    className="box"
                    onClick={() => handleThemeClick(item.id)}
                  >
                    <img src={item.link} alt={item.name} />
                    <div className="titlet">Theme Name: {item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="Form-group">
            <label>Option:</label>
            <div className="optionsgg">
              <input
                type="radio"
                name="option"
                value="music"
                checked={option === "music"}
                onChange={handleOptionSelect}
              />{" "}
              Music
              <input
                type="radio"
                name="option"
                value="music+theme"
                checked={option === "music+theme"}
                onChange={handleOptionSelect}
              />{" "}
              {console.log(option)}
              Music + Theme
              <input
                type="radio"
                name="option"
                value="theme"
                checked={option === "theme"}
                onChange={handleOptionSelect}
              />{" "}
              Theme
            </div>
          </div>
          <div className="Form-group">
            Upscale:{"   "}
            <input
              type="checkbox"
              checked={upscale}
              onChange={handleUpscaleCheckbox}
            />
          </div>
          <button type="submit" className="recording-btn">
            Create Music
          </button>
        </form>
      </div>
    </>
  );
}

export default CameraPage;
