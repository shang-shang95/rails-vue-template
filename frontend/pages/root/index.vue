<template lang="pug">
#index
  App
  p Index page
  img(src='../../images/image.jpg')
  a.button.is-primary.fas.fa-igloo Button
  i.fas.fa-igloo Item
  p.fas.fa-ad こんばんは
  p.fas.fa-ad こんにちは
</template>

<style lang="scss">
@import '../../init/_variables';

p {
  color: $base-color;
}
</style>

<script>
import App from '../../components/app'

export default {
  components: {
    App
  }
}
</script>
