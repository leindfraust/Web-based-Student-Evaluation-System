<script setup lang="ts">
import LoginControl from '@/components/LoginControl.vue';

</script>
<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <LoginControl/>
    </div>
  </section>
</template>
<style scoped>
.hero {
  background: url('../assets/background/whole-background.svg') no-repeat center;
  background-size: cover;
  height: 100vh;
}
</style>
