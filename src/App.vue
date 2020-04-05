<template>
  <div id="app">
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