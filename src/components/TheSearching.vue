<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from '../utils/debounce'
import SearchIcon from './icons/SearchIcon.vue'

const props = defineProps<{
  modelValue: string
  placeholder: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const inputValue = ref(props.modelValue)

const searchInfo = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('update:modelValue', target.value)
}

const debouncedDoSomething = debounce(searchInfo, 500)
</script>
<template>
  <div class="searching">
    <input
      type="text"
      :value="inputValue"
      :placeholder="placeholder"
      @input="debouncedDoSomething"
    />
    <button @click="searchInfo">
      <SearchIcon />
      <span class="tooltip"> Искать </span>
    </button>
  </div>
</template>
<style scoped>
.searching {
  width: 274px;
  height: 40px;
  display: flex;
  border-radius: 10px;
  border: 1px solid var(--background-color-light);
  padding: 2px;
  align-items: center;
}

.searching input {
  width: -webkit-fill-available;
  border-radius: 10px 0px 0px 10px;
  border: none;
  outline: none;
  margin-left: 8px;
  font-size: 15px;
  font-weight: 400;
  color: var(--dark-blue);
}

.searching button {
  height: 40px;
  width: 40px;
  background: var(--dark-blue);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}

.searching button:hover {
  background: #172158;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--background-color);
  color: var(--violet);
  text-align: center;
  border-radius: 3px;
  padding: 5px;
  z-index: 1;
  width: max-content;
  margin-bottom: 4px;
}
</style>
