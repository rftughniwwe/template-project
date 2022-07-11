import { Message } from "./tool.js";
import router from '@/router'
import { useUserInfo } from '@/stores/user'
//退出登录
export function logout(num = 0) {
    if (num === 0) {
        Message('warning', '登录过期,请重新登录')
    }
    const user = useUserInfo()
    user.remove()
    router.replace({ path: "/login-register" });
}

