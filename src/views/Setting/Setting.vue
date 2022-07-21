<template>
	<div>
		<div style="height: 15px"></div>
		<!-- 个人头像 -->
		<div style="text-align:center;margin-top:2rem">
			<div>
				<van-image round width="6rem" height="6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
			</div>
			<p>

				{{ $store.state.name }}
			</p>
		</div>

		<!-- 页面导航 -->
		<div>
			<van-cell title="系统设置" is-link to="" />
			<van-cell title="关于我们" is-link url="" />
		</div>
		<!-- 操作按钮 -->
		<div style="margin:1rem">
			<van-button round type="danger" block @click="logout">退出登录</van-button>
		</div>
	</div>
</template>
<script>
import { Notify } from 'vant'
export default {
	name: 'Setting',
	data() {
		return {
			phone: '',
		}
	},
	methods: {
		logout() {
			localStorage.setItem('jwt', '')
			this.$store.commit("clearUserInfo")
			Notify({ type: 'danger', message: '已退出登录' });
			this.$router.push({ name: 'login' })

		}
	},
	created() {
		this.phone
		this.phone = localStorage.getItem('phone')
	}
}
</script>
