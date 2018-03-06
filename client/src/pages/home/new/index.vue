<template>
  <div class="em-new">
    <em-header icon="plus-round"
      title="title"
      description="description">
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
  components: { Project }
}
</script>
