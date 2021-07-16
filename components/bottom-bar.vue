<template>
  <div class="bottom">
    <div :class="['bottom-line', {'bottom-line-dark': !isLight}]"></div>
    <div :class="['bottom-text', {'bottom-text-dark': !isLight}]">Copyright © 2021 Sunmoon credit. All rights reserved.</div>
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
    isLight() { return this.$store.state.lightMode },
  },
  methods: {

  },
  watch: {
    
  }
}
</script>

<style lang="scss">

.bottom {
  height: 80px;

  &-dbg {
    background-color: #242345;
  }

  &-line {
    border-top: 1px solid #D2D2D2;
    max-width: 1100px;
    width: 100%;
    margin: 0px auto 0px;
  }

  &-line-dark {
    border-top: 1px solid #747BAA;
  }

  &-text {
    line-height: 80px;
    font-size: 14px;
    color: #D2D2D2;
    text-align: center;
  }

  &-text-dark {
    color: #747BAA;
  }

}


@media( max-width: 500px ){

.bottom {
  height: 50px;

  &-line {
    max-width: initial;
    width: initial;
    margin: 0px 20px;
  }

  &-text {
    line-height: 50px;
    font-size: 12px;
  }

}

}

</style>