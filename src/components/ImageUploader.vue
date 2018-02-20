<template>
  <div class="image-uploader">
    <div class="image-upload-graphic" :style="backgroundImage">
      <input class="upload-input" type="file" @change="uploadImage"/>
      <div class="image-upload-circle">
        <i class="fas fa-camera camera-icon" v-if="!isLoading"></i>
        <i class="fas fa-circle-notch fa-spin camera-icon" v-else></i>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageService from '../services/imageservice';

  export default {
    props: ['placeHolder', 'imageType'],
    data() {
      return {
        isLoading: false,
        imageUrl: null,
      };
    },
    computed: {
      backgroundImage() {
        return {
          backgroundImage: this.imageUrl ? `url(${this.imageUrl})` : this.placeHolder,
        };
      },
    },
    methods: {
      uploadImage(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        this.isLoading = true;
        ImageService.uploadImage(
          this.imageType,
          formData,
          res => {
            this.imageUrl = res.data.Location;
            this.isLoading = false;
          },
          err => {
            window.console.log(err);
            this.isLoading = false;
          },
        );
      },
    },
  };
</script>