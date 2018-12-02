import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Segment,
  Form,
  Select,
  Button,
  Icon,
} from 'semantic-ui-react';

import RecordList from './RecordList';
import getGenerations from '../api/getGenerations';
import find from '../api/find';

import './styles/query.css';

class Generation extends Component {
  state = {
    generations: []
  };

  onLoad(generations) {
    this.setState({
      generations: generations.map((value, idx) => {
        return {
          text: value,
          value
        };
      })
    });
  }

  onSelection(event, {value}) {
    this.setState({
      value,
    })
  }

  onSearch() {
    const { value } = this.state;
    const { onError } = this.props;

    this.setState({
      loading: true,
    }, () => {
      find(
        'generation',
        {generation: value},
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

  componentDidMount() {
    // Retrieve the list of available generations
    getGenerations(
      (generations) => this.onLoad(generations),
      this.props.onError
    );
  }

  render() {
    const {
      generations,
      value,
      loading,
      records,
    } = this.state;

    return (
      <div className='query'>
        <Form>
          <Segment>
            <Form.Group className='search-bar'>
              <Form.Field inline>
                <label>Select Generation</label>
                <Select
                  options={generations}
                  onChange={this.onSelection.bind(this)}
                />
              </Form.Field>
              <Button
                primary
                disabled={(value === undefined) || loading}
                loading={loading}
                onClick={() => this.onSearch()}
              >
                <Icon name='search' />Find Generation
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

Generation.defaultProps = {
};

Generation.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default Generation;