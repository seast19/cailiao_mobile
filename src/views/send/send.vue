/* eslint-disable no-tabs */
<template>
	<div>
		<!-- 搜索框 -->
		<van-search
			v-model.trim="searchValue"
			placeholder="请输入物品名称 型号"
			@search="onSearch"
			show-action
		>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template></van-search
		>

		<!-- 下拉菜单 -->
		<!-- <van-dropdown-menu>
			<van-dropdown-item v-model="currentPosition" :options="positions" />
		</van-dropdown-menu> -->

		<!-- 展示物品列表 -->
		<div style="margin-bottom:60px">
			<van-card
				:desc="item.Model || 'no model'"
				:title="item.Name"
				thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
				v-for="item in lists"
				:key="item.ID"
				><template #tags>
					<van-tag plain type="primary">{{ item.Place.Position }}</van-tag>
					<van-tag style="margin-left:6px" plain type="danger"
						>{{ item.Floor }}层</van-tag
					>
				</template>
				<template #price>
					<p>剩余数量：{{ item.Count }} {{item.Unit}}</p>
				</template>
				<template #num>
					<van-button size="small" @click="getMaterial(item.ID)" type="info"
						>我要发料</van-button
					>
				</template>
			</van-card>
		</div>

		<!-- tips -->
		<!-- <p class="myTips">Tips: 没有找到对应的物品？请及时联系管理员。</p> -->
		<van-empty
			v-if="lists.length === 0"
			description="没有找到对应的物品？请及时联系管理员。"
		/>

		<!-- 弹出层确认数量 -->
		<van-popup
			v-model="show"
			position="bottom"
			closeable
			:style="{ height: '40%' }"
		>
			<!-- <p></p> -->
			<p class="form-lable">{{ pmaterial.Name }}</p>
			<p class="form-lable">剩余数量: {{ pmaterial.Count }} {{pmaterial.Unit}}</p>
			<p class="form-lable">请输入发料数量：</p>
			<van-form>
				<van-field name="changeCount" label="数量">
					<template #input>
						<van-stepper :max="pmaterial.Count" v-model="changeCount" />
					</template>
				</van-field>
				<div style="margin: 16px;">
					<van-button
						:loading="btnLoading"
						round
						block
						type="info"
						@click.prevent="onSubmit()"
						>确认发料</van-button
					>
				</div>
			</van-form>
		</van-popup>

		<!-- 遮罩层 -->
		<van-overlay :show="loading" z-index="2">
			<div style="margin-top:45vh;text-align:center"><van-loading /></div>
		</van-overlay>
	</div>
</template>

<script>
import { Toast } from 'vant'
import { Notify } from 'vant'
export default {
	name: 'Send',
	data() {
		return {
			searchValue: '',
			show: false,
			loading: false,

			currentPage: 1, // 当前页

			// 弹出层
			changeCount: 1, // 数量
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
			// Toast(this.searchValue)
			if (this.searchValue == '') {
				Toast('请输入搜索内容')
				return
			}

			this.loading = true
			this.axios({
				method: 'get',
				url: '/material/s',
				params: {
					key: this.searchValue,
					page: this.currentPage,
					per_page: 8
				}
			})
				.then((res) => {
					res = res.data
					if (res.code === 2000) {
						this.lists = res.data
					} else {
						Toast('搜索失败')
					}
					console.log(res)

					this.loading = false
				})
				.catch((e) => {
					console.log(e)
					this.loading = false
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
			this.btnLoading = false
			this.show = !this.show
		},
		// 隐藏popup
		hidePopup() {
			// 初始化数量
			this.changeCount = 1
			this.btnLoading = false
			this.pmaterial = {}
			this.show = !this.show
		},
		// 提交借的东西
		onSubmit(values) {
			this.btnLoading = true
			this.axios({
				method: 'post',
				url: '/record',
				data: {
					id: this.pmaterial.ID,
					changeCount: this.changeCount,
					marks: '',
					action: 'send'
				}
			})
				.then((res) => {
					res = res.data
					if (res.code === 2000) {
						Notify({ type: 'success', message: res.msg })
						// Toast(res.msg)
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
	}
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
