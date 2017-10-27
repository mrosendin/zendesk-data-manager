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
    <h2>v1.0.2</h2>
    <ul>
      <li>Added an info tooltip for the "Field Value" field</li>
      <li>Added "Ticket Form Id" column with name sideloading</li>
      <li>Added "Requester Email" column (enabled with sideloading setting)</li>
      <li>Fix a bug that prevented collaborator names from appearing</li>
      <li>Fix a bug that prevents page navigation after performing a search on Tickets, Users, Organizations, and Groups</li>
      <li>Fixed a grammatical error in the documentation</li>
      <li>Updated contact details</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'release-notes'
}
</script>
