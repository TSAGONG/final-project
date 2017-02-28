import React, { Component } from 'react';

const propTypes = {
  views: React.PropTypes.array.isRequired
};

class View extends Component {

render() {

let viewList = this.props.views.map((view, i) => {
  console.log(view)
  return (

    <li key={i}>

      <h5>{view.postTitle}</h5><br/>
      <p>{view.postDesc}</p>

      <button
        className="btn btn-primary xs"
        onClick={()=> this.props.editRequest(view)}
        >Edit</button>

      <button
        className="btn btn-primary xs"
        onClick={()=> this.props.deleteRequest(view)}>Delete</button>

    </li>
  );
});

  return (
    <div className="renderedInfo">
      <ul className="viewList">
        {viewList}
      </ul>
    </div>
  );
}
}


View.propTypes = propTypes;

export default View;
