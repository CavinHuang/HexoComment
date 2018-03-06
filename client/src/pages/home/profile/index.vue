<template>
  <div class="em-profile">
    <em-header
      icon="edit"
      title="title"
      description="description">
    </em-header>
    <em-keyboard-short></em-keyboard-short>
    <Modal title="title" v-model="visible" width="400">
      <img :src="form.headImg" style="width: 100%" v-show="form.headImg">
    </Modal>
    <transition name="fade">
      <div class="em-container" v-show="pageAnimated">
        <div class="em-profile__content">
          <Row :gutter="20">
            <Col span="18">
              <Form label-position="top" :model="form" :rules="rules" ref="form">
                <Form-item label="nickName">
                  <i-input v-model="form.nickName"></i-input>
                </Form-item>
                <Form-item label="password">
                  <i-input type="password" v-model="form.password"></i-input>
                </Form-item>
                <Form-item label="passwordCheck" prop="passwordCheck">
                  <i-input type="password" v-model="form.passwordCheck"></i-input>
                </Form-item>
                <Form-item>
                  <Button type="primary" @click="update">update</Button>
                </Form-item>
              </Form>
            </Col>
            <Col span="6">
              <p>avatar</p>
              <img
                class="avatar"
                :src="form.headImg"
                v-show="form.headImg"
                :alt="form.nickName"
                :title="form.nickName"
                @click="visible = true">
              <Upload
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :on-success="handleSuccess"
                :headers="uploadHeaders"
                :on-format-error="handleFormatError"
                :action="uploadAPI">
                <Button type="ghost" icon="ios-cloud-upload-outline" long>upload</Button>
              </Upload>
            </Col>
          </Row>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
const api = {}

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
      form: {
        headImg: this.$store.state.user.headImg,
        nickName: this.$store.state.user.nickName,
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
        Authorization: 'Bearer ' + this.$store.state.user.token
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
          api.u.update({ data }).then((res) => {
            if (res.data.success) {
              this.$ls.set('locale', this.language)
              this.$i18n.locale = this.language
              this.$Modal.success({
                title: 'updateSuccess',
                content: 'updateSuccess',
                onOk: () => {
                  this.$router.push('/log-out')
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
