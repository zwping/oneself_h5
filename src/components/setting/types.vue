<template>
  <div>
    <a-button style="margin-left: 28px"
              type="primary" size="small"
              @click="add_type">新增分类
    </a-button>
    <br/>
    <br/>
    <a-tree defaultExpandAll :key="keys" :treeData="data">
      <a-icon #switcherIcon type="down"/>
      <template #custom="item">
        <a-tooltip trigger="click">
          <template #title>
            id:{{item.id}}
          </template>
          <span class="title_w" v-show="!item.edit">{{item.title}}</span>
          <a-input class="title_w" v-model="item.title" size="small" v-show="item.edit"
                   placeholder="请输入分类名"
          />
        </a-tooltip>
        <a-tooltip>
          <template #title>
            排序id,越小越靠前
          </template>
          <a-input size="small" :disabled="!item.edit" style="text-align:center;width: 35px" v-model="item.priority"/>
        </a-tooltip>
        <a-button :type="item.edit ? 'default' : 'link'" size="small"
                  @click="onEdit(item)">
          {{item.edit ? '保存' : '编辑'}}
        </a-button>
        <a-button type="dashed" size="small" v-show="item.edit" @click="onCancelEdit(item)">取消</a-button>
        <a-button v-show="item.id" type="link" size="small" @click="onEnable(item)">禁用</a-button>
        <a-button v-show="item.id" type="link" size="small" @click="onAddChild(item)">增加下级</a-button>
      </template>
    </a-tree>
  </div>
</template>

<script type="text/jsx">
  import {Tree, Icon, Input, InputNumber, Button, message, Tooltip} from 'ant-design-vue'
  import {realType} from '../../libs/ObjectUtil'
  import {isEmpty, isNotEmpty} from "../../libs/Empty"

  export default {
    name: 'types',
    data() {
      return {
        data: [],
        keys: 1
      }
    },
    components: {
      [Tree.name]: Tree,
      [Button.name]: Button,
      [Input.name]: Input,
      [InputNumber.name]: InputNumber,
      [Tooltip.name]: Tooltip,
      [Icon.name]: Icon
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
      onCancelEdit(it) {
        this.keys++
        it.edit = false
        __del(this.data, it.pid)
        // this.$forceUpdate()
      },
      onAddChild(it) {
        if (isNotEmpty(it.children) && isEmpty(it.children[0].id)) {
          message.warning('请先保存新增的分类')
          return
        }
        this.keys++
        if (isEmpty(it.children)) {
          it.children = []
        }
        it.children.unshift({
          scopedSlots: {title: 'custom'},
          edit: true,
          pid: it.id,
          priority: 9
        })
      }
    },
    beforeCreate() {
      this.$http('/types/get_types')
        ._sucLis(it => {
          __addAttr(it.result.types)
          this.data = it.result.types
        })
        ._execute()
    }
  }

  function __addAttr(data) {
    for (let d of data) {
      d.scopedSlots = {title: 'custom'}
      d.edit = false
      __addAttr1(data, d)
    }
  }

  function __addAttr1(data, d) {
    if (isNotEmpty(d.children)) {
      for (let d1 of d.children) {
        d1.scopedSlots = {title: 'custom'}
        d1.edit = false
        __addAttr1(data, d1)
      }
    }
  }

  function __del(data, pid) {
    // data = data.filter()
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (isEmpty(data[i].id) && isEmpty(pid)) {
          data.splice(i, 1)
        }
        __del1(data[i], pid)
      }
    }
  }

  function __del1(d, pid) {
    if (isNotEmpty(d)) {
      let data = d.children
      if (isNotEmpty(data)) {
        for (let i in data) {
          if (data.hasOwnProperty(i)) {
            if (isEmpty(data[i].id) && pid === data[i].pid) {
              data.splice(i, 1)
            }
            __del1(data[i], pid)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .title_w {
    display: inline-block;
    width: 200px;
  }

  .priority_w {
    display: inline-block;
    width: 80px;
  }
</style>
