<template>
  <div id="heading">
    <div class="content has-text-centered">
      <slot name="header" class="header"></slot>
      <slot name="subtitle"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heading'
}
</script>

<style scoped></style>
