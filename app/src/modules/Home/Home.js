import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import TableValidations from '../../components/TableValidations/TableValidations';

export default class Home extends Component {

  state = {
    modules: []
  }

  constructor(props) {
    super(props);
  }


  handleClick (evento) {
    evento.preventDefault()
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8} className="text-center">
            <Button bsStyle="success" onClick={this.handleClick}>Success</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <TableValidations />
          </Col>
        </Row>
      </Grid>
    );
  }

}

