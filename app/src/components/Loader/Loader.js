import React, { Component } from 'react';

import './Loader.css'

export default class Loader extends Component {
  render() {
    return (
      <div className={this.props.visible ? "container-load" : "cont-hidden"}>
        <div className="vertical-spacer-120"></div>
        <div className="loader">
          &nbsp;
        </div>
        <div>
          <div className="vertical-spacer-5">&nbsp;</div>
          <h4 className="msg-loading text-center paragraph">
            {this.props.message ? this.props.message : 'Loading information from Blockchain'}
          </h4>
        </div>
      </div>
    )
  }
}
