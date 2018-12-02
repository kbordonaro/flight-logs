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

class Duration extends Component {
  state = {
  };

  onChange(event) {
    this.setState({
      duration: event.target.value,
    });
  }

  onSearch() {
    const { duration } = this.state;
    const { onError } = this.props;

    this.setState({
      loading: true,
    }, () => {
      find(
        'duration',
        {duration},
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
      duration,
      loading,
      records,
    } = this.state;

    return (
      <div className='query'>
        <Form>
          <Segment>
            <Form.Group className='search-bar'>
              <Form.Field inline>
                <label>Select Duration</label>
                <input
                  type='number' 
                  min='1'
                  max='30'
                  onChange={this.onChange.bind(this)}
                />
              </Form.Field>
              <Button
                primary
                disabled={(duration === undefined) || loading}
                loading={loading}
                onClick={() => this.onSearch()}
              >
                <Icon name='search' />Find Flight Duration
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

Duration.defaultProps = {
};

Duration.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default Duration;