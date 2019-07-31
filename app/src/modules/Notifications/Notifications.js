import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import PanelNotification from '../../components/PanelNotification/PanelNotification';
import './Notifications.css';

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      consumerNotifications: [
        {
          addressReceiver: "Atlas Quantum",
          dataCategory: "Professional Data",
          fieldName: "Email",
          data: "victoria@januspoj.com"
        },
        {
          addressReceiver: "Mercado Bitcoin",
          dataCategory: "Personal Data",
          fieldName: "RG",
          data: "14.048.958-3"
        }
      ]
    };
  }

  render() {

    let notifications = this.state.consumerNotifications.map(item => (
      <PanelNotification
      addressReceiver={item.addressReceiver}
      dataCategory={item.dataCategory}
      fieldName={item.fieldName}
      data={item.data}
      />
    ));

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
            {notifications}
          </Col>
        </Row>
      </Grid>
      )
  }
}

export default Notifications;