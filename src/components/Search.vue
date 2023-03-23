<template>
  <div class="wrapper">
    <input class="input" type="text" ref="input" v-model="searchValue" :disabled="isLoading" @keydown.enter="search" data-cy="search-input" />
    <button class="button" :class="{loading: isLoading}" type="button" @click="search" :disabled="!searchValue.length && !isLoading" data-cy="search-button">
      <span class="text" :class="{loading: isLoading}">Search</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, ref } from 'vue';

const setError: (message: string) => void = inject('setError')!
const emit = defineEmits(['updatePokemon'])

const input = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const searchValue = ref('')
const search = async () => {
  try {
    setError('')
    isLoading.value = true
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue.value}`)
    if (response.ok && response.status === 200) {
      const data = await response.json()
      emit('updatePokemon', { pokemon: data.name, sprite: data.sprites.front_default })
    } else {
      if (response.status === 404) setError('Pokemon Not Found')
    }
  } catch (err) {
    setError('Uknown Error')
  } finally {
    searchValue.value = ''
    isLoading.value = false
    await nextTick()
    input.value?.focus()
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  height: 20px;
}

.button {
  margin-left: 20px;
  position: relative;

  &.loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
  }
}

.text {
  &.loading {
    visibility: hidden;
  }
}

@keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}
</style>