<template>
    <div>
        <a-button
            style="margin-left: 28px"
            type="primary"
            size="small"
            @click="add_type"
        >
            新增分类
        </a-button>
        <br />
        <br />
        <a-tree v-if="data.length" defaultExpandAll :treeData="data">
            <template #switcherIcon>
                <a-icon type="down" />
            </template>
            <template #custom="item">
                <a-tooltip trigger="click">
                    <template #title>
                        id:{{ item.id }} des:{{ item.des }}
                    </template>
                    <span
                        class="title_w"
                        :style="
                            item.enabled === 1 ? 'color:#000' : 'color:#ccc'
                        "
                        v-show="!item.edit"
                        >{{ item.title }}
                    </span>
                    <a-input
                        class="title_w"
                        v-model="item.title"
                        size="small"
                        v-show="item.edit"
                        placeholder="请输入分类名"
                        @keyup.enter.native="onEdit(item)"
                        :style="
                            item.enabled === 1 ? 'color:#000' : 'color:#ccc'
                        "
                    />
                </a-tooltip>
                <a-tooltip>
                    <template #title>排序id,越小越靠前</template>
                    <a-input
                        size="small"
                        :disabled="!item.edit"
                        style="text-align:center;width: 35px"
                        v-model="item.priority"
                    />
                </a-tooltip>
                <a-button
                    :type="item.edit ? 'default' : 'link'"
                    size="small"
                    :loading="item.load.state"
                    @click="onEdit(item)"
                    >{{ item.edit ? '保存' : '编辑' }}
                </a-button>
                <a-button
                    type="dashed"
                    size="small"
                    v-show="item.edit"
                    @click="onCancelEdit(item)"
                    >取消
                </a-button>
                <a-button
                    v-show="item.id"
                    type="link"
                    size="small"
                    @click="onEnable(item)"
                    :loading="item.enabledLoad.state"
                    >{{ item.enabled === 1 ? '禁用' : '启用' }}
                </a-button>
                <a-button
                    v-show="item.id"
                    type="link"
                    size="small"
                    @click="onAddChild(item)"
                    >增加下级
                </a-button>
            </template>
        </a-tree>
    </div>
</template>

<script type="text/jsx">
import {tempEditOb, tempEditObOfConfirm, tempEditObOfSuc} from '../../libs/ObjectUtil'
import {isEmpty, isNotEmpty} from '../../libs/Empty'
import {LOADING} from '../../libs/HTTP'
import {hasOwnProperty, setRender} from '../../libs/ObjectUtil'

export default {
    name: 'types',
    props: ['API'],
    data() {
        return {
            data: [],
            keys: 0,
        }
    },
    components: {},
    methods: {
        add_type() {
            if (
                isEmpty(this.data) ||
                hasOwnProperty(this.data[this.data.length - 1], 'id')
            ) {
                this.data.push(__getBaseBean())
            } else {
                this.$message.warning('请先保存新增的分类')
            }
        },
        onEdit(it) {
            if (it.edit) {
                if (isEmpty(it.id)) {
                    this.$http('/types')
                        ._baseUrl(this.API)
                        ._data('title', it.title)
                        ._data('pid', it.pid)
                        ._data('pid_list', it.pid_list)
                        ._data('depth', it.depth)
                        ._loading(it.load)
                        ._sucLis(r => {
                            it.edit = false
                            it.id = r.result.insert_id
                        })
                        ._execute()
                } else {
                    this.$http('/types')
                        ._put()
                        ._baseUrl(this.API)
                        ._data('id', it.id)
                        ._data('title', it.title)
                        ._data('priority', it.priority)
                        ._loading(it.load)
                        ._sucLis(r => {
                            it.edit = false
                            tempEditObOfSuc(it, 'title', 'priority')
                        })
                        ._executeFilter(() => {
                            let r = tempEditObOfConfirm(it, 'title', 'priority')
                            if (!r) {
                                it.edit = false
                            }
                            return r
                        })
                        ._execute()
                }
            } else {
                tempEditOb(it, true, 'title', 'priority')
                it.edit = true
            }
            setRender(this, it, {childrenKey: 'children'})
        },
        onEnable(it) {
            it.edit = false
            this.$http('/types')
                ._put()
                ._baseUrl(this.API)
                ._data('id', it.id)
                ._data('enabled', it.enabled === 1 ? 0 : 1)
                ._loading(it.enabledLoad)
                ._sucLis(i => {
                    it.enabled = it.enabled === 1 ? 0 : 1
                    setRender(this, it)
                })
                ._execute()
        },
        onCancelEdit(it) {
            tempEditOb(it, false, 'title', 'priority')
            it.edit = false
            __del(this.data, it.pid)
            setRender(this, it, {childrenKey: 'children'})
        },
        onAddChild(it) {
            this.keys++
            if (isEmpty(it.children)) {
                it.children = [__getBaseBean(it.id)]
                setRender(this, it)
            } else if (hasOwnProperty(it.children[it.children.length - 1], 'id')) {
                it.children.push(__getBaseBean(it.id))
                123sdfasdfasdf
                setRender(this, it)
            } else {
                this.$message.warning('请先保存新增的分类')
            }
        },
    },
    created() {
        this.$http('/types')
            ._get()
            ._baseUrl(this.API)
            ._sucLis(it => {
                __addAttr(it.result.types)
                this.data = it.result.types
            })
            ._execute()
    },
}

function __addAttr(data) {
    for (let d of data) {
        d.key = d.id
        d.scopedSlots = {title: 'custom'}
        d.edit = false
        d.load = new LOADING()
        d.enabledLoad = new LOADING()
        __addAttr1(data, d)
    }
}

function __addAttr1(data, d) {
    if (isNotEmpty(d.children)) {
        for (let d1 of d.children) {
            d1.key = d1.id
            d1.scopedSlots = {title: 'custom'}
            d1.edit = false
            d1.load = new LOADING()
            d1.enabledLoad = new LOADING()
            __addAttr1(data, d1)
        }
    }
}

function __del(data, pid) {
    for (let i in data) {
        if (hasOwnProperty(data, i)) {
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
                if (hasOwnProperty(data, i)) {
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
        scopedSlots: {title: 'custom'},
        edit: true,
        pid: pid || '',
        priority: 9,
        enabled: 1,
        key: Date(),
        title: '',
        load: new LOADING(),
        enabledLoad: new LOADING(),
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
