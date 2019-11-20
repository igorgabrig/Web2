import React, { Component } from "react";
import api from './services/index';
import './App.css';

export default class App extends Component {
  state = {
    feed: []
  };

  componentDidMount() {
    this.getFeed();
  }

  getFeed = async () => {
    try {
      const response = await api.get("/feed");
      console.log(response.data);
      this.setState({ feed: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {


    const { feed } = this.state;

    return (
      <div className="App">
        {feed.map((feed) =>
          <li key={feed.id}>{feed.post}</li>
        )}
      </div>
    );
  }
}
