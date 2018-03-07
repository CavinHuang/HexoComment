<template lang="pug">
transition(name='fade')
  .em-container(v-show='pageAnimated')
    .em-new__content
      Form(label-position='top', :model='form', ref='formValidate')
        Form-item(label="name")
          template(slot='label')
            | name
            tooltip(content="name")
              icon(type='help-circled')
          Row
            Col(span='7')
              Form-item
                i-select(v-model='form.groupId', :disabled='isEdit')
                  option(v-for='item in groups', :value='item.value', :key='item.value') {{ item.label }}
            Col(span='1', style='text-align: center')
              | /
            Col(span='16')
              Form-item
                i-input(v-model='form.projectName', placeholder='example', ref='projectName')
        Form-item(label="url")
          template(slot='label')
            | url
            tooltip(content="url")
              icon(type='help-circled')
          i-input(v-model='projectUrl', placeholder='example')
            span(slot='prepend') /
        Form-item.em-new__form-hr(label="description")
          i-input(v-model='form.projectDesc', placeholder="description")
        Form-item(label="swagger")
          template(slot='label')
            | swagger
            span swagger
          i-select.em-new__swagger-type(v-model='swaggerType')
            option(value='URL') URL
            option(value='Upload') Upload
          i-input(v-if="swaggerType === 'URL'", v-model='form.projectSwagger', placeholder='http://example.com/swagger.json')
          upload(type='drag', :headers='uploadHeaders', :show-upload-list='false', :format="['json','yml']", :action='uploadAPI', :on-success='handleSwaggerUploadSuccess', :on-format-error='handleSwaggerUploadError', v-if="swaggerType === 'Upload'")
            div(style='padding: 20px 0')
              icon(type='ios-cloud-upload', size='52', style='color: #3399ff')
              p JSON / YML
          p.em-new__form-description
            | swagger
            router-link(to='/docs#swagger')
              icon(type='help-circled')
        Form-item.em-new__form-hr(label="member")
          template(slot='label')
            | member
            span ({{isGroup ? 'member' : 'member'}})
          i-select(v-model='form.projectMembers', multiple='', filterable='', remote='', :disabled='isGroup', placeholder="member", :remote-method='remote', :loading='remoteLoading')
            option(v-for='option in users', :value='option.value', :key='option.value') {{option.label}}
        Form-item(:class="{'em-new__form-hr': isEdit}")
          Button(type='primary', long='', @click='submit') {{isEdit ? 'update' : 'create'}}
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
      swaggerType: 'URL',
      remoteLoading: false,
      users: [],
      groups: [],
      projectUrl: '',
      confirmName: '',
      form: {
        groupId: '',
        projectId: '',
        projectName: '',
        projectUrl: '',
        projectDesc: '',
        projectSwagger: '',
        projectMembers: []
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
      this.fetchGroup().then(groups => {
        if (groups.length < 2) {
          this.form.groupId = 1
        }
      })
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
    handleSwaggerUploadSuccess (response) {
      const data = response.data
      this.form.projectSwagger = data.path
      this.swaggerType = 'URL'
      if (data.expire && data.expire !== -1) {
        this.$Message.success({
          content: 'uploadSuccess',
          duration: 5
        })
      } else {
        this.$Message.success('uploadSuccess')
      }
    },
    handleSwaggerUploadError () {
      this.$Message.error('formatError')
    },
    convertUrl (url) {
      const newUrl = '/' + url
      return newUrl === '/'
        ? '/'
        : newUrl.replace(/\/\//g, '/').replace(/\/$/, '')
    },
    fetchGroup () {
      return api.group.getList().then((res) => {
        if (res.data.success) {
          this.groups = [{ value: 1, label: this.user.nickName }].concat(
            res.data.data.map(o => ({
              value: o._id,
              label: o.name
            }))
          )
        }
        return this.groups
      })
    },
    submit () {
      const data = {
        id: this.form.projectId,
        name: this.form.projectName,
        group: this.form.groupId,
        swagger_url: this.form.projectSwagger,
        description: this.form.projectDesc,
        url: this.convertUrl(this.projectUrl),
        members: this.isGroup ? [] : this.form.projectMembers
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
        if (this.form.groupId === '') {
          this.$Message.error({
            content: 'groupIsNull',
            duration: 5
          })
          return
        }

        if (data.group === 1) {
          data.group = ''
        }

        api.project.create({
          data: data
        }).then((res) => {
          if (res.data.success) {
            this.$Message.success('create')
            if (data.group) {
              const group = this.groups.filter(item => item.value === data.group)[0]
              this.$router.push(`/group/${group.value}?name=${group.label}`)
            } else {
              this.$router.push('/')
            }
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
