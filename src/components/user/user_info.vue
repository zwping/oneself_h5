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
                <a-input
                    :readOnly="!editState"
                    v-model="userData['nickname']"
                />
            </a-col>
        </a-row>
        <a-row class="row1">
            <a-col :span="3" class="title">
                <span>邮箱</span>
            </a-col>
            <a-col :span="6">
                <a-input :readOnly="!editState" v-model="userData['mail']" />
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
                    icon="user"
                    :src="userData['portrait']"
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
                        <a-icon v-if="fileLoading.state" type="loading" />
                        <div v-if="!fileLoading.state">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </div>
                </a-upload>
            </a-col>
        </a-row>
        <a-row class="row_submit">
            <a-col :offset="3">
                <a-button
                    v-show="!editState"
                    type="primary"
                    @click="editState = true"
                    >修改资料</a-button
                >
                <div v-show="editState">
                    <a-button type @click="editState = false">取消</a-button>
                    <a-button
                        style="margin-left: 10px"
                        :loading="loading.state"
                        type="primary"
                        @click="submit"
                        >确认</a-button
                    >
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
    Avatar,
} from 'ant-design-vue'
import {isImg} from '../../libs/ImageUtil'
import {
    realType,
    tempEditOb,
    tempEditObOfConfirm,
    tempEditObOfSuc,
} from '../../libs/ObjectUtil'
import {LOADING} from '../../libs/HTTP'
import {TBaseAPI} from '../../config'

export default {
    name: 'user_info',
    data() {
        return {
            editState: false,
            userData: {},
            loading: new LOADING(),
            fileLoading: new LOADING(),
        }
    },
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
        [Upload.name]: Upload,
        [Icon.name]: Icon,
        [Avatar.name]: Avatar,
        [Button.name]: Button,
    },
    watch: {
        editState: function(v) {
            tempEditOb(this.userData, v, 'nickname', 'mail', 'portrait')
        },
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
                ._baseUrl(TBaseAPI)
                ._data('files', file.file)
                ._data('dir', 'oneself/user/portrait')
                ._loading(this.fileLoading)
                ._sucLis(it => {
                    this.userData.portrait = it.result.file_list[0]
                })
                ._execute()
        },
        submit() {
            this.$http('account/m_userinfo')
                ._data('nickname', this.userData['nickname'])
                ._data('mail', this.userData['mail'])
                ._data('portrait', this.userData['portrait'])
                ._loading(this.loading)
                ._sucLis(it => {
                    tempEditObOfSuc(
                        this.userData,
                        'nickname',
                        'mail',
                        'portrait',
                    )
                    message.success('保存成功')
                    this.editState = false
                    this.$store.commit('tokenx/applyUserData', this.userData)
                })
                ._executeFilter(() => {
                    let r = tempEditObOfConfirm(
                        this.userData,
                        'nickname',
                        'mail',
                        'portrait',
                    )
                    if (!r) {
                        this.editState = false
                    }
                    return r
                })
                ._execute()
        },
    },
    beforeCreate() {
        this.$http('/get_userinfo')
            ._sucLis(it => {
                this.userData = it.result
                this.$store.commit('tokenx/applyUserData', it.result)
            })
            ._execute()
    },
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
