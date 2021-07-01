<template>
  <svg class="icon" :style="`
    ${this.height ? `height:${this.height};`  : ''}
    ${this.width  ? `width:${this.width};`    : ''}
    ${this.fill   ? `fill:${this.fill};`      : ''}
    ${this.color  ? `color:${this.color};`    : ''}
  `">
    <use :xlink:href="`#icon-${this.name}`" />
  </svg>
</template>

<script>
export default {
  created() {
    try { require(`~/assets/icons/${this.name}.svg?sprite`).default }
    catch (err) {}
  },
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    fill: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  data: () => ({
  }),
}   
</script>

<style scoped>
.icon {
  min-width: 1em;
  min-height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
