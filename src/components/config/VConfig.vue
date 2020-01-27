<template>
  <div>
    <div>Cookie
      <div>
        <a-textarea
          style="width: 80%;float:left"
          v-model="cookie"
          placeholder="请前往jd获取网络请求的Cookie"
        />
        <a-button type="primary" :loading="editLoading" class="box_1" @click="c1">修改</a-button>
        <a-button type="danger" :loading="testLoading" class="box_1" @click="c2">测试</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {post, get} from '../../libs/HTTP'
  import {setJdCookie, jdCookie, testJdCookie} from '../../config'

  export default {
    name: "Config",
    data() {
      return {
        cookie: '',
        editLoading: false,
        testLoading: false
      }
    },
    methods: {
      c1() {
        post(setJdCookie,
          suc => {
            this.$message.success('修改成功')
          },
          it => {
            this.editLoading = it
          },
          {'cookie': this.cookie}
        )
      },
      c2() {
        get(testJdCookie,
          suc => {
            this.$message.success(suc.result)
          },
          it => {
            this.testLoading = it
          })
      }
    },
    created() {
      post(jdCookie,
        suc => {
          this.$nextTick(function () {
            this.cookie = suc.result
          })
        })
    }
  }
</script>

<style scoped>
  .box_1 {
    float: left;
    margin-left: 10px;
  }
</style>
