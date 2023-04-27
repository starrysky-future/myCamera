<script lang="ts" setup>
import { useConfigStore } from '@renderer/stores/useConfigStore';

const { config } = useConfigStore();

// 页面切换
const changeConfig = (value: string): void => {
  config.page = value;
};

// 改变窗口
const changeRounded = (): void => {
  config.rounded = !config.rounded;
  config.aspectRatio = config.rounded ? 1 : 16 / 9;
  window.api.setWinSize({ aspectRatio: config.aspectRatio });
};
window.api.setWinSize({ aspectRatio: config.aspectRatio });

// 画面镜像
const changeFlipHorizontally = (): void => {
  config.flip = !config.flip;
  config.videoElement!.style.transform = config.flip ? 'rotateY(180deg)' : '';
};

// 退出应用
const quit = (): void => {
  window.api.quit();
};
</script>

<template>
  <div class="footer noDrag">
    <el-tooltip content="设置页面" effect="light" placement="top">
      <div v-if="config.page === 'camera'" class="footer_setting" @click="changeConfig('setting')">
        <i class="footer_icon setting_icon"></i>
      </div>
    </el-tooltip>
    <el-tooltip content="摄像头页面" effect="light" placement="top">
      <div v-if="config.page === 'setting'" class="mgLeft10" @click="changeConfig('camera')">
        <i class="footer_icon camera_icon"></i>
      </div>
    </el-tooltip>
    <el-tooltip content="圆角切换" effect="light" placement="top">
      <div v-if="config.page === 'camera'" class="mgLeft10" @click="changeRounded">
        <i class="footer_icon round_icon"></i>
      </div>
    </el-tooltip>
    <el-tooltip content="画面镜像" effect="light" placement="top">
      <div v-if="config.page === 'camera'" class="mgLeft10" @click="changeFlipHorizontally">
        <i class="footer_icon mirror_icon"></i>
      </div>
    </el-tooltip>
    <el-tooltip content="退出应用" effect="light" placement="top">
      <div class="mgLeft10" @click="quit">
        <i class="footer_icon quit_icon"></i>
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #21d4fd;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.5s ease-in;
  z-index: 20;
  &:hover {
    opacity: 1;
  }
  .footer_icon {
    display: block;
    width: 24px;
    height: 24px;
    background-size: cover;
  }
  .setting_icon {
    background-image: url('../assets/images/setting.png?asset');
  }
  .camera_icon {
    background-image: url('../assets/images/cameraIcon.png?asset');
  }
  .round_icon {
    background-image: url('../assets/images/round.png?asset');
  }
  .mirror_icon {
    background-image: url('../assets/images/mirror.png?asset');
  }
  .quit_icon {
    background-image: url('../assets/images/quit.png?asset');
  }
  .mgLeft10 {
    margin-left: 10px;
  }
}
</style>
