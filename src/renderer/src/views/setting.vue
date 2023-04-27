<script lang="ts" setup>
import Footer from '@renderer/components/footer.vue';
import { useConfigStore } from '@renderer/stores/useConfigStore';
import { ref } from 'vue';

const { config } = useConfigStore();
const version = ref('');

const devices = await navigator.mediaDevices.enumerateDevices();
const cameras = devices.filter((device) => {
  return device.kind.includes('video');
});

window.api.version((_version: string) => {
  version.value = _version;
});
</script>

<template>
  <div class="setting">
    <div class="setting_content">
      <div class="setting_content_title">设置</div>
      <div class="setting_content_config">
        <el-select
          v-model="config.deviceId"
          class="noDrag mgTop20"
          placeholder="选择摄像头"
          clearable
          filterable
          size="large"
        >
          <el-option
            v-for="(device, index) in cameras"
            :key="index"
            class="noDrag"
            :label="device.label"
            :value="device.deviceId"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="config.borderWidth"
          class="mgTop20 noDrag"
          placeholder="边框宽度"
          size="large"
          clearable
        ></el-input>
        <el-input
          v-model="config.borderColor"
          class="mgTop20 noDrag"
          placeholder="边框颜色"
          size="large"
          clearable
        ></el-input>
      </div>
      <div class="setting_content_footer mgTop20">版本号: {{ version ? version : '检测中' }}</div>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.setting {
  position: relative;
  background-image: linear-gradient(270deg, #4facfe, #00f2fe);
  width: 100vw;
  height: 100vh;
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .setting_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .setting_content_title {
    }

    .setting_content_config {
      width: 220px;
    }

    .setting_content_footer {
      display: flex;
      justify-content: center;
      font-size: 14px;
      color: #333;
    }
  }
  .mgTop20 {
    margin-top: 20px;
  }
}
</style>
