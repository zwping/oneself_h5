/*** 登录日志表格头 ***/
export const LoginColumns = [
    {
        title: '序号',
        width: 80,
        align: 'center',
        customRender: (text, record, index) => `${index + 1}`,
    },
    // {dataIndex: 'id', title: '日志ID', align: 'center', width: 100},
    {dataIndex: 'client', title: '客户端', width: 120},
    {dataIndex: 'operId', title: '登录人Id', width: 100, align: 'center'},
    {
        dataIndex: 'operNickName',
        title: '登录人昵称',
        width: 150,
        align: 'center',
    },
    {dataIndex: 'remark', title: '登录设备'},
    {
        dataIndex: 'final_time',
        title: '登录时间',
        scopedSlots: {customRender: 'time'},
        width: 200,
        align: 'center',
    },
    {
        dataIndex: '_ip',
        title: '登录IP',
        width: 200,
        align: 'center',
        // scopedSlots: {customRender: 'ip'},
        customRender: (text, r, index) => {
            // return `<span title=${r.ip_isp}>${r.ip_addr} ? ${r.ip_addr} : ${r._ip}</span>` // todo jsx识别标签 v-html? tab多数据?
            return r.ip_addr ? r.ip_addr : r._ip
        },
    },
]

/*** 全部日志表格头 ***/
export const AllLogColumns = [
    {
        title: '序号',
        width: 80,
        align: 'center',
        customRender: (text, record, index) => `${index + 1}`,
    },
    // {dataIndex: 'id', title: 'ID', align: 'center', width: 100},
    {dataIndex: 'client', title: '客户端', width: 120},
    {dataIndex: 'logType', title: '日志类型', width: 150},
    {dataIndex: 'operId', title: '操作人Id', width: 100},
    {dataIndex: 'operNickName', title: '操作人昵称', width: 150},
    {dataIndex: 'operTable', title: '操作表名', width: 150},
    {dataIndex: 'operDataId', title: '被操作Id', width: 100},
    {dataIndex: 'operType', title: '操作类型', width: 160},
    {
        dataIndex: 'oldValue',
        title: '旧值',
        scopedSlots: {customRender: 'oldValue'},
    },
    {
        dataIndex: 'newValue',
        title: '新值',
        width: 200,
        scopedSlots: {customRender: 'newValue'},
    },
    {
        dataIndex: 'remark',
        title: '备注',
        width: 200,
        scopedSlots: {customRender: 'remark'},
    },
    {
        dataIndex: 'final_time',
        title: '时间',
        scopedSlots: {customRender: 'time'},
        width: 200,
    },
    {
        dataIndex: '_ip',
        title: 'IP',
        width: 150,
        customRender: (text, r, index) => {
            // return <span>123</span>
            // return <span title={r.ip_isp}>{r.ip_addr} ? {r.ip_addr} : {r._ip}</span>
            // return `<span title=${r.ip_isp}>${r.ip_addr} ? ${r.ip_addr} : ${r._ip}</span>` // todo jsx识别标签 v-html? tab多数据?
            return r.ip_addr ? r.ip_addr : r._ip
        },
    },
]
