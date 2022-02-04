<!-- 我的页面 -->
<template>
  <div class='article-list-container'>
    <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getArticles } from '@/api/user'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  // import引入的组件需要注入到对象中才能使用
  components: { ArticleItem },
  // 自定以属性
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      count: 0,
      isLoading: false,
      refreshSuccessText: '刷新成功',
      falg: true
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
      this.falg = false
      try {
        // 1.异步更新数据
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 请求数据的页码
        })

        // if (Math.random() > 0.5) {
        //   JSON.parse('gdahwrhwr')
        // }

        console.log(res)
        // 2.setTimeout 仅做示例，真实场景中一般为 ajax 请求
        const { results } = res.data
        this.list.push(...results)
        // 3.把请求的数据放到list 中
        this.loading = false
        // 4.加载状态结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true, 不在 load 加载更多
          this.finished = true
        }
        // 5.数据全部加载完成
      } catch (err) {
        this.error = true
        console.log('请求失败', err)
        this.loading = false
      }
    },
    async onRefresh (falg) {
      this.falg = true
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        // 将数据追加到列表的顶部
        if (falg) {
          this.list = [...res.data.results, ...this.list]
          // 关闭下拉刷新的 loading 状态
          this.isLoading = false
        } else {
          this.list = [...this.list, ...res.data.results]
          // 关闭下拉刷新的 loading 状态
          this.loading = false
        }
        if (res.length === 0) {
          this.finished = true
        }

        // 关闭下拉刷新的 loading 状态
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${res.data.results.length}条数据`
      } catch (err) {
        // console.log('请求失败', err)
        this.refreshSuccessText = '刷新失败！'
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
  .article-list-container {
    height: 79vh; // vh 视口函数 1vh = 视口高度的百分之一
    overflow-y: auto;
  }
</style>
