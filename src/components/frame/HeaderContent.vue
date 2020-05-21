<template>
  <div id="root">
    <div class="left_group">
      <span class="title">管理系统</span>
      <!-- Oneself - 管理系统-->
      <span class="tab" @click="onTabClick">
        <a>控制台</a>
      </span>
    </div>
    <div class="right_group">
      <div style="height: 100%;width:100px">
        <a-icon style="font-size: 26px;color: white" spin type="redo"/>
      </div>
      <div class="portrait" @click="onPortraitClick">
        <a-avatar shape="square" icon="user" :src="data ? data['portrait'] : ''"/>
      </div>
      <div @mouseover="setting_anim" class="setting">
        <a @click="signOut" style="color:white">Sign out</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {Badge, Avatar, Icon, Dropdown, Menu, message} from 'ant-design-vue'
  import {emit} from '../../libs/Bus'
  import user_info from '../user/user_info'
  import {mapGetters} from 'vuex'

  export default {
    name: 'TopContent',
    data() {
      return {
        setting_dot: false,
        setting_icon_spin: false
      }
    },
    computed: {
      ...mapGetters('tokenx', {
        data: 'data'
      })
    },
    methods: {
      setting_anim() {
        this.setting_icon_spin = true
        setTimeout(() => {
          this.setting_icon_spin = false
        }, 500)
      },
      signOut() {
        Cookies.remove('token')
        message.success('成功登出 !')
        this.$store.dispatch('tokenx/logout')
      },
      onPortraitClick() {
        emit('fc_tabs', {
          title: '基本信息',
          content: user_info,
          key: '基本信息',
          clo: true
        })
      },
      onTabClick() {
        emit('fc_tabs', {
          title: '控制台',
          content: '',
          key: '控制台',
          clo: true
        })
      },
    },
    mounted() {
      // emit('fc_tabs', {
      //   title: '基本信息',
      //   content: user_info,
      //   key: '基本信息',
      //   clo: true
      // })
    },
    components: {
      [Badge.name]: Badge,
      [Avatar.name]: Avatar,
      [Icon.name]: Icon,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item,
      user_info
    },
  }
</script>

<style scoped>
  #root {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Arial Black';
    margin-right: 84px;
  }

  .right_group {
    display: flex;
    display: -webkit-flex;
  }

  .portrait {
    cursor: pointer;
  }

  .setting {
    align-items: center;
    display: -webkit-flex;
    display: flex;
    padding: 0 0 0 10px;
    justify-content: center;
  }

  .icon1 {
    color: #666666;
    spin: true;
    font-size: 18px;
  }

  .left_group {
  }

  .tab {
  }

  .tab a {
    color: white;
    font-size: 16px;
    background-color: #1890ff;
    display: inline-block;
    height: 100%;
    padding: 0 20px;
  }

  .tab a:hover {
    font-size: 16px;
    color: #bcd7f1;
    /*font-weight: bold;*/
  }
</style>
