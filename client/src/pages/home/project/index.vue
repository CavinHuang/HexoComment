<template>
  <div class="em-project">
    <em-placeholder :show="projects.length === 0">
      <Icon :type="keywords ? 'outlet' : 'happy-outline'"></Icon>
      <p>{{keywords ? '还没有添加网站，快去添加吧！' : page.placeholder}}</p>
    </em-placeholder>
    <em-keyboard-short></em-keyboard-short>
    <em-header
      :icon="page.icon"
      :title="page.title"
      :description="page.description">
      <Radio-group
        v-model="filterByAuthor"
        type="button"
        @on-change="handleFilter">
        <Radio label="我的网站"></Radio>
        <!-- <Radio label="filter1"></Radio> -->
        <!-- <Radio label="filter2"></Radio> -->
      </Radio-group>
    </em-header>
    <Modal v-model="removeModal.show" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>title</span>
      </p>
      <div>
        <p>description <strong style="word-break:break-all;">
          {{(removeModal.project.user && removeModal.project.user.nick_name) || (removeModal.project.group && removeModal.project.group.name) }} / {{removeModal.project.name}}</strong>
        </p>
        <p>description</p>
        <i-input style="margin-top: 10px;" v-model="removeModal.inputModel"
          placeholder="placeholder"></i-input>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long
          :disabled="removeModal.project.name !== removeModal.inputModel"
          @click="remove">button</Button>
      </div>
    </Modal>
    <transition name="fade">
      <div class="em-container em-project__list" v-show="pageAnimated">
        <div class="ivu-row">
          <transition-group name="list-complete">
            <div
              class="ivu-col ivu-col-span-6 list-complete-item"
              v-for="(item, index) in projectList"
              :key="index">
              <!-- 检查 user.id 防止闪烁 -->
              <div class="em-project__item"
                @click="go(item)"
                :class="{
                  'is-join': page.type === 2,
                  'is-group': page.type === 1
                }">
                <div class="project-collect">
                  <!-- <transition name="zoom" mode="out-in">
                    <Icon :type="item.extend.is_workbench ? 'android-star' : 'android-star-outline'"
                          :key="item.extend.is_workbench"
                          @click.native.stop="handleWorkbench(item.extend)"></Icon>
                  </transition> -->
                </div>
                <h2>{{item.title}}</h2>
                <div class="project-description">{{item.description}}</div>
                <div class="project-url">{{item.siteUrl}}</div>
                <div class="project-member" v-if="page.type === 0">{{item.websiteTypeData[0].name}}</div>
                <Button-group class="project-control">
                  <Button type="ghost" icon="link" title="control0" class="copy-url" @click="clip(item)"></Button>
                  <Button type="ghost" icon="ios-copy" title="更新项目" style="width: 34%;" @click.stop="clone(item)"></Button>
                  <Button type="ghost" icon="trash-b" title="删除项目" @click.stop="removeConfirm(item)"></Button>
                </Button-group>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
    <em-loading @loading="loading" ref="loading" v-if="page.type !== 2"></em-loading>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import Clipboard from 'clipboard'
import debounce from 'lodash/debounce'

export default {
  name: 'project',
  data () {
    return {
      filterByAuthor: 'filter0',
      cliped: false,
      projectList: [],
      removeModal: {
        show: false,
        project: {},
        inputModel: ''
      }
    }
  },
  asyncData ({ store, route }) {
    store.commit('project/INIT_REQUEST')
    store.dispatch('project/INIT_PAGE', route)
    return store.dispatch('project/FETCH')
  },
  mounted () {
    this.$on('query', debounce((keywords) => {
      this.$store.dispatch('project/QUERY', keywords)
    }, 500))
    this.fetchProject()
  },
  computed: {
    page () {
      const route = this.$route
      switch (route.path) {
        case '/workbench':
          return {
            title: 'title',
            description: 'description',
            placeholder: 'placeholder',
            icon: 'code-working',
            type: 2 // 0.个人项目 1.团队项目 2.工作台
          }
        case '/usercenter':
          return {
            title: '我的网站',
            description: '这里将展示你的网站项目',
            placeholder: 'placeholder',
            icon: 'person',
            type: 0
          }
        default:
          return {
            title: 'title',
            description: 'description',
            placeholder: 'placeholder',
            icon: 'person-stalker',
            type: 1
          }
      }
    },
    projects () {
      return [{
        extend: {is_workbench: false},
        description: 1,
        name: 1,
        url: 1,
        id: 1,
        user: {
          head_img: 'https://avatars1.githubusercontent.com/u/24950299?s=460&v=4'
        }
      }]
    },
    user () {
      return this.$store.state.user
    },
    keywords () {
      return 'keywords'
    }
  },
  watch: {
    '$route': function () {
      this.filterByAuthor = 'filter'
      this.$store.commit('project/INIT_REQUEST')
      this.$store.dispatch('project/INIT_PAGE', this.$route)
      this.$store.dispatch('project/FETCH')
    }
  },
  methods: {
    async fetchProject () {
      let project = await this.$fetch('/api/website')

      this.projectList = project.data
    },
    go (project) {
      if (!this.cliped) {
        this.$router.push(`/project/${project._id}`)
      }
    },
    clip (project) {
      const clipboard = new Clipboard('.copy-url', {
        text () {
          return location.origin + '/mock/' + project._id + project.url
        }
      })
      this.cliped = true
      clipboard.on('success', (e) => {
        e.clearSelection()
        clipboard.destroy()
        this.cliped = false
        this.$Message.success('copySuccess')
      })
    },
    handleFilter (value) {
      let filterByAuthor = 0
      if (value === 'filter') {
        filterByAuthor = 1
      } else if (value === 'filter') {
        filterByAuthor = 2
      }
      this.$store.commit('project/INIT_REQUEST')
      this.$store.commit('project/SET_REQUEST_PARAMS', { filterByAuthor })
      this.$store.dispatch('project/FETCH')
    },
    handleWorkbench (projectExtend) {
      this.$store.dispatch('project/WORKBENCH', projectExtend)
    },
    removeConfirm (project) {
      this.removeModal.show = true
      this.removeModal.project = project
      this.removeModal.inputModel = ''
    },
    remove () {
      const projectId = this.removeModal.project._id
      this.$store.dispatch('project/REMOVE', projectId).then(() => {
        this.removeModal.show = false
        this.$Message.success('deleteSuccess')
        this.$store.commit('project/SET_REQUEST_PARAMS', { pageIndex: 1 })
        this.$store.dispatch('project/FETCH')
      })
    },
    clone (project) {
      this.$router.push({
        path: '/new',
        query: {
          project: project.id
        }
      })
    },
    loading () {
      this.$store.dispatch('project/FETCH').then((data) => {
        this.$refs.loading.stop()
        if (data && data.length === 0) {
          this.$refs.loading.destroy()
        }
      })
    }
  }
}
</script>
