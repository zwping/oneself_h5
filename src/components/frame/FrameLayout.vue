<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <hcontent/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="1">
            <span slot="title"><a-icon type="user"/>思泓</span>
            <a-menu-item key="1">昌南自动学习</a-menu-item>
            <a-menu-item key="1">昌南自动学习</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <span slot="title"><a-icon type="user"/>第三方</span>
            <a-menu-item key="1">Github</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
            <span slot="title"><a-icon type="laptop"/>用户管理</span>
            <a-menu-item key="5">后台用户</a-menu-item>
            <a-menu-item key="5">前台用户</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="4">
            <span slot="title"><a-icon type="notification"/>日志</span>
            <a-menu-item key="9">登录日志</a-menu-item>
            <a-menu-item key="9">错误日志</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <fcontent></fcontent>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
  import fcontent from './FrameContent'
  import hcontnet from './HeaderContent'
  import {Layout, Menu, Breadcrumb, Icon} from 'ant-design-vue'

  export default {
    data() {
      return {
        collapsed: false,
      }
    },
    components: {
      'fcontent': fcontent,
      'hcontent': hcontnet,
      [Layout.name]: Layout,
      [Layout.Header.name]: Layout.Header,
      [Layout.Sider.name]: Layout.Sider,
      [Layout.Content.name]: Layout.Content,
      [Menu.name]: Menu,
      [Menu.SubMenu.name]: Menu.SubMenu,
      [Menu.Item.name]: Menu.Item,
      [Breadcrumb.name]: Breadcrumb,
      [Breadcrumb.Item.name]: Breadcrumb.Item,
      [Icon.name]: Icon
    }
  }
</script>

<style>
</style>
