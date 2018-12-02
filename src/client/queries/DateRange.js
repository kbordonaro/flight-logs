import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Segment,
  Form,
  Button,
  Icon,
} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RecordList from './RecordList';
import find from '../api/find';

import './styles/query.css';

class DateRange extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
  };

  onStartChange(date) {
    const { endDate } = this.state;
  
    this.setState({
      startDate: date,
      endDate: (date > endDate) ? date : endDate,
    });
  }

  onEndChange(date) {
    const { startDate } = this.state;

    this.setState({
      startDate: (date < startDate) ? date : startDate,
      endDate: date,
    });
  }

  onSearch() {
    let { startDate, endDate } = this.state;
    const { onError } = this.props;

    // Set the start date to the beginning of the day and the
    // end date to the end of the day
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23,59,59,999);

    // Convert to an ISO string.
    startDate = startDate.toISOString();
    endDate = endDate.toISOString();

    this.setState({
      loading: true,
    }, () => {
      find(
        'dates',
        {startDate, endDate},
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
      startDate,
      endDate,
      loading,
      records,
    } = this.state;

    return (
      <div className='query'>
        <Form>
          <Segment>
            <Form.Group className='search-bar'>
              <Form.Field>
                <DatePicker
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.onStartChange.bind(this)}
                  maxDate={new Date()}
              />
              <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.onEndChange.bind(this)}
                  maxDate={new Date()}
              />
              </Form.Field>
              <Button
                primary
                loading={loading}
                onClick={() => this.onSearch()}
              >
                <Icon name='search' />Find Records
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

DateRange.defaultProps = {
};

DateRange.propTypes = {
  onError: PropTypes.func.isRequired,
};

export default DateRange;