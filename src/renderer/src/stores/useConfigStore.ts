import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfigStore = defineStore(
  'configStore',
  () => {
    const config = ref({
      borderColor: '#00ff00',
      borderWidth: '0px',
      deviceId: '',
      page: 'setting',
      rounded: false,
      aspectRatio: 16 / 9, //视频比例
      videoElement: null as null | HTMLVideoElement,
      flip: false
    });

    return { config };
  },
  { persist: true }
);
