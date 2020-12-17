<template>
  <div>
      <!-- <p>今日领取工具记录</p> -->
    <van-steps direction="vertical" :active="active">
      <van-step>
        <h3>
          领取 剪刀 x1
        </h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>
          领取 扳手 x1
          <van-tag type="primary" size="large" @click="onSubmit()">点击归还</van-tag>
        </h3>
        <p>
          2016-07-11 10:00
          <van-tag plain mark type="danger">未归还</van-tag>
        </p>
      </van-step>
      <van-step>
        <h3>领取 锤子 x1</h3>
        <p>
          [取]2016-07-10 09:30
        </p>
        <p>
          [还]2016-07-10 09:30
          <van-tag plain mark type="success">已归还</van-tag>
        </p>
      </van-step>
    </van-steps>

    <!-- 空状态 -->
    <van-empty description="今日未领取工具" />
  </div>
</template>

<script>
export default {
  name: 'Giveback',
  data () {
    return {
      active: -1
    }
  },
  methods: {
    onSubmit (e) {
      console.log('归还')
    }
  }
}
</script>
