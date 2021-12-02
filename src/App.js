import React, { useState, useEffect, useRef } from "react";
import Loading from "./loading.gif";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (pageNumber) => {
    const Access_Key = "SFtcWMGqVvtMfBTG_1ua5UzL4Ydx5LFmB5hMfDvpZ1I";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`
    );
    const data = await res.json();
    console.log(data);
    setPhotos((prevData) => [...prevData, ...data]);
    setLoading(true);
  };

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);

  const pageEnd = useRef();
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <div className="App">
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
      <div>
        <button onClick={loadMore} ref={pageEnd}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;
