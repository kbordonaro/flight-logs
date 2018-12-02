import React, { Component } from 'react';

import homeImg from './resources/home.jpg';

import './styles/home.css';

class Home extends Component {
  state = { };

  render() {
    return (
      <div className='content home'>
        <h1>Flight Log</h1>
        <img src={homeImg} className='responsive' />
      </div>
    );
  }
}

Home.defaultProps = {
};

Home.propTypes = {
};

export default Home;