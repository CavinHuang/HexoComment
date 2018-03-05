<template lang="pug">
.em-profile
  em-header(icon='edit', title="title", description="description")
  em-keyboard-short
  modal(title="title", v-model='visible', width='400')
    img(:src='form.headImg', style='width: 100%', v-show='form.headImg')
  transition(name='fade')
    .em-container(v-show='pageAnimated')
      .em-profile__content
        row(:gutter='20')
          col(span='18')
          form(label-position='top', :model='form', :rules='rules', ref='form')
            form-item(label="昵称")
              i-input(v-model='form.nickName')
            form-item(label="密码")
              i-input(type='password', v-model='form.password')
            form-item(label="确认密码')", prop='passwordCheck')
              i-input(type='password', v-model='form.passwordCheck')
            form-item
              button(type='primary', @click='update') form.update
          col(span='6')
          p form.avatar
          img.avatar(:src='form.headImg', v-show='form.headImg', :alt='form.nickName', :title='form.nickName', @click='visible = true')
          upload(:show-upload-list='false', :format="['jpg','jpeg','png']", :on-success='handleSuccess', :headers='uploadHeaders', :on-format-error='handleFormatError', :action='uploadAPI')
            button(type='ghost', icon='ios-cloud-upload-outline', long='') form.upload

</template>

<script>
import UHeader from '@/components/UserCenterHeader'
import {mapGetters} from 'vuex'
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error(this.$t('p.profile.validateError')))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      uploadAPI: '/api/upload',
      form: {
        headImg: 'https://avatars1.githubusercontent.com/u/24950299?s=460&v=4',
        nickName: 'cavinhuang',
        password: '',
        passwordCheck: ''
      },
      rules: {
        passwordCheck: [
          { trigger: 'blur', validator: validatePassCheck }
        ]
      }
    }
  },
  methods: {
    fetchUser () { },
    handleFormatError (file) {
      this.$Notice.warning({
        title: this.$tc('p.profile.formatError', 1),
        desc: this.$tc('p.profile.formatError', 2, { name: file.name })
      })
    },
    handleSuccess (response, file, fileList) {
      this.form.headImg = response.data.path
    },
    update () {
      const data = {
        nick_name: this.form.nickName,
        head_img: this.form.headImg
      }

      if (this.form.password) {
        data.password = this.form.password
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          api.u.update({ data }).then((res) => {
            if (res.data.success) {
              this.$ls.set('locale', this.language)
              this.$i18n.locale = this.language
              this.$Modal.success({
                title: this.$tc('p.profile.updateSuccess', 1),
                content: this.$tc('p.profile.updateSuccess', 2),
                onOk: () => {
                  this.$router.push('/log-out')
                }
              })
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    uploadHeaders () {
      return {
        Authorization: 'Bearer '
      }
    }
  },
  components: {
    UHeader
  }
}
</script>

<style lang="css">
@import '../../assets/css/usercenter.css';
</style>
