import React, { Component } from 'react'
import { render } from 'react-dom'
import fetch from 'isomorphic-fetch'

import { Textarea, Button, Label } from 'reactstrap'
import Loading from 'components/Loading'

class Ids extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ids: []
    }
  }

  componentDidMount = () => {
    fetch('/api/ids.get')
      .then(r => r.json())
      .then(r => {
        this.setState({
          ids: r.map(i => i.id)
        })
        this.textarea.value = this.state.ids.join('\n')
      })
      .catch(e => e)
  }

  saveIds() {
    const string = this.textarea.value.replace('\n\n', '')
    const ids = [ ...string.split('\n') ]

    render(<Loading />, document.querySelector('#app'))
    fetch(`/api/ids.set?ids=${ids}`)
      .then(r => {
        window.location.reload()
      })
  }
  
  render() {
    return (
      <>
        <Label>Список ID</Label>
        <textarea 
          ref={el => this.textarea = el} 
          style={{ marginBottom: '10px' }}
          rows="7"
        >
        </textarea>
        <Button color="success" onClick={e => this.saveIds()} size="sm">Save</Button>
      </> 
    )
  }
}

export default Ids