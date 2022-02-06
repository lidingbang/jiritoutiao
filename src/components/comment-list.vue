<!-- 我的页面 评论列表 -->
<template>
  <div class='comment-list-container'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
      />
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getComments } from '@/api/user'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  // import引入的组件需要注入到对象中才能使用
  components: {
    CommentItem
  },
  // 自定义属性
  props: {
    artId: {
      type: [Number, String, Object],
      require: true
    },
    contentText: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    // 这里存放数据
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页的标记
      limit: 20,
      error: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.onLoad()
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
        // 1.请求数据
        const { data } = await getComments({
          type: 'a', // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          source: this.artId, // 评论的内容
          offset: this.offset,
          limit: this.limit
          // art_id: this.artId, // 文章的id
          // offset: this.offset, // 下一页的id
          // limit: this.limit// 评论数量
        })
        const { results } = data.data
        this.list.push(...results)

        // 文章结构成功后，获取到评论总数，传递个父组件
        this.$emit('aa', data.data)

        this.loading = false
        //  2.将数据添加到列表中
        //  3.将 loading 设置为 false
        //  4.判断是否还有数据
        if (results.length) {
          // 如果有更新下一页数据页码
          this.offset = data.data.last_id
          // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
