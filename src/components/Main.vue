<template>
  <h1>PokeSprite</h1>
  <Search @update-pokemon="(payload) => setPokemonData(payload)" />
  <Alert v-if="error" :message="error" />
  <Details v-if="hasData" :pokemon="pokemonData.pokemon" :sprite="pokemonData.sprite" />
</template>

<script setup lang="ts">
import Search from './Search.vue'
import Details from './Details.vue'
import Alert from './Alert.vue'
import { computed, provide, reactive, ref } from 'vue'

const error = ref('')
const setError = (payload: string) => {
  error.value = payload
}
provide('setError', setError)

const pokemonData: { pokemon?: string, sprite?: string } = reactive({})
const hasData = computed(() => pokemonData.pokemon && pokemonData.sprite)
const setPokemonData = (payload: { pokemon: string, sprite: string }) => {
  pokemonData.pokemon = payload.pokemon
  pokemonData.sprite = payload.sprite
}
</script>

<style scoped lang="scss">

</style>
