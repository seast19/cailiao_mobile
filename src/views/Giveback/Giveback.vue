<template>
  <div>
    <van-steps direction="vertical">
      <van-step>
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>
          【城市】物流状态2
          <van-tag type="primary" size="large" @click="onSubmit()">点击归还</van-tag>
        </h3>
        <p>
          2016-07-11 10:00
          <van-tag plain mark type="danger">未归还</van-tag>
        </p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>
          2016-07-10 09:30
          <van-tag plain mark type="success">已归还</van-tag>
        </p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: "Giveback",
  methods:{
      onSubmit(e){
          console.log("归还");
          
      }
  }
};
</script>