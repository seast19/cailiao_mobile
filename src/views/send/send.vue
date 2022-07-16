/* eslint-disable no-tabs */
<template>
	<div>
		<!-- 搜索框 -->
		<van-search v-model.trim="searchValue" placeholder="请输入物品名称或型号" @search="onSearch" @cancel="onCancel"
			show-action>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>

		<!-- 下拉菜单 -->
		<van-dropdown-menu >
			<van-dropdown-item v-model="chooseCar" :options="carOptions" :disabled="!setPermitAdmin" />
			<van-dropdown-item v-model="choosePlace" :options="placeOptions" />
		</van-dropdown-menu>

		<!-- 展示物品列表 -->
		<div style="margin-bottom:60px">
			<van-list v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="onLoad">
				<van-card :desc="item.Model || '　'" :title="item.Name" thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
					v-for="item in lists" :key="item.ID"><template #tags>
						<van-tag plain type="primary">{{ item.Place.Position }}</van-tag>
						<van-tag style="margin-left:6px" plain type="danger">{{ item.Floor }}层{{item.Location}}位</van-tag>
						<van-tag style="margin-left:6px" plain type="success">{{ item.Car.Car }}</van-tag>
					</template>
					<template #price>
						<p>剩余数量：{{ item.Count }} <span style="color:darkgrey;">{{ item.Unit }}</span></p>
					</template>
					<template #num>
						<van-button size="small" @click="getMaterial(item.ID)" type="warning">我要出库</van-button>
						<!-- <van-button size="small" @click="getMaterial(item.ID)" type="info">我要入库</van-button> -->
					</template>
				</van-card>
			</van-list>

		</div>

		<!-- tips -->
		<!-- <p class="myTips">Tips: 没有找到对应的物品？请及时联系管理员。</p> -->
		<van-empty v-if="lists.length === 0" description="没有找到对应的物品？请及时联系管理员。" />

		<!-- 弹出层确认数量 -->
		<van-popup v-model="show" position="bottom" closeable :style="{ height: '50%' }">
			<!-- <p></p> -->
			<p class="form-lable">{{ pmaterial.Name }}</p>
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
					<van-button style="margin-left: 10px;" v-show="setPermitEditor" :loading="btnLoading" round type="info" @click.prevent="onSubmit('receive')">确认入库
					</van-button>
				</div>
			</van-form>
		</van-popup>

		<!-- 遮罩层 -->
		<van-overlay :show="loading" z-index="2">
			<div style="margin-top:45vh;text-align:center">
				<van-loading />
			</div>
		</van-overlay>
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
	name: 'Send',
	data() {
		return {
			carOptions: [],
			placeOptions: [],
			chooseCar: '',
			choosePlace: "",

			btnPermited: false,  //是否权限运行

			listLoading: false,
			listFinished: false,

			searchValue: '',
			show: false,
			loading: false,

			currentPage: 1, // 当前页

			// 弹出层
			changeCount: 1, // 出库数量
			receiveCount: 0,//入库数量
			// toolsID: '', // 当前激活的id
			pmaterial: {}, //选中的物品
			btnLoading: false,

			lists: [] //物资列表
			// currentPosition: 0,
			// positions: [
			// 	{
			// 		text: '1号柜',
			// 		value: 0
			// 	},
			// 	{
			// 		text: '2号柜',
			// 		value: 1
			// 	},
			// 	{
			// 		text: '2号柜',
			// 		value: 2
			// 	}
			// ]
		}
	},
	methods: {
		// 搜索物品
		onSearch() {
			this.loading = true
			this.listFinished = false
			this.currentPage = 1
			apiGetMaterials({
				car: this.chooseCar,
				place: this.choosePlace,
				key: this.searchValue,
				page: this.currentPage,
				per_page: 8
			})
				.then((res) => {
					// res = res.data
					if (res.code === 2000) {
						this.lists = res.data
					} else {
						Toast('搜索失败')
					}
					// console.log(res)

					this.loading = false
				})
				.catch((e) => {
					console.log(e)
					this.loading = false
				})
		},
		// 触底刷新
		onLoad() {
			apiGetMaterials({
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

		// 根据id获取该物资详细信息
		getMaterial(id) {
			for (const item of this.lists) {
				if (item.ID === id) {
					this.pmaterial = item

					// this.toolsID = id
					this.showPopup()
					return
				}
			}

			Toast('找不到物资id')
		},
		// 显示popup
		showPopup() {
			// 初始化数量
			this.changeCount = 1
			this.receiveCount = 0
			this.btnLoading = false
			this.show = !this.show
		},
		// 隐藏popup
		hidePopup() {
			// 初始化数量
			this.changeCount = 1
			this.receiveCount = 0
			this.btnLoading = false
			this.pmaterial = {}
			this.show = !this.show
		},
		// 出库
		onSubmit(values) {
			console.log(values);
			this.btnLoading = true
			ApiAddRecordWithSend({
				id: this.pmaterial.ID,
				changeCount: values === 'send' ? this.changeCount : this.receiveCount,
				action: values ? values : 'send',
				marks: '',

			})
				.then((res) => {
					if (res.code === 2000) {
						Notify({ type: 'success', message: res.msg })
						this.hidePopup()
						this.onSearch()
					} else {
						Notify({ type: 'warning', message: res.msg })
						this.hidePopup()
					}
				})
				.catch((e) => {
					console.log(e)
					Toast(res.msg)
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
		this.chooseCar = this.$store.state.car
		this.getCars()
		this.getPlaces()
		this.onSearch()
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
