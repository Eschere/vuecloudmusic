const Koa = require('koa')
const compress = require('koa-compress')
const router = require('./router')

const app = new Koa()

// 启用gzip压缩
app.use(compress())

app.use(router.routes())

app.listen(8080)

/*
http.createServer((request, response) => {

const recommendOptions = {
  hostname: 'u.y.qq.com',
  path: '/cgi-bin/musicu.fcg?callback=recom028948441275588932&g_tk=5381&jsonpCallback=recom028948441275588932&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22music.web_album_library%22%2C%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A1%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A2%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A40%2C%22click_albumid%22%3A0%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D',
  headers: {
    'referer': 'https://y.qq.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
  }
}

https.get(recommendOptions, res => {
  let chunks = []

  res.on('data', chunk => {
    chunks.push(chunk)
  })

  res.on('end', _ => {
    let jsonp = chunks.toString()
    response.write(jsonp)
    // console.log(jsonp)
    response.end()
  })
})

const guid = 8470277379;
const options = {
  hostname: 'utherapi.browser.qq.com',
  path:'/qbweb/report?_ApplicationId=qbweb&stComm={%22sGuid%22:%22a999efb9e03e4284ba123ece73b5e1b2%22}&vProtocols_Function=[{%22iProtocol%22:8888,%22iKey%22:522,%22iValueI%22:1,%22iValueII%22:1,%22iValueIII%22:1,%22sValueI%22:%22onload%22,%22sValueII%22:%22%7B%5C%22ua%5C%22%3A%5C%22mozilla%2F5.0%20(windows%20nt%2010.0%3B%20wow64)%20applewebkit%2F537.36%20(khtml%2C%20like%20gecko)%20chrome%2F67.0.3396.99%20safari%2F537.36%5C%22%2C%5C%22locationHref%5C%22%3A%5C%22https%3A%2F%2Fy.qq.com%2Fportal%2Fplayer.html%5C%22%7D%22,%22sValueIII%22:%22%22}]&r=0.22346810367207537',
  headers:{
    // [':authority']: 'utherapi.browser.qq.com',
    // [':method']: 'GET',
    // [':path']: '/qbweb/report?_ApplicationId=qbweb&stComm={%22sGuid%22:%22a999efb9e03e4284ba123ece73b5e1b2%22}&vProtocols_Function=[{%22iProtocol%22:8888,%22iKey%22:522,%22iValueI%22:1,%22iValueII%22:1,%22iValueIII%22:1,%22sValueI%22:%22onload%22,%22sValueII%22:%22%7B%5C%22ua%5C%22%3A%5C%22mozilla%2F5.0%20(windows%20nt%2010.0%3B%20wow64)%20applewebkit%2F537.36%20(khtml%2C%20like%20gecko)%20chrome%2F67.0.3396.99%20safari%2F537.36%5C%22%2C%5C%22locationHref%5C%22%3A%5C%22https%3A%2F%2Fy.qq.com%2Fportal%2Fplayer.html%5C%22%7D%22,%22sValueIII%22:%22%22}]&r=0.9594415987621889',
    // [':scheme']: 'https',
    'referer': 'https://y.qq.com/portal/player.html',
    'Cookie':'RK=caWn49X/OU; pgv_pvi=7050521600; eas_sid=91x510M9k9g755y7Y6s236u786; LW_uid=Y1E5x0N9G927f5Y7F8I7B8L4W4; tvfe_boss_uuid=09759e289646051d; ue_uid=f3e136f7da798fea31921ecda2bc6fc7; o_cookie=935431537; LW_pid=bf217d89ad39b78131f6c3ca43c844eb; ptcz=90b7defbe1168fde038507e28efd8bc37ca711362ac6c97d562bef5a1918ca7a; pt2gguin=o0935431537; pac_uid=1_935431537; mobileUV=1_16145d8c774_98d9d; ue_ts=1520512874; ue_uk=174145a62c1b5bb7eb64f0504d1e9eb4; ue_skey=16c0533717b6370b284a721f754ca44f; LW_sid=G1H5C2O7g3t956J7N5898616o2; same_pc=%7B%7D; pgv_info=ssid=s9310047710; pgv_si=s6267202560; qqmusic_fromtag=66; pgv_pvid='+guid,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
  }
}

let req = https.get(options,res=>{
  // console.log(res)
})

const albummid = '003K3LYu0JvwwO'
const options2 = {
  hostname:'c.y.qq.com',
  path:'/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+albummid+'&g_tk=5381&jsonpCallback=albuminfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
}

https.get(options2,res => {
  // console.log(res)

  // let chunks = []
  // res.on('data',function (chunk) {
  //   chunks.push(chunk)
  // })

  // res.on('end', function(){
  //   console.log(chunks.toString())
  // })
})

const filename = 'C4000'
const options3 = {
  hostname: 'c.y.qq.com',
  path:`/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&jsonpCallback=MusicJsonCallback3935884848097193&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback3935884848097193&uin=0&songmid=${albummid}&filename=${filename}&guid='${guid}`
}

https.get(options3,function (res) {
  let chunks = []
  res.on('data',function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function(){
    // 'http://dl.stream.qqmusic.qq.com/'

    function MusicJsonCallback3935884848097193 (data) {
      return data
    }

    console.log(chunks.toString())

    let data = eval(chunks.toString())

    console.dir(data)
    let str = `http://dl.stream.qqmusic.qq.com/${data.data.items[0].filename}?vkey=${data.data.items[0].vkey}&guid=${guid}&uin=0&fromtag=66`

    console.log(str)
  })
})

}).listen(8080)
*/
