<template>
<div>

<v-touch
  tag="div"
  @pan="panHandler"
>
  <transition-group
    class="box"
    name="order"
    tag="div"
    :style="pan"
    ref="order"
  >
    <div
      ref="item"
      v-for="item in rlist"
      :key="item.id"
      :data-key="item.id"
      class="item"
      
    >
      {{item.name}}
    </div>
    
  </transition-group>
</v-touch>
  <button @click="index++">++</button>
  <button @click="index--">--</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      list: [1,2,3,4],
      index: 0,
      pan:'',
      rlist: '',
    }
  },
  created(){
    let prev = this.index - 1 < 0 ? this.list.length + this.index - 1 : this.index - 1
    // let prev2 = this.index - 2 < 0 ? this.list.length + this.index - 2 : this.index - 2
    let next = this.index + 1 > this.list.length -1 ? 0 : this.index + 1

    this.rlist = [
        // {
        //   id: 'i' + this.list[prev2],
        //   name: 'name' + this.list[prev2]
        // },
        {
          id: Date.now() * Math.random(),
          name: 'name' + this.list[prev]
        },
        {
          id: Date.now()* Math.random(),
          name: 'name' + this.list[this.index]
        },
        {
          id: Date.now()* Math.random(),
          name: 'name' + this.list[next]
        },
        // {
        //   id: 'i' + this.list[next2],
        //   name: 'name' + this.list[next2]
        // },
      ]
  },
  computed: {
   /* rlist () {
      let prev = this.index - 1 < 0 ? this.list.length + this.index - 1 : this.index - 1
      // let prev2 = this.index - 2 < 0 ? this.list.length + this.index - 2 : this.index - 2
      let next = this.index + 1 > this.list.length -1 ? 0 : this.index + 1
      // let next2 = this.index + 2 > this.list.length -1 ? 1 : this.index + 2
      if (this.list.length === 1 ) {
        
      } 
      return [
        // {
        //   id: 'i' + this.list[prev2],
        //   name: 'name' + this.list[prev2]
        // },
        {
          id: 'i' + this.list[prev],
          name: 'name' + this.list[prev]
        },
        {
          id: 'i' + this.list[this.index],
          name: 'name' + this.list[this.index]
        },
        {
          id: 'i' + this.list[next],
          name: 'name' + this.list[next]
        },
        // {
        //   id: 'i' + this.list[next2],
        //   name: 'name' + this.list[next2]
        // },
      ]
    }*/
  },
  methods: {
    panHandler (e) {
      console.log(e)
      let item = this.$refs.item
      // console.log(item)
      // item.forEach(item => {
      //   // this.animating = {transform: 'translate3d(' +e.deltaX+ 'px,0,0)'}
      //   // item.style.transform = 'translate3d(' +e.deltaX+ 'px,0,0)'
      // })
      this.pan = {transform: 'translate3d(' +e.deltaX+ 'px,0,0)'}
      if (e.isFinal) {
        
        this.pan = {transition: 'all 10s'}

        console.log(item)
        if (e.deltaX < 0) {
          // this.$nextTick(()=>{
            this.index++
          this.der='l'
          if (this.index > this.list.length-1){
            this.index = 0
          }
          // })
          
        } else {
          // this.$nextTick(()=>{
            this.index--
            this.der='r'
            if (this.index<0){

            this.index = this.list.length-1
            }
          // })
          
        }
      }
    }
  },
  watch:{
    index(v,ov){
      let prev = v - 1 < 0 ? this.list.length + v - 1 : v - 1
    // let prev2 = this.index - 2 < 0 ? this.list.length + this.index - 2 : this.index - 2
    let next = v + 1 > this.list.length -1 ? 0 : v + 1
      if(this.der==='l'){
        this.rlist.shift()
        this.rlist.push({
          id: Date.now()*Math.random(),
          name: 'name' + this.list[next]
        })
      } else if (this.der==='r'){
        this.rlist.pop()
        this.rlist.unshift({
          id: Date.now()*Math.random(),
          name: 'name' + this.list[prev]
        })
      }
    }
  }
}
</script>
<style>
.order-move {
  /* position: relative;
  z-index: 2; */
  transition: transform 10s;
}
/* .order-leave-active {
  position: absolute;
  transition: all 1s;
} */
/* .order-leave, .order-leave-to {
  display: none;
} */
.order-leave-to {
  transform: translateY(20%)
}
.order-leave-active {
  /* position: absolute; */
  /* position: absolute; */
  /* visibility: hidden!important; */
  /* z-index: -1; */
  /* visibility: hidden; */
  display: none!important;
  transition: all 10s;
}
.order-enter-active {
  visibility: hidden;
  transition: all 10s;
}

/* .order-leave-to {
  transform: translate3d(-100%,0,0)
} */
.box {
  width: 100vw;
  /* display: flex;
  position: relative;
  justify-content: space-around; */
  white-space: nowrap;
  overflow: hidden;
  background: red;
  position: relative;
}
.item {
  border: 2px solid black;
  /* flex-shrink: 0; */
  width: 33.33%;
  display: inline-block;
}
</style>


