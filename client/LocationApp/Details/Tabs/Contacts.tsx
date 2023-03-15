import React from 'react';
import { Card, Columns, Content } from 'react-bulma-components';

const Contacts = () => {
  return (
    <Columns>
      <Columns.Column>
        <Card>
          <Card.Header>
            <Card.Header.Title>Management</Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Content>
              <ul>
                <li>Jack Sweeny</li>
                <li>John Mayer</li>
                <li>Kayla Cart</li>
              </ul>
            </Content>
          </Card.Content>
        </Card>
      </Columns.Column>
      <Columns.Column>
        <Card>
          <Card.Header>
            <Card.Header.Title>Maintenance</Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Content>
              <ul>
                <li>Bill Smith</li>
                <li>Mitchell Mason</li>
                <li>Kailyn Cosworth</li>
              </ul>
            </Content>
          </Card.Content>
        </Card>
      </Columns.Column>
      <Columns.Column>
        <Card>
          <Card.Header>
            <Card.Header.Title>Regional</Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Content>
              <ul>
                <li>Jack Sweeny</li>
                <li>John Mayer</li>
                <li>Kayla Cart</li>
              </ul>
            </Content>
          </Card.Content>
        </Card>
      </Columns.Column>
    </Columns>
  );
};

export default Contacts;
