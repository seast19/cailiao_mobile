<template>
  <div>
    <van-nav-bar :title="activeText[active]" />
    <keep-alive>

    <router-view></router-view>
    </keep-alive>
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
  name: 'Dashboard',
  data () {
    return {
      active: 0,
      activeText: {
        0: '发料',
        1: '领料',
        2: '统计',
        3: '设置'
      },
      borrowList: [1]
    }
  },
  methods: {
    jump () {
      console.log(this.$route)

      //   this.active = e;
      let path = ''
      switch (this.active) {
        case 0:
          path = 'send'
          break
        case 1:
          path = 'receive'
          break
        case 2:
          path = 'total'
          break
        case 3:
          path = 'setting'
          break

        default:
          return
      }

      if (`/${path}` === this.$route.path) {
        console.log('标签重复')
        return
      }

      this.$router.push({ name:path })
    }
  },
  mounted () {
    console.log(this.$route.name);
    switch (this.$route.name) {
      case 'send':
        this.active = 0
        break
      case 'receive':
        this.active = 1
        break
      case 'total':
        this.active = 2
        break
      case 'setting':
        this.active = 3
        break
    }
  }
}
</script>
