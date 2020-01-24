<template>
  <div>
    <div>Cookie
      <div>
        <a-textarea
          style="width: 80%;float:left"
          :value="cookie"
          placeholder="请前往jd获取网络请求的Cookie"
          autosize="true"
        />
        <a-button type="primary" :loading="editLoading" class="box_1" @click="c1">修改</a-button>
        <a-button type="danger" :loading="testLoading" class="box_1" @click="c2">测试</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {post} from '../../libs/HTTP'
  import {setJdCookie, jdCookie} from '../../config'

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
        this.editLoading = true
        post(setJdCookie, {'cookie': this.cookie})
          .then(it => {
            this.editLoading = false
            console.log(it.data)
            if (it.data.code === 200) {

            } else {

            }
          })
          .catch(it => {
            this.editLoading = false
          })
      },
      c2() {

      }
    },
    created() {
      post(jdCookie)
        .then(it => {
          this.$nextTick(function () {
            this.cookie = it.data.result
          })
        })
        .catch(it => {
          console.log(it)
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
