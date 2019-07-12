import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Home.css';

 class Home extends Component {

  constructor(props) {
    super(props);

  }

  render () {

    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Button size="lg" variant="primary" block bsStyle="warning" onClick={() =>{ this.props.history.push('/welcome') }}>Welcome</Button>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default connect(state => (
    { 
      activeDocument: state.validations.activeDocument, 
      publicKey: state.validations.publicKey 
    }
  ))(Home);