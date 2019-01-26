<template lang="pug">
  div
    p {{ message }}
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 2em;
  text-align: center;
  background-color: greenyellow;
}
</style>
