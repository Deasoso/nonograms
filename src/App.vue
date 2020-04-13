<template>
  <div id="app">
    <!-- <audio src="http://pic.deaso40.com/ljhy/音效/游戏背景音乐.mp3" autoplay loop></audio> -->
    <!-- <AppHeader/> -->
    <router-view/>
    <!-- <AppFooter/> -->
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
  components: {AppHeader, AppFooter}
}
</script>