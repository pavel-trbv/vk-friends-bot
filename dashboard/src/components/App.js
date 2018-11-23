import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

import UniqList from 'components/UniqList'
import Change from 'components/Change'

class App extends Component {
  render() {
    return (
      <div id="app">
        <Container fluid>
          <Row>
            <Col md={{ size: 6, offset: 3}}>
              <UniqList></UniqList>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

Container.propTypes = {
  fluid: PropTypes.bool
}

export default hot(module)(App)