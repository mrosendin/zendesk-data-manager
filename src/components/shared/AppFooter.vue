<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Data Manager</strong> by <a target="blank" href="https://roseware.io" @click="track('Roseware')">Roseware</a>.
        </p>
        <p>
          <a class="icon" target="blank" href="https://github.com/roseware" @click="track('GitHub Page')">
            <i class="fa fa-github"></i>
          </a>
          <a class="icon" target="blank" href="https://facebook.com/roseware.io" @click="track('Facebook Page')">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="icon" target="blank" href="https://linkedin.com/company/roseware-io" @click="track('LinkedIn Page')">
            <i class="fa fa-linkedin"></i>
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
