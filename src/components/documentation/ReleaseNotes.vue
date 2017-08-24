<template>
  <div class="content">
    <h1 id="release-notes">Release Notes</h1>
    <p>The changelog for app updates are noted below.</p>
    <h2>v1.0.1</h2>
    <ul>
      <li>Fix a bug that prevented large file downloads</li>
      <li>Fix a bug that prevented JSON and XML file downloads</li>
      <li>Fix a bug that failed to remove <strong>Status</strong>, <strong>Priority</strong>, <strong>Date</strong>, <strong>Type</strong>, and <strong>Role</strong> field values from advanced search query when deselected.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'release-notes'
}
</script>
