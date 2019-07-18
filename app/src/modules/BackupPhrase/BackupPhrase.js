import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class BackupPhrase extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <Button bsStyle="warning margin-right">Back</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default BackupPhrase;