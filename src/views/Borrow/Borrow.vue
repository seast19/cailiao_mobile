<template>
  <div>
    <!-- 搜索框 -->
    <van-search v-model.trim="searchValue" placeholder="请输入物品名称/俗称" input-align="center" />

    <!-- 展示物品列表 -->
    <van-card desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
      <template #price>
        <p>剩余数量：10</p>
      </template>
      <template #num>
        <van-button size="small" @click="borrow('ididid')" type="info">我要拿</van-button>
      </template>
    </van-card>
    <van-card desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
      <template #price>
        <p>剩余数量：10</p>
      </template>
      <template #num>
        <van-button size="small" @click="borrow('ididid')" type="info">我要拿</van-button>
      </template>
    </van-card>
    <van-card desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
      <template #price>
        <p>剩余数量：10</p>
      </template>
      <template #num>
        <van-button size="small" @click="borrow('ididid')" type="info">我要拿</van-button>
      </template>
    </van-card>

    <!-- tips -->
    <p class="myTips">Tips: 没有找到对应的物品？请及时联系管理员。</p>

    <!-- 弹出层确认数量 -->
    <van-popup v-model="show" position="bottom" closeable :style="{ height: '30%' }">
      <p class="form-lable">请输入数量：</p>
      <van-form>
        <van-field name="stepper" label="数量">
          <template #input>
            <van-stepper v-model="stepper" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" @click.prevent="onSubmit()">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Borrow",
  data() {
    return {
      searchValue: "",
      show: false,

      stepper: 1, //数量
      toolsID: "" //当前激活的id
    };
  },
  methods: {
    //   点击我要拿显示popup
    borrow(id) {
      // 初始化数量
      this.stepper = 1;
      this.toolsID = id;

      this.showPopup();
    },
    // 显示popup
    showPopup() {
      this.show = !this.show;
    },
    // 提交借的东西
    onSubmit(values) {
      console.log("sdsd");
    }
  }
};
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