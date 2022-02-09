<template>
    <div id="login_container" class="wxlogin"></div>
</template>

<script>

export default {
  name: "wxLogin",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    setWxerwma() {
    const obj = new WxLogin({
      self_redirect: true,
      id: 'login_container', // 需要显示的容器id
      appid: 'wxef5765dd395d8504', // 公众号appid
      scope: 'snsapi_login', // 网页默认即可
      redirect_uri: encodeURIComponent('https://passport.zcool.com.cn/thirdlogin/wechat_callback.do?appId=1006'), // 授权成功后回调的
      state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
      style: 'black', // 提供"black"、"white"可选。二维码的样式
      href: 'https://static.zcool.cn/passport4.0/css/wxCode.css?v=0.1' // 外部css文件url，需要https
      // href:"data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDMwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9IA=="
    })
  },
  },
  mounted() {
    this.setWxerwma()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.wxlogin {
  width: 400px;
  padding: 0px 50px;
}
</style>
