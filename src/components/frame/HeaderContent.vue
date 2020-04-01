<template>
  <div id="root">
    <span class="title">Oneself - 管理系统</span>
    <div class="right_group">
      <div class="portrait">
        <a-avatar shape="square" icon="user"/>
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

  export default {
    name: "TopContent",
    components: {
      [Badge.name]: Badge,
      [Avatar.name]: Avatar,
      [Icon.name]: Icon,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [Menu.Item.name]: Menu.Item
    },
    data() {
      return {
        setting_dot: false,
        setting_icon_spin: false
      }
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
        this.$store.dispatch('tokenx/verifyToken')
      }
    }
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
    font-family: "Arial Black";
  }

  .right_group {
    display: flex;
    display: -webkit-flex;
  }

  .portrait {

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

</style>
