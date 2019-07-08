import React from 'react';
import { render } from 'react-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

window.onload = () => {
  const root = document.getElementById('react-root');
  render(
    <div>
      <ButtonToolbar>
        <Button bsStyle="warning">Warning</Button>
      </ButtonToolbar>
    </div>
    , root);
};
