<template lang="pug">
#show
  App
  h1 Show page
  img(src='../../images/image.jpg')
  a.button.is-primary Bulma's Button
  br
  i.fas.fa-igloo FontAwesome Icon
  br
  p You can use Vue.js, Bulma, FontAwesome on Rails.
</template>

<style lang="scss">
@import '../../init/_variables';

p {
  color: $base-color;
}

h1 {
  font-size: 30px;
}

img {
  width: 100%;
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
