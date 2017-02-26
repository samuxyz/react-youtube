import React from 'react';
import { Link } from 'react-router';
import { Video } from 'components';

const VideosList = ({ videos }) => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h4><Link to="/add">New</Link></h4>
      </div>
    </div>
    <div className="row">
      {
        videos
          // Videos are shown only when converted === true
          .filter(video => video.converted)
          .map((video, i) => <Video key={i} {...video} />)
      }
    </div>
    <hr />
  </div>
);

export default VideosList;
