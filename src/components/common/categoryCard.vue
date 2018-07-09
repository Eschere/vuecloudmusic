<template functional>
  <div class="card-box">
    <h2>
      <router-link :to="props.link">
        <span>{{props.title}}</span>
        <img src="~#/common/img/agy.png">
      </router-link>
    </h2>
    <ul class="card-list" v-if="props.items.length">
      <li
        v-for="item in props.items"
        :key="item.id"
      >
        <router-link :to="item.link">
          <img :src="item.img">
          <p class="title">{{item.title}}</p>
          <span class="subhead" v-if="item.subhead">{{item.subhead}}</span>
        </router-link>
      </li>
    </ul>
    <div class="card-placeholder" v-else></div>
  </div>
</template>
<style lang="scss" scoped>
.card-box {
  padding: 10px;
  h2 {
    height: 50px;
    a {
      display: inline-flex;
      align-items: center;
      height: 100%;
      img {
        margin-left: 10px;
        vertical-align: middle;
        height: 15px;
      }
    }
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 30vw;
      height: 40vw;
      margin-bottom: 10px;
      a {
        display: inline-block;
        height: 100%;
        font-size: 12px;
        .title {
          margin-top: 5px;
        }
        .subhead {
          color: #999
        }
      }
      img {
        border-radius: 5px;
        width: 100%;
      }
    }
  }
}
.card-placeholder {
  background-color: #ccc;
  height: 70vw;

}
</style>
