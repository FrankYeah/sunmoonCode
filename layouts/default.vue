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

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  margin: 0px;
  padding: 0px;
  font-family: 'Noto Sans TC', 'Noto Sans SC' ,sans-serif;
  font-size: 16px;
  color: #646464;
  font-family: 'SF Pro';
  // font-family: 'SF Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,PingFang TC,Hiragino Sans GB,Microsoft JhengHei,sans-serif!important';
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
  color: #fff;
  text-decoration: none;
}

input {
  padding: 0px;
  margin: 0px;
  outline: none;
 -webkit-appearance: none;
 -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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
