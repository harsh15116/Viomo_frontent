import React, { Fragment, useEffect, useRef, useState } from "react";
import "./CameraPage.css";
import Sidenav from "./Sidenav";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import artist from "../assests/Artists";
import AudioWaveform from "../components/AudioWave";
function CameraPage() {
  const [theme, setTheme] = useState([]);
  const [option, setOption] = useState("music");
  const [option1, setOption1] = useState("");
  const [upscale, setUpscale] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioInputRef = useRef(null);

  const handleThemeClick = (selectedTheme) => {
    if (theme.includes(selectedTheme))
      setTheme(theme.filter((theme) => theme !== selectedTheme));
    else setTheme((prev) => [...prev, selectedTheme]);
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

  var myArray = artist;

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
          const file = new File([blob], "recording.wav", { type: "audio/wav" });
          // audioInputRef.current.files = [file];
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);

          const fileList = dataTransfer.files;
          audioInputRef.current.files = fileList;
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
  // console.log(audioURL)
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    const formData = new FormData(event.target); // get the form data
    const url = "https://5261-34-145-164-107.ngrok-free.app/save-audio-file"; // replace this with your URL
    console.log(url);
    setLoading(true);
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // The response object contains metadata about the file
        const filename = "temp.mp4";
        // Use the blob() method to extract the file content as a Blob object
        return response.blob().then((blob) => ({ filename, blob }));
      })
      .then((file) => {
        // Use URL.createObjectURL() to generate a URL for the file content
        const url = URL.createObjectURL(file.blob);
        // Create an <a> element and programmatically click it to download the file
        const a = document.createElement("a");
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <>
      <Sidenav />
      <div className="Form">
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="heading">Create your own video</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="Form-group">
            <label>Record or Upload Audio:</label>
            <div>
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
              {option1 === "record" && (
                <div>
                  {" "}
                  <div>
                    <label htmlFor="record">Record Audio:</label>
                    <input
                      type="file"
                      id="audio"
                      name="audio"
                      accept="audio/*"
                      style={{ display: "none" }}
                      ref={audioInputRef}
                    />
                    {audioURL && (
                      <div>
                        {/* <button onClick={playAudio}>Play Audio</button> */}
                        <button
                          onClick={downloadAudio}
                          className="download-button"
                        >
                          Download Audio
                        </button>
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
                  <label className="choose-file-button" htmlFor="audio">
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
                </div>
              )}
            </div>
            {audioURL && <AudioWaveform fileUrl={audioURL} />}
          </div>
          <div className="Form-group">
            <div className="inline-flex">
              <label>Artist:</label>{" "}
              <input
                type="text"
                readOnly
                value={theme.map((th) => myArray[th - 1].name).join(", ")}
                style={{ pointerEvents: "none" }}
                name="artist"
              />
            </div>
            <div className="Themes">
              {myArray.map((item) => (
                <div
                  key={item.id}
                  className={theme.includes(item.id) ? "gg" : ""}
                >
                  <div
                    // key={item.id}
                    className="box"
                    onClick={() => handleThemeClick(item.id)}
                  >
                    <img src={item.link} alt={item.name} />
                    <div className="titlet">Artist Name: {item.name}</div>
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
          <div className="Form-group inline-flex">
            <label>Theme:</label>
            <input
              style={{ verticalAlign: "middle" }}
              type="text"
              name="theme"
            />
          </div>
          <div className="Form-group">
            <label className="inline-label">Upscale:</label>
            {"   "}
            <input
              style={{ verticalAlign: "middle" }}
              type="checkbox"
              checked={upscale}
              onChange={handleUpscaleCheckbox}
              name="upscale"
            />
          </div>
          <button type="submit" className="recording-btn">
            Create Video
          </button>
        </form>
      </div>
    </>
  );
}

export default CameraPage;
