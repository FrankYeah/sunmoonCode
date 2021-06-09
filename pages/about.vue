<template>
  <div class="about">

    <div class="about-title">About us</div>
    <div class="about-line"></div>

    <div class="about-intro">
      <div class="about-intro-box">

        <img class="about-intro-img" src="@/assets/img/sunmoon-logo-bg.png" alt="sunmoon">
        <div class="about-intro-right">
          <div class="about-intro-text">We’re here to manifest your purpose and inspire your audience through brand identity that’s relevant and enduring. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
          <div class="about-intro-desc-box">
            <div class="about-intro-desc">
              <div class="about-intro-desc-head">Find your right company</div>
              <div class="about-intro-desc-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
            <div class="about-intro-desc">
              <div class="about-intro-desc-head">Let’s get growing</div>
              <div class="about-intro-desc-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>
        </div>

      </div>

      

    </div>

    <div class="about-talk">

      <div class="about-talk-left">
        <div class="about-talk-title">Let’s talk!</div>
        <div class="about-talk-text">Sunmooncredit@gmail.com</div>
      </div>

      <div class="about-talk-right">
        <input class="about-talk-input" type="text" placeholder="Your name">
        <input class="about-talk-input" type="text" placeholder="Email address">
        <textarea class="about-talk-textarea" cols="30" rows="10" placeholder="Message"></textarea>
        <div class="about-talk-btn">Send</div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  head: {
    title: '首頁',
  },
  layout: 'default',
  components: {

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

<style lang="scss" scoped>

.about {
  max-width: 1100px;
  width: 100%;
  margin: 69px auto 144px;

  &-title {
    font-size: 48px;
    font-weight: bold;
    color: #2E2E2E;
    text-align: center;
  }

  &-line {
    margin: 24px auto;
    width: 1px;
    height: 60px;
    background-color: #D2D2D2;
    transform: translateX(-92px);
  }

  &-intro {
  

    &-box {
      display: flex;
      justify-content: space-between;
    }

    &-img {
      width: 322px;
      height: 80px;
    }

    &-right {
      width: 640px;
    }

    &-text {
      font-size: 20px;
      color: #646464;
      line-height: 30px;
    }

    &-desc-box {
      display: flex;
      justify-content: space-between;
      margin-top: 64px;
    }

    &-desc {

    }

    &-desc-head {
      font-size: 24px;
      font-weight: bold;
      color: #2E2E2E;
    }

    &-desc-text {
      margin-top: 24px;
      font-size: 20px;
      line-height: 28px;
    }
  }

  &-talk {
    margin-top: 193px;
    display: flex;
    justify-content: space-between;

    &-left {

    }

    &-title {
      font-size: 32px;
      font-weight: bold;
      color: #2E2E2E;
    }

    &-text {
      position: relative;
      font-size: 20px;
      margin: 24px 0px 0px 32px;

      &::before {
        content: url('../assets/img/icon/icon-mail.svg');
        position: absolute;
        left: -30px;
        top: 2px;
      }
    }

    &-right {
      width: 635px;
      height: 516px;
      display: flex;
      flex-direction: column;
      padding: 48px 68px 40px;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
    }

    &-input {
      width: 100%;
      height: 62px;
      padding-left: 28px;
      font-size: 16px;
      margin-bottom: 32px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;

      &::placeholder {
        color: #D2D2D2;
      }
    }

    &-textarea {
      height: 152px;
      width: 639px;
      padding: 21px 0px 0px 28px;
      font-size: 16px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;

      &::placeholder {
        color: #D2D2D2;
      }
    }

    &-btn {
      margin: 40px 0px 0px 486px;
      width: 185px;
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      text-align: center;
      border: 1px solid #D2D2D2;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

}

@media( max-width: 500px ){

  .about {


  }

}

</style>
