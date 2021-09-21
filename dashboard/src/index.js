import React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import Loadable from 'react-loadable'
import Loading from 'components/Loading'
import Header from 'components/Header'
import App from 'components/App'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
    overflow-y: scroll;
  }
  #side {
    padding: 30px;
    position: absolute;
    top: 50px;
    left: 0;
    background-color: rgba(39, 40, 34,.99);
    width: 300px;
    height: ${window.innerHeight}px;
    display: none;
  }
`

// const LoadableApp = Loadable({
//   loader: () => import('components/App'),
//   loading: Loading,
// })

const Wrap = props => {
  return (
    <>
      <Helmet>
        <title>Friends Checker</title>
      </Helmet>
      <Header></Header>
      <App />
      <GlobalStyle />
    </>
  )
}

const el = document.querySelector('#root')

render(<Wrap />, el)