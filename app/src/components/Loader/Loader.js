import React, { Component } from 'react';
import './Loader.css'

export default class Loader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      visible: false
    }
  }
  
  render() {
    return (
      <div className={this.state.visible ? "container-load" : "cont-hidden"}>
        <div className="vertical-spacer-120"></div>
        <div className="loader">&nbsp;</div>
        <div>
          <div className="vertical-spacer-5">&nbsp;</div>
          <h4 className="msg-loading text-center paragraph">
            {this.state.message ? this.state.message : 'Loading information from Blockchain'}
          </h4>
        </div>
      </div>
    )
  }
}
