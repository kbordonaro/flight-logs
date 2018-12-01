import React, { Component } from 'react';
import { Sidebar, Segment } from 'semantic-ui-react';
import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

import Banner from './Banner';
import SearchBar from './SearchBar';
import Home from './Home';
import NotFound from './NotFound';
import Generation from './queries/Generation';
import DateRange from './queries/DateRange';
import Duration from './queries/Duration';
import Area from './queries/Area';

import 'semantic-ui-css/semantic.min.css';
import './styles/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSearchOpen: false };

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
    this.setState({
      isFileLoading: true
    }, () => {
      this.refs.fileUploader.click();
    });
  }

  onFileRead(event) {
    event.stopPropagation();
    event.preventDefault();

    // Read the selected file
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Process the content of the file
      console.log(reader.result);
    };

    // Begin the loading the file content
    reader.readAsText(file);
  }

  render() {
    const { isSearchOpen, isFileLoading } = this.state;
    return (
      <Router history={history}>
        <div className='page'>
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
              <Route path="/generation" component={Generation}/>
              <Route path="/date" component={DateRange}/>
              <Route path="/duration" component={Duration}/>
              <Route path="/area" component={Area}/>
              <Route component={NotFound}/>
            </Switch>
          </Sidebar.Pushable>
          <input
            type="file"
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
