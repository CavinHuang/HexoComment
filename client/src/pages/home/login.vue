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
          a(href='javascript:;', :class="{active: isCurrent == 'login' ? true : false}" @click="change('login', 0)") 登录
          a(href='javascript:;', :class="{active: isCurrent == 'register' ? true : false}" @click="change('register', '50%')") 注册
          .slide-bar(:style="{left: lineLeft}")
      .login.form
        .group(v-if="isCurrent == 'login'")
          .group-ipt.email
            input#email.ipt(type='text', v-model="loginData.username", name='email', placeholder='邮箱地址/电话号码', required='')
          .group-ipt.password
            input#password.ipt(type='password', v-model="loginData.password", name='password', placeholder='输入您的登录密码', required='')
          //- .group-ipt.verify
          //-   input#verify.ipt(type='text', name='verify', placeholder='输入验证码', required='')
          //-   img.imgcode(src='http://zrong.me/home/index/imgcode?id=')
        .group(v-if="isCurrent == 'register'")
          .group-ipt.email
            input#email.ipt(type='text', v-model="registerData.email", name='email', placeholder='邮箱地址', required='')
          .group-ipt.email
            input#phone.ipt(type='text', v-model="registerData.phone", name='phone', placeholder='电话号码', required='')
          .group-ipt.password
            input#reg_password.ipt(type='password', v-model="registerData.password", name='password', placeholder='输入您的登录密码', required='')
          .group-ipt.password
            input#reg_password_confirm.ipt(type='password', v-model="registerData.password_confirm", name='password_confirm', placeholder='请确认您的登录密码', required='')
          //- .group-ipt.verify
          //-   input#verify.ipt(type='text', name='verify', placeholder='输入验证码', required='')
          //-   img.imgcode(src='http://zrong.me/home/index/imgcode?id=')
      .button
        button#button.login-btn.register-btn(type='submit', @click="submit()") 登录
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
import {Message} from 'element-ui'
export default {
  data () {
    return {
      isCurrent: 'login',
      lineLeft: 0,
      loginData: {
        username: '',
        password: ''
      },
      registerData: {
        email: '',
        phone: '',
        password: '',
        password_confirm: ''
      }
    }
  },
  methods: {
    change (current, lineLeft) {
      this.isCurrent = current
      this.lineLeft = lineLeft
    },
    submit () {
      if (this.isCurrent === 'login') {
        // console.log(111111111)
        if (this.loginData.username === '') {
          Message({
            showClose: true,
            message: '用户名不能为空！',
            type: 'error'
          })
          return false
        } else if (this.loginData.password === '') {
          Message({
            showClose: true,
            message: '密码不能为空！',
            type: 'error'
          })
          return false
        } else {
          this.$post('/api/login', this.loginData).then(res => {
            console.log(res)
            if (res.code === 2000) {
              let userInfo = res.data.user
              userInfo['lifeTime'] = res.data.lifeTime
              localStorage.setItem('loginUserBaseInfo', JSON.stringify(userInfo))
              this.$store.dispatch('setUserInfo', userInfo)
              setTimeout(() => {
                this.$router.push({
                  path: '/usercenter',
                  query: {
                    id: userInfo.id
                  }
                })
              }, 1000)
            }
          }).catch(e => {
            console.log(e)
          })
        }
      } else {
        // 注册
        if (this.registerData.username === '') {
          Message({
            showClose: true,
            message: '用户名不能为空！',
            type: 'error'
          })
          return false
        } else if (this.registerData.password === '') {
          Message({
            showClose: true,
            message: '密码不能为空！',
            type: 'error'
          })
          return false
        } else if (this.registerData.email === '') {
          Message({
            showClose: true,
            message: '邮箱不能为空！',
            type: 'error'
          })
          return false
        } else if (this.registerData.password !== this.registerData.password_confirm) {
          Message({
            showClose: true,
            message: '两次密码不一致！',
            type: 'error'
          })
          return false
        } else {
          this.$post('/api/register', this.registerData).then(res => {
            if (res.code === 2000) {
              Message({
                showClose: true,
                message: '注册成功!',
                type: 'success'
              })
            }
          }).catch(e => {
            console.log(e)
          })
        }
      }
    }
  },
  mounted () {
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
