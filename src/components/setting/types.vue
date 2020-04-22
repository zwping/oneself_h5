<template>
  <div>
    <div>
      <h3>全局类别</h3>
    </div>
    <a-tree :treeData="data" showLine>
      <a-icon slot="switcherIcon" type="down" />
    </a-tree>
  </div>
</template>

<script>
import { Tree } from 'ant-design-vue'
import { realType } from '../../libs/ObjectUtil'

export default {
  name: 'types',
  data() {
    return {
      data: []
    }
  },
  components: {
    [Tree.name]: Tree
  },
  beforeCreate() {
    this.$http('/types/get_types')
      ._sucLis(it => {
        for (let d of it.result.list) {
          this.data.push({ key: d.id, title: d.title })
        }
      })
      ._execute()
  }
}
</script>

<style scoped>
</style>
