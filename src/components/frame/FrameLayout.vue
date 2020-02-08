<template>
  <a-layout class="top_level" id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div class="logo"></div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart"/>
          <span>统计</span>
        </a-menu-item>
        <a-menu-item key="2" @click="c1">
          <a-icon type="desktop"/>
          <span>配置</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user"/><span>账号</span></span>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file"/>
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <hcontent></hcontent>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <fcontent></fcontent>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Oneself管理系统 ©2020 by zwping
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
  import fcontent from './FrameContent'
  import hcontnet from './HeaderContent'

  export default {
    data() {
      return {
        collapsed: false,
      };
    },
    components: {
      'fcontent': fcontent,
      'hcontent': hcontnet
    },
    methods: {
      c1: (item, key, keypath) => {
        alert(item + key + keypath)
      }
    }
  };
</script>

<style>
  .top_level {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #components-layout-demo-side .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
