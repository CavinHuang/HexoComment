<template lang="pug">
  .em-profile
    em-header(icon='edit', title='title', description='description')
    em-keyboard-short
    modal(title='title', v-model='visible', width='400')
      img(:src='form.avatar', style='width: 100%', v-show='form.avatar')
    transition(name='fade')
      .em-container(v-show='pageAnimated')
        .em-profile__content
          row(:gutter='20')
            Col(span='18')
              Form(label-position='top', :model='form', :rules='rules', ref='form')
                Form-item(label='昵称')
                  i-input(v-model='form.nickName')
                Form-item(label='密码')
                  i-input(type='password', v-model='form.password')
                Form-item(label='确认密码', prop='passwordCheck')
                  i-input(type='password', v-model='form.passwordCheck')
                Form-item
                  Button(type='primary', @click='update') 立即更新
            Col(span='6')
              p 头像
              img.avatar(:src='form.avatar', v-show='form.avatar', :alt='form.nickName', :title='form.nickName', @click='visible = true')
              upload(:show-upload-list='false', :format="['jpg','jpeg','png']", :on-success='handleSuccess', :headers='uploadHeaders', :on-format-error='handleFormatError', :action='uploadAPI')
                Button(type='ghost', icon='ios-cloud-upload-outline', long='') 立即提交
</template>

<style>
@import './index.css';
</style>

<script>
export default {
  name: 'profile',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('validateError'))
      } else {
        callback()
      }
    }

    return {
      visible: false,
      uploadAPI: '/api/upload',
      userId: this.$store.state.auth.user.id,
      form: {
        avatar: this.$store.state.auth.user.avatar,
        nickName: this.$store.state.auth.user.nickname,
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
  computed: {
    uploadHeaders () {
      return {
        Authorization: 'Bearer '
      }
    }
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'formatError',
        desc: 'formatError'
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
          this.$put('/api/user/' + this.userId, this.form).then((res) => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>
