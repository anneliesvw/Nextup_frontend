<template>
  <div class="activity-wrapper">
      <div class="activity-container">
        <div class="activity-graphic" :style="backgroundPattern">

        </div>
        <div class="activity-bottom">
            <div class="activity-toggle">
                <input type="checkbox">
            </div>
            <div class="activity-details">
                <div class="activity-owner">
                    Kroegentocht
                </div>
                <div class="activity-date">
                    ZATERDAG 27/07 | 10:00 - 17:00
                </div>
            
            </div>
        </div>
        
    </div>
  </div>
</template>
<script>
    import PatternGenerator from '../../services/patterngenerator';

    export default {
      computed: {
        backgroundPattern() {
          const pattern = PatternGenerator.generateImage(`${Math.random() * 2345}`);
          return {
            backgroundImage: pattern,
          };
        },
      },
    };
</script>
