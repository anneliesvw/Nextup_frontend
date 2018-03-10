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
    props: ['placeHolder', 'imageType', 'value'],
    data() {
      return {
        imageReloadCount: 0,
        isLoading: false,
      };
    },
    computed: {
      backgroundImage() {
        return {
          backgroundImage: this.value ? `url(${process.env.OBJECT_STORE}/${this.value}?${this.imageReloadCount})` : this.placeHolder,
        };
      },
    },
    methods: {
      updateValue(imageKey) {
        this.$emit('input', imageKey);
      },
      uploadImage(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        this.isLoading = true;
        if (!this.value) {
          ImageService.uploadImage(
            this.imageType,
            formData,
            res => {
              this.updateValue(res.data.Key);
              this.isLoading = false;
            },
            err => {
              window.console.log(err);
              this.isLoading = false;
            },
          );
        } else {
          ImageService.updateImage(
            this.value,
            formData,
            () => {
              this.$notify({
                title: 'Image updated',
                message: 'Image was succesfully updated',
                type: 'success',
                duration: 2000,
              });
              this.isLoading = false;
              this.imageReloadCount += 1;
            },
            err => {
              window.console.log(err);
              this.isLoading = false;
            },
          );
        }
      },
    },
  };
</script>