import React from 'react';
import {Row, Col, Tabs,Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProducts from './pc_products';
const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component {

  render() {
    const settings = {
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    }
    return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} class="container">
        <div class="leftContainer">
          <div class="carousel">
            <Carousel {...settings}>
              <div><img src="./src/images/carousel_1.jpg" /></div>
              <div><img src="./src/images/carousel_2.jpg" /></div>
              <div><img src="./src/images/carousel_3.jpg" /></div>
              <div><img src="./src/images/carousel_4.jpg" /></div>
            </Carousel>
          </div>
          <PCNewsImageBlock count={6} type="shehui" width="400px" cardTitle="社会头条" imageWidth="112px"/>
        </div>
        <Tabs class="tabs_news">
          <TabPane tab="新闻" key="1">
            <PCNewsBlock count="22" type="top" width="100%" bordered="false" />
          </TabPane>
          <TabPane tab="国际" key="2">
            <PCNewsBlock count="22" type="guoji" width="100%" bordered="false" />
          </TabPane>
        </Tabs>
        <Tabs class="tabs_product">
          <TabPane tab="ReactNews 产品" key="1">
            <PCProducts/>
          </TabPane>
        </Tabs>
        <div>
          <PCNewsImageBlock count={11} type="keji" width="100%" cardTitle="科技新闻" imageWidth="131px"/>
          <PCNewsImageBlock count={22} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="131px"/>
        </div>
      </Col>
      <Col span={2}></Col>
    </Row>)
  }
}
