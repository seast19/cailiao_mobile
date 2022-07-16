<template>
	<div>
		<div class="img-block">
			<van-image round width="6rem" height="6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
		</div>

		<van-form @submit="onSubmit">
			<van-field v-model.trim="username" name="手机号" label="手机号" placeholder="手机号"
				:rules="[{ required: true, message: '请填写手机号' }]" />
			<van-field v-model.trim="password" type="password" name="密码" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<div style="margin: 16px;">
				<van-button block type="info" native-type="submit">
					登录
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
import { Notify } from 'vant';
import { login } from "@/api/user"
export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		onSubmit(values) {
			// console.log('submit', values)
			login({
				phone: this.username,
				pwd: this.password
			})
				// this.axios({
				// 	method: 'post',
				// 	url: '/login',
				// 	data: {
				// 		phone: this.username,
				// 		pwd: this.password
				// 	}
				// })
				.then(res => {
					console.log(res);
					// res = res.data
					if (res.code === 2000 && res.data.jwt) {
						localStorage.setItem('jwt', res.data.jwt)
						// localStorage.setItem('phone', res.data.phone)
						// vuex设置用户信息
						// this.$store.commit("setUserInfo",res.data)

						// console.log(this.$store.state.name);

						Notify({ type: 'success', message: '登录成功' });
						setTimeout(() => {
							this.$router.push('/')
						}, 1000)
					} else {
						Notify({ type: 'danger', message: '用户名或密码错误' });

					}

				}).catch(e => {
					console.log(e);

				})

		}
	}
}
</script>

<style scoped>
.img-block {
	width: 100%;
	padding-top: 10vh;
	text-align: center;
}
</style>
