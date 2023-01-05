<template>
  <main>
    <OverviewHeader />

    <div>
      <h1 class="text-4xl">Overview Page!!!</h1>

      <router-link to="/entity">Go Entities</router-link>
    </div>
  </main>
</template>

<script setup>
import OverviewHeader from "@/components/OverviewHeader.vue";
</script>
