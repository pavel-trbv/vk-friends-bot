import React from 'react'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${window.innerHeight}px;
  margin-top: -100px;
`

const Loader = styled.div `
  display: inline-block;
  width: 64px;
  height: 64px;

  &:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-color: #ccc transparent #ccc transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`


const Loading = () => (
  <Wrap>
    <Loader />
  </Wrap>  
) 

export default Loading