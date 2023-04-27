<script setup lang="ts">
import Camera from './views/camera.vue';
import Setting from './views/setting.vue';
import Updater from './views/updater.vue';
import { useConfigStore } from './stores/useConfigStore';

const { config } = useConfigStore();
</script>

<template>
  <Suspense>
    <div>
      <Updater />
      <div>
        <Camera v-if="config.page === 'camera'" />
        <Setting v-else />
      </div>
    </div>
  </Suspense>
</template>

<style lang="scss">
@import './assets/css/styles.scss';
</style>
