import React from 'react';
import { Button, Content, Heading, Hero } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Hero size='fullheight' color='primary'>
      <Hero.Body>
        <Content>
          <Heading>Not Found</Heading>
          <Heading subtitle renderAs='p'>
            The page you requested was not found
          </Heading>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Content>
      </Hero.Body>
    </Hero>
  );
};

export default NotFound;
