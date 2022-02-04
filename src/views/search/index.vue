<!-- 我的页面 -->
<template>
  <div class='search-container'>
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="show = false"
      />
    </form>
    <!-- 顶部搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="show" :search-text="value">

    </SearchResult>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="value"
      :search-text="value"
      @search="onSearch"
    >

    </SearchSuggestion>
    <!-- 联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else></SearchHistory>
    <!-- 搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from '../../components/search-history.vue'
import SearchResult from '../../components/search-result.vue'
import SearchSuggestion from '../../components/search-suggestion.vue'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'SearchIndex',
  // import引入的组件需要注入到对象中才能使用
  components: { SearchHistory, SearchSuggestion, SearchResult },
  // 自定义属性
  props: {},
  data () {
    // 这里存放数据
    return {
      value: '',
      show: false // 控制搜索结果的展示
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
    onSearch (val) {
      this.value = val
      this.show = true // 相当于按了回车，让搜索结果显示出来
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
  .search-container {
    .van-search__action {
      color: #fff;
    }
  }
</style>
