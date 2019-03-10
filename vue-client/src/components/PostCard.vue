<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ author }}</h6>
      <p class="card-text">
        {{ content }}
      </p>
    </div>
    <div class="card-footer">
      <div class="row">
        <div class="col-6 text-center">
          <button class="btn btn-block btn-danger"
              @click="$emit('voteDown')">
          <i class="far fa-thumbs-down"></i>
            {{ thumbsDown }}
          </button>
        </div>
        <div class="col-6 text-center">
          <button class="btn btn-block btn-success"
              @click="$emit('voteUp')">
            <i class="far fa-thumbs-up"></i>
            {{ thumbsUp }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    title: String,
    author: String,
    content: String,
    thumbsUp: Number,
    thumbsDown: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
