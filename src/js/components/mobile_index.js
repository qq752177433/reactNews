import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
const TabPane = Tabs.TabPane;
export default class Root extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
    return (<div>
      <MobileHeader></MobileHeader>
      <Tabs>
        <TabPane tab="头条" key="1">
          <Carousel {...settings}>
            <div><img src="./src/images/carousel_1.jpg"/></div>
            <div><img src="./src/images/carousel_2.jpg"/></div>
            <div><img src="./src/images/carousel_3.jpg"/></div>
            <div><img src="./src/images/carousel_4.jpg"/></div>
          </Carousel>
          <MobileList type="top" count={20}/>
        </TabPane>
        <TabPane tab="社会" key="2">
          <MobileList type="shehui" count={20}/>
        </TabPane>
        <TabPane tab="国内" key="3">
          <MobileList type="guonei" count={20}/>
        </TabPane>
        <TabPane tab="国际" key="4">
          <MobileList type="guoji" count={20}/>
        </TabPane>
        <TabPane tab="娱乐" key="5">
          <MobileList type="yule" count={20}/>
        </TabPane>

      </Tabs>
      <MobileFooter></MobileFooter>
    </div>)
  };
}
