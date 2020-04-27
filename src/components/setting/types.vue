<template>
  <div>
    <a-button style="margin-left: 28px"
              type="primary" size="small"
              @click="add_type">新增分类
    </a-button>
    <br/>
    <br/>
    <a-tree v-if="data.length" defaultExpandAll :key="keys" :treeData="data">
      <a-icon #switcherIcon type="down"/>
      <template #custom="item">
        <a-tooltip trigger="click">
          <template #title>
            id:{{item.id}} des:{{item.des}}
          </template>
          <span class="title_w" :style="item.enabled === 1 ? 'color:#000' : 'color:#ccc'" v-show="!item.edit">{{item.title}}-{{item.enabled}}</span>
          <a-input class="title_w" v-model="item.title" size="small" v-show="item.edit"
                   placeholder="请输入分类名"
                   :style="item.enabled === 1 ? 'color:#000' : 'color:#ccc'"
          />
        </a-tooltip>
        <a-tooltip>
          <template #title>
            排序id,越小越靠前
          </template>
          <a-input size="small" :disabled="!item.edit" style="text-align:center;width: 35px" v-model="item.priority"/>
        </a-tooltip>
        <a-button :type="item.edit ? 'default' : 'link'" size="small"
                  :loading="item.loading.state" @click="onEdit(item)">
          {{item.edit ? '保存' : '编辑'}}
        </a-button>
        <a-button type="dashed" size="small" v-show="item.edit" @click="onCancelEdit(item)">取消</a-button>
        <a-button v-show="item.id" type="link" size="small" @click="onEnable(item)">
          {{item.enabled === 1 ? '禁用' : '启用'}}
        </a-button>
        <a-button v-show="item.id" type="link" size="small" @click="onAddChild(item)">增加下级</a-button>
      </template>
    </a-tree>
  </div>
</template>

<script type="text/jsx">
  import {Tree, Icon, Input, InputNumber, Button, message, Tooltip} from 'ant-design-vue'
  import {realType} from '../../libs/ObjectUtil'
  import {isEmpty, isNotEmpty} from "../../libs/Empty"
  import {LOADING} from "../../libs/HTTP";

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
        if (isEmpty(this.data) || this.data[this.data.length - 1].hasOwnProperty('id')) {
          this.data.push(__getBaseBean())
        } else {
          message.warning('请先保存新增的分类')
        }
      },
      onEdit(it) {
        console.log(it)
        if (it.edit) {
          if (isEmpty(it.id)) {
            this.$http('/types/add_types')
              ._data('title', it.title)
              ._data('id', it.id)
              ._data('pid_list', it.pid_list)
              ._data('depth', it.depth)
              ._loading(it.loading)
              ._sucLis(r => {
                it.edit = false
                it.id = r.result.insert_id
              })
              ._execute()
          } else {
            this.$http('/types/m_types')
              ._data('id', it.id)
              ._data('title', it.title)
              ._data('priority', it.priority)
              ._loading(it.loading)
              ._sucLis(r => {
                it.edit = false
              })
              ._execute()
          }
        } else {
          it.edit = true
        }
      },
      onEnable(it) {
        it.edit = false
        this.$http('/types/m_types')
          ._data('id', it.id)
          ._data('enabled', it.enabled === 1 ? 0 : 1)
          ._loading(it.enabledLoad)
          ._sucLis(i => {
            it.enabled = it.enabled === 1 ? 0 : 1
          })
          ._execute()
      },
      onCancelEdit(it) {
        this.keys++
        it.edit = false
        __del(this.data, it.pid)
      },
      onAddChild(it) {
        this.keys++
        if (isEmpty(it.children)) {
          it.children = [__getBaseBean(it.id)]
        } else if (it.children[it.children.length - 1].hasOwnProperty('id')) {
          it.children.push(__getBaseBean(it.id))
        } else {
          message.warning('请先保存新增的分类')
        }
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
      d.loading = new LOADING()
      d.enabledLoad = new LOADING()
      __addAttr1(data, d)
    }
  }

  function __addAttr1(data, d) {
    if (isNotEmpty(d.children)) {
      for (let d1 of d.children) {
        d1.scopedSlots = {title: 'custom'}
        d1.edit = false
        d1.loading = new LOADING()
        d1.enabledLoad = new LOADING()
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

  function __getBaseBean(pid = null) {
    return {
      'title': '1',
      scopedSlots: {title: 'custom'},
      edit: true,
      pid: pid,
      priority: 9,
      enabled: 1,
      loading: new LOADING(),
      enabledLoad: new LOADING()
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
