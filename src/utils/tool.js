import { ElMessage } from 'element-plus'
import { useNotification } from "naive-ui";
function Message(type, msg) {
    ElMessage({
        message: msg,
        type: type,
    })
    // const message = window.$message
    // if (type === 'success') {
    //     message.success(msg)
    // } else if (type === 'warning') {
    //     message.warning(msg)
    // } else if (type === 'error') {
    //     message.error(msg)
    // } else if (type === 'loading') {
    //     message.loading(msg)
    // } else if (type === 'info') {
    //     message.info(msg)
    // }
}

function Notify(type, msg, content, duration) {
    const no = useNotification()
    no[type]({
        content: msg,
        description: content,
        duration
    })
}



const sourceOpt = [
    {
        label: "CNKI-知网",
        value: 1,
    },
    {
        label: "Web of Science",
        value: 2,
    },
]

const statusOpt = [
    {
        label: "待处理",
        value: "0",
    },
    {
        label: "处理中",
        value: "1",
    },
    {
        label: "处理成功",
        value: "2",
    },
    {
        label: "处理失败",
        value: "3",
    },
    {
        label: "取消",
        value: "4",
    },
]


function backTop() {
    document.documentElement.scrollTop = document.body.scrollTop
}

export {
    Message, sourceOpt, statusOpt, backTop, Notify
}