<template>
  <div class="em-new">
    <em-header icon="plus-round"
      title="添加网站"
      description="为自己网站添加一个CavinCommnet">
    </em-header>
    <em-keyboard-short></em-keyboard-short>
    <project></project>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import Project from './project'

export default {
  name: 'new',
  data () {
    return {
      projectId: null
    }
  },
  components: { Project }
}
</script>
