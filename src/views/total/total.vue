<template>
	<div>
		<!-- 下拉刷新 -->
		<van-pull-refresh v-model="isLoading" @refresh="allReload">
			<!-- 日期选框 -->
			<van-field
				readonly
				clickable
				name="calendar"
				:value="startTime"
				label="开始日期"
				placeholder="点击选择日期"
				@click="showCalendar1 = true"
			/>
			<van-calendar
				:min-date="minDate"
				v-model="showCalendar1"
				@confirm="onConfirm1"
			/>

			<van-field
				readonly
				clickable
				name="calendar"
				:value="stopTime"
				label="结束日期"
				placeholder="点击选择日期"
				@click="showCalendar2 = true"
			/>
			<van-calendar
				:min-date="minDate"
				v-model="showCalendar2"
				@confirm="onConfirm2"
			/>

			<!-- 领取物资详情 -->
			<van-list
				style="margin-bottom:50px"
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<!-- <van-cell v-for="item in list" :key="item.ID" :title="item.ID" /> -->
				<van-steps direction="vertical" :active="-1">
					<van-step v-for="item in list" :key="item.ID">
						<h3>
							<van-tag v-if="item.Type === 'receive'" type="primary"
								>领料</van-tag
							>
							<van-tag v-if="item.Type === 'send'" type="warning">发料</van-tag>
							{{ item.Material.Name }}
						</h3>
						<div>
							<span>
								{{ item.CreateAt | formatDate }}
							</span>
							<span style="float:right">
								变动数量：{{ item.CountChange }}
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
export default {
	name: 'Search',
	data() {
		return {
			// 日期相关
			startTime: '',
			startStamp: '',
			stopTime: '',
			stopStamp: '',
			showCalendar1: false,
			showCalendar2: false,

			minDate: new Date(2018, 0, 1),
			// maxDate: new Date(2099, 0, 31),

			currentPage: 0,
			list: [],
			loading: false,
			finished: false,

			isLoading: false //下拉刷新
		}
	},
	methods: {
		onConfirm1(date) {
			// console.log(date.getTime())
			this.startTime = `${date.getFullYear()}/${date.getMonth() +
				1}/${date.getDate()}`
			this.startStamp = new Date(date.toLocaleDateString()).getTime()
			this.showCalendar1 = false

			this.reLoad()
		},
		onConfirm2(date) {
			this.stopTime = `${date.getFullYear()}/${date.getMonth() +
				1}/${date.getDate()}`
			this.stopStamp =
				new Date(date.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1

			this.showCalendar2 = false

			this.reLoad()
		},

		// 手动重置搜索记录
		reLoad() {
			this.finished = false
			this.list = []
			this.currentPage = 0
			this.onLoad()
		},

		// 全部重置刷新
		allReload() {
			this.startTime = ''
			this.startStamp = ''
			this.reLoad()
			this.isLoading = false
		},

		// 自动搜索记录
		onLoad() {
			// console.log(this.startTime)
			// console.log(1)
			this.axios({
				url: `/record`,
				method: 'get',
				params: {
					page: this.currentPage + 1,
					per_page: 8,
					type: '',
					start_time: this.startStamp || 0,
					stop_time: this.stopStamp || 0
				}
			})
				.then((res) => {
					res = res.data
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
	created() {
		// 初始化结束日期
		let date = new Date()
		this.stopTime = `${date.getFullYear()}/${date.getMonth() +
			1}/${date.getDate()}`
		this.stopStamp =
			new Date(date.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
	}
}
</script>
