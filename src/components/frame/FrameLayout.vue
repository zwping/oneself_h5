<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <hcontent/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
        >
          <a-sub-menu key="1">
            <span slot="title" class="submenu-title-wrapper"><a-icon type="user"/>思泓</span>
            <a-menu-item key="1-1">昌南自动学习</a-menu-item>
            <a-menu-item key="1-2">新余建设培训-题库</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <span slot="title"><a-icon type="user"/>第三方</span>
            <a-menu-item key="2-1">Github</a-menu-item>
            <a-menu-item key="2-2" @click="fc_tabs">京东</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
            <span slot="title"><a-icon type="laptop"/>用户管理</span>
            <a-menu-item key="3-1">后台用户</a-menu-item>
            <a-menu-item key="3-2">前台用户</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="4">
            <span slot="title"><a-icon type="notification"/>日志</span>
            <a-menu-item key="4-1">登录日志</a-menu-item>
            <a-menu-item key="4-2">错误日志</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="5">
            <span slot="title"><a-icon type="notification"/>设置</span>
            <a-menu-item key="5-1">自动脚本</a-menu-item>
            <a-menu-item key="5-2">类别分类</a-menu-item>
            <a-menu-item key="5-3">文件管理</a-menu-item>
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
  import {emit} from '../../libs/Bus'
  import JD from '../third_party/JD'

  export default {
    data() {
      return {
        collapsed: false
      }
    },
    components: {
      'jd': JD,
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
    },
    methods: {
      fc_tabs() {
        emit('fc_tabs', {title: '京东', content: JD, key: '京东', clo: true})
      }
    }
  }
</script>

<style>
</style>
