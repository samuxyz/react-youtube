import React, { Component } from 'react';
import { VideosList, Footer } from 'components';
import { API } from '../config';

export default class Home extends Component {

  constructor (props) {
    super(props);
    // Set the videoList to empty array
    this.state = { videosList: [] };
  }

  async componentDidMount () {
    // Calls GET /api/v1/videos to populate videosList
    try {
      const response = await fetch(API);
      const videosList = await response.json();
      this.setState({ videosList });
    } catch (e) {
      console.log(e);
    }
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
