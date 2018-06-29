export default {
  render () {
    return (
      <div>
        <router-view></router-view>
        <router-view name="content"></router-view>
      </div>
    )
  }
}
