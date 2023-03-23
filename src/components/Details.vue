<template>
  <div v-if="pokemon && sprite" class="wrapper">
    <span class="name">{{ pokemon }}</span>
    <div class="sprite-wrapper">
      <img class="sprite original" :src="sprite" data-cy="sprite-small" />
      <img class="sprite" :src="sprite" data-cy="sprite-large" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  pokemon: {
    type: String,
    required: false
  },
  sprite: {
    type: String,
    required: false
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}

.name {
  text-transform: capitalize;
}

.sprite-wrapper {
  display: flex;
  align-items: center;
}

.sprite {
  height: 288px;
  width: 288px;

  &.original {
    height: 96px;
    width: 96px;
  }
}
</style>