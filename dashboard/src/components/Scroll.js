import React from 'react'
import styled from 'styled-components'

const Scroll = styled.div`
  overflow-y: scroll;
  max-height: ${window.innerHeight - 200}px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;

  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
      background: #bbb; 
  }

  &::-webkit-scrollbar-thumb:hover {
      background: #999  ; 
  }
`

export default Scroll