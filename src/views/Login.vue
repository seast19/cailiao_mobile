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
				<van-button :loading="loading" block type="info" native-type="submit">
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
			loading: false,

			username: '',
			password: ''
		}
	},
	methods: {
		 onSubmit(values) {
			this.loading=true
			login({
				phone: this.username,
				pwd: this.password
			})
				.then(res => {
					if (res.code === 2000 && res.data.jwt) {
						localStorage.setItem('jwt', res.data.jwt)
						Notify({ type: 'success', message: res.msg });
						this.loading=false
						setTimeout(() => {
							this.$router.push('/')
						}, 1000)
					} else {
						this.loading=false
						Notify({ type: 'warning', message: e.msg });

					}

				}).catch(e => {
					console.log(e);
					Notify({ type: 'danger', message: e.msg });
					this.loading=false

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
