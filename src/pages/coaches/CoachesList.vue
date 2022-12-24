<template>
  <div>
  <base-dialog :show="!!error" title="error occured!" @close="handelError">
    <p>{{error}}</p>
  </base-dialog>
<section>
  <coach-filter @change-filter="setFilters"></coach-filter>
</section>
  <section>
    <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
      <base-button link to="/register">Register as Coach</base-button>
<!--      //v-if="!isCoach"//-->
    </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
   <ul v-if="hasCoaches">
     <coach-items
         v-for="coach in filteredCoaches"
         :id="coach.id"
         :key = "coach.id"
         :first-name="coach.firstName"
         :last-name="coach.lastName"
         :rate="coach.hourlyRate"
         :areas="coach.areas"
         ></coach-items>
   </ul>
    <h3 v-else>No coaches Found.</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import CoachItems from "@/components/coaches/coachItems";
import BaseCard from "@/components/ui/BaseCard";
import CoachFilter from "@/components/coaches/CoachFilter";
import BaseSpinner from "@/components/ui/BaseSpinner";
import BaseDialog from "@/components/ui/BaseDialog";
export default {
  components:{
    BaseDialog,
    BaseSpinner,
    BaseCard,
    CoachItems,
    CoachFilter
  },
  data(){
    return{
      error:null,
      isLoading:false,
      activeFilters:{
        frontend: true,
        backend: true,
        career:true
      }
    }
  },
  created(){
    this.loadCoaches();
  },
  methods:{
    setFilters(updatedFilters){
        this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false){
      this.isLoading=true;
      try{
        await this.$store.dispatch('coaches/loadCoaches',{forceRefresh: refresh});
      }catch(error){
        this.error = error.message || 'sometimes went wrong!';
      }
      this.isLoading=false;
    },
    handelError(){
      this.error=null;
    }
  },
  computed:{
    filteredCoaches(){
     const coaches =  this.$store.getters['coaches/coaches'];
     return coaches.filter(coach =>{
       if(this.activeFilters.frontend && coach.areas.includes('frontend')){
         return true;
       }
       if(this.activeFilters.backend && coach.areas.includes('backend')){
         return true;
       }
       if(this.activeFilters.career && coach.areas.includes('career')){
         return true;
       }
      return false;
      });
    },
    hasCoaches(){
     return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>