<template>
    <a-layout>
        <a-layout-header class="header">
            <hcontnet />
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                :style="{
                    overflow: 'auto',
                    height: 'calc(100vh - 64px)',
                    left: 0,
                    background: '#fff',
                }"
            >
                <a-menu mode="inline">
                    <a-sub-menu key="1">
                        <span slot="title" class="submenu-title-wrapper">
                            <a-icon type="user" />思泓
                        </span>
                        <a-menu-item key="1-1" @click="fc_tabs"
                            >昌南自动学习</a-menu-item
                        >
                        <a-menu-item key="1-2" @click="fc_tabs"
                            >新余建设培训-题库</a-menu-item
                        >
                        <a-menu-item key="1-3" @click="fc_tabs"
                            >考证通-自动学习</a-menu-item
                        >
                    </a-sub-menu>
                    <a-sub-menu key="2">
                        <span slot="title"> <a-icon type="user" />第三方 </span>
                        <a-menu-item key="2-1" @click="fc_tabs"
                            >Github</a-menu-item
                        >
                        <a-menu-item key="2-2" @click="fc_tabs"
                            >京东</a-menu-item
                        >
                        <a-menu-item-group key="2-3">
                            <template slot="title">
                                <span>Tool</span>
                            </template>
                            <a-menu-item key="2-3-1" @click="fc_tabs"
                                >分类</a-menu-item
                            >
                            <a-menu-item key="2-3-2" @click="fc_tabs"
                                >日志</a-menu-item
                            >
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="3">
                        <span slot="title">
                            <a-icon type="laptop" />用户管理
                        </span>
                        <a-menu-item key="3-1" @click="fc_tabs"
                            >后台用户</a-menu-item
                        >
                        <a-menu-item key="3-2" @click="fc_tabs"
                            >前台用户</a-menu-item
                        >
                    </a-sub-menu>
                    <a-sub-menu key="4">
                        <span slot="title">
                            <a-icon type="notification" />日志
                        </span>
                        <a-menu-item key="4-1" @click="fc_tabs"
                            >登录日志</a-menu-item
                        >
                        <a-menu-item key="4-2" @click="fc_tabs"
                            >全部日志</a-menu-item
                        >
                    </a-sub-menu>
                    <a-sub-menu key="5">
                        <span slot="title">
                            <a-icon type="notification" />设置
                        </span>
                        <a-menu-item key="5-1" @click="fc_tabs"
                            >自动脚本</a-menu-item
                        >
                        <a-menu-item key="5-2" @click="fc_tabs"
                            >类别分类</a-menu-item
                        >
                        <a-menu-item key="5-3" @click="fc_tabs"
                            >文件管理</a-menu-item
                        >
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding-left: 10px">
                <a-layout-content
                    :style="{
                        background: '#fff',
                        padding: '24px',
                        margin: 0,
                        minHeight: '280px',
                    }"
                >
                    <fcontent></fcontent>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
import fcontent from './FrameContent'
import hcontnet from './HeaderContent'
import {Layout, Menu, Breadcrumb, Icon} from 'ant-design-vue'
import {emit} from '../../libs/Bus'
import changnan from '../sh/auto_changnan'
import xinyu_js from '../sh/auto_xinyu_js'
import github from '../third_party/github'
import jd from '../third_party/JD'
import tool_log from '../third_party/tool_log'
import back_user from '../user/back_user'
import fore_user from '../user/fore_user'
import LoginLog from '../log/LoginLog'
import AllLog from '../log/AllLog'
import auto_task from '../setting/auto_task'
import types from '../setting/types'
import dir_files from '../setting/dir_files'
import {BaseAPI, TBaseAPI} from '../../config'
import auto_kaozhengtong from '../sh/auto_kaozhengtong'

export default {
    data() {
        return {
            collapsed: false,
        }
    },
    components: {
        fcontent,
        hcontnet,
        changnan,
        xinyu_js,
        github,
        jd,
        tool_log,
        back_user,
        fore_user,
        LoginLog,
        AllLog,
        auto_task,
        types,
        dir_files,
        auto_kaozhengtong,
        [Layout.name]: Layout,
        [Layout.Header.name]: Layout.Header,
        [Layout.Sider.name]: Layout.Sider,
        [Layout.Content.name]: Layout.Content,
        [Menu.name]: Menu,
        [Menu.SubMenu.name]: Menu.SubMenu,
        [Menu.Item.name]: Menu.Item,
        [Breadcrumb.name]: Breadcrumb,
        [Breadcrumb.Item.name]: Breadcrumb.Item,
        [Menu.ItemGroup.name]: Menu.ItemGroup,
        [Icon.name]: Icon,
    },
    methods: {
        fc_tabs(e) {
            let n = ''
            let comp = ''
            let api = ''
            switch (e.key) {
                case '1-1':
                    n = '昌南自动学习'
                    comp = changnan
                    break
                case '1-2':
                    n = '新余建设培训-题库'
                    comp = xinyu_js
                    break
                case '1-3':
                    n = '考证通-自动学习'
                    comp = auto_kaozhengtong
                    break
                case '2-1':
                    n = 'Github'
                    comp = github
                    break
                case '2-2':
                    n = '京东'
                    comp = jd
                    break
                case '2-3-1':
                    n = 'Tool分类'
                    comp = types
                    api = TBaseAPI
                    break
                case '2-3-2':
                    n = 'Tool日志'
                    comp = tool_log
                    break
                case '3-1':
                    n = '后台用户'
                    comp = back_user
                    break
                case '3-2':
                    n = '前台用户'
                    comp = fore_user
                    break
                case '4-1':
                    n = '登录日志'
                    comp = LoginLog
                    break
                case '4-2':
                    n = '全部日志'
                    comp = AllLog
                    break
                case '5-1':
                    n = '自动脚本'
                    comp = auto_task
                    break
                case '5-2':
                    n = '类别分类'
                    comp = types
                    api = BaseAPI
                    break
                case '5-3':
                    n = '文件管理'
                    comp = dir_files
                    break
            }
            emit('fc_tabs', {
                title: n,
                content: comp,
                key: n,
                clo: true,
                api: api,
            })
        },
    },
    mounted() {
        // emit('fc_tabs', {
        //   title: '日志',
        //   content: tool_log,
        //   key: '日志',
        //   clo: true
        // })
        // emit('fc_tabs', {
        //   title: 'Tool日志',
        //   content: tool_log,
        //   key: 'Tool日志',
        //   clo: true
        // })
        // emit('fc_tabs', {
        //   title: 'Tool分类',
        //   content: types,
        //   key: 'Tool分类',
        //   clo: true,
        //   api: TBaseAPI
        // })
        // emit('fc_tabs', {
        //   title: '类别分类',
        //   content: types,
        //   key: '类别分类',
        //   clo: true,
        //   api: BaseAPI
        // })
        // emit('fc_tabs', {
        //   title: '京东',
        //   content: jd,
        //   key: '京东',
        //   clo: true,
        // })
        emit('fc_tabs', {
            title: '全部日志',
            content: AllLog,
            key: '全部日志',
            clo: true,
        })
        // emit('fc_tabs', {
        //   title: '登录日志',
        //   content: login_log,
        //   key: '登录日志',
        //   clo: true
        // })
        // emit('fc_tabs', {
        //   title: '考证通-自动学习',
        //   content: auto_kaozhengtong,
        //   key: '考证通-自动学习',
        //   clo: true
        // })
    },
}
</script>

<style></style>
