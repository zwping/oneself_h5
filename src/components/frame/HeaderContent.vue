<template>
  <div id="root">
    <span class="title">Oneself - 管理系统</span>
    <div class="right_group">
      <div class="portrait">
        <a-avatar shape="square" icon="user"/>
      </div>
      <div @mouseover="setting_anim" class="setting">
        <a-badge :dot="setting_dot">
          <a-icon :spin="setting_icon_spin" theme="filled" class="icon1" type="setting"/>
        </a-badge>
      </div>
    </div>
  </div>
</template>

<script>
  import {Badge, Avatar, Icon} from 'ant-design-vue'

  export default {
    name: "TopContent",
    components: {
      [Badge.name]: Badge,
      [Avatar.name]: Avatar,
      [Icon.name]: Icon
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
    width: 38px;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
  }

  .icon1 {
    color: #666666;
    spin: true;
    font-size: 18px;
  }

</style>
