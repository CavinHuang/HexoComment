<template lang="pug">
transition(name='fade')
  .em-container(v-show='pageAnimated')
    .em-new__content
      Form(label-position='top', :model='form', ref='formValidate')
        Form-item(label="name")
          template(slot='label')
            | 网站名称
            tooltip(content="填写你的网站名称")
              icon(type='help-circled')
          i-input(v-model='form.title', placeholder='example', ref='projectName')
        Form-item
          template(slot='label')
            | 选择网站类型
            tooltip(content="请选择你的网站类型")
            icon(type='help-circled')
          i-select(v-model='form.websiteType', :disabled='isEdit')
            Option(v-for='item in websiteTypes', :value='item.id', :key='item.id') {{ item.name }}
        Form-item(label="url")
          template(slot='label')
            | 网站地址
            tooltip(content="请填写你网站地址")
              icon(type='help-circled')
          i-input(v-model='form.siteUrl', placeholder='http://zukmb.cn')
        Form-item.em-new__form-hr(label="网站描述")
          i-input(type="textarea", v-model='form.description', placeholder="网站描述")
        Form-item(:class="{'em-new__form-hr': isEdit}")
          Button(type='primary', long='', @click='submit') {{isEdit ? '更新网站信息' : '创建新的项目'}}
</template>

<style>
@import './index.css';
</style>

<script>

export default {
  name: 'newProject',
  data () {
    return {
      uploadAPI: '/api/upload',
      remoteLoading: false,
      users: [],
      websiteTypes: [],
      projectUrl: '',
      confirmName: '',
      form: {
        title: '',
        siteUrl: '',
        description: '',
        userId: '',
        websiteType: ''
      },
      projectData: null,
      projectId: null
    }
  },
  async created () {
    this.fetchWebsiteType()
    this.projectId = this.$route.query.project
    if (this.projectId) {
      this.projectData = await this.fetchWebsite()
    }

    const proj = this.projectData
    this.$nextTick(() => {
      this.$refs.projectName.focus()
    })
    if (this.projectId) {
      this.remoteLoading = true // 回填文案显示异常，应该是 iview 的 bug
      this.form.title = proj.title
      this.form.description = proj.description
      this.form.id = proj.id
      this.form.siteUrl = proj.siteUrl
      this.form.websiteType = proj.websiteType
      this.$nextTick(() => {
        this.remoteLoading = false
      })
    }
  },
  mounted () { },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    isEdit () {
      return !!this.projectData
    },
    isGroup () {
      if (this.projectData) {
        return !!this.projectData.group
      } else {
        return this.form.groupId !== 1
      }
    },
    uploadHeaders () {
      return {
        Authorization: 'Bearer ' + this.user.token
      }
    }
  },
  methods: {
    convertUrl (url) {
      const newUrl = url
      return newUrl === '/'
        ? '/'
        : newUrl.replace(/\/\//g, '/').replace(/\/$/, '')
    },
    async fetchWebsite () {
      let res = await this.$fetch('/api/website/' + this.projectId)
      return res.data
    },
    async fetchWebsiteType () {
      let websiteTypes = await this.$fetch('/api/website_type')

      this.websiteTypes = websiteTypes.data
    },
    submit () {
      const data = {
        title: this.form.title,
        siteUrl: this.convertUrl(this.form.siteUrl),
        description: this.form.description,
        websiteType: this.form.websiteType,
        userId: this.$store.state.auth.user.id
      }

      if (this.isEdit) {
        this.$put('/api/website/' + this.form.id, data).then(res => {
          console.log(res)
        })
      } else {
        if (this.form.websiteType === '') {
          this.$Message.error({
            content: '没有网站类型',
            duration: 5
          })
          return
        }
        this.$post('/api/website', data).then(res => {
          if (res.code === 2000) {
            setTimeout(() => {
              this.$router.push({
                path: '/usercenter'
              })
            }, 500)
          }
        })
      }
    }
  }
}
</script>
