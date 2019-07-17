import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class CreateIdentity extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={12}>
                            <div className="text-center">
                                <h3>Holon Identity</h3>
                            </div>
                    </Col>
                </Row>
                <div className="margin-top-50">
                    <Row>
                        <p className= "Subtitle, text-center">To have a <b>Holon Identity</b>, please provide us with the following information.</p>
                    </Row>
                </div>
                <FormGroup className="margin-top-50">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl componentClass="input" type="text" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl componentClass="input" type="email" placeholder="email@example.com" />
                </FormGroup>
                <Button className="margin-top-50" bsSize="large" block bsStyle="warning" onClick={ () => this.props.history.push('/home')}>Create ID</Button>
            </Grid>
        );
    }
}

export default CreateIdentity;