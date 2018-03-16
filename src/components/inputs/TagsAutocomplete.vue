<template>
  <div>
    <el-tag
      :key="tag.tagname"
      v-for="tag in value"
      closable
      :disable-transitions="false"
      @close="handleRemoveTag(tag)">
      {{tag.tagname}}
    </el-tag>
    <el-autocomplete
      v-if="tagInputVisible"
      class="input-new-tag"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @select="handleSelectCategory"
    >
      <i
        class="el-icon-close el-input__icon"
        slot="suffix"
        @click="handleCloseTagInput">
      </i>
    </el-autocomplete>
    <el-button v-else class="button-new-tag" size="small" @click="showCategoryInput">+ New Tag</el-button>
  </div>
</template>

<script>
  import TagApi from '../../services/tagservice';

  const logger = console;
  export default {
    props: {
      value: {
        default: [],
        type: Array,
      },
    },
    data() {
      return {
        tagInputValue: '',
        tagInputVisible: false,
      };
    },
    methods: {
      handleInputConfirm() {
        const { tagInputValue } = this;
        if (tagInputValue.tagname) {
          const categories = JSON.parse(JSON.stringify(this.value));
          categories.push(tagInputValue);
          this.$emit('input', categories);
        }
        this.tagInputVisible = false;
        this.tagInputValue = {};
      },
      querySearch(queryString, cb) {
        TagApi.getTags(
          queryString,
          res => {
            logger.log('Similar tags succesfully loaded.');
            const results = [];
            if (res.data !== '') res.data.forEach(e => results.push({ id: e.tagId, value: e.tagname }));
            cb(results);
          },
          err => {
            logger.log('Unable to load similar tags', err);
          },
        );
      },
      handleSelectCategory(item) {
        this.tagInputValue = { tagId: item.id, tagname: item.value };
        this.handleInputConfirm();
      },
      handleCloseTagInput() {
        this.tagInputVisible = false;
        this.tagInputValue = {};
      },
      handleRemoveTag(tag) {
        const categories = JSON.parse(JSON.stringify(this.value));
        categories.splice(categories.findIndex(t => t.tagname === tag.tagname), 1);
        this.$emit('input', categories);
      },
      showCategoryInput() {
        this.tagInputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    },
  };
</script>
