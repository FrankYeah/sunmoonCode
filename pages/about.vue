<template>
  <div class="about">

    <div class="about-title">About us</div>
    <div class="about-dot-1"></div>
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

      <div class="about-talk-dot-2"></div>
      <div class="about-talk-dot-3"></div>
      <div class="about-talk-dot-4"></div>
      <div class="about-talk-dot-5"></div>

      <div class="about-talk-left">
        <div class="about-talk-title">Let’s talk!</div>
        <div class="about-talk-text">Sunmooncredit@gmail.com</div>
      </div>

      <div class="about-talk-right">
        <input v-model="sendMessage.name" @focus="inputText('name')" :class="['about-talk-input', {'about-talk-input-wrong': validation.name}]" type="text" placeholder="Your name*">
        <div v-if="validation.name" class="about-talk-wrong-text">Please fill out this field.</div>
        <input v-model="sendMessage.mail" @focus="inputText('mail')" :class="['about-talk-input', {'about-talk-input-wrong': validation.mail}]" type="text" placeholder="Email address*">
        <div v-if="validation.mail" class="about-talk-wrong-text">Incorrect email format.</div>
        <textarea v-model="sendMessage.message" @focus="inputText('message')" :class="['about-talk-textarea', {'about-talk-input-wrong': validation.message}]" cols="30" rows="10" placeholder="Message*"></textarea>
        <div v-if="validation.message" class="about-talk-wrong-text">Please fill out this field.</div>
        <div @click="sendData()" class="about-talk-btn">Send</div>
      </div>

    </div>

    <div v-if="popup.success" @click="closePopup()" class="about-popup">
      <div class="about-popup-box">
        <img class="about-popup-icon" src="@/assets/img/about/icon-check.svg" alt="check">
        <div class="about-popup-text">Thank you! We’ll reply you as soon as possible.</div>
        <div class="about-popup-btn-box">
          <div @click="popup.success = false" class="about-popup-btn">OK</div>
        </div>
      </div>
    </div>

    <div v-if="popup.wrong" @click="closePopup()" class="about-popup">
      <div class="about-popup-box">
        <img class="about-popup-icon" src="@/assets/img/about/icon-wrong.svg" alt="check">
        <div class="about-popup-text">Something went wrong, please try again later.</div>
        <div class="about-popup-btn-box">
          <div @click="popup.wrong = false" class="about-popup-btn">OK</div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  head: {
    title: 'Company',
  },
  layout: 'default',
  components: {

  },
  props: {

  },
  data () {
    return {
      screenWidth: null,
      validation: {
        name: false,
        mail: false,
        message: false,
        checkMail: false
      },
      sendMessage: {
        name: '',
        mail: '',
        message: ''
      },
      popup: {
        success: false,
        wrong: false
      }
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
  },
  computed: {
    isLight() { return this.$store.state.lightMode },
  },
  methods: {
    inputText(content) {
      if (content == 'name') {
        this.validation.name = false
      } else if (content == 'mail') {
        this.validation.mail = false
      } else {
        this.validation.message = false
      }
    },
    sendData() {
      let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regex.test(this.sendMessage.mail)) {
        this.validation.checkMail = false
      } else {
        this.validation.checkMail = true
      }

      if (!this.sendMessage.name || this.validation.checkMail || !this.sendMessage.message) {
        if (!this.sendMessage.name) {
          this.validation.name = true
        }
        if (this.validation.checkMail) {
          this.validation.mail = true
        }
        if (!this.sendMessage.message) {
          this.validation.message = true
        }
      } else {

        // Call API
        
        // 成功
        this.popup.success = true
        this.sendMessage.name = ''
        this.sendMessage.mail = ''
        this.sendMessage.message = ''

        // 失敗
      }
    },
    closePopup() {
      if (this.screenWidth > 500) {
        this.popup.success = false
        this.popup.wrong = false
      }
    }
  },
  watch: {
    'popup.success': {
      handler: function(change) {
        if (change) {
          let mo = function (e) { e.preventDefault() }
          document.body.style.overflow='hidden'
          document.addEventListener('touchmove', mo, false)
        } else {
          let mo = function (e) { e.preventDefault() } 
          document.body.style.overflow = ''
          document.removeEventListener('touchmove', mo, false)
        }
      },
    },
    'popup.wrong': {
      handler: function(change) {
        if (change) {
          let mo = function (e) { e.preventDefault() }
          document.body.style.overflow='hidden'
          document.addEventListener('touchmove', mo, false)
        } else {
          let mo = function (e) { e.preventDefault() } 
          document.body.style.overflow = ''
          document.removeEventListener('touchmove', mo, false)
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>

.about {
  position: relative;
  max-width: 1100px;
  width: 100%;
  margin: 69px auto 144px;

  &-dbg {
    background-color: #242345;
  }

  &-title {
    font-size: 48px;
    font-weight: bold;
    color: #2E2E2E;
    text-align: center;
  }

  &-dot-1 {
    position: absolute;
    top: -10px;
    right: 417px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #50E3C1;
    box-shadow: 0px 0px 6px #50E3C1;
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
      height: 100%;
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
    position: relative;
    margin-top: 193px;
    display: flex;
    justify-content: space-between;

    &-dot-2 {
      position: absolute;
      top: 25px;
      left: -48px;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

    &-dot-3 {
      position: absolute;
      top: -49px;
      right: -25px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

    &-dot-4 {
      position: absolute;
      top: -96px;
      right: -70px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

    &-dot-5 {
      position: absolute;
      bottom: 164px;
      right: -57px;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: #50E3C1;
      box-shadow: 0px 0px 6px #50E3C1;
    }

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
    }

    &-textarea {
      height: 152px;
      width: 639px;
      padding: 21px 0px 0px 28px;
      font-size: 16px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;
    }

    &-input-wrong {
      border: 1px solid #FF4866;
      margin-bottom: 0px;
    }

    &-wrong-text {
      margin: 8px 0px 32px 28px;
      color: #FF4866;
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

  &-popup {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(46, 46, 46, 0.65);
    z-index: 4;

    &-box {
      width: 250px;
      height: 248px;
      padding: 40px 25px;
      text-align: center;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      border-radius: 10px;
      color: #646464;
    }

    &-icon {
      width: 92px;
      height: auto;
    }

    &-text {
      width: 225px;
      line-height: 24px;
      margin: 32px auto 0px;
    }

    &-btn-box {
      margin-top: 33px;
    }

    &-btn {
      width: 202px;
      height: 48px;
      line-height: 48px;
      margin: auto;
      text-align: center;
      background: #F7F7F7 0% 0% no-repeat padding-box;
      border: 1px solid #D2D2D2;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

}

@media( max-width: 1200px ){

  .about-talk-dot-2 {
    top: -15px;
    left: 20px;
  }

  .about-talk-dot-3 {
    right: 20px;
  }

  .about-talk-dot-4 {
    right: 0px;
  }

  .about-talk-dot-5 {
    right: 20px;
  }

}


@media( max-width: 500px ){

  .about {
    max-width: initial;
    width: calc(100% - 40px);
    margin: 84px auto 81px;

    &-title {
      font-size: 24px;
    }

    &-line {
      display: none;
    }

    &-intro {
    margin-top: 64px;

      &-box {
        flex-direction: column;
      }

      &-img {
        width: 100%;
        height: auto;
      }

      &-right {
        width: initial;
      }

      &-text {
        margin-top: 60px;
        font-size: 16px;
      }

      &-desc-box {
        margin-top: 0px;
        flex-direction: column;
      }

      &-desc {
        margin-top: 48px;
      }

      &-desc-head {
        font-size: 20px;
        text-align: center;
      }

      &-desc-text {
        margin-top: 16px;
        font-size: 16px;
      }
    }

    &-talk {
      flex-direction: column;
      margin-top: 108px;

      &-dot-2 {
        display: none;
      }

      &-dot-3 {
        display: none;
      }

      &-dot-4 {
        display: none;
      }

      &-dot-5 {
        display: none;
      }

      &-left {

      }

      &-title {
        font-size: 24px;
        text-align: center;
      }

      &-text {
        width: 280px;
        margin: 20px auto 0px auto;
        padding-left: 30px;
        text-align: center;
        font-size: 16px;

        &::before {
          left: 36px;
        }
      }

      &-right {
        width: calc(100% - 40px);
        margin-top: 32px;
        padding: 40px 20px;
      }

      &-input {
        width: calc(100% - 20px);
        padding-left: 0px;
        padding: 0px 0px 0px 20px;
      }

      &-textarea {
        width: calc(100% - 20px);
        height: 132px;
        padding: 20px 0px 0px 20px;
      }

      &-input-wrong {

      }

      &-wrong-text {
        margin: 8px 0px 32px 20px;
        font-size: 16px;
      }

      &-btn {
        width: 100%;
        margin: 40px 0px 0px 0px;
      }
    }

    &-popup {


      &-box {
        width: 100%;
        height: 100%;
        padding: 0px;
        border-radius: 0px;
      }

      &-icon {
        width: 100px;
        margin-top: 145px;
      }

      &-text {
        width: 215px;
        line-height: 22px;
        margin-top: 36px;
        font-size: 16px;
      }

      &-btn-box {
        width: 100%;
        position: absolute;
        bottom: 100px;
        left: 0px;
        margin: 0px;
      }

      &-btn {
        width: calc(100% - 42px);
      }
    }

  }

}

</style>
