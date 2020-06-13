const express = require('express') // 引入express插件
const app = express() // 使用express插件
app.use(express.static('../dist')) // 使用把生成的dist复制到文件夹里作为静态文件交给node管理
app.listen(8090, () => {
    console.log(
        'mock server success\nrunning at:\n' + '- Local: http://localhost:8090',
    )
})
