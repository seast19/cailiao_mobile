<template>
  <div>
    <van-nav-bar :title="activeText[active]" />
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop-o" @click.prevent="jump()">{{activeText[0]}}</van-tabbar-item>
      <van-tabbar-item icon="todo-list-o" :badge="borrowList.length===0?'':borrowList.length" @click.prevent="jump()">{{activeText[1]}}</van-tabbar-item>
      <van-tabbar-item icon="search" @click.prevent="jump()">{{activeText[2]}}</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click.prevent="jump()">{{activeText[3]}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      active: 0,
      activeText: {
        0: "领取",
        1: "归还",
        2: "查询",
        3: "设置"
      },
      borrowList:[1]
    };
  },
  methods: {
    jump() {
      console.log(this.$route);

      //   this.active = e;
      let path = "";
      switch (this.active) {
        case 0:
          path = "borrow";
          break;
        case 1:
          path = "giveback";
          break;
        case 2:
          path = "search";
          break;
        case 3:
          path = "setting";
          break;

        default:
          return;
      }

      if (`/${path}` === this.$route.path) {
        console.log("标签重复");
        return;
      }

      this.$router.push({ path });
    }
  },
  mounted() {
    // console.log(this.$route);
    switch (this.$route.path) {
      case "/borrow":
        this.active = 0;
        break;
      case "/giveback":
        this.active = 1;
        break;
      case "/search":
        this.active = 2;
        break;
      case "/me":
        this.active = 3;
        break;
    }
  }
};
</script>