<!-- 我的页面 -->
<template>
  <van-button
      v-if="value"
      class="follow-btn"
      round
      size="small"
      :loading="loading"
      @click="onFollow"
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loading"
      @click="onFollow"
    >关注</van-button>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义 model 名称
  // model: {
  //   prop: 'isFollowed',
  //   event: 'updata-is_followed'
  // },
  // 自定义属性
  props: {
    value: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    // 这里存放数据
    return {
      loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的 loading 状态
      try {
        if (this.value) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(this.userId)
      }
      this.loading = false // 展示关注按钮的 loading 状态
      console.log(this.value)
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
