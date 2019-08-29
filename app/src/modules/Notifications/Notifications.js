import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

import NotificationPanel from "../../components/PanelNotification/PanelNotification";
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import Loader from '../../components/Loader/Loader';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: true
    };
  }
  async componentDidMount() {
    await this.props.GetPersonaNotifications();
    this.setState({
      isLoading: false
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return { notifications: nextProps.persona.notifications };
  }
  GetNotificationGrid() {
    let notificationGrid = [];

    if (!this.state.notifications)
      return notificationGrid;

    for (let index = 0; index < this.state.notifications.length; index++) {
      notificationGrid.push(<NotificationPanel
        addressReceiver={this.state.notifications[index].requesterAddress}
        nameReceiver={this.state.notifications[index].requesterName}
        fieldName={this.state.notifications[index].field}/>);
    }
    return notificationGrid ? notificationGrid : 'No notifications available';
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <div className="closeButtonNotifications">
              <CloseIconPage destination="/menu" />
            </div>
            <div className="header-notification">
              <h3 className="title">Notifications</h3>
              <p className="paragraph">See which companies are willing to consume your data.</p>
            </div>
            <Loader message="Loading notifications..." visible={this.state.isLoading} />
            {this.GetNotificationGrid()}
          </Col>
        </Row>
      </Grid>
    )
  }
}
const mapStateToProps = state => ({
  persona: state.persona
});
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);