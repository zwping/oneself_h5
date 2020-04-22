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
        <span>手机号</span>
      </a-col>
      <a-col :span="6">
        <a-input disabled :value="userData['phone']" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>昵称</span>
      </a-col>
      <a-col :span="6">
        <a-input :disabled="!editState" v-model="userData['nickname']" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>邮箱</span>
      </a-col>
      <a-col :span="6">
        <a-input :disabled="!editState" v-model="userData['mail']" />
      </a-col>
    </a-row>
    <a-row class="row1">
      <a-col :span="3" class="title">
        <span>头像</span>
      </a-col>
      <a-col :span="6" class="portrait_ly">
        <a-avatar
          style="margin-right:10px;margin-bottom:10px"
          shape="square"
          :size="104"
          :src="portrait ? portrait :userData['portrait']"
        />
        <a-upload
          v-show="editState"
          listType="picture-card"
          :showUploadList="false"
          :beforeUpload="beforeUpload"
          :customRequest="fileUpload"
          :multiple="true"
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
          <a-button style="margin-left: 10px" type="primary" @click="submit">确认</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Button,
  Input,
  Upload,
  Icon,
  message,
  Avatar
} from 'ant-design-vue'
import { isImg } from '../../libs/ImageUtil'
import { realType } from '../../libs/ObjectUtil'

export default {
  name: 'user_info',
  data() {
    return {
      editState: false,
      userData: {},
      portrait: null
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Upload.name]: Upload,
    [Icon.name]: Icon,
    [Avatar.name]: Avatar,
    [Button.name]: Button
  },
  methods: {
    beforeUpload(file) {
      let img = isImg(file)
      if (!img) {
        message.error('请选择图片类型的文件')
      }
      let size = file.size / 1024 / 1024 < 2
      if (!size) {
        message.error('请选择小于2M的图片')
      }
      return img && size
    },
    fileUpload(file) {
      this.$http('/files/upload')
        ._baseUrl('http://121.41.116.91:5000')
        ._data('files', file.file)
        ._data('dir', 'oneself/user/portrait')
        ._sucLis(it => {
          this.portrait = it.result.file_list[0]
        })
        ._execute()
    },
    submit() {
      let avatar = this.portrait ? this.portrait : this.userData['portrait']
      this.$http('account/m_userinfo')
        ._data('nickname', this.userData['nickname'])
        ._data('mail', this.userData['mail'])
        ._data('portrait', avatar)
        ._sucLis(it => {
          message.success('保存成功')
          this.editState = false
          this.userData['portrait'] = avatar
          this.$store.commit('tokenx/applyUserData', it.result)
        })
        ._execute()
    }
  },
  beforeCreate() {
    this.$http('/get_userinfo')
      ._sucLis(it => {
        this.userData = it.result
        this.$store.commit('tokenx/applyUserData', it.result)
      })
      ._execute()
  }
}
</script>

<style scoped>
.title span {
  float: right;
  margin-right: 20px;
  line-height: 32px;
}

.row1 {
  margin-bottom: 10px;
}

.row_submit {
  margin-top: 12px;
}
.portrait_ly {
  display: flex;
  display: -webkit-flex;
}
</style>
