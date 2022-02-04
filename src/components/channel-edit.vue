<!-- 我的页面 -->
<template>
  <div class='channel-edit-container'>
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="small"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span
          class="text"
          slot="text"
          :class="{ active: index === active }"
        >
          {{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommed-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/user'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 自定义属性
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      allChannels: [], // 接收所有频道数据
      isEdit: true, // 控制编辑状态的显示
      fiexChannels: [0] // 固定频道不允许删除
    }
  },
  // 监听属性 类似于data概念 计算属性
  // 计算属性会观测内部依赖数据的变化，如果依赖的数据发生变化，则计算属性会重新执行
  computed: {
    // 映射用户的登录状态
    ...mapState(['user']),

    recommendChannels () {
      // 数组的 filter 方法，遍历数组，把符合条件的元素存储到新素组里
      return this.allChannels.filter(channel => {
        // 数组的 find 方法，遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannels => {
          return myChannels.id === channel.id
        })
      })
      // const channels = []
      // console.log(channels)
      // this.allChannels.forEach(channel => {
      //   // find 遍历数组，找到满足条件的元素项
      //   const ret = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
      //   // return !this.myChannels.find(myChannel => {
      //   //   return myChannel.id === channel.id
      //   // })

      //   // 如果我的频道中不包括该频道项，则收集到推荐频道中
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadAllChannels()
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
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannel()
        console.log(res)
        this.allChannels = res.data.channels // 获取到所有的数据项
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },

    // 添加频道
    async onAddChannel (channel) {
      this.myChannels.push(channel)

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试！')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    includes (index) {
      index = 0
    },
    // 删除频道
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fiexChannels.includes(index)) {
          return
        }
        // 编辑状态，执行删除频道
        // 参数1：要删除的元素的开始索引（包括）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除
        if (index <= this.active) {
          // 让激活的频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },

    // 删除频道
    async deleteChannel (channel) {
      try {
        if (this.user) {
        // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch {
        this.$toast('操作失败，请稍后重试！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
  .channel-edit-container {
    padding: 85px 0;
    .title-text {
      font-size: 32px;
      color: #333333;
    }
    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
    /deep/ .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text, .text {
          font-size: 28px;
          color: #222;
        }
        .active {
          color: red;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }
    }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommed-grid {
      .grid-item {
        .van-grid-item__content {
          flex-direction: row;
          .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
