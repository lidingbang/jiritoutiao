<!-- 我的页面 联想结果 -->
<template>
  <div class='search-suggtion'>
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
      >
      <!-- 因为这里使用了title 所以上面的title 不需要了 -->
      <div slot="title" v-html="height(text)"></div>
    </van-cell>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getSearchSuggestions } from '@/api/user'
import { debounce } from 'lodash' // 防抖节流

export default {
  name: 'SearchSuggtion',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义属性
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: '<span style="color: red">111</span>'
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数
      // 注意：handler 函数名是固定的
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 300), // 每次输入间隔超过0.3秒，就会触发函数
      immediate: true // 改回调函数将会在侦听开始之后被立即调用
    }
  },
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
    async loadSearchSuggestions (q) {
      try {
        const { date: res } = await getSearchSuggestions(q)
        console.log(res)
        this.suggestions = res.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试！')
      }
    },
    height (text) {
      const height = `<span style="color: #3296fa">${this.searchText}</span>`
      // 正则表达式  // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //   参数1：匹配模式字符串，它会根据这个字符创建正则对象
      //   参数2：匹配模式，要写道字符串中
      const reg = new RegExp(this.searchText, 'gi') // gi 全局替换
      return text.replace(reg, height) // replace(要替换的字符串， 待匹配的内容)
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类

</style>
