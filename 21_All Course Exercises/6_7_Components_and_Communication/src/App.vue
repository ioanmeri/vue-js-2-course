<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <app-servers></app-servers>
      <app-server-details></app-server-details>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/Shared/Header.vue';
  import Footer from './components/Shared/Footer.vue';
  import Servers from './components/Server/Servers.vue';
  import ServerDetails from './components/Server/ServerDetails.vue';

  export default{
    components: {
      appHeader: Header,
      appFooter: Footer,
      appServers: Servers,
      appServerDetails: ServerDetails,
    }
  }
</script>

<style>
  
</style>
