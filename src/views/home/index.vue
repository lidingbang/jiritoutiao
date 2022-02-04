<!-- 我的页面 -->
<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button>
    </van-nav-bar>

    <!-- 滚顶标签栏
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <ArticleList
          :channel="channel"
        />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>

      <div slot="nav-right"
        class="hamburger-btn"
        @click="show = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      >
      </ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getUserChannels } from '@/api/user'
import ArticleList from '@/components/article-list.vue'
import ChannelEdit from '@/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  // import引入的组件需要注入到对象中才能使用
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    // 这里存放数据
    return {
      active: 0, // 默认显示第一页
      channels: [], // 频道列表
      show: false // 控制编辑频道弹出层的显示状态
    }
  },
  // 监听属性 类似于data概念 计算属性
  computed: {
    ...mapState(['user'])
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadChannels()
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
    async loadChannels () {
      try {
        // const { data: res } = await getUserChannels()
        // this.channels = res.data.channels
        let channels = []

        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data: res } = await getUserChannels()
          channels = res.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          if (loadChannels) {
            //   有，拿来使用
            channels = loadChannels
          } else {
            //   没有，请求获取默认频道列表
            const { data: res } = await getUserChannels()
            channels = res.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },

    // 点击编辑按钮，选中频道
    onUpdateActive (index, show) {
      this.active = index
      this.show = show
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
  .home-container {
    padding-top: 174px;
    padding-bottom: 100px;
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
      .van-icon {
        font-size: 32px;
      }
    }
    /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0; // 因为页面使用flex 布局，突然插入一个位置，区域已经被平分完，此项设置就是不参与 flex 布局
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-color: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
