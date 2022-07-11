import router from './router'
import { start, done } from '@/utils/nprogress.js'
import { Message } from "@/utils/tool.js";
import { useUserInfo } from "@/stores/user"
import bus from '@/utils/bus'



const whiteList = ['/login','/home']


// 路由跳转前
router.beforeEach((to, from, next) => {
    start()
    const user = useUserInfo()


    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '数据库'
    }

    // let token = user.tokens
    // if (!token && !whiteList.includes(to.path)) {
    //     done()
    //     Message('warning', '请登录')
    //     next({ path: '/login' })
    //     return
    // }
    done()
    next()
})
// 路由跳转后
router.afterEach((to) => {

    setMenuActive(to.path)
    done()
})

function setMenuActive(path) {
    if (path.includes('/home')) {
        localStorage.setItem('router-path', '/home')
    } else if (path.includes('/singleQuery') || path.includes('/index') || path.includes('/previewdata')) {
        localStorage.setItem('router-path', '/index')
    } else if (path.includes('/login-register')) {
        localStorage.setItem('router-path', '/login')
    } else {
        localStorage.setItem('router-path', path)

    }
    bus.emit('routerListener')
}