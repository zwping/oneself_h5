<template>
    <div>
        <div
            style="display: flex;display: -webkit-flex;justify-content: space-between;align-items: center; "
        >
            <a-button type="primary" @click="modalVis = true"
                >添加学员</a-button
            >
            <auto-kzt-filter ref="s2" :search="search" />
        </div>
        <table2
            ref="t2"
            :outside_fix_height="340"
            :cus-columns="columns"
            :get_list="get_list"
        >
        </table2>
        <a-modal
            title="添加学员"
            :visible="modalVis"
            :closable="false"
            :confirm-loading="addLoading.state"
            :maskClosable="!addLoading.state"
            @cancel="modalVis = false"
            @ok="ok"
        >
            <a-input
                placeholder="学员信息来源人"
                v-model="origin"
                @keyup.ctrl.enter.native="ok"
            />
            <a-textarea
                v-model="data"
                :placeholder="hint"
                :rows="5"
                @keyup.ctrl.enter.native="ok"
                style="margin-top: 5px"
            />
            <span style="color:#999999">{{ data_num }}</span>
            <a-divider />
            <div style="display: flex;display: -webkit-flex">
                <a-upload :showUploadList="false" :customRequest="fileUpload">
                    <a-button :loading="addFileLoading.state"
                        >文件上传</a-button
                    >
                </a-upload>
                <a style="margin-left: 10px;margin-top: 8px">模板下载</a>
            </div>
        </a-modal>
    </div>
</template>

<script>
import Table2 from '../cus_template/Table2'
import {LOADING} from '../../libs/HTTP'
import {isEmpty, isNotEmpty} from '../../libs/Empty'
import {TBaseAPI} from '../../config'
import AutoKztFilter from '../cus_template/AutoKztFilter'
import _ from 'lodash'

export default {
    name: 'auto_kaozhengtong',
    data() {
        return {
            columns: [
                {
                    title: '序号',
                    width: 80,
                    align: 'center',
                    customRender: (text, record, index) => `${index + 1}`,
                },
                {
                    dataIndex: 'portrait',
                    title: '头像',
                    width: 60,
                    align: 'center',
                    scopedSlots: {customRender: 'portrait'},
                },
                {
                    dataIndex: 'idcard',
                    title: '身份证号',
                    align: 'center',
                    width: 200,
                },
                {dataIndex: 'pwd', title: '密码', align: 'center', width: 100},
                {dataIndex: 'name', title: '姓名', align: 'left', width: 80},
                // {dataIndex: 'phone', title: '手机号', align: 'center', width: 180},
                {dataIndex: 'company', title: '公司名'},
                {dataIndex: 'major', title: '专业', align: 'left', width: 150},
                // {dataIndex: 'uid', title: 'uid', width: 100},
                {
                    dataIndex: 'progress',
                    title: '进度',
                    width: 100,
                    align: 'center',
                    scopedSlots: {customRender: 'progress'},
                },
                {
                    dataIndex: 'last_step',
                    title: '当前进度',
                    align: 'center',
                    width: 100,
                },
                {
                    dataIndex: 'video_size',
                    title: '总课程',
                    align: 'center',
                    width: 100,
                },
                {dataIndex: 'origin', title: '来源', width: 100},
                {
                    dataIndex: 'batch_no',
                    title: '批次号',
                    align: 'center',
                    width: 80,
                },
                {
                    dataIndex: 'next_play_time',
                    title: '下次学习时间',
                    align: 'center',
                    width: 160,
                },
                {
                    dataIndex: 'ctime',
                    title: '创建时间',
                    align: 'center',
                    scopedSlots: {customRender: 'time'},
                    width: 160,
                },
            ],
            hint:
                '身份证号和密码\nEg：\n身份证号1:密码(密码不填默认123456)\n身份证号2:密码(密码不填默认123456)',
            modalVis: false,
            addLoading: new LOADING(),
            addFileLoading: new LOADING(),
            origin: '',
            data: '',
        }
    },
    methods: {
        getT2(key, dvalue = undefined) {
            return _.get(this.$refs.t2, key, dvalue)
        },
        getS2(key, dvalue = undefined) {
            return _.get(this.$refs.s2, key, dvalue)
        },
        search() {
            this.get_list()
        },
        get_list(page = 1) {
            this.$http('/sh/kzt')
                ._get()
                ._param('page', page)
                ._param('perpage', this.getT2('pagination.pageSize', 20))
                ._params(this.getS2('params'))
                ._loading(this.getT2('loading'), this.getS2('loading'))
                ._sucLis(it => {
                    for (let d of it.result.lists) {
                        let size = d.video_size
                        d.progress =
                            d.done === 1
                                ? [size, size]
                                : [d.last_step - 1, size]
                    }
                    this.$refs.t2.lists = it.result.lists
                    this.$refs.t2.pagination = {
                        current: it.result.page,
                        pageSize: it.result.perpage,
                        total: it.result.totalNum,
                    }
                })
                ._execute()
        },
        ok() {
            if (isEmpty(this.data)) {
                this.modalVis = false
            } else {
                let acs = []
                let pwds = []
                for (let d of this.data
                    .toString()
                    .trim()
                    .split(/[\n]/)) {
                    if (d.indexOf(':') === -1) {
                        acs.push(d.trim())
                        pwds.push('123456')
                    } else {
                        let w = d.split(':')
                        acs.push(w[0].trim())
                        pwds.push(w[1].trim())
                    }
                }
                this.$http('/sh/kzt')
                    ._loading(this.addLoading)
                    ._data('origin', this.origin)
                    ._data('idcards', acs)
                    ._data('pwds', pwds)
                    ._sucLis(it => {
                        this.$message.success('学员信息增加成功')
                        this.modalVis = false
                        this.data = ''
                        this.origin = ''
                        this.get_list()
                    })
                    ._errLis(it => {
                        if (isNotEmpty(_.get(it, 'result.error_data'))) {
                            let errorData = ''
                            for (let d of it.result.error_data) {
                                errorData += d.toString() + '\n'
                            }
                            this.data = errorData
                        }
                    })
                    ._execute()
            }
        },
        fileUpload(file) {
            this.$http(TBaseAPI + '/files')
                ._data('files', file.file)
                ._data('dir', 'oneself/auto_study')
                ._data('default_name', 1)
                ._loading(this.addFileLoading)
                ._sucLis(it => {
                    this.excel(it.result.file_list[0])
                })
                ._execute()
        },
        excel(url) {
            this.$http('/excel/read_cols', 'get')
                ._param('url', url)
                ._param('cols', '身份证号码,密码')
                ._loading(this.addFileLoading)
                ._sucLis(it => {
                    let idcards = []
                    let pwds = []
                    for (let d of it.result) {
                        if (d.col === '身份证号码') {
                            idcards = d.data
                        } else if (d.col === '密码') {
                            pwds = d.data
                        }
                    }
                    for (let i in [
                        ...Array(idcards.length - pwds.length).keys(),
                    ]) {
                        pwds.push('123456')
                    }
                    for (let i in idcards) {
                        this.data += idcards[i] + ':' + pwds[i] + '\n'
                    }
                })
                ._execute()
        },
    },
    computed: {
        data_num() {
            return (
                '当前学员数:' +
                _.filter(this.data.split('\n'), it => {
                    return isNotEmpty(it)
                }).length
            )
        },
    },
    components: {
        table2: Table2,
        AutoKztFilter,
    },
}
</script>

<style scoped></style>
