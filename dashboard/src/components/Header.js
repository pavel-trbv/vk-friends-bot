import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import Settings from 'components/Settings'

const Wrap = styled.header`
  height: 50px;
  display: flex;
  background-color: #004085;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 50px;

  i {
    font-size: 50px;
    color: #fefefe;
    margin: 0 30px;
    cursor: pointer;

    &:hover {
      color: #eee;
    }
  }
`

const Arrow = styled.div`
  transition: transform .3s ease;
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggle: false
    }

    this.side = document.querySelector('#side')
  }

  openSettings() {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      }
    })
    this.side.style.display = this.state.toggle ? 'none' : 'block'
    this.arrow.style.transform = this.state.toggle ? 'rotate(360deg)' : 'rotate(180deg)'
  }

  render() {
    return (
      <Wrap>
        <Arrow ref={el => this.arrow = el}><i className='fas fa-angle-right' onClick={this.openSettings.bind(this)}></i></Arrow> 
        { createPortal(
          <Settings />,
          this.side
        ) }
      </Wrap>  
    )
  }
}
//<i className={this.state.toggle ? 'fas fa-angle-left' : 'fas fa-angle-right'} onClick={this.openSettings.bind(this)}></i>
export default Header