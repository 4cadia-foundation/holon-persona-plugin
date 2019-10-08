import React, { Component } from 'react';
import { Carousel, Button, Grid, Row } from 'react-bootstrap';

import checked from '../../../images/checked.png';
import id from '../../../images/id.png';
import validate from '../../../images/validate.png';
import './IntroductionHolon.css';

class IntroductionHolon extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      return (
        <Grid className="containerPrincipal">
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
            <Carousel.Item>
              <img alt="identity" src={id} />
              <Carousel.Caption>
                <h3 className="title text-introduction margin-top-80">You're propriety of your data.</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img alt="checked" src={checked} />
              <Carousel.Caption>
                <h3 className="title text-introduction margin-top-80">The Holon is Decentralized, so your data is save on Blockchain.</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img alt="validate" src={validate} />
              <Carousel.Caption>
                <h3 className="title text-introduction margin-top-80">Validate your data for your safety.</h3>
              </Carousel.Caption >
              <Row>
                <Button bsStyle="warning" bsSize="large" block className="paragraph" onClick={() => this.props.history.push('/choosecreateorimport')}>Get started</Button>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Grid>
      );
  }
}
  

export default (IntroductionHolon);