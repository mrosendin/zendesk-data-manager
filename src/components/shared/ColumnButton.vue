<template>
  <span :class="['tag', { 'is-primary': selected }]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'column-button',
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  span {
    margin: 5px 0px;
  }
  span:hover {
    cursor: pointer;
  }
</style>
