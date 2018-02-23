<template lang="pug">
.header
  .top-logo
    span CavinComment
  ul.top-menu.index-top-menu
    li
      a(href='#') 首页
    li
      a(href='#') 文档中心
    li.login_btn
      router-link(:to="{path: '/login'}") 登录
    li
      img.userName(src='#', style='display: none;')
      ul.subnav
        li
          a.myAppList(href='#') 我的产品
        li
          a.userInfo(href='#') 个人信息
        li
          a(href='javascript:void(0);', onclick='pt_logout.logout(bugly_logout)') 退出登录
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
