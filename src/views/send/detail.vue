/* eslint-disable no-tabs */
<template>
	<div>
		<van-nav-bar title="材料详细信息" left-text="返回" left-arrow @click-left="onClickLeft" />

		<!-- 表单 -->
		<van-cell-group>
			<van-cell title="名称" :value="formData.Name" />
			<van-cell title="型号" :value="formData.Model" />
			<van-cell title="别名" :value="formData.NickName" />
			<van-cell title="货架" :value="formData.Place.Position" />
			<van-cell title="层" :value="formData.Floor" />
			<van-cell title="位" :value="formData.Location" />
			<van-cell title="所属车" :value="formData.Car.Car" />
			<van-cell title="当前数量" :value="formData.Count" />
			<van-cell title="常备数量" :value="formData.PrepareCount" />
			<van-cell title="备注" value="Marks" />

		</van-cell-group>




	</div>
</template>

<script>
import { apiGetMaterialById } from '@/api/materials'



export default {
	name: 'Detail',
	data() {
		return {
			formData: {
				"ID": 47,
				"Name": "电工螺丝刀",
				"Model": "1",
				"NickName": "",
				"Unit": "",
				"Car": { "ID": 1, "Car": "DM04", "Remarks": "" },
				"CarID": 1,
				"Place": {
					"ID": 1, "Position": "一号架", "Remarks": "",
					"Car": { "ID": 0, "Car": "", "Remarks": "" }, "CarID": 1
				},
				"PlaceID": 1,
				"Floor": 0,
				"Location": 0,
				"Count": 10,
				"PrepareCount": 10,
				"WarnCount": 0,
				"Marks": "",
				"User": { "ID": 0, "Phone": "", "Password": "", "Avatar": "", "RealName": "", "Role": "", "Lock": "", "Email": "", "Car": { "ID": 0, "Car": "", "Remarks": "" }, "CarID": 0, "LastLoginAt": 0, "LastLoginIP": "" }, "UserID": 1, "CreateAt": 1657876490599370600
			}


		}
	},
	methods: {
		// 返回上页
		onClickLeft() {
			this.$router.push({
				name: 'sendInfo'
			})
		},
		// 获取表单数据
		async onGetFormData() {
			await apiGetMaterialById(this.$route.query.id).then(res => {
				this.formData = res.data
			})
		},
	},
	computed: {
		// admin权限
		setPermitAdmin() {
			if (this.$store.state.role === "admin") {
				return true
			}
			return false
		},
		// editor权限
		setPermitEditor() {
			if (this.$store.state.role === "admin" || this.$store.state.role === "editor") {
				return true
			}
			return false
		},
	},
	async created() {
		await this.onGetFormData()
	},
}
</script>

<style scoped>
.form-lable {
	padding-left: 16px;
	color: #969799;
}

.myTips {
	color: #969799;
	padding-left: 16px;
	/* padding-right: 16px; */
}
</style>
