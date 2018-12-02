import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Segment,
  Form,
  Button,
  Icon,
} from 'semantic-ui-react';

import RecordList from './RecordList';
import find from '../api/find';

import './styles/query.css';

class Area extends Component {
  state = {
  };

  onChange(attribute, event) {
    this.setState({
      [attribute]: event.target.value,
    });
  }

  onSearch() {
    const { top, bottom, right, left } = this.state;
    const { onError } = this.props;

    this.setState({
      loading: true,
    }, () => {
      find(
        'area',
        {top, bottom, right, left},
        this.onSearchResults.bind(this),
        onError,
      )
    });
  }

  onSearchResults(records) {
    this.setState({
      records,
      loading: false,
    });
  }

  render() {
    const {
      top,
      bottom,
      right,
      left,
      loading,
      records,
    } = this.state;

    return (
      <div className='query'>
        <Form>
          <Segment>
            <Form.Group className='search-bar'>
              <Form.Field inline>
                <label>Top</label>
                <input
                  type='number' 
                  min='-90'
                  max='90'
                  onChange={this.onChange.bind(this, 'top')}
                />
              </Form.Field>
              <Form.Field inline>
                <label>Bottom</label>
                <input
                  type='number' 
                  min='-90'
                  max='90'
                  onChange={this.onChange.bind(this, 'bottom')}
                />
              </Form.Field>
              <Form.Field inline>
                <label>Right</label>
                <input
                  type='number' 
                  min='-180'
                  max='180'
                  onChange={this.onChange.bind(this, 'right')}
                />
              </Form.Field>
              <Form.Field inline>
                <label>Left</label>
                <input
                  type='number' 
                  min='-180'
                  max='180'
                  onChange={this.onChange.bind(this, 'left')}
                />
              </Form.Field>
              <Button
                primary
                disabled={
                  (top === undefined) ||
                  (bottom === undefined) ||
                  (right === undefined) ||
                  (left === undefined) ||
                  loading
                }
                loading={loading}
                onClick={() => this.onSearch()}
              >
                <Icon name='search' />Find Flight Area
              </Button>
            </Form.Group>
          </Segment>
        </Form>
        <If condition={records}>
          <RecordList records={records} />
        </If>
      </div>
    );
  }
}

Area.defaultProps = {
};

Area.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default Area;