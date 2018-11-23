import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'

import { Row, Col } from 'reactstrap'

import List from 'components/List'
import Change from 'components/Change'

const H5 = styled.h5`
  text-align:center
`

class UniqList extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      list: [],
      sort: true,
      ids: []
    }
  }

  componentDidMount = () => {
    fetch('/api/ids.get')
      .then(r => r.json())
      .then(r => {
        const ids = r.map(i => i.id)
        if (ids.length == 0) return
        this.setState({ ids })
        fetch(`/api/uniqs.get?id=${ids[0]}`)
          .then(r => r.json())
          .then(r => {
            this.setState({ list: r })
          })
      })
  }

  dateReverse() {
    this.setState(prevState => {
      return {
        list: prevState.list.reverse(),
        sort: !prevState.sort
      }
    })
  }

  changeId(id) {
    fetch(`/api/uniqs.get?id=${id}`)
      .then(r => r.json())
      .then(r => {
        this.setState({
          list: r
        })
      })
  }

  render() {
    return (
      <>
        <Row>
          <Col md={{ size: 7, offset: 4 }}>
            <Change changeId={this.changeId.bind(this)} ids={this.state.ids} />
          </Col>
        </Row>
        <H5>Список новых друзей ({this.state.list.length})</H5>
        <List list={this.state.list} isDate={true} dateReverse={this.dateReverse.bind(this)} sort={this.state.sort}/>
      </>
    )
  }
  
}

export default UniqList