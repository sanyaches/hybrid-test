<template>
  <div class="about">
    <h1>This is an contact page</h1>
    <contacts/>
    <router-link to="/posts/1">Назад к блогу</router-link>
  </div>
</template>
<script>
  import Contacts from "../components/Contacts";
  export default {
    components: {Contacts}
  }
</script>