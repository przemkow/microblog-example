<template>
  <div class="card mb-3">
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" v-model="title" class="form-control" id="title" required>
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea class="form-control"
              v-model="content"
              id="content"
              rows="3"
              required>
          </textarea>
        </div>
        <button type="submit"
            class="btn btn-primary btn-block">
          Add new post
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  data() {
    return {
      title: '',
      content: '',
    };
  },
  methods: {
    submitForm() {
      const form = { title: this.title, content: this.content };
      this.$emit('submitForm', form);
    },
  },
};
</script>

<style scoped>

</style>
