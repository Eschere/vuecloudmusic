webpackJsonp([0],{B90M:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Dd8w"),a=i.n(n),r=i("NYxO"),s=i("0xDb"),o=i("hU7x"),c=i.n(o),l={props:["direction"],data:function(){return{pnncd:[],panningStyle:"",protecting:"",doingChangeSong:"",stopAnimation:"",commentnum:""}},computed:a()({},Object(r.e)("player",["running","currentSong","playlist","cdMoveDirection"]),Object(r.c)("player",["playOrder"]),Object(r.c)("config",["currentServer"])),methods:a()({},Object(r.d)("player",["changeCdMoveDirection"]),Object(r.b)("player",["changeSong"]),{togglePage:function(t){t.srcEvent.stopPropagation(),t.srcEvent.stopImmediatePropagation(),t.preventDefault(),this.$emit("togglepage")},panHandler:function(t){var e=this;if(this.protecting)return!1;if(this.doingChangeSong=!0,this.panningStyle={transform:"translate3d(-100vw, 0, 0) translate3d("+t.deltaX+"px,0,0)"},t.isFinal){var i=document.documentElement.clientWidth;t.deltaX/i>.45?(this.protecting=!0,this.changeSong({type:"prev",beforeChange:function(){setTimeout(function(){e.protecting=!1,e.doingChangeSong=!1},200),e.panningStyle={transition:"all .2s ease-out"}}})):t.deltaX/i<-.45?(this.protecting=!0,this.changeSong({type:"next",beforeChange:function(){setTimeout(function(){e.protecting=!1,e.doingChangeSong=!1},200),e.panningStyle={transition:"all .2s ease-out"}}})):(this.panningStyle={transition:"all .2s ease-out"},setTimeout(function(){e.protecting=!1,e.doingChangeSong=!1},200))}},swipeHandler:function(t){var e=this;if(this.protecting)return!1;this.doingChangeSong=!0,this.protecting=!0;t.deltaX>0?this.changeSong({type:"prev",beforeChange:function(){setTimeout(function(){e.protecting=!1,e.doingChangeSong=!1},200)}}):t.deltaX<0&&this.changeSong({type:"next",beforeChange:function(){setTimeout(function(){e.protecting=!1,e.doingChangeSong=!1},200)}})},enter:function(t,e){t.style.visibility="hidden",setTimeout(function(){e(),t.style.visibility=""},200)},leave:function(t,e){t.style.display="none",setTimeout(function(){e(),t.style.display=""},200)}}),created:function(){var t=this.currentSong.indexInPlaylist,e=this.playOrder.indexOf(t),i=e-1<0?this.playOrder.length-1:e-1,n=e+1>this.playOrder.length-1?0:e+1;this.pnncd=[{mark:Date.now()*Math.random(),index:this.playOrder[i]},{mark:Date.now()*Math.random(),index:t},{mark:Date.now()*Math.random(),index:this.playOrder[n]}]},watch:{"currentSong.src":function(){var t=this;setTimeout(function(){t.stopAnimation="none"},200),setTimeout(function(){t.stopAnimation=""},700)},"currentSong.indexInPlaylist":function(t){this.commentnum="";var e=t,i=this.playOrder.indexOf(e),n=i-1<0?this.playOrder.length-1:i-1,a=i+1>this.playOrder.length-1?0:i+1;"right"===this.cdMoveDirection?(this.pnncd.pop(),this.pnncd.unshift({mark:Date.now()*Math.random(),index:this.playOrder[n]})):"left"===this.cdMoveDirection?(this.pnncd.shift(),this.pnncd.push({mark:Date.now()*Math.random(),index:this.playOrder[a]})):this.pnncd=[{mark:Date.now()*Math.random(),index:this.playOrder[n]},{mark:Date.now()*Math.random(),index:e},{mark:Date.now()*Math.random(),index:this.playOrder[a]}],this.changeCdMoveDirection("")},"currentSong.songid":function(t){var e=this;c()(this.currentServer.url+"/songcommentnum?topic="+t,{name:"jsoncallback2387000247395"+Math.floor(8999*Math.random()+1e3)},function(t,i){if(t)console.log("Get SongCommentNum Failed");else{var n=i.batch_commenttotal[0].commenttotal;e.commentnum=n<=999?n:n<1e4?"999+":n<1e5?"1w+":n<1e6?"10w+":"100w+"}})}}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cd-page"},[i("v-touch",{staticClass:"cd-main",on:{tap:t.togglePage,pan:t.panHandler,swipe:t.swipeHandler}},[i("div",{staticClass:"cd-head"},[i("div",{staticClass:"cd-heads",class:t.running&&!t.doingChangeSong?"":"pause"})]),t._v(" "),i("div",{staticClass:"cd-cover-box"}),t._v(" "),i("transition-group",{staticClass:"cd-cover-list",style:t.panningStyle,attrs:{tag:"div",name:"mini-order"},on:{enter:t.enter,leave:t.leave}},t._l(t.pnncd,function(e,n){return i("div",{key:e.mark,staticClass:"cd-cover-item"},[i("div",{staticClass:"cd-cover-bg",class:t.running&&!t.doingChangeSong&&1===n?"running":"",style:{animation:t.stopAnimation}},[i("div",{directives:[{name:"src",rawName:"v-src:before-cover",value:"https://y.gtimg.cn/music/photo_new/T002R300x300M000"+t.playlist[e.index].albummid+".jpg?max_age=2592000",expression:"'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+playlist[item.index].albummid+'.jpg?max_age=2592000'",arg:"before-cover"}],staticClass:"cd-cover"})])])}))],1),t._v(" "),i("div",{staticClass:"operation-group"},[i("span",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"iconfont icon-heart"}),t._v(" "),i("span",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"iconfont icon-download"}),t._v(" "),i("span",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"comment"},[i("span",{staticClass:"iconfont icon-comment",class:{shownum:t.commentnum}}),t._v(" "),i("span",{staticClass:"comment-num"},[t._v(t._s(t.commentnum))])]),t._v(" "),i("span",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"iconfont icon-more-item"})])],1)},staticRenderFns:[]};var u=i("VU/8")(l,h,!1,function(t){i("lVbR"),i("XFbN")},"data-v-6f0a231d",null).exports,g=void 0,d={data:function(){return{tiemr:null,timerRefresh:null,lyric:"",lyricTrans:"",lyricArray:[],lyricLoading:!0,boxHeight:0,lineData:[],readyForChange:!1,scrollByUser:!1,willActiveIndex:null,lyricChanged:!1}},computed:a()({},Object(r.e)("player",["volume","currentSong","currentTime","dataLoading"]),Object(r.c)("config",["currentServer"]),{activeIndex:function(){var t=this;if(this.lyricArray.length>1){if(this.currentTime<=this.lyricArray[0].time)return 0;var e;return e=this.lyricArray.findIndex(function(e,i,n){return i<n.length-1?t.currentTime>=e.time&&t.currentTime<n[i+1].time:i}),""===this.lyricArray[e].text?e-1<0?0:e-1:e}return 0},willActiveTime:function(){return this.lyricArray.length<1||null===this.willActiveIndex?"00:00":Object(s.b)(this.lyricArray[this.willActiveIndex].time)}}),methods:a()({},Object(r.d)("player",["changeVolume","setCurrentTime"]),{togglePage:function(t){this.$emit("togglepage")},changeVolumeHandler:function(t){var e=this.$refs.volume.getBoundingClientRect(),i=e.width,n=e.left||e.x,a=t.center.x-n,r=Math.round(a/i*100)/100;r<.05?r=0:r>.95&&(r=1),this.changeVolume(r)},panHandler:function(){this.readyForChange=!0,this.scrollByUser=!0},lyricChanger:function(){this.setCurrentTime(this.lyricArray[this.willActiveIndex].time)},requestLyric:function(t){var e=this;this.lyricLoading=!0,this.scrollByUser=!1,this.readyForChange=!1,c()(this.currentServer.url+"/songlyric?songmid="+this.currentSong.songmid,{name:"MusicJsonCallback_lrc"},function(i,n){if(i)e.lyricLoading=!1,e.lyricArray=[{text:"无歌词"}];else{try{e.lyric=Object(s.a)(n.lyric),e.lyricTrans=n.trans&&Object(s.a)(n.trans),e.lyricArray=Object(s.d)(e.lyric,e.lyricTrans)}catch(t){console.log(t),console.log("lyric parse failed"),e.lyricArray=[{text:"无歌词"}]}e.$nextTick(t)}})},updateLineData:function(){this.lineData=this.$refs.line.map(function(t){var e=t.offsetTop,i=t.clientHeight;return{offset:e,height:i,center:e+i/2}})}}),mounted:function(){var t=this;this.requestLyric(function(){t.lyricLoading=!1,setTimeout(function(){t.updateLineData(),(g=new window.IScroll(t.$refs.lyricArea.$el,{probeType:3,click:!1,preventDefault:!1})).on("scroll",function(){if(t.readyForChange&&t.scrollByUser){var e=void 0,i=-g.y+t.boxHeight/2;e=i<t.lineData[0].center?t.willActiveIndex=0:i>t.lineData[t.lineData.length-1].center?t.willActiveIndex=t.lineData.length-1:t.lineData.findIndex(function(t,e,n){return Math.abs(t.center-i)<=t.height/2+10&&0!==t.height}),t.willActiveIndex=e,t.timer&&(clearTimeout(t.timer),t.timer=null)}}),g.on("scrollEnd",function(){t.readyForChange&&t.scrollByUser&&(t.scrollByUser=!1,g.scrollTo(0,-(t.lineData[t.willActiveIndex].center-t.boxHeight/2),1e3),t.timer=setTimeout(function(){t.readyForChange=!1,t.willActiveIndex=null,g.scrollTo(0,-(t.lineData[t.activeIndex].center-t.boxHeight/2),1e3)},5e3))}),!1===t.readyForChange&&g.scrollTo(0,-(t.lineData[t.activeIndex].center-t.boxHeight/2),1e3)},1e3)}),this.boxHeight=this.$refs.lyricArea.$el.getBoundingClientRect().height,window.onresize=function(){t.boxHeight=t.$refs.lyricArea.$el.getBoundingClientRect().height}},activated:function(){var t=this;this.lyricChanged&&(this.lyricLoading=!1,g.scrollTo(0,0,0),this.$nextTick(function(){setTimeout(function(){t.updateLineData(),g.refresh(),!1===t.readyForChange&&g.scrollTo(0,-(t.lineData[t.activeIndex].center-t.boxHeight/2),1e3)},1e3)}),this.lyricChanged=!1)},watch:{activeIndex:function(t){if(this.lineData.length>0&&!1===this.readyForChange){var e=this.lineData[t].center-this.boxHeight/2;g.scrollTo(0,-e,1e3)}},dataLoading:function(t){var e=this;t||(this.lyricLoading=!0,this.lyricChanged=!0,this.lineData=[],this.willActiveIndex=null,this.requestLyric(function(){e.lyricLoading=!1,e.$nextTick(function(){e.timerRefresh&&(clearTimeout(e.timerRefresh),e.tiemrretimerRefresh=null),e.timerRefresh=setTimeout(function(){e.updateLineData(),g.refresh(),!1===e.readyForChange&&g.scrollTo(0,-(e.lineData[e.activeIndex].center-e.boxHeight/2),1e3),e.timerRefresh=null},1e3)})}))}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"lyric-page"},[i("div",{staticClass:"volume-area"},[i("span",{staticClass:"iconfont icon-volume"}),t._v(" "),i("v-touch",{staticClass:"volume-box",on:{tap:t.changeVolumeHandler,pan:t.changeVolumeHandler}},[i("div",{ref:"volume",staticClass:"volume-bar"},[i("div",{staticClass:"volume",style:{width:100*t.volume+"%"}},[i("div",{staticClass:"volume-button"})])])])],1),t._v(" "),i("div",{staticClass:"lyric-area"},[t.lyricArray.length>1?i("v-touch",{directives:[{name:"show",rawName:"v-show",value:t.readyForChange,expression:"readyForChange"}],staticClass:"lyric-cursor",on:{tap:t.lyricChanger}},[i("span",{staticClass:"cursor-icon"}),t._v(" "),i("hr",{staticClass:"cursor-line"}),t._v(" "),i("span",{staticClass:"cursor-time"},[t._v(t._s(t.willActiveTime))])]):t._e(),t._v(" "),i("v-touch",{ref:"lyricArea",staticClass:"lyric-touch",on:{tap:t.togglePage,pan:t.panHandler}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.lyricLoading&&t.lyricArray.length>1,expression:"!lyricLoading && lyricArray.length > 1"}],staticClass:"lyric-box"},[i("div",{staticClass:"lyric-content",style:{padding:t.lyricArray.length>1?t.boxHeight/2+"px 0":0}},t._l(t.lyricArray,function(e,n){return i("div",{key:"lyricI"+n,ref:"line",refInFor:!0,staticClass:"lyric-line",style:{color:t.activeIndex===n?"#fff":t.willActiveIndex===n?"#eee":""}},[i("p",{staticClass:"lyric-origin",domProps:{innerHTML:t._s(e.text)}}),t._v(" "),e.trans?i("p",{staticClass:"lyric-trans",domProps:{innerHTML:t._s(e.trans)}}):t._e()])}))]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.lyricLoading,expression:"lyricLoading"}],staticClass:"lyric-loading"},[i("span",[t._v("歌词加载中...")])]),t._v(" "),t.lyricLoading||1!==t.lyricArray.length?t._e():i("div",{staticClass:"pure-music"},[i("span",[t._v(t._s(t.lyricArray[0]?t.lyricArray[0].text:""))])])])],1)])},staticRenderFns:[]};var m={components:{cd:u,lyric:i("VU/8")(d,p,!1,function(t){i("EKD9")},"data-v-84bbd64c",null).exports,playlist:i("fydU").a},data:function(){return{showPlaylist:!1,pageBg:"",showing:"cd",title:"",timeSetting:null,progressBarWidth:"",progressBarOffset:""}},computed:a()({},Object(r.e)("player",["running","playlist","currentSong","duration","currentTime","loadedTime","loopType","dataLoading"]),Object(r.c)("player",["progress"]),{durationStr:function(){return Object(s.b)(this.duration)},currentTimeStr:function(){return null!==this.timeSetting?Object(s.b)(this.timeSetting):Object(s.b)(this.currentTime)},progressWidth:function(){return null!==this.timeSetting?this.timeSetting/this.duration*100+"%":100*this.progress+"%"},loadProgress:function(){return 0===this.duration?0:this.loadedTime/this.duration*100+"%"},loopTypeClass:function(){switch(this.loopType){case"proper":return"icon-circle";case"single":return"icon-single";case"random":return"icon-random"}}}),methods:a()({},Object(r.d)("player",["setCurrentTime","toggleLoopType","changePlayState"]),Object(r.b)("player",["changeSong"]),{scrollRound:function(t,e){t.maxScrollX<-30&&setTimeout(function(){t.scrollTo(e,0,t.maxScrollX/-30*1e3,{style:"cubic-bezier(0, 0, 1, 1)"})},2e3)},togglePage:function(){"cd"===this.showing?this.showing="lyric":"lyric"===this.showing&&(this.showing="cd")},playlistOn:function(){this.showPlaylist=!0},changeProgressPan:function(t){var e=this,i=(t.center.x-this.progressBarOffset)/this.progressBarWidth*this.duration;this.timeSetting=i<0?0:i>this.duration?this.duration:i,t.isFinal&&(this.setCurrentTime(this.timeSetting),setTimeout(function(){e.timeSetting=null},100))},changeProgressTap:function(t){var e=(t.center.x-this.progressBarOffset)/this.progressBarWidth*this.duration;this.setCurrentTime(e)}}),mounted:function(){var t=this;setTimeout(function(){var e=new Image;e.src=t.currentSong.albumcover,e.onload=function(){t.pageBg=e.src,e=null}},1e3);var e=this.title=new window.IScroll(this.$refs.firstTitle,{scrollX:!0,scrollY:!1,bounce:!1,click:!1,disableMouse:!0,disablePointer:!0,disableTouch:!0,bounceEasing:{style:"cubic-bezier(0,0,1,1)"}});e.on("scrollEnd",function(){e.maxScrollX===e.x?t.scrollRound(e,0):0===e.x&&t.scrollRound(e,e.maxScrollX)}),this.scrollRound(e,e.maxScrollX);var i=this.$refs.progress.getBoundingClientRect();this.progressBarOffset=i.x||i.left,this.progressBarWidth=i.width},activated:function(){this.showing="cd"},watch:{"playlist.length":function(t){0===t&&"/player"===this.$route.path&&this.$router.replace("/")},"currentSong.src":function(){var t=this;this.title.scrollTo(0,0,0),this.$nextTick(function(){setTimeout(function(){t.title.refresh(),t.scrollRound(t.title,t.title.maxScrollX)},1e3)}),setTimeout(function(){var e=new Image;e.src=t.currentSong.albumcover,e.onload=function(){t.pageBg=e.src,e=null}},1e3)}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade"}},[i("div",{staticClass:"player-page"},[i("div",{staticClass:"page-bg",style:{backgroundImage:"url("+t.pageBg+")"}}),t._v(" "),i("div",{staticClass:"player-header"},[i("v-touch",{staticClass:"back",on:{tap:function(e){t.$router.go(-1)}}}),t._v(" "),i("div",{ref:"firstTitle",staticClass:"header-title"},[i("div",{staticClass:"first-title-box"},[i("p",{staticClass:"first-title-content"},[t._v(t._s(t.currentSong.songname))])]),t._v(" "),i("div",{staticClass:"sub-title"},[t._v(t._s(t.currentSong.singer))])]),t._v(" "),i("span",{staticClass:"share iconfont icon-share"})],1),t._v(" "),i("div",{staticClass:"player-main"},[i("transition",{attrs:{name:"fast-fade"}},[i("keep-alive",[i(t.showing,{tag:"div",on:{togglepage:t.togglePage}})])],1)],1),t._v(" "),i("div",{staticClass:"player-footer"},[i("div",{staticClass:"progress-area"},[i("span",{staticClass:"current-time"},[t._v(t._s(t.currentTimeStr))]),t._v(" "),i("v-touch",{staticClass:"progress-can-touch",attrs:{tag:"div"},on:{tap:t.changeProgressTap,pan:t.changeProgressPan}},[i("div",{ref:"progress",staticClass:"progress-bar"},[i("div",{staticClass:"load-progress",style:{width:t.loadProgress}}),t._v(" "),i("div",{staticClass:"progress",style:{width:t.progressWidth}},[i("span",{staticClass:"progress-icon",class:{loading:t.dataLoading}})])])]),t._v(" "),i("span",{staticClass:"duration"},[t._v(t._s(t.durationStr))])],1),t._v(" "),i("div",{staticClass:"control-area"},[i("v-touch",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"loop-type iconfont",class:t.loopTypeClass,on:{tap:t.toggleLoopType}}),t._v(" "),i("v-touch",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"prev iconfont icon-prev",on:{tap:function(e){t.changeSong({type:"prev"})}}}),t._v(" "),i("v-touch",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"play iconfont icon-play-fill",class:t.running?"icon-pause":"icon-play-fill",on:{tap:function(e){t.changePlayState("toggle")}}}),t._v(" "),i("v-touch",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"next iconfont icon-next",on:{tap:function(e){t.changeSong({type:"next"})}}}),t._v(" "),i("v-touch",{directives:[{name:"touch-light",rawName:"v-touch-light"}],staticClass:"show-playlist iconfont icon-list",on:{tap:t.playlistOn}})],1)]),t._v(" "),i("playlist",{attrs:{showPlaylist:t.showPlaylist},on:{close:function(e){t.showPlaylist=!1}}})],1)])},staticRenderFns:[]};var y=i("VU/8")(m,v,!1,function(t){i("pO6F")},"data-v-2ab50f56",null);e.default=y.exports},EKD9:function(t,e){},XFbN:function(t,e){},lVbR:function(t,e){},pO6F:function(t,e){}});
//# sourceMappingURL=0.ccad11e398fdb068b150.js.map