import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button  } from 'react-bootstrap';


class ImportWallet extends Component {
    
  constructor(props) {
      super(props);
  }

  render () {
      return (
          <Grid>
              <Row>
                  <Col xs={12} md={12}>
                      <div className="text-center">
                          <h3>Import your Wallet</h3>
                      </div>
                  </Col>
              </Row>
              <FormGroup className="margin-top-50">
                  <ControlLabel>Wallet Seed</ControlLabel>
                  <FormControl rows="7" componentClass="textarea" placeholder="Insert your seed phrase" />
              </FormGroup>
              <FormGroup className="margin-top-30">
                  <ControlLabel>New Password</ControlLabel>
                  <FormControl componentClass="input" type="password" />
              </FormGroup>
              <FormGroup className="margin-top-30">
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl componentClass="input" type="password" />
              </FormGroup>

              <Button className="margin-top-50" bsSize="large" block bsStyle="warning" onClick={ () => this.props.history.push('/')}>Import</Button>

          </Grid>
          );
    }
}

export default ImportWallet;