import React from 'react';
import PropTypes from 'prop-types'
import {
  Icon,
  Header,
  Image,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import logo from './resources/logo.png';
import './styles/banner.css';

const Banner = ({
  onToggleSearch,
  onImport,
  isSearchOpen,
  isFileLoading
}) => (
  <div className='banner'>
    <Link to='/'>
      <Header inverted as='h3' className='title'>
        <Image src={logo} />
        <Header.Content>Flight Log</Header.Content>
      </Header>
    </Link>
    <div className='icon-bar'>
      <div onClick={onImport} className='link'>
        <span>
          <Icon
            loading={isFileLoading}
            name={isFileLoading ? 'spinner' : 'cloud upload' } /> Upload Records
        </span>
      </div>
      <div
        onClick={onToggleSearch}
        className={'link' + (isSearchOpen ? ' selected' : '')}
      >
        <span>
          <Icon name='search' /> Find Records
        </span>
      </div>
    </div>
  </div>
)

Banner.defaultProps = {
  isSearchOpen: false,
  isFileLoading: false,
};

Banner.propTypes = {
  onToggleSearch: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool,
  isFileLoading: PropTypes.bool,
};

export default Banner;