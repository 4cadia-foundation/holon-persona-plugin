import React, { Component } from 'react'
import logo from '../../../images/icon-38.png';
import {Grid, Row, Col, Form, FormControl } from 'react-bootstrap';
import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import ScoreGraph from '../../components/ScoreGraph/ScoreGraph';
import styles from './Profile.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Janus da Silva",
            email: "janus@gmail.com",
            othersValues: ['01/01/1969','Alameda Santos, 1827 - São Paulo - SP - Brasil','+55 11 99999-5555','333.564.798-00']
        };        
        this.handleBack = this.handleBack.bind(this);

    }

    handleBack(){
        debugger;
        alert('oi');
    }

    render() {
        return (
            <Form>
                
                <Grid>
                    <Row>
                        <Col>
                            <img className="logoHome" src={logo} alt="Logo" />
                            <CloseIconPage/>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            <div className="glyphicon glyphicon-user imgPersona"></div>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControl
                                id="name"
                                type="text"
                                value={this.state.name}
                                readOnly
                            />
                        </Col>
                    </Row>       
                    <Row>
                        <Col>
                            <FormControl
                                id="email"
                                type="text"
                                value={this.state.email}
                                readOnly
                            />
                        </Col>
                    </Row>       
                        {
                            this.state.othersValues.map((val, idx) =>
                            {
                                return(
                                    <Row key={'row_' + idx.toString()}>
                                        <Col>
                                            <FormControl
                                                id={idx.toString()}
                                                key={idx.toString()}
                                                type="text"
                                                value={val}
                                                readOnly
                                            />                       
                                        </Col>
                                    </Row>
                                    )
                            })
                        }                            
                    <Row className="text-center">
                        <Col>
                            <ScoreGraph/>
                        </Col>
                    </Row>       
                </Grid>
            </Form>
        );
    }

}


  
  export default Profile;