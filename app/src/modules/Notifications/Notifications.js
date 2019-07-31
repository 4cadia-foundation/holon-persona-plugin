import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import PanelNotification from '../../components/PanelNotification/PanelNotification';
import './Notifications.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }
  async componentDidMount() {
    await this.props.GetPersonaNotifications();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return { notifications: nextProps.persona.notifications };
  }
  GetNotificationGrid() {
    let notificationGrid = [];

    if (!this.state.notifications)
      return notificationGrid;

    for (let index = 0; index < this.state.notifications.length; index++) {
      notificationGrid.push(
        <Panel id="panel-notification">
          <div>
            <div className="inner-content-text">
              <Panel.Title className="paragraph p-consumername">{this.state.notifications[index].requester}</Panel.Title>
              <Panel.Title className="paragraph">{this.state.notifications[index].field}</Panel.Title>
            </div>
            <div className="inner-content-button">
              <Button className="paragraph" bsStyle="warning" bsSize="small">Allow</Button>
              <Button className="paragraph" bsStyle="warning" bsSize="small">Decline</Button>
            </div>
          </div>
        </Panel>);
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