import React, {Component} from 'react';
import {Table, Row, Col, Button, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';
import { bindActionCreators } from 'redux';


class Importar extends Component {

    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('funcionou');
    }

    render (){
        return(
            <Grid>
                <header>
                    <Row>
                        <Col>
                            <h1 className="titulo">Elemento</h1>
                            <p>Elemento</p>
                        </Col>
                    </Row>
                </header>
            <Row>
                <Col xs={12} md={12} className="text-center">
                     <Button bsStyle="warning" onClick={ () => this.props.getPersonaData()}>Get Data</Button>
                </Col>
            </Row>
            
            <Row>
                <Col xs={12} md={12}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            this.props.persona.personalInfo.map((item, index) => (
                                <tr key={index}>
                                    <td>{ item.label }</td>
                                    <td>{ item.value }</td>
                                </tr>
                            ))
                            }
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </Grid>
        );
    }

}

const mapStateToProps = state => ({
    persona: state.persona
});
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Importar);



