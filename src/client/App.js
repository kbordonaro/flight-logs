import React, { Component } from 'react';
import {
  Sidebar,
  Segment,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Papa from 'papaparse';

const history = createBrowserHistory();

import Banner from './Banner';
import SearchBar from './SearchBar';
import Home from './Home';
import NotFound from './NotFound';
import Generation from './queries/Generation';
import DateRange from './queries/DateRange';
import Duration from './queries/Duration';
import Area from './queries/Area';

import postLogs from './api/postLogs';

import 'semantic-ui-css/semantic.min.css';
import './styles/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchOpen: false,
      uploadKey: 0,
    };

    // Need to change the key everytime the upload
    // is done to force a render of a new input field.
    // Otherwise, you can't reupload the same file.

    history.listen(() => {
      this.setState({
        isSearchOpen: false,
      });
    });
  }

  onToggleSearch() {
    const { isSearchOpen } = this.state;

    this.setState({
      isSearchOpen: !isSearchOpen,
    });
  }

  onImport() {
    const uploadKey = this.state.uploadKey+1;

    this.setState({
      isFileLoading: true,
      uploadKey,
    }, () => {
      this.refs.fileUploader.click();
    });
  }

  onFileRead(event) {
    event.stopPropagation();
    event.preventDefault();

    // Parse the selected file
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Map the results from the csv parse to the form
        // required by the API.  Replace the latitude, longitude
        // values with a location array.
        const data = results.data.map(record => {
          const result = {
            ...record,
            location: [record.latitude, record.longitude]
          }

          delete result.latitude;
          delete result.longitude;

          return result;
        });

        postLogs(
          data,
          this.onReadSuccess.bind(this),
          this.onError.bind(this),
        );
      },
      error: () => {
        this.onError('Could not parse the CSV file');
      }
    });
  }

  onReadSuccess() {
    this.setState({
      message: {
        text: 'Log file was successfully uploaded',
      },
      isFileLoading: false,
    }, this.clearMessage);
  }

  onError(error) {
    this.setState({
      message: {
        text: error,
        error: true,
      },
      isFileLoading: false,
    });
  }

  clearMessage() {
    setTimeout(this.onCloseMessage.bind(this), 5000);
  }

  onCloseMessage() {
    this.setState({
      message: undefined,
    });
  }

  render() {
    const {
      isSearchOpen,
      isFileLoading,
      message,
      uploadKey
    } = this.state;

    return (
      <Router history={history}>
        <div className='page'>
          <If condition={isFileLoading}>
            <div className='wait' onClick={() => {
              this.setState({isFileLoading: false});
            }}></div>
          </If>
          <If condition={message}>
            <Message error={message.error} info={!message.error}>
              <Icon name={message.error ? 'warning' : 'info'} circular />
              {message.text}
              <If condition={message.error}>
                <Icon
                  name='close'
                  onClick={() => this.onCloseMessage()}
                />
              </If>
            </Message>
          </If>
          <Banner
            onToggleSearch={() => this.onToggleSearch()}
            onImport={() => this.onImport()}
            isSearchOpen={isSearchOpen}
            isFileLoading={isFileLoading}
          />
          <Sidebar.Pushable as={Segment} className='content-container'>
            <SearchBar animation={'overlay'} direction={'right'} visible={isSearchOpen} />
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route
                path="/generation"
                component={() => <Generation onError={this.onError.bind(this)} />}
              />
              <Route
                path="/date"
                component={() => <DateRange onError={this.onError.bind(this)} />}
              />
              <Route
                path="/duration"
                component={() => <Duration onError={this.onError.bind(this)} />}
              />
              <Route
                path="/area"
                component={() => <Area onError={this.onError.bind(this)} />}
              />
              <Route component={NotFound}/>
            </Switch>
          </Sidebar.Pushable>
          <input
            type="file"
            key={uploadKey}
            id="file"
            ref="fileUploader"
            style={{display: "none"}}
            accept=".csv"
            onChange={(event) => this.onFileRead(event)}
          />
        </div>
      </Router>
    );
  }
}
