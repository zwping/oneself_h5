<template>
  <div>
    <a-button style="margin-left: 28px"
              type="primary" size="small"
              @click="add_type">新增分类
    </a-button>
    <br/>
    <br/>
    <a-tree defaultExpandAll :treeData="data">
      <a-icon #switcherIcon type="down"/>
      <template #custom="item">
        <span class="title_w" v-show="!item.edit">{{item.title}}</span>
        <a-input class="title_w" v-model="item.title" size="small" v-show="item.edit"
                 placeholder="请输入分类名"
        />
        <a-button :type="item.edit ? 'default' : 'link'" size="small"
                  @click="onEdit(item)">
          {{item.edit ? '保存' : '编辑'}}
        </a-button>
        <a-button type="dashed" size="small" v-show="item.edit" @click="onCancelEdit(item)">取消</a-button>
        <a-button type="link" size="small" @click="onEnable(item)">禁用</a-button>
        <a-button type="link" size="small" @click="onAddChild(item)">增加下级</a-button>
      </template>
    </a-tree>
  </div>
</template>

<script type="text/jsx">
  import {Tree, Icon, Input, Button, message} from 'ant-design-vue'
  import {realType} from '../../libs/ObjectUtil'
  import {isEmpty, isNotEmpty} from "../../libs/Empty"

  export default {
    name: 'types',
    data() {
      return {
        data: []
      }
    },
    components: {
      [Tree.name]: Tree,
      [Button.name]: Button,
      [Input.name]: Input,
      [Icon.name]: Icon
    },
    beforeCreate() {
      this.$http('/types/get_types')
        ._sucLis(it => {
          for (let d of it.result.types) {
            this.data.push({
              'title': d.title,
              'id': d.id,
              'scopedSlots': {title: 'custom'},
              'edit': false
            })
            re(this.data, d)
          }
        })
        ._execute()
    },
    methods: {
      add_type() {
        if (isEmpty(this.data) || isNotEmpty(this.data[0].id)) {
          this.data.unshift({
            scopedSlots: {title: 'custom'},
            edit: true
          })
        } else {
          message.warning('请先保存新增的分类')
        }
      },
      onEdit(it) {
        it.edit = !it.edit
        console.log(it)
      },
      onEnable(it) {
        it.edit = false
      },
      onAddChild(it) {
        if (isEmpty(it.children)) {
          it.children = []
        }
        it.children.unshift({
          scopedSlots: {title: 'custom'},
          edit: true
        })
      }
    }
  }

  function re(data, d) {
    if (isNotEmpty(d.children)) {

    }
  }
</script>

<style scoped>
  .title_w {
    display: inline-block;
    width: 200px;
  }
</style>
