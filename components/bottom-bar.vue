<template>
  <div class="bottom">
    <div class="bottom-line"></div>
    <div class="bottom-text">Copyright © 2021 Sunmoon credit. All rights reserved.</div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    
  },
  data () {
    return {
      screenWidth: null,
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
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

.bottom {
  height: 59px;

  &-line {
    border-top: 1px solid #D2D2D2;
    max-width: 1100px;
    width: 100%;
    margin: 0px auto 0px;
  }

  &-text {
    font-size: 14px;
    color: #D2D2D2;
    margin: 12px 0px 32px;
    text-align: center;
  }

}


@media( max-width: 500px ){

.bottom {
  height: 42px;

  &-line {
    max-width: initial;
    width: initial;
    margin: 0px 20px;
  }

  &-text {
    font-size: 12px;
    margin: 12px 0px 16px;
  }

}

}

</style>