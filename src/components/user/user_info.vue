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
        <a-upload
          listType="picture-card"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
          :customRequest="fileUpload"
        >
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
import { Row, Col, Button, Input, Upload, Icon, message } from "ant-design-vue";
import { isImg } from "../../libs/ImageUtil";
import axios from 'axios'

export default {
  name: "user_info",
  data () {
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
  methods: {
    beforeUpload (file) {
      let img = isImg(file);
      if (!img) {
        message.error("请选择图片类型的文件");
      }
      let size = file.size / 1024 / 1024 < 2;
      if (!size) {
        message.error("请选择小于2M的图片");
      }
      return img && size;
    },
    fileUpload (file) {
      let f = file.file;
      let d = new FormData()
      d.append('files', f)
      console.log(f)
      console.log(d.get('files'))
      axios.post('http://121.41.116.91:5000/files/upload', d, { headers: { 'content-type': 'multipart/form-data' } })
        .then(it => {
          console.log(it)
        }).catch(it => {
          console.log('ee')
        })
      // console.log(f instanceof File);
      // this.$http("/files/upload")
      //   ._baseUrl("http://121.41.116.91:5000")
      //   ._data("files", f)
      //   ._execute();
      // console.log(file.file);
    }
  },
  beforeCreate () {
    this.$http("/get_userinfo")
      ._sucLis(it => {
        // console.log(it['result'])
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
