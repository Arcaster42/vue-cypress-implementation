<template>
  <div class="wrapper" data-cy="alert-wrapper">
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>