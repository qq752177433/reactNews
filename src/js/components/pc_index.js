import React from 'react';
import { Row, Col } from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';
export default class Root extends React.Component{
  render(){
    return (
        <div>
          <PCHeader></PCHeader>
          <PCNewsContainer></PCNewsContainer>
          <PCFooter></PCFooter>
        </div>
    )
  };
}
