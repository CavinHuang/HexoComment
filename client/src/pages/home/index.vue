<template lang="pug">
.main
  home-header
  .content
    .middle-center
      .index-banner-bg
        img(src='@/assets/img/laptop-eb3db20721.jpg', alt='')
        h1.title CavinComment 静态网站评论、点赞、阅读量统计系统
        h3.subtitle 专门为Hexo等静态网站提供评论+点赞+阅读量统计的系统
      .wrap-info
        h3.tip-title 省心称心的静态网站管理
        p.txt-info CavinComment旨在为静态网站文章提供省心称心的评论、点赞、阅读量统计等功能，方便用户详细了解文章的详细情况。
        a.btn.btn-big.btn-blue(href='#') 立即接入
  // footer
  // footer
  .mod-footer
    .copyRight_box
      p Copyright © 2018. All Rights Reserved.

</template>

<script>
import '@/assets/css/index02.css'
import {addClass} from '@/assets/js/utils.js'
import HomeHeader from '@/components/HomeHeader'
export default {
  mounted () {
    setTimeout(function () {
      let ele = document.querySelectorAll('.wrap-info')
      console.log(ele)
      addClass(ele[0], 'show')
    }, 500)
  },
  components: {
    HomeHeader
  }
}
</script>

<style>

</style>
