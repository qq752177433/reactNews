import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Row, Col} from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MobileHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'toutiao',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    }
  };
  componentWillMount() {
    if (localStorage.userId != '') {
      this.setState({hasLogined: true, userNickName: localStorage.userNickName, userId: localStorage.userId});
    }
  }
  setModalVisible(value) {
    this.setState({modalVisible: value});
  }
  handleClick(e) {
    if (e.key == "register") {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }
  handleSubmit(e) {
    //页面开始向 API 进行提交数据
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    }
    //var formData = this.props.form.getFieldValue();
    var formData = this.props.form.getFieldsValue()
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({userNickName: json.NickUserName, userid: json.UserId});
      localStorage.userId = json.UserId;
      localStorage.userNickName = json.NickUserName;
    });
    if (this.state.action == "login") {
      this.setState({hasLogined: true});
    }
    message.success("请求成功!");
    this.setModalVisible(false)
  }
  login() {
    this.setModalVisible(true);
  }
  callback(key) {
    if (key == 1) {
      this.setState({action: 'register'});
    }
  }
  render() {
    const userShow = this.state.hasLogined
      ? <Link to={`/usercenter`}>
          <Icon type="inbox"/>
        </Link>
      : <Icon type="setting" onClick={this.login.bind(this)}/>;
    const {getFieldDecorator} = this.props.form;

    return (<div id="mobileheader">
      <header>
        <img src="./src/images/logo.png"/>
        <span>ReactNews</span>
        {userShow}
      </header>
      <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
        <Tabs type="card">
          <TabPane tab="登录" key="1">
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="账户">
                {getFieldDecorator('userName', {})(<Input placeholder="请输入您的账号"/>)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('password', {})(<Input type="password" placeholder="请输入您的账号"/>)}
              </FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </Form>
          </TabPane>
          <TabPane tab="注册" key="2">
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="账户">
                {getFieldDecorator('r_userName', {})(<Input placeholder="请输入您的账号"/>)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('r_password', {})(<Input type="password" placeholder="请输入您的账号"/>)}
              </FormItem>
              <FormItem label="请再次输入您的密码">
                {getFieldDecorator('r_confirmPassword', {})(<Input type="password" placeholder="请再次输入您的"/>)}
              </FormItem>
              <Button type="primary" htmlType="submit">注册</Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>);
  };
}
export default Form.create()(MobileHeader);
