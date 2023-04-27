<script lang="ts" setup>
import { ref } from 'vue';

// 进度条
const progress = ref<any>(null);

window.api.downloadProgress((_progress: any) => {
  progress.value = _progress;
});
</script>

<template>
  <div v-if="progress" class="updater">
    <div class="updater_title">更新界面</div>
    <div class="updater_progress">
      <el-progress type="dashboard" :percentage="parseInt(progress.percent)">
        <template #default="{ percentage }">
          <span class="updater_percentage_value">{{ percentage }}%</span>
          <span class="updater_percentage_label">更新进度</span>
        </template>
      </el-progress>
    </div>
    <div class="updater_footer noDrag">
      <a href="https://starrysky-future.github.io/blog/" target="_blank"> 官网下载 </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.updater {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  .updater_title {
    font-size: 28px;
    font-weight: bold;
  }
  .updater_progress {
    margin-top: 20px;
    .updater_percentage_value {
      display: block;
      margin-top: 10px;
      font-size: 28px;
    }
    .updater_percentage_label {
      display: block;
      margin-top: 10px;
      font-size: 12px;
    }
  }
  .updater_footer {
    cursor: pointer;
    a {
      color: #666;
    }
  }
}
</style>
