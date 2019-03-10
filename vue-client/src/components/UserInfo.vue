<template>
  <div class="user-info-container">
    <apollo-query :notify-on-network-status-change="true"
                  fetch-policy="cache-and-network"
        :query="require('../graphql/CurrentUser.graphql')">
      <template slot-scope="{ result: { data } }">
        <div v-if="data">{{ data.me.email }}</div>
      </template>
    </apollo-query>
  </div>
</template>

<script>
export default {
  name: 'UserInfo.vue',
};
</script>

<style scoped>
  .user-info-container {
    padding: 6px 12px;
  }
</style>
