<template>
  <router-view />
</template>

<script setup>
import { computed, provide, watch } from "vue";

const props = defineProps({
  hass: Object,
  showMenu: Boolean,
  narrow: Boolean,
  panel: Object,
});

provide(
  "hass",
  computed(() => props.hass)
);
provide(
  "showMenu",
  computed(() => props.showMenu)
);
provide(
  "narrow",
  computed(() => props.narrow)
);
provide(
  "panel",
  computed(() => props.panel)
);
</script>
