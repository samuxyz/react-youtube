import React from 'react';

const Video = (props) => {
  const { url, title, author, views, uploadAt } = props;
  return (
    <div className="col-md-3">
      <div className="embed-responsive embed-responsive-16by9">
        <video controls>
          <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-info">
        <h4><a href="#">{title}</a></h4>
        <p>{author}</p>
        <p>{views} views • {uploadAt} hours ago</p>
      </div>
    </div>
  );
};

export default Video;
