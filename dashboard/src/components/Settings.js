import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

import { Input, Button, Label } from 'reactstrap'
import Loading from 'components/Loading'
import Ids from 'components/Ids'

const Wrap = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      config: {}
    }
  }

  restart() {
    render(<Loading />, document.querySelector('#app'))
    fetch(`/api/bot.restart`)
      .then(r => {
        window.location.reload()
      })
  }

  init() {
    render(<Loading />, document.querySelector('#app'))
    fetch(`/api/bot.init`)
      .then(r => {
        window.location.reload()
      })
  }

  render() {
    return (
      <Wrap>
        <Ids></Ids><br/><br/>
        <Button color="danger" onClick={() => this.restart()}>Перезапустить бота</Button>
      </Wrap>
    )
  }
}
//683edf7b6a2f88536e4b36d290c33a891959702ce3ec7be40571f42be38646c01f9ad026c0affb2d65d78
export default Settings