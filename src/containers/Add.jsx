import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { API, API_KEY } from '../config';
import { Footer } from 'components';

const filestackCDN = 'https://cdn.filestackcontent.com';
const filestackAPI = 'https://process.filestackapi.com';

export default class AddContainer extends Component {

  constructor (props) {
    super(props);
    // Set the URL to empty string
    this.state = { url: '' };
  }

  handleClick = () => {
    // The URL returned by Filestack is set in the state
    this.filestack().then(url => this.setState({ url }));
  }

  filestack = () => {
    return new Promise((resolve, reject) => {
      filepicker.pick (
        {
          mimetype: 'video/*',
          container: 'modal',
          services: ['COMPUTER', 'URL'],
          openTo: 'COMPUTER',
        },
        Blob => {
          console.log(JSON.stringify(Blob));
          resolve(Blob.url); // Resolves with the URL from Filestack CDN
        },
        FPError => {
          console.log(FPError.toString());
          reject(FPError.toString());
        },
     );
    });
  }

  sendToServer = (uuid) => {
    const { state: { url }, title, author } = this;
    // POST to /api/v1/videos to insert a new video in the DB
    return fetch(API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        title: title.value,
        author: author.value,
        // Random values for simplicity
        views: Math.floor(Math.random() * 100000) + 1,
        uploadAt: Math.floor(Math.random() * 24) + 1,
        uuid,
        converted: false,
      }),
    })
    .then(response => response.json());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { url } = this.state;
    const curl = `${filestackAPI}/${API_KEY}/video_convert=preset:webm,aspect_mode:preserve/${url.substring(url.lastIndexOf('/') + 1)}`;
    // First we call the process API to start the trascoding and get the uuid
    fetch(curl)
      .then(response => response.json())
      // Pass the uuid to sendToServer
      .then(response => this.sendToServer(response.uuid))
      // hashHistory replaces /add -> /
      .then(() => hashHistory.replace('/'));
  }

  render () {
    const { url } = this.state;
    return (
      <div className="container">
        <div className=".col-md-offset-4 media-list">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                <span className="glyphicon glyphicon-sunglasses" /> Upload Picture
              </h2>
            </div>
            <div className="panel-body">
              <form name="document-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    className="form-control"
                    placeholder="Enter the title..."
                    ref={(input) => this.title = input}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Author</label>
                  <input
                    className="form-control"
                    placeholder="Enter the Author..."
                    ref={(input) => this.author = input}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="picture">Photo</label>
                  { // When the URL is returned we show the preview
                    url &&
                      <div className="embed-responsive embed-responsive-16by9">
                        <div className="thumbnail">
                          <video controls>
                            <source src={url} type="video/mp4" />
                          Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                  }
                  <div className="text-center dropup">
                    <button
                      className="btn btn-default filepicker"
                      onClick={this.handleClick}
                      type="button"
                    >
                      Upload <span className="caret" />
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-filestack btn-block submit"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
