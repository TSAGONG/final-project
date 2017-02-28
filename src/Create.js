import React, { Component } from 'react';

const propTypes = {
  title: React.PropTypes.string,
  desc: React.PropTypes.string,
  // titleChange: React.PropTypes.func.isRequired,
  // descChange: React.PropTypes.func.isRequired,
  //handleSubmit: React.PropTypes.func.isRequired
};

class Create extends Component {
  render() {

    return (
      <form
        className= "form"
        onSubmit={this.props.handleSubmit}>

        <input
          className="inputTitle"
          type="text"
          placeholder="title"
          title={this.props.title}
          onChange={this.props.titleChange}
        />

        <textarea
          className="inputText"
          rows="15"
          cols="40"
          type="text"
          placeholder="your thoughts"
          value={this.props.desc}
          onChange={this.props.descChange}
        />

        <input
          id="postButton"
          type="submit"
          value="Post"
          className="btn btn-primary"
        />
      </form>
    );
  }
}


Create.propTypes = propTypes;

export default Create;


