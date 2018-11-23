import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import { Label, Input, Button } from 'reactstrap'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 50%;
  select {
    margin-bottom: 40px;
  }
`

class Change extends Component {
  constructor(props) {
    super(props)

    this.input = React.createRef()
  }

  render() {
    return (
      <>
        <Label>Изменить ID</Label>
        <Wrap>
          <select className="form-control" ref={this.input} onChange={e => this.props.changeId(e.target.options[e.target.selectedIndex].value) }>
            {
              this.props.ids.map((i, inx) => {
                return <option key={inx}>{i}</option>
              })
            }
          </select>
        </Wrap>  
      </>
    )
  }
}

export default Change