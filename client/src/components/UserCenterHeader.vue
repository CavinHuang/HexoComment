<template lang="pug">
.layout.bg-main.bg-inverse.fixed(style='z-index: 9;')
  .container-layout
    .navbar
      .navbar-head
        button.button.icon-navicon(data-target='#navbar1')
        a(href='/')
          img(src='http://www.pintuer.com/images/30-white.png')
          strong.text-big 拼图响应式后台
      #navbar1.navbar-body.nav-navicon
        ul.nav.nav-inline.nav-menu
          li
            a.icon-cog(href='#')
              | 设置
              span.arrow
            ul.drop-menu
              li
                a(href='#') 全局设置
              li
                a(href='#') 系统设置
              li
                a(href='#') 会员设置
              li
                a(href='#') 积分设置
              li
                a(href='#') 权限设置
              li
                a(href='#') 插件设置
              li
                a(href='javascript:;')
                  | 皮肤设置
                  span.arrow
                ul
                  li
                    a(href='#') 墨绿
                  li
                    a(href='#') 天蓝
          li
            a.icon-home(href='index.html')
              | 导航
              span.arrow
            ul.drop-menu
              li
                a.icon-th-list(href='#') 栏目
              li
                a.icon-file-text(href='#')
                  | 内容
                  span.arrow
                ul
                  li
                    a(href='#') 新闻
                  li
                    a(href='#') 留言
                  li
                    a(href='#') 反馈
              li
                a.icon-user(href='#') 会员
              li
                a.icon-shopping-cart(href='#') 订单
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
            ul.drop-menu
              li
                a.text-yellow-light(target='_blank', href='javascript:;')
                  span.icon-envelope
                  | 您有16封邮件
              li
                a.bg-gray(target='_blank', href='javascript:;')
                  span.icon-envelope
                  | 查阅更多...
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
                a.text-yellow-light.active(target='_blank', href='javascript:;')
                  span.icon-comments
                  | 您有13条回复消息
              li
                a.bg-gray(target='_blank', href='javascript:;')
                  span.icon-envelope
                  | 查看更多...
          li
            a.bg-yellow(target='_blank', href='login.html')
              span.icon-sign-out
              | 注销
        .navbar-form.navbar-left
          form
            input.input.input-auto(type='text', name='keywords', size='15', placeholder='功能名称')
            input.button.bg(type='submit', name='search', value='搜索')

</template>

<script>
export default {
  name: 'UserCenterHeader'
}
</script>

<style lang="css">
</style>
