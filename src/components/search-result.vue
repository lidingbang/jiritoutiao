<!-- 我的页面 -->
<template>
  <div class='search-result'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getSearchResult } from '@/api/user'

export default {
  name: 'SearchResult',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义属性
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      error: false
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
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data: res } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.per_page, // 每页的大小
          q: this.value// 查询关词
        })
        // 2.将数据添加到数组列表中
        const { results } = res.data
        this.list.push(...results)

        // 3.将本次加载中的 loading 关闭
        this.loading = false

        // 4.判断是否还是数据
        if (results.length) {
          // 如果有，则更新数据，获取下一页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        // 展示失败的状态
        this.error = true
        // 加载失败， loading 也要关闭
        this.loading = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
