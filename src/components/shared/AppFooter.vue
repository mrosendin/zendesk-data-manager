<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Data Manager</strong> by Matthew Rosendin.
        </p>
        <p>
          <a class="icon" target="blank" href="https://github.com/rosendin/data-manager" @click="track('GitHub Page')">
            <i class="fa fa-github"></i>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
  methods: {
    track (page) {
      mixpanel.track(`Link to '${page}' clicked.`)
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 5rem;
}
</style>
