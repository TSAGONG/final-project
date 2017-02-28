import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import View from './View';
import Create from './Create';
import NotFound from './NotFound';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      views: []
  }

  this.titleChange = this.titleChange.bind(this);
  this.descChange = this.descChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.postRequest = this.postRequest.bind(this);
  this.deleteRequest = this.deleteRequest.bind(this);
  this.editRequest = this.editRequest.bind(this);
  }

  componentDidMount() {
     this.getRequest();
   }

  getRequest(){
  const url= 'https://crud-1b909.firebaseio.com/items/.json';
  axios.get(url)

  .then((response) => {
    //console.log(response);
    const data = response.data;
    let views = [];

    if (data) {
      views = Object.keys(data).map((id) => {
        const view = data[id];
        //console.log(id)
        return {
          id: id,
          postTitle: view.title,
          postDesc: view.desc
        };
      });
    }
      views.reverse();
      this.setState ({ views })
     })

    .catch((error) => {
    //console.log(error)
    })
  }

  postRequest() {
    const url= 'https://crud-1b909.firebaseio.com/items.json';
    axios.post(url, {
      title: this.state.title,
      desc: this.state.desc,
    })
    .then(() => {
      this.getRequest();
        this.setState({
          title: '',
          desc: ''
        })
      // clears input so that state are empty strings
      // this.setState({
      //   title: '',
      //   desc: ''
      // })
    })
    .catch((error) => {
      //console.log(error)
    })
  }

deleteRequest(view) {
    const url= `https://crud-1b909.firebaseio.com/items/${view.id}.json`;
    axios.delete(url)
    .then((response) => {
      this.getRequest();
    })
    .catch((error) => {
      console.log(error)
    })
}

editMode(){
    this.setState({ edit: true })
  }


editRequest(view) {
  console.log(view)
    const url= `https://crud-1b909.firebaseio.com/items/${view.id}.json`;
    axios.patch(url, {
      title: view.postTitle,
      desc: view.postDesc,
    })
    .then((response) => {
      this.getRequest();
    })
    .catch((error) => {
      console.log(error)
    })
}

  titleChange(e) {
    this.setState({
      title: e.target.value,
    });
   }

  descChange(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.postRequest();
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="DIARY">
            <h2>Diary</h2>
            <ul>
              <li>
                <Link to="/" >Home</Link>
              </li>
              <li>
                <Link to="/view" >View</Link>
              </li>
              <li>
                <Link to="/create">Write</Link>
              </li>
            </ul>
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home}
                    render={() => <Home
                                views={this.state.views}
                                deleteRequest={this.deleteRequest}
                                editRequest={this.editRequest}
                              />}
              />
              <Route exact path="/view"
                render={() => <View
                                views={this.state.views}
                                deleteRequest={this.deleteRequest}
                                editRequest={this.editRequest}
                              />}
              />
              <Route
                exact path="/create"
                render={() => <Create
                                title={this.props.title}
                                desc={this.props.desc}
                                titleChange={this.titleChange}
                                descChange={this.descChange}
                                handleSubmit={this.handleSubmit}
                              />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
