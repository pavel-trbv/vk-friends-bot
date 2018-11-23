import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Table, Button } from 'reactstrap'
import Scroll from 'components/Scroll'

const Wrap = styled.div`
  background-color: #fdfdfd;
  tbody tr {
    transition: background-color ease .3s;
  }
  tbody tr:hover {
    cursor: pointer;
    background-color: rgba(0,136,255,.1);
  }

  .id {
    @media (max-width: 544px) {
      display: none;
    }
  }
`

const List = ({ list, isDate, dateReverse, sort }) => {
  return (
    <Wrap>
      <Scroll>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th className="id">ID</th>
              <th>Имя</th>
              { isDate ? 
                <th>
                  <Button 
                    color="secondary" 
                    size="sm" 
                    outline 
                    onClick={() => dateReverse()}>Дата { sort ? <>&#8593;</> : <>&#8595;</> }
                  </Button>
                </th> 
                  : 
                ''
              }
            </tr>
          </thead>
          <tbody>
            {list.map(({ id, first_name, last_name, date }, index) => {
              return (
                <tr key={index} onClick={() => window.open(`https://vk.com/id${id}`,'_blank')}>
                  <th scope="row">{index+1}</th>
                  <td className="id">{id}</td>
                  <td>{first_name} {last_name}</td>
                  { isDate ? <td>{new Date(date).toLocaleString({ timezone: 'UTC', hours12: false })}</td> : ''}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Scroll>
    </Wrap>  
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  isDate: PropTypes.bool
}

export default List