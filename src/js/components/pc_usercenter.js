import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  notification,
  Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router, Route, Link, browserHistory} from 'react-router'
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
export default class PCUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: '',
      usercollection: '',
      usercoments:''
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollection:json});
    });
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercoments:json});
    });
  }
  handleCancel(value){
    this.setState({previewVisible: value});
  }
  render() {
    const props = {
      action: "https://newsapi.gugujiankong.com/hander.ashx",
      header: {
        "Access-Control-All-Origin": "*"
      },
      className: 'avatar-uploader',
      listType: "picture-card",
      defaultFileList: [
        {
          uid: -1,
          name: 'avatar',
          state: 'done',
          url: 'https://avatars1.githubusercontent.com/u/36815458?s=400&u=3d8df3f2f859e3a66f5ed45eb9e0ae2cfb95281a&v=4',
          thumbUrl: 'https://avatars1.githubusercontent.com/u/36815458?s=400&u=3d8df3f2f859e3a66f5ed45eb9e0ae2cfb95281a&v=4'
        }
      ],
      onPreview: (file) => {
        this.setState({previewImage: file.url, previewVisible: true});
      }
    }
    const {usercollection,usercoments} = this.state;
    const usercollectionList = usercollection.length
    ?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`} target="_blank">查看</a>}>
        <p>{uc.Title}</p>
      </Card>
    ))
    :'您还没有收藏任何的新闻，快去收藏一些新闻吧';
    const usercommentsList = usercoments.length
    ?
    usercoments.map((comment,index)=>(
      <Card key={index} title={`在${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`} target="_blank">查看</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :'您还没有发表过任何评论';
    return (<div>
      <PCHeader/>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Tabs>
            <TabPane tab="我的收藏列表" key="1">
              <div class="commit">
                <Row>
                  <Col span={24}>
                    {usercollectionList}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="我的评论列表" key="2">
              <div class="commit">
                <Row>
                  <Col span={24}>
                    {usercommentsList}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <Upload {...props}>
                <Icon type={this.state.loading
                    ? 'loading'
                    : 'plus'}/>
                <div className="ant-upload-text">上传照片</div>
              </Upload>
              <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.handleCancel(false)}>
                <img alt="预览" src={this.state.previewImage}/>
              </Modal>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={2}></Col>

      </Row>
      <PCFooter/>
    </div>)
  }
}
