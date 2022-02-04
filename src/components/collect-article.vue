<!-- 我的页面 收藏文章 -->
<template>
  <div class='collect-article-container'>
    <van-icon
      :class="{
        collected: value
      }"
      :name="value ? 'star' : 'star-o'"
      @click="onCollect"
      :loading="loading"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { addCollect, deleteCollect } from '@/api/user'

export default {
  name: 'CollectArticle',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义属性
  props: {
    value: {
      type: Boolean,
      require: true
    },
    articleId: {
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
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 没有收藏，添加收藏
          await addCollect(this.articleId)
        }

        // 更新视图
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
  .collect-article-container {
    van-button {
      border: 0;
    }
    .collected {
      .van-icon {
        color: #ffa500;
      }
    }
  }
</style>
