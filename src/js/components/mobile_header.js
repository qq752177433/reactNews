import React from 'react';
export default class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return (
      <div id="mobileheader">
        <header>
            <img src="./src/images/logo.png"/>
            <span>ReactNews</span>
        </header>
      </div>
    );
  };
}
