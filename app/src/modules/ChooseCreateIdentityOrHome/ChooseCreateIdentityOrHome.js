import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import Loader from '../../components/Loader/Loader';

class ChooseCreateIdentityOrHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      numberOfPersonalInfoRecorded: -1,
      msg: 'Loading information from Blockchain',
    };
  }

  componentDidMount() {
    this.props.getPersonaData();
  }

  static getDerivedStateFromProps(nextProps, _) {
    if (nextProps.persona.error.length > 2) {
      return { isLoading: false };
    }
    if (nextProps.persona.readAllPersonaLogs) {
      return { isLoading: false, numberOfPersonalInfoRecorded: nextProps.persona.numberOfFields };
    }
    return null;
  }

  render() {
    // console.log('ChooseCreateIdentityOrHome/render state', this.state);
    if (this.state.numberOfPersonalInfoRecorded >= 2) {
      // console.log('ChooseCreateIdentityOrHome/rendering to home', this.state);
      return (
        <Redirect to="/home" />
      );
    } if (!this.state.isLoading && this.state.numberOfPersonalInfoRecorded === 0) {
      return (
        <Redirect to="/createidentity" />
      );
    }
    return (
        <Loader visible={this.state.isLoading} message={this.state.msg} />
    );
  }
}

const mapStateToProps = (state) => ({
  persona: state.persona, wallet: state.wallet,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(PersonaActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreateIdentityOrHome);