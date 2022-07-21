<template>
	<div>
		<div style="height: 15px"></div>
		<!-- 日期选框 -->
		<van-field clickable name="calendar" :value="rangeTime" label="时间段" placeholder="点击选择日期"
			@click="showCalendar3 = true" />
		<van-calendar :min-date="new Date(2017, 0, 1)" :allow-same-day="true" v-model="showCalendar3" type="range"
			@confirm="onConfirm3" />

		<!-- 下拉菜单 -->
		<van-dropdown-menu>
			<van-dropdown-item v-model="chooseCar" :options="carOptions" :disabled="!setPermitAdmin" @change="onRefresh" />
		</van-dropdown-menu>

		<!-- 下拉刷新 -->
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<!-- 领取物资详情 -->
			<van-list style="margin-bottom:50px" v-model="loading" :finished="finished" finished-text="没有更多了"
				@load="onLoad">
				<van-steps direction="vertical" :active="-1">
					<van-step v-for="item in list" :key="item.ID">
						<p>
							<span style="font-weight: bold"> {{ item.Material.Name }} </span>
							<span style="font-style: italic"> {{ item.Material.Model }} </span>
							<span style="float: right">{{ item.User.RealName }}</span>

						</p>
						<div>
							<span>
								{{ item.CreateAt | formatDate }}
							</span>
							<van-tag v-if="item.Type === 'receive'" type="primary">入库</van-tag>
							<van-tag v-if="item.Type === 'send'" type="warning">出库</van-tag>

							<span style="float:right" v-show="item.SendCount > 0">
								出库数量：{{ item.SendCount }}
							</span>
							<span style="float:right" v-show="item.ReceiveCount > 0">
								入库数量：{{ item.ReceiveCount }}
							</span>
						</div>
					</van-step>
				</van-steps>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { apiGetRecordsByPage } from '@/api/record'
import { apiGetCarOptions } from '@/api/car'
import { urlToHttpOptions } from 'url'
export default {
	name: 'Search',
	data() {
		return {
			// 日期相关
			// startTime: '',
			startStamp: '',
			// stopTime: '',
			stopStamp: '',
			rangeTime: '',

			showCalendar3: false,

			chooseCar: '',
			carOptions: [],

			currentPage: 0,
			list: [],
			loading: false,
			finished: false,

			refreshing: false //下拉刷新
		}
	},
	methods: {
		// 选择日期
		onConfirm3(data) {
			const [start, end] = data;
			this.rangeTime = `${start.getFullYear()}/${start.getMonth() + 1}/${start.getDate()} - ${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()}`
			this.startStamp = new Date(start.toLocaleDateString()).getTime()
			this.stopStamp = new Date(end.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
			this.showCalendar3 = false
			this.onRefresh()
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

		// 全部重置刷新
		async onRefresh() {
			// 清空数据列表		
			this.list = []
			this.currentPage = 0

			this.finished = false
			this.loading = true
			await this.onLoad()
		},

		// 自动搜索记录
		async onLoad() {
			if (this.refreshing) {
				this.list = [];
				this.refreshing = false;
			}
			await apiGetRecordsByPage({
				car_id: this.chooseCar,
				page: this.currentPage + 1,
				per_page: 8,
				type: '',
				start_time: this.startStamp || 0,
				stop_time: this.stopStamp || 0
			})
				.then((res) => {
					// res = res.data
					if (res.code === 2000 && res.data.records.length > 0) {
						this.list = this.list.concat(res.data.records)
						this.currentPage = res.data.page
						this.loading = false
					} else {
						this.finished = true
						// Toast(res.msg)
					}
				})
				.catch((e) => {
					this.loading = false
					Toast(e)
				})
		}
	},
	filters: {
		// 时间戳转日期
		formatDate(date) {
			date = new Date(date)
			let YY = date.getFullYear() + '-'
			let MM =
				(date.getMonth() + 1 < 10
					? '0' + (date.getMonth() + 1)
					: date.getMonth() + 1) + '-'
			let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			let hh =
				(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
			let mm =
				(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
				':'
			let ss =
				date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
			return YY + MM + DD + ' ' + hh + mm + ss
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
	created() {
		this.chooseCar = this.$store.state.car
		this.getCars()
	}
}
</script>
