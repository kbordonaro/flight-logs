import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Accordion,
  Icon,
  Segment,
  Label,
} from 'semantic-ui-react'
import formatcoords from 'formatcoords';

import './styles/recordList.css';

class RecordList extends Component {
  state = { };

  onToggle(e, titleProps) {
    const { index } = titleProps;
    let { activeIndex } = this.state;
    activeIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex });
  }

  render() {
    const { records } = this.props;
    const { activeIndex } = this.state;

    return (
      <Choose>
        <When condition={ records && records.length > 0 }>
          <Accordion styled fluid>
            <For each='record' index='idx' of={ records }>
              <Accordion.Title
                key={'record' + idx}
                active={activeIndex === idx}
                index={idx}
                onClick={this.onToggle.bind(this)}
              >
                <Icon name='dropdown' />
                Drone {record.drone}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === idx}>
                <Segment vertical>
                  <Label>
                    <Icon name='code branch' />
                    {record.generation}
                  </Label>
                </Segment>
                <Segment vertical>
                  <Label>
                    <Icon name='calendar' />
                    {(new Date(record.startDate)).toUTCString()}
                  </Label>
                  <Label>
                    <Icon name='calendar' />
                    {(new Date(record.endDate)).toUTCString()}
                  </Label>
                </Segment>
                <Segment vertical>
                  <Label>
                    <Icon name='globe' />
                    {formatcoords([record.latitude, record.longitude]).format()}
                  </Label>
                </Segment>
                <Segment vertical>
                  <Label>
                    <Icon name='image' />
                    <a href={record.imagePath}>{record.imagePath}</a>
                  </Label>
                </Segment>
              </Accordion.Content>
            </For>
          </Accordion>
        </When>
        <Otherwise>
          <Segment>
            No Results Found!
          </Segment>
        </Otherwise>
      </Choose>
    );
  }
}

RecordList.defaultProps = {
  records: [],
};

RecordList.propTypes = {
  records: PropTypes.array.isRequired,
};

export default RecordList;