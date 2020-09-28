import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [videoName, setVideoName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const backendUrl = "http://localhost:8762/videoservice/all";
    axios.get(backendUrl).then((data) => {
      setVideos(data.data);
    });
  }, []);

  const saveVideo = () => {
    const backendUrl = "http://localhost:8762/videoservice/video/add";
    axios
      .post(backendUrl, {
        url: url,
        name: videoName,
      })
      .then(() => {
        const backendUrl = "http://localhost:8762/videoservice/all";
        axios.get(backendUrl).then((data) => {
          setVideos(data.data);
        });
      });
  };

  return (
    <div>
      <h1>Streamer webpage</h1>
      <input
        type="text"
        placeholder="video name"
        onChange={(e) => setVideoName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="video url"
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button onClick={() => saveVideo()}>Upload video</button>
      {videos.map((video) => (
        <div>
          <p>
            <Link to={`/video/${video.id}`}>
              {video.id}. {video.name}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
