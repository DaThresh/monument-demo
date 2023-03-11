import React from 'react';
import { Button, Container, Heading, Hero } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const LandingApp: React.FC = () => {
  return (
    <Hero size='fullheight' backgroundColor='primary'>
      <Hero.Body>
        <Container>
          <Heading textColor='white'>Welcome to my Monument.IO Demo!</Heading>
          <Heading size={6}>
            <Button to='/locations' renderAs={Link}>
              Try Demo
            </Button>
          </Heading>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default LandingApp;
