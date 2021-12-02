import React, { useState, useEffect } from "react";
import Loading from "./loading.gif";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchPhotos = async (pageNumber) => {
    const Access_Key = "SFtcWMGqVvtMfBTG_1ua5UzL4Ydx5LFmB5hMfDvpZ1I";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`
    );
    const data = await res.json();
    console.log(data);
    setPhotos(data);
  };

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      <h2>App</h2>
      {photos.map((photo, index) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
          <p>{photo.user.first_name + " " + photo.user.last_name}</p>
          <span>Like: {photo.user.total_likes}</span>
        </div>
      ))}
      <div className="loading">
        <img src={Loading} alt="" />
      </div>
      <h3>{photos.length}</h3>
      <button>Load More</button>
    </div>
  );
};

export default App;
