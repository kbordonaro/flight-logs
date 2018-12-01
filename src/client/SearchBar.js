import React from 'react';
import PropTypes from 'prop-types'
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

import './styles/searchBar.css';

const SearchBar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <NavLink to='/generation' activeClassName='selected'>
      <Menu.Item as='a'>
        <Icon name='code branch' />
        Drone Generation
      </Menu.Item>
    </NavLink>
    <NavLink to='/date' activeClassName='selected'>
      <Menu.Item as='a'>
        <Icon name='calendar' />
        Flight Dates
      </Menu.Item>
    </NavLink>
    <NavLink to='/duration' activeClassName='selected'>
      <Menu.Item as='a'>
        <Icon name='clock' />
        Flight Duration
      </Menu.Item>
    </NavLink>
    <NavLink to='/area' activeClassName='selected'>
      <Menu.Item as='a'>
        <Icon name='globe' />
        Flight Location
      </Menu.Item>
    </NavLink>
  </Sidebar>
)

SearchBar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

export default SearchBar;