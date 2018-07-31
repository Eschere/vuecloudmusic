# vuecloudmusic

> A music player like netease cloud music was built by Vue.js  

> 使用Vue.js构建的一款音乐WebApp(仿网易云手机App)
## Build Setup

``` bash
# 安装依赖
npm install

# 运行开发版
npm run dev

# 构建生产版本
npm run build
```
## 项目结构
```
src
 |-assets                                         第三方文件
 |    |-iconfont                                  字体图标
 |    |-iscroll.js                                第三方滚动条优化
 |
 |-components
 |    |-common                                    公用组件
 |    |   |-img                                   公用图片
 |    |
 |    |-overlay                                   模态(悬浮)类界面
 |    |
 |    |-AudioPlayer                               封装原生audio
 |    |-Config                                    设置页面
 |    |-Discover                                  发现页面
 |    |     |-Recommend                           首页推荐
 |    |
 |    |-Main                                      主界面
 |    |-MainHeader                                主界面头部
 |    |-MiniPlayer                                底部mini播放控制器
 |    |-Music                                     本地音乐界面
 |    |-Player                                    主播放器界面
 |    |-Search                                    搜索界面
 |    |-SongSheet                                 歌单界面
 |    |-Video                                     视频界面
 |
 |-directive                                      自定义指令
 |-router                                         路由
 |-store                                          vuex
 |    |-config                                    设置数据
 |    |-player                                    播放器状态数据
 |    |-router                                    路由控制
 |    |-songSheet                                 歌单控制
 |
 |-style
 |    |-scss.config.scss                          scss预编译全局变量，混合
 |
 |-utils                                          自建工具函数
 |-App.vue                                        根组件
 |-main.js                                        入口文件
```
## 效果展示
[VMusic](http://111.230.104.195)