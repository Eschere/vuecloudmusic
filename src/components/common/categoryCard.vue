<template functional>
<div class="card-box">
  <h4 class="card-title">
    <router-link :to="props.link" class="card-link">
      <span>{{props.title}}</span>
      <img class="right-icon" src="~#/common/img/aaw.png">
    </router-link>
  </h4>
  <div class="card-list" v-if="props.items.length">
    <div class="card-item" v-for="item in props.items" :key="item.id">
      <router-link class="item-link" :to="item.link">
        <span class="badgeNum" v-if="item.badgeNum">{{item.badgeNum}}</span>
        <div class="item-cover" v-src:before-load="item.img"></div>
        <p :class="{title: true, nowrap: item.subhead}">{{item.title}}</p>
        <span class="subhead" v-if="item.subhead">{{item.subhead}}</span>
      </router-link>
    </div>
  </div>
  <div class="card-placeholder" v-else></div>
</div>
</template>

<style lang="scss" scoped>
.card-box {
  padding: 2vw;
}

.card-title {
  height: 50px;
  line-height: 50px;
  .card-link {
    display: inline-flex;
    align-items: center;
  }
}

.right-icon {
  margin-left: 10px;
  vertical-align: middle;
  height: 15px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-item {
  width: 31vw;
  height: 44vw;
  margin-bottom: 10px;
}

.item-cover {
  border-radius: 5px;
  width: 31vw;
  height: 31vw;
  background: {
    size: 100%;
    position: center;
    repeat: no-repeat;
  }
}
.before-load {
  // width: 31vw;
  // height: 31vw;
  background: #ccc url('~@/components/common/img/cover-loading.png') no-repeat center / 100%;
}

.item-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 12px;
  width: 100%;
  position: relative;
  .badgeNum {
    background: url("~@/components/common/img/badge-headset.png") no-repeat left / auto 100%;
    font-size: 12px;
    line-height: 12px;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    text-indent: 15px;
    color: white;
  }
  .title {
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1
  }
  .title.nowrap {
    white-space: nowrap;
  }
  .subhead {
    flex: 1;
    color: #999
  }
}

.card-placeholder {
  background-color: #ccc;
  height: 70vw;
}
</style>
