import React, { Component } from 'react';
import { VideosList, Footer } from 'components';
import { API } from '../config';

export default class Home extends Component {

  constructor (props) {
    super(props);
    // Set the videoList to empty array
    this.state = { videosList: [] };
  }

  componentDidMount () {
    // Calls GET /api/v1/videos to populate videosList
    return fetch(API)
      .then(response => response.json())
      .then(videosList => this.setState({ videosList }));
  }

  render () {
    const { videosList } = this.state;
    return (
      <main className="container" id="container">
        <VideosList videos={videosList} />
        <Footer />
      </main>
    );
  }
}
