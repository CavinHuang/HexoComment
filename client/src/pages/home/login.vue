<template lang="pug">
.main#box
  section
    home-header
  .cent-box
    .cent-box-header
      //h2.sub-title 生活热爱分享 - Thousands Find
    .cont-main.clearfix
      .index-tab
        .index-slide-nav
          a.active(href='login.html') 登录
          a(href='register.html') 注册
          .slide-bar
      .login.form
        .group
          .group-ipt.email
            input#email.ipt(type='text', name='email', placeholder='邮箱地址', required='')
          .group-ipt.password
            input#password.ipt(type='password', name='password', placeholder='输入您的登录密码', required='')
          .group-ipt.verify
            input#verify.ipt(type='text', name='verify', placeholder='输入验证码', required='')
            img.imgcode(src='http://zrong.me/home/index/imgcode?id=')
      .button
        button#button.login-btn.register-btn(type='submit') 登录
      .remember.clearfix
        label.remember-me
          span.icon
            span.zt
          input#remember-me.remember-mecheck(type='checkbox', name='remember-me', checked='')
          | 记住我
        label.forgot-password
          a(href='#') 忘记密码？

</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import '@/assets/css/register-login.css'

export default {
  mounted () {
    console.log(window.particlesJS)
    window.particlesJS('box',
      {
        'particles': {
          'number': {
            'value': 20,
            'density': {
              'enable': true,
              'value_area': 800
            }
          },
          'color': {
            'value': '#e5e5e5'
          },
          'shape': {
            'type': 'circle',
            'stroke': {
              'width': 0,
              'color': '#000'
            },
            'polygon': {
              'nb_sides': 5
            },
            'image': {
              'src': 'img/github.svg',
              'width': 100,
              'height': 100
            }
          },
          'opacity': {
            'value': 0.5,
            'random': false,
            'anim': {
              'enable': false,
              'speed': 1,
              'opacity_min': 0.1,
              'sync': false
            }
          },
          'size': {
            'value': 15,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 5,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': true,
            'distance': 150,
            'color': '#ddd',
            'opacity': 0.4,
            'width': 1
          },
          'move': {
            'enable': true,
            'speed': 2,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'interactivity': {
          'detect_on': 'canvas',
          'events': {
            'onhover': {
              'enable': false,
              'mode': 'repulse'
            },
            'onclick': {
              'enable': true,
              'mode': 'push'
            },
            'resize': true
          },
          'modes': {
            'grab': {
              'distance': 400,
              'line_linked': {
                'opacity': 1
              }
            },
            'bubble': {
              'distance': 400,
              'size': 40,
              'duration': 2,
              'opacity': 8,
              'speed': 3
            },
            'repulse': {
              'distance': 200
            },
            'push': {
              'particles_nb': 4
            },
            'remove': {
              'particles_nb': 2
            }
          }
        },
        'retina_detect': true,
        'config_demo': {
          'hide_card': false,
          'background_color': '#b61924',
          'background_image': '',
          'background_position': '50% 50%',
          'background_repeat': 'no-repeat',
          'background_size': 'cover'
        }
      }
    )
  },
  components: {
    HomeHeader
  }
}
</script>

<style lang='css' scoped>
</style>
