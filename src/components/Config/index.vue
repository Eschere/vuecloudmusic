<template>
<transition name="fade">
  <mainPage title="设置" :needMiniPlayer=false>
    <div class="config-content">
      <div class="config-group">
        <span class="group-title">
          网络
        </span>
        <v-touch
          @tap="networkModal=true"
          class="group-item"
        >
          <div class="group-text">
            <div>服务器地址</div>
            <span class="sub-text">{{currentServer.url}}</span>
          </div>
          <span class="group-value">
            {{currentServer.name}}
          </span>
        </v-touch>
      </div>
      <!-- 添加服务器 -->
      <v-touch
        @tap="addnetworkModal=true"
        class="group-item"
      >
        <div class="group-text">添加服务器</div>
      </v-touch>

      <!-- 模态窗 -->
      <!-- 服务器地址选择框 -->
      <Shade
        :shade="networkModal"
        @close="networkModal = false"
      >
        <div class="network-chosing-list">
          <h4 class="list-title">选择服务器</h4>
          <v-touch
            v-for="(s,i) in server"
            :key="'network' + i"
             class="chosing-item"
             @tap="chosedServer(i)"
          >
            <div>
              <span class="item-name">{{s.name}}</span><br>
              <span class="item-url">{{s.url}}</span>
            </div>
            <span class="item-check-icon" v-if="currentServer.name === s.name"></span>
          </v-touch>
        </div>
      </Shade>

      <!-- 服务器地址增加框 -->
      <Shade
        :shade="addnetworkModal"
        @close="addnetworkModal = false"
      >
        <div class="network-add-modal">
          <h4 class="list-title">添加服务器</h4>
          <div class="input-group">
            <label for="servername" class="add-label">服务器名</label>
            <input class="add-input" v-model="newServerName" id="servername" type="text">
          </div>
          <div class="input-group">
            <label for="serverurl" class="add-label">地址</label>
            <input class="add-input" v-model="newServerUrl" id="serverurl" type="text">
          </div>
          <div class="add-network-footer">
            <v-touch tag="span" @tap="addnetworkModal=false">取消</v-touch>
            <v-touch tag="span" @tap="enter">确定</v-touch>
          </div>
        </div>
      </Shade>
    </div>
  </mainPage>
</transition>
</template>

<script>
import mainPage from '#/common/detailFramework'
import Shade from '#/Shade/Shade'
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    mainPage,
    Shade
  },
  data () {
    return {
      networkModal: false,
      addnetworkModal: false,
      newServerName: '',
      newServerUrl: 'http://'
    }
  },
  computed: {
    ...mapState('config', ['server']),
    ...mapGetters('config', ['currentServer'])
  },
  methods: {
    ...mapMutations('config', ['choseServer', 'addServer']),
    chosedServer (index) {
      this.choseServer(index)
      this.$nextTick(() => {
        this.networkModal = false
      })
    },
    enter () {
      this.addServer({
        name: this.newServerName,
        url: this.newServerUrl
      })

      this.addnetworkModal = false
    }
  },
  watch: {
    addnetworkModal (val) {
      if (val) {
        this.newServerName = '自定义' + this.server.length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/scss.config.scss';
  .config-content {
    padding: 10px;
    .group-title {
      display: inline-block;
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .group-item {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      @include thin-line();
      .group-text {
        font-size: 16px;
        .sub-text {
          font-size: 12px;
          font-size: 10px;
          color: #999;
        }
      }
      .group-value {
        font-size: 12px;
        color: #999;
      }
    }
    @mixin center-modal {
      border-radius: 5px;
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0) scale3d(1,1,1);
      background: white;
      max-height: 80vh;
      overflow: auto;
    }
    .network-chosing-list {
      @include center-modal();
      .chosing-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px 0;
      }
      .list-title {
        margin-bottom: 10px;
      }
      .item-name {
        font-size: 13px;
        color: #333;
      }
      .item-url {
        font-size: 12px;
        color: #666;
      }
      .item-check-icon {
        width: 20px;
        height: 20px;
        background: url('~@/components/overlay/img/checked.png') no-repeat center / 100%;
      }
    }
    .network-add-modal {
      @include center-modal();
      .list-title {
        margin-bottom: 10px;
      }
      .input-group {
        height: 30px;
        display: flex;
        padding: 5px;
        justify-content: space-between;
        align-items: center;
        .add-label {
          font-size: 14px;
          white-space: nowrap;
          margin-right: 5px;
        }
        .add-input {
          border: none;
          border-bottom: 1px solid #ccc;
          outline: none;
        }
      }
      .add-network-footer {
        display: flex;
        justify-content: flex-end;
        span {
          font-size: 14px;
          color: $theme-color;
          margin: 10px 10px 0;
        }
      }
    }
  }

  .shade-enter .network-chosing-list,
  .shade-enter .network-add-modal,
  .shade-leave-to .network-add-modal,
  .shade-leave-to .network-chosing-list {
    transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1)!important;
  }
  .shade-enter-active .network-chosing-list,
  .shade-enter-active .network-add-modal,
  .shade-leave-active .network-add-modal,
  .shade-leave-active .network-chosing-list {
    transition: transform .3s;
  }
</style>
