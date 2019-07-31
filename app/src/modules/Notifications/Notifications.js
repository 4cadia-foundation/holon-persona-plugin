import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import PanelNotification from '../../components/PanelNotification/PanelNotification';
import './Notifications.css';

class Notifications extends Component {
  render() {
    return(
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
            <PanelNotification />
          </Col>
        </Row>
      </Grid>
      )
  }
}

export default Notifications;