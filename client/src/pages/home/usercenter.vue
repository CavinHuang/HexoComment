<template lang="pug">
div
  u-header
  .layout
    ul.bread.bg
      li
        a.icon-home(href='#') 首页
      li
        a(href='#') 系统中心
    .admin
      .line-big
        .xm3
          .panel.border-back
            .panel-body.text-center
              img.radius-circle(:src='getUser.avatar', width='120')
              br
              |  {{getUser.nickname}}
            .panel-foot.bg-back.border-back 您好，{{getUser.nickname}}，这是您第100次登录，上次登录为2014-10-1。
          br
          .panel
            .panel-head
              strong 站点统计
            ul.list-group
              li
                span.float-right.badge.bg-red 88
                span.icon-user
                |  会员
              li
                span.float-right.badge.bg-main 828
                span.icon-file
                |  文件
              li
                span.float-right.badge.bg-main 828
                span.icon-shopping-cart
                |  订单
              li
                span.float-right.badge.bg-main 828
                span.icon-file-text
                |  内容
              li
                span.float-right.badge.bg-main 828
                span.icon-database
                |  数据库
          br
        .xm9
          .alert.alert-yellow
            span.close
            strong 注意：
            | 您有5条未读信息，
            a(href='#') 点击查看
            | 。
          .alert
            h4 拼图前端框架介绍
            p.text-gray.padding-top 拼图是优秀的响应式前端CSS框架，国内前端框架先驱及领导者，自动适应手机、平板、电脑等设备，让前端开发像游戏般快乐、简单、灵活、便捷。
            a.button.bg-dot.icon-code(target='_blank', href='pintuer4.zip')  下载示例代码
            a.button.bg-main.icon-download(target='_blank', href='http://www.pintuer.com/download/pintuer.zip')  下载拼图框架
            a.button.border-main.icon-file(target='_blank', href='http://www.pintuer.com/')  拼图使用教程
          .panel
            .panel-head
              strong 系统信息
            table.table
              tbody
                tr
                  th(colspan='2') 服务器信息
                  th(colspan='2') 系统信息
                tr
                  td(width='110', align='right') 操作系统：
                  td Windows 2008
                  td(width='90', align='right') 系统开发：
                  td
                    a(href='http://www.pintuer.com', target='_blank') 拼图前端框架
                tr
                  td(align='right') Web服务器：
                  td Apache
                  td(align='right') 主页：
                  td
                    a(href='http://www.pintuer.com', target='_blank') http://www.pintuer.com
                tr
                  td(align='right') 程序语言：
                  td PHP
                  td(align='right') 演示：
                  td
                    a(href='http://www.pintuer.com/demo/', target='_blank') demo/
                tr
                  td(align='right') 数据库：
                  td MySQL
                  td(align='right') 群交流：
                  td
                    a(href='http://shang.qq.com/wpa/qunwpa?idkey=a08e4d729d15d32cec493212f7672a6a312c7e59884a959c47ae7a846c3fadc1', target='_blank') 201916085
                    |  (点击加入)

</template>

<script>
import UHeader from '@/components/UserCenterHeader'
import {mapGetters} from 'vuex'
export default {
  methods: {
    fetchUser () {

    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  components: {
    UHeader
  }
}
</script>

<style lang="css">
@import '../../assets/css/pintuer.css';
@import '../../assets/css/admin.css';
</style>
