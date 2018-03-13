<template>
<!-- TODO werkt niet!!!! Afmaken -->
<div>
  <el-tag
    :key="tag.tagname"
    v-for="tag in dataTags.tags"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag.tagname}}
  </el-tag>
  <el-autocomplete
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue.tagname"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    ref="saveTagInput"
    size="mini"
    @keyup.enter.native="handleInputConfirm"
    @select="handleSelect"
  >
    <i
      class="el-icon-close el-input__icon"
      slot="suffix"
      @click="handleCloseEdit">
    </i>
  </el-autocomplete>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
</div>     
</template>

<script>
import TagApi from '../../services/tagservice';

const logger = window.console;

export default {
  props: ['tags'],
  data() {
    return {
      dataTags: [...this.tags],
      inputVisible: false,
      inputValue: {
        tagId: null,
        tagname: '',
      },
    };
  },
  methods: {
    handleClose(tag) {
      this.dataTags.splice(this.dataTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const { inputValue } = this;
      if (inputValue.tagname) {
        this.dataTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = {};
      this.$emit('changeTags', this.dataTags);
    },
    querySearch(queryString, cb) {
      TagApi.getTags(
        queryString,
        res => {
          logger.log('Similar tags succesfully loaded.');
          logger.log(res.data);
          const results = [];
          if (res.data !== '') res.data.forEach(e => results.push({ id: e.tagId, value: e.tagname }));
          cb(results);
        },
        err => {
          logger.log('Unable to load similar tags', err);
        },
      );
    },
    handleSelect(item) {
      this.inputValue = { tagId: item.id, tagname: item.value };
      this.handleInputConfirm();
    },
    handleCloseEdit() {
      this.inputVisible = false;
      this.inputValue = {};
    },
  },
};
</script>