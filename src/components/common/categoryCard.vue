<template functional>
<div class="card-box">
  <h3 class="card-title">
    <router-link :to="props.link" class="card-link">
      <span>{{props.title}}</span>
      <img class="right-icon" src="~#/common/img/agy.png">
    </router-link>
  </h3>
  <div class="card-list" v-if="props.items.length">
    <div class="card-item" v-for="item in props.items" :key="item.id">
      <router-link class="item-link" :to="item.link">
        <span class="badgeNum" v-if="item.badgeNum">{{item.badgeNum}}</span>
        <img class="item-cover" v-src:before-load="item.img">
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
  padding: 10px;
}

.card-title {
  height: 50px;
  line-height: 50px;
}

.card-link {
  display: inline-flex;
  align-items: center;
  height: 100%;
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
  width: 30vw;
  height: 40vw;
  margin-bottom: 10px;
}

.item-cover {
  border-radius: 5px;
  width: 100%;
}
.before-load {
  width: 30vw;
  height: 30vw;
  background: #ccc url('~@/components/common/img/loading.png') no-repeat center / auto 50%;
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
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    text-indent: 20px;
    color: white;
  }
  .title {
    margin-top: 5px;
    text-overflow: ellipsis;
    height: 100%;
    overflow: hidden;
  }
  .title.no-wrap {
    white-space: nowrap;
  }
  .subhead {
    color: #999
  }
}

.card-placeholder {
  background-color: #ccc;
  height: 70vw;
}
</style>
