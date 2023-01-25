<script setup lang="ts">

</script>
<template>
  
  <v-app-bar class="pa-3" :elevation="12">
    
    <v-app-bar-title class="MyTitle"> Projects </v-app-bar-title>
    <template v-slot:append >
      <div >
        <v-btn class="mx-5" to="/" size="large" prepend-icon="mdi-home" variant="outlined">HOME</v-btn>
        
        
      
        <v-btn size="large" to="/about" prepend-icon="mdi-vuetify" variant="outlined">ABOUT</v-btn>
      </div>
      
    </template>
</v-app-bar>
</template>

<style>
.MyTitle{
  font-size: 25px !important;
}
</style>