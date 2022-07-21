/* eslint-disable no-tabs */
<template>
	<div>

		<van-nav-bar title="出入库详情" left-text="返回" left-arrow @click-left="onClickLeft" />


		<!-- 表单 -->
		<van-form @submit="onSubmit">
			<van-field disabled v-model="formData.Name" name="name" label="名称" />
			<van-field disabled v-model="formData.Model" name="model" label="型号" />
			<van-field disabled v-model="formData.Count" name="Count" label="当前数量" />

			<van-field name="stepper" label="出库数量">
				<template #input>
					<van-stepper :max="formData.Count" v-model="sendCount" />
				</template>
			</van-field>

			<van-field v-show="setPermitEditor" name="stepper" label="入库数量">
				<template #input>
					<van-stepper v-model="receiveCount" />
				</template>
			</van-field>

			<div style="margin: 16px;">
				<van-button :loading="btnLoading" style="width: 45%" round type="warning"
					@click.prevent="onSubmit('send')">出库</van-button>
				<van-button :loading="btnLoading" v-show="setPermitEditor" style="width: 45%;float: right;" round
					type="info" @click.prevent="onSubmit('receive')">入库</van-button>
			</div>
		</van-form>

		<!-- 搜索框 -->
		<!-- <van-search v-model.trim="searchValue" placeholder="请输入物品名称或型号" @search="onSearch" @cancel="onCancel"
			show-action>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search> -->

		<!-- 下拉菜单 -->
		<!-- <van-dropdown-menu>
			<van-dropdown-item v-model="chooseCar" :options="carOptions" :disabled="!setPermitAdmin" />
			<van-dropdown-item v-model="choosePlace" :options="placeOptions" />
		</van-dropdown-menu> -->

		<!-- 展示物品列表 -->
		<!-- <div style="margin-bottom:60px">
			<van-list v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="onLoad">
				<van-card :desc="item.Model || '　'" :title="item.Name" thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
					v-for="item in lists" :key="item.ID"><template #tags>
						<van-tag plain type="primary">{{ item.Place.Position }}</van-tag>
						<van-tag style="margin-left:6px" plain type="danger">{{ item.Floor }}层{{ item.Location }}位
						</van-tag>
						<van-tag style="margin-left:6px" plain type="success">{{ item.Car.Car }}</van-tag>
					</template>
					<template #price>
						<p>剩余数量：{{ item.Count }} <span style="color:darkgrey;">{{ item.Unit }}</span></p>
					</template>
					<template #num>
						<van-button size="small" @click="getMaterial(item.ID)" type="warning">我要出库</van-button>
					</template>
				</van-card>
			</van-list>

		</div> -->

		<!-- tips -->
		<!-- <p class="myTips">Tips: 没有找到对应的物品？请及时联系管理员。</p> -->
		<!-- <van-empty v-if="lists.length === 0" description="没有找到对应的物品？请及时联系管理员。" /> -->

		<!-- 弹出层确认数量 -->
		<!-- <van-popup v-model="show" position="bottom" closeable :style="{ height: '50%' }"> -->
		<!-- <p></p> -->
		<!-- <p class="form-lable">{{ pmaterial.Name }}</p>
		<p class="form-lable">{{ pmaterial.Model }}</p>
		<p class="form-lable">剩余数量: {{ pmaterial.Count }} {{ pmaterial.Unit }}</p>
		<p class="form-lable">请输入出入库数量：</p>
		<van-form>
			<van-field name="changeCount" label="出库数量">
				<template #input>
					<van-stepper :max="pmaterial.Count" v-model="changeCount" />
				</template>
			</van-field>
			<van-field v-show="setPermitEditor" name="receiveCount" label="入库数量">
				<template #input>
					<van-stepper v-model="receiveCount" />
				</template>
			</van-field>
			<div style="margin: 16px;">
				<van-button :loading="btnLoading" round type="warning" @click.prevent="onSubmit('send')">确认出库
				</van-button>
				<van-button style="margin-left: 10px;" v-show="setPermitEditor" :loading="btnLoading" round type="info"
					@click.prevent="onSubmit('receive')">确认入库
				</van-button>
			</div>
		</van-form> -->
		<!-- </van-popup> -->

		<!-- 遮罩层 -->
		<!-- <van-overlay :show="loading" z-index="2">
			<div style="margin-top:45vh;text-align:center">
				<van-loading />
			</div>
		</van-overlay> -->
	</div>
</template>

<script>
import { Toast } from 'vant'
import { Notify } from 'vant'
import { apiGetMaterials, apiGetMaterialById } from '@/api/materials'
import { apiGetCarOptions } from '@/api/car'
import { apiGetPlaceOptions } from '@/api/place'
import { ApiAddRecordWithSend } from '@/api/record'


export default {
	name: 'Send',
	data() {
		return {
			formData: '',
			sendCount: 0,
			receiveCount: 0,
		
			btnLoading: false,			
		}
	},
	methods: {
		// 获取表单数据
		async onGetFormData() {
			await apiGetMaterialById(this.$route.query.id).then(res => {
				this.formData = res.data
			})
		},
		// 返回上页
		onClickLeft() {
			this.$router.push({
				name: 'sendInfo'
			})
		},		

		// 出入库
		onSubmit(values) {
			// console.log(values);
			this.btnLoading = true
			ApiAddRecordWithSend({
				id: this.formData.ID,
				changeCount: values === 'send' ? this.sendCount : this.receiveCount,
				action: values ? values : 'send',
				marks: '',

			})
				.then((res) => {
					if (res.code === 2000) {
						Notify({ type: 'success', message: res.msg })
						this.onGetFormData()
					} else {
						Notify({ type: 'warning', message: res.msg })
					}
					this.btnLoading = false
					// this.onClickLeft()
				})
				.catch((e) => {
					console.log(e)
					Toast(e.msg)
					this.btnLoading = false
				})
		}
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
		this.onGetFormData()
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
