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
        Form-item(label="confirm", v-if='isEdit')
          i-input(v-model='confirmName', placeholder="confirm")
          p.em-new__form-description
            | confirm
            strong(style='word-break:break-all;')
              | {{(projectData.user && projectData.user.nick_name) || (projectData.group && projectData.group.name) }} / {{projectData.name}}
        Form-item(v-if='isEdit')
          Button(type='error', long='', @click='remove', :disabled='confirmName !== projectData.name') delete
</template>

<style>
@import './index.css';
</style>

<script>
const api = {
  u: {getList: {}},
  group: {getList: () => {
    return new Promise(() => {})
  }}
}

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
      }
    }
  },
  props: {
    projectData: null
  },
  mounted () {
    const proj = this.projectData
    this.$nextTick(() => {
      this.$refs.projectName.focus()
    })
    if (proj) {
      this.remoteLoading = true // 回填文案显示异常，应该是 iview 的 bug
      this.users = proj.members.map(member => ({
        value: member._id,
        label: member.nick_name
      }))
      this.form.projectId = proj._id
      this.form.projectName = proj.name
      this.form.projectDesc = proj.description
      this.form.projectSwagger = proj.swagger_url
      this.projectUrl = proj.url.slice(1) // remove /
      this.$nextTick(() => {
        this.remoteLoading = false
        this.form.projectMembers = this.users.map(u => u.value)
      })
      if (proj.group) {
        this.groups = [{ value: proj.group._id, label: proj.group.name }]
        this.form.groupId = proj.group._id
      } else {
        this.groups = [{ value: proj.user._id, label: proj.user.nick_name }]
        this.form.groupId = proj.user._id
      }
    } else {
      this.fetchWebsiteType()
    }
  },
  computed: {
    user () {
      return this.$store.state.user
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
      const newUrl = '/' + url
      return newUrl === '/'
        ? '/'
        : newUrl.replace(/\/\//g, '/').replace(/\/$/, '')
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
        api.project.update({ data }).then((res) => {
          if (res.data.success) {
            this.$Message.success('update')
            this.$store.commit('mock/SET_REQUEST_PARAMS', {pageIndex: 1})
            this.$store.dispatch('mock/FETCH', this.$route)
          }
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
    },
    remote (query) {
      if (query) {
        this.remoteLoading = true
        api.u.getList({
          params: {
            keywords: query
          }
        }).then((res) => {
          this.remoteLoading = false
          if (res.data.success) {
            const list = res.data.data.map(item => {
              return {
                value: item._id,
                label: item.nick_name,
                userName: item.name
              }
            })
            this.users = list.filter(item => {
              const nickName = item.label.toLowerCase()
              const userName = item.userName.toLowerCase()
              const q = query.toLowerCase()
              return nickName.indexOf(q) > -1 || userName.indexOf(q) > -1
            })
          }
        })
      } else {
        this.users = []
      }
    },
    remove () {
      const projectId = this.projectData._id
      this.$store.dispatch('project/REMOVE', projectId).then(() => {
        this.$Message.success('delete')
        this.$router.push('/')
      })
    }
  }
}
</script>
