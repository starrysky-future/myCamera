<script lang="ts" setup>
import { onMounted } from 'vue';
import { useConfigStore } from '@renderer/stores/useConfigStore.js';
import Footer from '@renderer/components/footer.vue';

const { config } = useConfigStore();

const constraints = {
  video: {
    deviceId: config.deviceId
  },
  audio: false
};

onMounted(() => {
  const video = document.querySelector('video')!;
  config.videoElement = video;
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
  });
});
</script>

<template>
  <div
    class="camera"
    :class="{ rounded: config.rounded }"
    :style="`border:solid ${config.borderWidth} ${config.borderColor}`"
  >
    <div class="camera_loading">摄像头加载中...</div>
    <video class="camera_video" autoplay :class="{ rounded: config.rounded }"></video>

    <!-- 菜单 -->
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.camera {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #33433b;
  overflow: hidden;
  .camera_loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: #149cf0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .camera_video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 10;
  }
}
.rounded {
  border-radius: 9999px;
}
</style>
