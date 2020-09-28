import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/DetailedVideo.css";

function Video() {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [urlList, setUrlList] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    const url = `http://localhost:8762/videoservice/video/${videoId}`;
    axios.get(url).then((data) => {
      setVideo(data.data);
      console.log(data.data);
      setRecommendations(data.data.recommendations);
      setUrlList(data.data.url.split("watch?v="));
    });
  }, [videoId]);

  const sendData = () => {
    const url = `http://localhost:8762/videoservice/video/${videoId}/add-recommendation`;
    axios
      .post(url, {
        comment: comment,
        rating: rating,
      })
      .then(() => {
        const url = `http://localhost:8762/videoservice/video/${videoId}`;
        axios.get(url).then((data) => {
          setVideo(data.data);
          setRecommendations(data.data.recommendations);
          setUrlList(data.data.url.split("watch?v="));
        });
      });
  };

  return (
    <div>
      {video ? (
        <>
          <p>
            {video.id}. {video.name}
          </p>
          <iframe
            src={`${urlList[0]}embed/${urlList[1]}`}
            width="420"
            height="315"
            title={video.name}
          ></iframe>
          <table className="center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Comments</th>
                <th>User Rating</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((recommendation) => (
                <tr>
                  <td>{recommendation.id}.</td>
                  <td>{recommendation.comment}</td>
                  <td>{recommendation.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <input
              type="text"
              placeholder="your comment"
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <select onChange={(e) => setRating(e.target.value)}>
              {[1, 2, 3, 4, 5].map((number) => (
                <option>{number}</option>
              ))}
            </select>
            <button onClick={() => sendData()}>Send</button>
          </div>
          <div className="backToMain">
            <Link to="/">Back to main</Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Video;
