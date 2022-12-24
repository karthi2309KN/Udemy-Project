<template>
  <div>
<base-card>
  <h2> page not found</h2>
  <p> This page could not be found - may be check out all our<router-link to ="/coaches">coaches</router-link></p>
</base-card>
  </div>

</template>

<script>
import BaseCard from "@/components/ui/BaseCard";
export default {
  name:"NotFound",components:{BaseCard}
}
</script>

<style scoped>

</style>