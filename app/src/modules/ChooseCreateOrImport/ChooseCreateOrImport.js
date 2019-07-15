import React, {Component} from 'react';
import { Row, Col, Grid, Panel, Button, Glyphicon} from 'react-bootstrap';
import "./ChooseCreateOrImport.css";

class ChooseCreateOrImport extends Component {
    render() {
        return(
        <Grid>
            <Row>
                <Col xs={12} md={12}>
                    <h1 className="text-center">New to Holon?</h1>
                </Col>
            </Row>
        
            <Row>
                <Col className="text-center" xs={12} md={12}>
                    <Panel className="panel titulo">
                        <div className="texto-interior">
                            <Glyphicon glyph="download-alt" />
                            <Panel.Title componentClass="h3">No, I already have a wallet </Panel.Title>
                            <Button bsStyle="warning">Importar</Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
            <Row>
                <Col className="text-center" xs={12} md={12}>
                    <Panel className="panel">
                        <div className="texto-interior">
                            <Glyphicon glyph="plus"/>
                            <Panel.Title componentClass="h3">Yes, let's create a wallet </Panel.Title>
                            <Button bsStyle="warning">Create</Button>
                        </div>
                    </Panel>
                </Col>
            </Row>

        </Grid>
        )
    }
}


export default ChooseCreateOrImport;