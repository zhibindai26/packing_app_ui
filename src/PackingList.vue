<template>
  <div id="app">
    <h1 class="title">Packing List</h1>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
    name: 'PackingList',
    props: {
        data: Object
    }

};
</script>

<style>
</style>