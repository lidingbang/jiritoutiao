<!-- 我的页面 -->
<template>
  <!-- :to="'/article/' + article.art_id" -->
  <van-cell
    class='article-item-container'
    :to="{
      // 根据路由名称进行跳转
      name: 'article',

      // 传递路由动态参数
      params: {
        // 属性名：路由路径中设计的动态参数名称
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  name: 'ArticleItem',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义属性
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {

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

  }
}
</script>

<style scoped lang="less">
  .article-item-container {
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }

    .van-cell__title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }

    .right-cover {
      width: 100%;
      height: 146px;
    }

    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }

    .cover-wrap {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
</style>
