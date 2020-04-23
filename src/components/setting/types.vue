<template>
  <div>
    <div>
      <h3>全局类别</h3>
      <el-tree :data="data" :render-content="renderContent"></el-tree>
    </div>
    <el-button>123</el-button>
  </div>
</template>

<script type="text/jsx">
  import {realType} from '../../libs/ObjectUtil'
  import {Tree, Button} from 'element-ui'

  export default {
    name: 'types',
    data() {
      return {
        data: []
      }
    },
    components: {
      [Tree.name]: Tree,
      [Button.name]: Button
    },
    beforeCreate() {
      this.$http('/types/get_types')
        ._sucLis(it => {
          for (let d of it.result.list) {
            this.data.push({key: d.id, label: d.title})
          }
        })
        ._execute()
    },
    methods: {
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>{node.label}</span>
            <span>
            <el-button size="mini" type="text">Append</el-button>
            <el-button size="mini" type="text">Delete</el-button>
          </span>
          </span>
        )
      }
    }
  }
</script>

<style scoped>
</style>
