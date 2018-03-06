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
.header {
  height: 40px;
  position: relative;
  z-index: 6;
}

.header:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.header .top-logo {
  width: 93px;
  height: 40px;
  float: left;
  margin-left: 40px;
  background-repeat: no-repeat;
}

.header .top-menu {
  float: right;
  padding-top: 0px;
  padding-right: 40px;
  font-size: 0;
  min-width: 460px;
}

.header .top-menu li {
  display: inline-block;
  margin-left: 30px;
  line-height: 40px;
  padding-bottom: 10px;
  position: relative;
  vertical-align: top;
}

.header .top-menu li img {
  width: 32px;
  height: 32px;
}

.header .top-menu li a {
  display: block;
  height: 40px;
}

.header .top-menu li:hover .subnav {
  pointer-events: all;
  filter: alpha(opacity=100);
  /* IE */
  -moz-opacity: 1;
  /* 老版Mozilla */
  -khtml-opacity: 1;
  /* 老版Safari */
  opacity: 1;
  z-index: 2;
}

.header .top-menu li a {
  font-size: 15px;
  color: #4c4c4c;
  text-align: center;
}

.header .top-menu li .subnav {
  transition: 0.3s all;
  opacity: 0;
  z-index: -2;
  pointer-events: none;
  -webkit-pointer-events: none;
  -moz-pointer-events: none;
  -ms-pointer-events: none;
  filter: alpha(opacity=0);
  /* IE */
  -moz-opacity: 0;
  /* 老版Mozilla */
  -khtml-opacity: 0;
  /* 老版Safari */
  opacity: 0;
  position: absolute;
  margin-left: -48px;
  left: 50%;
  top: 44px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  width: 96px;
}

.header .top-menu li .subnav:before {
  content: "";
  display: block;
  width: 10px;
  height: 7px;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  top: -7px;
  background-repeat: no-repeat;
}

.header .top-menu li .subnav li {
  display: block;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  overflow: hidden;
  margin-left: 0;
  padding-bottom: 0;
  padding-left: 0;
  text-align: center;
  width: 100%;
}

.header .top-menu li .subnav li a {
  color: #4C4C4C;
  height: 40px;
}

.header .top-menu li .subnav li a:hover {
  background-color: #F8FCFF;
}

.sub-header .top-logo {
  background-repeat: no-repeat;
}

.sub-header .top-menu li a {
  color: #fff;
}

.link-header {
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.link-header .top-logo {
  margin-top: 30px;
}

.link-header .top-menu.index-top-menu {
  padding-top: 26px;
}

.link-header:after {
  content: "";
  clear: both;
  height: 0;
  overflow: hidden;
}
</style>
