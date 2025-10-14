<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { debounce } from '../utils/debounce'
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
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.91667 2.5C9.35326 2.5 10.731 3.07068 11.7468 4.0865C12.7627 5.10233 13.3333 6.48008 13.3333 7.91667C13.3333 9.25833 12.8417 10.4917 12.0333 11.4417L12.2583 11.6667H12.9167L17.0833 15.8333L15.8333 17.0833L11.6667 12.9167V12.2583L11.4417 12.0333C10.4917 12.8417 9.25833 13.3333 7.91667 13.3333C6.48008 13.3333 5.10233 12.7627 4.0865 11.7468C3.07068 10.731 2.5 9.35326 2.5 7.91667C2.5 6.48008 3.07068 5.10233 4.0865 4.0865C5.10233 3.07068 6.48008 2.5 7.91667 2.5ZM7.91667 4.16667C5.83333 4.16667 4.16667 5.83333 4.16667 7.91667C4.16667 10 5.83333 11.6667 7.91667 11.6667C10 11.6667 11.6667 10 11.6667 7.91667C11.6667 5.83333 10 4.16667 7.91667 4.16667Z"
          fill="white"
        />
      </svg>
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
