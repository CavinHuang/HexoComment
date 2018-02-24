<template lang="pug">
.layout.bg-main.bg-inverse.fixed(style='z-index: 9;')
  .container-layout
    .navbar
      .navbar-head
        button.button.icon-navicon(data-target='#navbar1')
        a(href='/')
          img(src='http://www.pintuer.com/images/30-white.png')
          strong.text-big CavinComment管理后台
      #navbar1.navbar-body.nav-navicon
        ul.nav.nav-inline.nav-menu.navbar-right
          li
            a.bg-main(href='javascript:;')
              span
                img.radius-circle(src='http://www.pintuer.com/demo/pintuer2/images/face.jpg', width='28')
              |管理员
              span.downward
            ul.drop-menu
              li
                a.icon-user(target='_blank', href='javascript:;') 修改资料
              li
                a.icon-key(target='_blank', href='javascript:;') 修改密码
          li
            a.bg-green(href='javascript:;')
              span.icon-envelope
              span.badge.bg-blue 5+
              span.downward
          li
            a.bg-blue(href='javascript:;')
              span.icon-bell-o
              span.badge.bg-green 99+
              span.downward
            ul.drop-menu
              li
                a.text-yellow-light.active(target='_blank', href='javascript:;')
                  span.icon-comment
                  | 您有26条未读消息
              li
                a.bg-gray(target='_blank', href='javascript:;')
                  span.icon-envelope
                  | 查看更多...
          li
            a.bg-yellow(target='_blank', href='login.html')
              span.icon-sign-out
              | 注销

</template>

<script>
export default {
  name: 'UserCenterHeader'
}
</script>

<style lang="css">
</style>
