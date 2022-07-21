/* eslint-disable no-tabs */
<template>
	<div>
		<div style="height: 15px"></div>
		<!-- 搜索框 -->
		<van-search v-model.trim="searchValue" placeholder="请输入物品名称或型号" @search="onSearch" @cancel="onCancel"
			show-action>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>

		<!-- 下拉菜单 -->
		<van-dropdown-menu>
			<van-dropdown-item v-model="chooseCar" :options="carOptions" :disabled="!setPermitAdmin" />
			<van-dropdown-item v-model="choosePlace" :options="placeOptions" />
		</van-dropdown-menu>

		<!-- 展示物品列表 -->
		<div style="margin-bottom:60px">
			<van-list v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="onLoad">
				<van-card :immediate-check="false" @click-thumb="onClickDetail(item.ID)" :desc="item.Model || '　'" :title="item.Name"
					thumb="https://img.yzcdn.cn/vant/ipad.jpeg" v-for="item in lists" :key="item.ID"><template #tags>
						<van-tag plain type="primary">{{ item.Place.Position }}</van-tag>
						<van-tag style="margin-left:6px" plain type="danger">{{ item.Floor }}层{{ item.Location }}位
						</van-tag>
						<van-tag style="margin-left:6px" plain type="success">{{ item.Car.Car }}</van-tag>
					</template>
					<template #price>
						<p>剩余数量：{{ item.Count }} <span style="color:darkgrey;">{{ item.Unit }}</span></p>
					</template>
					<template #num>
						<van-button size="small" @click="onClickSend(item.ID)" type="warning">我要出库</van-button>
						<!-- <van-button size="small" @click="getMaterial(item.ID)" type="info">我要入库</van-button> -->
					</template>
				</van-card>
			</van-list>

		</div>

		<!-- tips -->
		<van-empty v-if="lists.length === 0" description="没有找到对应的物品？请及时联系管理员。" />

		
	</div>
</template>

<script>
import { Toast } from 'vant'
import { Notify } from 'vant'
import { apiGetMaterials } from '@/api/materials'
import { apiGetCarOptions } from '@/api/car'
import { apiGetPlaceOptions } from '@/api/place'
import { ApiAddRecordWithSend } from '@/api/record'


export default {
	name: 'Info',
	data() {
		return {
			carOptions: [],
			placeOptions: [],
			chooseCar: '',
			choosePlace: "",


			listLoading: false,
			listFinished: false,

			searchValue: '',

			currentPage: 1, // 当前页		

			lists: [] //物资列表
	
		}
	},
	methods: {
		// 跳转详情页
		onClickDetail(id) {
			this.$router.push({
				query: { id: id },
				name:'sendDetail'
			})
		},
		// 跳转出入库页面
		onClickSend(id) {
			this.$router.push({
				query: { id: id },
				name:'sendSend'
			})
		},


		// 搜索物品
		async onSearch() {
			// this.loading = true
			this.currentPage = 0
			this.lists = []
			this.listFinished = false


			this.listLoading = true

			await this.onLoad()
		},
		// 触底刷新
		async onLoad() {
			await apiGetMaterials({
				car: this.chooseCar,
				place: this.choosePlace,
				key: this.searchValue,
				page: this.currentPage + 1,
				per_page: 8
			})
				.then((res) => {
					if (res.code === 2000 && res.data.length > 0) {
						this.lists = this.lists.concat(res.data)
						this.currentPage = res.page
						this.listLoading = false
					} else {
						this.listLoading = false
						this.listFinished = true
					}
				})
				.catch((e) => {
					console.log(e)
					this.listLoading = false
					this.listFinished = true
				})
		},
		// 取消搜索
		onCancel() {
			this.searchValue = ''
		},
		// 获取车号信息
		async getCars() {
			await apiGetCarOptions()
				.then(res => {
					// console.log(res);
					for (const iterator of res.data) {
						iterator['text'] = iterator.Car
						iterator['value'] = iterator.ID
					}
					// console.log(res.data);
					this.carOptions = res.data
				})
		},





		// 获取货架信息
		async getPlaces() {
			await apiGetPlaceOptions({
				car_id: this.chooseCar
			})
				.then(res => {
					// console.log(res);
					for (const iterator of res.data) {
						iterator['text'] = iterator.Position
						iterator['value'] = iterator.ID
					}
					// console.log(res.data);
					res.data.unshift({
						text: "全部货架",
						value: '',
					})
					this.placeOptions = res.data
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
		console.log('我是create');
		this.chooseCar = this.$store.state.car
		this.getCars()
		this.getPlaces()
		await this.onSearch()
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
