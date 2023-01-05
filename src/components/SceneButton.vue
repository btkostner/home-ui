<template>
  <button
    :class="{
      'rounded-full px-6 py-3 bg-black/20 border border-white/20 text-md': true,
      'text-red-600': error,
    }"
    :disabled="awaiting"
    @click="activate"
  >
    <template v-if="error"> Error </template>
    <template v-else>
      {{ state?.attributes.friendly_name }}
    </template>
  </button>
</template>

<style module>
.button {
  background-color: blue;
}
</style>

<script setup lang="ts">
import { inject } from "vue";
import { useScene } from "@/composables/useScene";

const props = defineProps({
  entityId: String,
});

const hass = inject("hass");

const { activate, awaiting, error, state } = useScene(
  hass.value,
  props.entityId
);

console.log(state);
</script>
