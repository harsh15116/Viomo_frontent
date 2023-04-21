import React, { Fragment, useState } from "react";
import "./CameraPage.css";
import Sidenav from "./Sidenav";
import Recorder from "./Recorder";
import AudioRecorder from "./AudioRecorder";
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

  var myArray = [
    {
      id: 1,
      name: "(style of abraham bosschaert)",
      link: "https://media.seedscienceai.com/media/EQjMHRN8vXFdxJcHwYBMmBtVXdo.webp?&width=500",
    },
    {
      id: 2,
      name: "(style of tim burton)",
      link: "https://media.seedscienceai.com/media/URSVFlW7lhyQKj4jv5lKC-PZEFI.webp?&width=500",
    },
    {
      id: 3,
      name: "(style of m.c. escher)",
      link: "https://media.seedscienceai.com/media/YnmphCm_f0QBueA2aziUrggKR5I.webp?&width=500",
    },
    {
      id: 4,
      name: "(style of tristan eaton)",
      link: "https://media.seedscienceai.com/media/9XDdDL6qTVmN6iBgfH61OwpMwK4.webp?&width=500",
    },
    {
      id: 5,
      name: "(style of ernst haeckel)",
      link: "https://media.seedscienceai.com/media/xrQSBzuRoPD7TKERo9PYhQsBaU4.webp?&width=500",
    },
    {
      id: 6,
      name: "(style of anton semenov)",
      link: "https://media.seedscienceai.com/media/Qo488chxbN3VmrAfk7LyWN8cDb0.webp?&width=500",
    },
    {
      id: 7,
      name: "(style of matt groening)",
      link: "https://media.seedscienceai.com/media/JkJTDG4z-W4u7sPLmZBBSLrVRDc.webp?&width=500",
    },
    {
      name: "(style of vladimir kush)",
      link: "https://media.seedscienceai.com/media/AeKjLRbwT-Q4tWa69KYJR24HrhU.webp?&width=500",
    },
    {
      id: 8,
      name: "(style of gaetano pesce)",
      link: "https://media.seedscienceai.com/media/nDecmVV1albRCNSp7TH_s_4jhNE.webp?&width=500",
    },
    {
      id: 9,
      name: "(style of charles addams)",
      link: "https://media.seedscienceai.com/media/KrcTHykbVq1AJv5E_HBAv89Hgd0.webp?&width=500",
    },
    {
      id: 10,
      name: "(style of antonio mancini)",
      link: "https://media.seedscienceai.com/media/73IJ-zzpqB0FKtenJuZAFuy-BAw.webp?&width=500",
    },
    {
      id: 11,
      name: "(style of victor vasarely)",
      link: "https://media.seedscienceai.com/media/1FeWejCrZMa2HjbaEgh1tdIhvFc.webp?&width=500",
    },
    {
      id: 12,
      name: "(style of john kenn mortensen)",
      link: "https://media.seedscienceai.com/media/gSCqK8QHtqV0BQSiX63rHjL-3lA.webp?&width=500",
    },
    {
      id: 13,
      name: "(style of jim lee)",
      link: "https://media.seedscienceai.com/media/tchSb4n2ai3I1GIsp7hwVh3ocS8.webp?&width=500",
    },
    {
      id: 14,
      name: "(style of dr. seuss)",
      link: "https://media.seedscienceai.com/media/iNWt4M5zikoZ3GdJa-RKM4sdvyg.webp?&width=500",
    },
    {
      id: 15,
      name: "(style of matt groening)",
      link: "https://media.seedscienceai.com/media/jMwGmNZGfpnNdwfmnhQrhXGoR9o.webp?&width=500",
    },
    {
      id: 16,
      name: "(style of buckminster fuller)",
      link: "https://media.seedscienceai.com/media/mx4_F5_xjpSwRhUeqSy1eCi56e4.webp?&width=500",
    },
    {
      id: 17,
      name: "(style of siya oum)",
      link: "https://media.seedscienceai.com/media/K4OIYi8dvbpUHz8nDF1cdUEJweE.webp?&width=500",
    },
    {
      id: 18,
      name: "(style of tim burton)",
      link: "https://media.seedscienceai.com/media/oSdh5o2jTNT3OCYjresm0OOVYb8.webp?&width=500",
    },
    {
      id: 19,
      name: "(style of kim jung gi)",
      link: "https://media.seedscienceai.com/media/f4OHNAlS4CwB_c0YRvPxAzrubSM.webp?&width=500",
    },
  ];
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
