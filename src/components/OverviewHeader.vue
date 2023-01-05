<template>
  <section class="p-4 lg:p-12">
    <h1 class="text-2xl lg:text-4xl">Hello {{ hass.user.name }}</h1>

    <h2 class="mt-2 text-lg lg:text-xl">
      Current Temperature is {{ weather?.attributes.temperature
      }}{{ weather?.attributes.temperature_unit }} and {{ weatherState }}.
    </h2>

    <ul class="mt-4 lg:mt-8 -ml-4 overflow-x-auto flex gap-6">
      <li v-for="id in scenes" :key="id">
        <SceneButton :entity-id="id" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

import SceneButton from "./SceneButton.vue";

const hass = inject("hass");

const scenes = computed(() =>
  Object.keys(hass.value.states).filter((key) => key.startsWith("scene."))
);

const weather = computed(() => hass.value.states["weather.valentia"]);
const weatherState = computed(() => {
  switch (weather.value?.state) {
    case "clear-night":
      return "clear";
    case "fog":
      return "foggy";
    case "hail":
      return "hailing";
    case "lightning-rainy":
      return "lightning and raining";
    case "partlycloudy":
      return "partly cloudy";
    case "snowy-rainy":
      return "snowy raining";
    case "windy-variant":
      return "windy";
    default:
      return weather.value?.state;
  }
});
</script>
