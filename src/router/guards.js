import { status } from '@/api/user'
import store from "@/store/user"

// 检查登录状态
function checkLogin(to, from, next) {
	const jwt = localStorage.getItem('jwt')
	// 没有jwt跳转login
	if (!jwt) {
		next({ path: '/login' })
	}

	// jwt无效跳转login
	status()
		.then((res) => {
			// console.log(res);
			// res = res.data
			if (res.code === 2000 && res.data.phone) {
				store.commit("setUserInfo",res.data)
				// console.log("登录状态有效");
				next()
			} else {
				localStorage.setItem('jwt', '')
				next('/login')
			}
		})
		.catch((e) => {
			console.log(e)
			next('/login')
		})

	// next()
}

export { checkLogin }
