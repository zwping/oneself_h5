<template>
  <div class="container">
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>用户角色</span>
      </a-col>
      <a-col :span="6">
        <a-input disabled value="超级管理员" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>昵称</span>
      </a-col>
      <a-col :span="6">
        <a-input :disabled="!editState" :value="userData ? userData['nickname'] : ''" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>手机号</span>
      </a-col>
      <a-col :span="6">
        <a-input :disabled="!editState" :value="userData ? userData['phone'] : ''" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>邮箱</span>
      </a-col>
      <a-col :span="6">
        <a-input :disabled="!editState" :value="userData ? userData['mail'] : ''" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>头像</span>
      </a-col>
      <a-col :span="6">
        <a-upload listType="picture-card" :showUploadList="false" :beforeUpload="beforeUpload">
          <div>
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-col>
    </a-row>
    <a-row class="row_submit">
      <a-col :offset="3">
        <a-button v-show="!editState" type="primary" @click="editState = true">修改资料</a-button>
        <div v-show="editState">
          <a-button type @click="editState = false">取消</a-button>
          <a-button style="margin-left: 10px" type="primary">确认</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Row, Col, Button, Input, Upload, Icon } from "ant-design-vue";

export default {
  name: "user_info",
  data() {
    return {
      editState: false,
      userData: null
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Upload.name]: Upload,
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  beforeCreate() {
    this.$http("/get_userinfo")
      ._sucLis(it => {
        console.log(it["result"]);
        this.userData = it["result"];
      })
      ._execute();
  }
};
</script>

<style scoped>
.title span {
  float: right;
  margin-right: 20px;
  line-height: 32px;
}

.row1 {
  margin-bottom: 5px;
}

.row_submit {
  margin-top: 12px;
}
</style>
