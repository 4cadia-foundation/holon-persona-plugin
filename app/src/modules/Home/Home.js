import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap';
import TableValidations from '../../components/TableValidations/TableValidations';
import { connect } from 'react-redux';

import './Home.css';

 class Home extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    const { activeDocument, publicKey }  = this.props;
    
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8} className="text-center">
            <Button bsStyle="success" onClick={this.handleClick}>Success</Button>
          </Col>
        </Row>
        <Row>
          Documento Selecionado: <strong>{activeDocument.type}</strong>
        </Row>
        <Row>
          Chave Publica: <strong>{publicKey}</strong>
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

export default connect(state => (
    { 
      activeDocument: state.validations.activeDocument, 
      publicKey: state.validations.publicKey 
    }
))(Home);