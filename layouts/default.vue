<template>
  <div class="default-setting">
    <topBar/>
    <nuxt/>
    <bottomBar/>
  </div>
</template>

<script>

export default {
  components: {
    topBar: require('~/components/top-bar.vue').default,
    bottomBar: require('~/components/bottom-bar.vue').default, 
  },
  props: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {

  },
  watch: {
    
  }
}
</script>

<style lang="scss">

.default-setting {
  margin-top: 180px;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: 'Noto Sans TC', 'Noto Sans SC' ,sans-serif;
  font-size: 16px;
  color: #646464;
  // font-family: 'GoudyOldStyle,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,PingFang TC,Hiragino Sans GB,Microsoft JhengHei,sans-serif!important';
}

a {
  color: #fff;
  text-decoration: none;
}

input {
  padding: 0px;
  margin: 0px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #D2D2D2;
  }
}

textarea {

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #D2D2D2;
  }
}

@media( max-width: 500px ){

  .default-setting {
    margin-top: 84px;
  }

  body {
    font-size: 14px;
  }

}

</style>
