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
          <Accordion styled fluid className='record-list'>
            <For each='record' index='idx' of={ records }>
              <Accordion.Title
                key={'record' + idx}
                active={activeIndex === idx}
                index={idx}
                onClick={this.onToggle.bind(this)}
              >
                <Icon name='dropdown' />
                Drone {record.drone}
                <If condition={activeIndex !== idx}>
                  <Segment>
                    <Label>
                      <Icon name='code branch' />
                      {record.generation}
                    </Label>
                    <Label>
                      <Icon name='calendar' />
                      {
                        (new Date(record.startDate).getMonth()+1) + '/' +
                        (new Date(record.startDate).getDate()+1) + '/' +
                        (new Date(record.startDate).getFullYear())
                      }
                    </Label>
                    <Label>
                      <Icon name='clock' />
                      {Math.ceil(record.duration/60000)} Min
                    </Label>
                    <Label>
                    <Icon name='globe' />
                      {
                        formatcoords([record.latitude, record.longitude]).format({
                          latLonSeparator: ', ', 
                          decimalPlaces: 0,
                        })
                      }
                    </Label>
                    <Label>
                      <a href={record.imagePath} target='map'><Icon name='image' /></a>
                    </Label>
                  </Segment>
                </If>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === idx}>
              <Segment>
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
                    <Label>
                      <Icon name='clock' />
                      {Math.ceil(record.duration/60000)} Min
                    </Label>
                  </Segment>
                  <Segment vertical>
                    <Label>
                      <Icon name='globe' />
                      {
                        formatcoords([record.latitude, record.longitude]).format({
                          latLonSeparator: ', ', 
                        })
                      }
                    </Label>
                  </Segment>
                  <Segment vertical>
                    <Label>
                      <Icon name='image' />
                      <a href={record.imagePath} target='map'>{record.imagePath}</a>
                    </Label>
                  </Segment>
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