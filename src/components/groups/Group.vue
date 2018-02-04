<template>
  <div class="group-wrapper">
    <div class="group-container">
      <div class="group-graphic"></div>
      <div class="group-bottom">
        <div class="group-details">
          <div class="group-name">
            KDG IAO30B
          </div>
          <div class="group-notifications">
            5
          </div>
        </div>

        <div class="group-members">
          <div v-for="item in 5" :key="item" class="group-member-circle" v-bind:style="{'z-index': item, 'right': item*20-20 + 'px'}"></div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
</script>