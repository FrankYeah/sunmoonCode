<template>
  <div class="about">

    <div :class="['about-title', {'about-title-dark': !isLight}]">About us</div>
    <div :class="['about-dot-1', {'about-talk-dot-dark': !isLight}]"></div>
    <div :class="['about-line', {'about-line-dark': !isLight}]"></div>

    <div class="about-intro">
      <div class="about-intro-box">

        <img v-if="isLight" class="about-intro-img" src="@/assets/img/sunmoon-logo-bg.png" alt="sunmoon">
        <img v-else class="about-intro-img" src="@/assets/img/sunmoon-logo-dark.png" alt="sunmoon">
        <div class="about-intro-right">
          <div :class="['about-intro-text', {'about-intro-text-dark': !isLight}]">We’re here to manifest your purpose and inspire your audience through brand identity that’s relevant and enduring. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis id enim pharetra aliquam. Maecenas aliquet facilisis massa eu fringilla.</div>
          <div class="about-intro-desc-box">
            <div class="about-intro-desc">
              <div :class="['about-intro-desc-head', {'about-intro-desc-head-dark': !isLight}]">Find your right company</div>
              <div class="about-intro-desc-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
            <div class="about-intro-desc">
              <div :class="['about-intro-desc-head', {'about-intro-desc-head-dark': !isLight}]">Let’s get growing</div>
              <div class="about-intro-desc-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>
        </div>

      </div>

      

    </div>

    <div class="about-talk">

      <div :class="['about-talk-dot-2', {'about-talk-dot-dark': !isLight}]"></div>
      <div :class="['about-talk-dot-3', {'about-talk-dot-small-dark': !isLight}]"></div>
      <div :class="['about-talk-dot-4', {'about-talk-dot-small-dark': !isLight}]"></div>
      <div :class="['about-talk-dot-5', {'about-talk-dot-dark': !isLight}]"></div>

      <div class="about-talk-left">
        <div :class="['about-talk-title', {'about-talk-title-dark': !isLight}]">Let’s talk!</div>
        <div :class="['about-talk-text', {'about-talk-text-dark': !isLight}]">Sunmooncredit@gmail.com</div>
      </div>

      <div :class="['about-talk-right', {'about-talk-right-dark': !isLight}]">
        <div class="about-talk-right-outter-box">
          <div class="about-talk-right-box">
            <div :class="['about-talk-right-title', {'about-talk-right-title-dark': !isLight}]">Your name*</div>
            <input v-model="sendMessage.name" @focus="inputText('name')" :class="['about-talk-input', {'about-talk-input-dark': !isLight}, {'about-talk-input-wrong': validation.name}]" type="text">
            <div v-if="validation.name" class="about-talk-wrong-text">Please fill out this field.</div>
          </div>
          <div class="about-talk-right-box">
            <div :class="['about-talk-right-title', {'about-talk-right-title-dark': !isLight}]">Email address*</div>
            <input v-model="sendMessage.mail" @focus="inputText('mail')" :class="['about-talk-input', {'about-talk-input-dark': !isLight}, {'about-talk-input-wrong': validation.mail}]" type="text">
            <div v-if="validation.mail" class="about-talk-wrong-text">Incorrect email format.</div>
          </div>
        </div>
        <div :class="['about-talk-right-title', {'about-talk-right-title-dark': !isLight}]">Message</div>
        <div class="about-talk-right-bubble-box">
          <div v-for="(bubble, index) in bubbles"
            :key="index"
            @click="bubble.selected = !bubble.selected"
            :class="[
              'about-talk-right-bubble',
              {'about-talk-right-bubble-selected': bubble.selected},
              {'about-talk-right-bubble-dark': !isLight},
              {'about-talk-right-bubble-dark-selected': !isLight && bubble.selected},
            ]"
          >
          {{ bubble.text }}
          </div>
        </div>
        <div :class="['about-talk-right-title', {'about-talk-right-title-dark': !isLight}]">Remarks</div>
        <input v-model="sendMessage.message" @focus="inputText('message')" :class="['about-talk-textarea', {'about-talk-textarea-dark': !isLight}]">
        <div @click="sendData()" :class="['about-talk-btn', {'about-talk-btn-dark': !isLight}]">Send</div>
      </div>

    </div>

    <div v-if="popup.success" @click="closePopup()" class="about-popup">
      <div :class="['about-popup-box', {'about-popup-box-dark': !isLight}]">
        <img class="about-popup-icon" src="@/assets/img/about/icon-check.svg" alt="check">
        <div class="about-popup-text">Thank you! We’ll reply you as soon as possible.</div>
        <div class="about-popup-btn-box">
          <div @click="popup.success = false" :class="['about-popup-btn', {'about-popup-btn-dark': !isLight}]">OK</div>
        </div>
      </div>
    </div>

    <div v-if="popup.wrong" @click="closePopup()" class="about-popup">
      <div :class="['about-popup-box', {'about-popup-box-dark': !isLight}]">
        <img class="about-popup-icon" src="@/assets/img/about/icon-wrong.svg" alt="check">
        <div class="about-popup-text">Something went wrong, please try again later.</div>
        <div class="about-popup-btn-box">
          <div @click="popup.wrong = false" :class="['about-popup-btn', {'about-popup-btn-dark': !isLight}]">OK</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  head: {
    title: 'About',
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
      },
      bubbles: [
        { text: 'How can we collaborate with you?', selected: false },
        { text: 'Can you help me understand the model more?', selected: false },
        { text: 'Can you help us to analyze some companies?', selected: false },
      ]
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

  &-title-dark {
    color: #EAECF4;
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

  &-line-dark {
    background-color: #747BAA;
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

    &-text-dark {
      color: #BAC0E6;
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

    &-desc-head-dark {
      color: #EAECF4;
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

    &-dot-dark {
      background-color: #F5DD82;
      box-shadow: 0px 0px 6px #F5DD82;
    }

    &-dot-small-dark {
      background-color: #FFFFFF;
      box-shadow: 0px 0px 6px #FFFFFF;
    }

    &-left {

    }

    &-title {
      font-size: 32px;
      font-weight: bold;
      color: #2E2E2E;
    }

    &-title-dark {
      color: #EAECF4;
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

    &-text-dark {

      &::before {
        content: url('../assets/img/icon/icon-mail-dark.svg');
      }

    }

    &-right {
      width: 635px;
      height: auto;
      display: flex;
      flex-direction: column;
      padding: 48px 68px 40px;
      box-shadow: 0px 3px 6px #00000014;
      border: 1px solid #EDEDED;
      border-radius: 10px;
    }

    &-right-dark {
      background-color: #2F2E4E;
      box-shadow: 0px 3px 6px #00000029;
      border: 0px;
    }

    &-right-outter-box {
      display: flex;
      justify-content: space-between;
    }

    &-right-box {
      width: calc(50% - 12px);
    }

    &-right-title {
      font-size: 16px;
      color: #9C9C9C;
    }

    &-right-title-dark {
      color: #747BAA;
    }

    &-input {
      width: calc(100%);
      height: 52px;
      margin-top: 10px;
      font-size: 16px;
      margin-bottom: 32px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;
      background-color: transparent;
    }

    &-input-dark {
      color: #EAECF4;
      border-bottom: 1px solid #747BAA;

      &::placeholder {
        color: #747BAA;
      }
    }

    &-right-bubble-box {
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
    }

    &-right-bubble {
      color: #9C9C9C;
      margin-top: 20px;
      padding: 10px 20px;
      text-align: left;
      line-height: 1.3;
      border: 1px solid #D2D2D2;
      border-radius: 20px;
      cursor: pointer;
    }

    &-right-bubble-dark {
      color: #747BAA;
      border: 1px solid #747BAA;
    }

    &-right-bubble-selected {
      color: #2E2E2E;
      background-color: #D2D2D2;
    }

    &-right-bubble-dark-selected {
      color: #EAECF4;
      background-color: #747BAA;
    }

    &-textarea {
      width: 100%;
      height: 52px;
      margin-top: 10px;
      font-size: 16px;
      border: 0px;
      border-bottom: 1px solid #D2D2D2;
      background-color: transparent;
    }

    &-textarea-dark {
      color: #EAECF4;
      border-bottom: 1px solid #747BAA;

      &::placeholder {
        color: #747BAA;
      }
    }

    &-input-wrong {
      border: 1px solid #FF4866;
      margin-bottom: 0px;
    }

    &-wrong-text {
      margin: 8px 0px 32px 0px;
      color: #FF4866;
    }

    &-btn {
      margin: 40px 0px 0px 450px;
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

    &-btn-dark {
      border: 1px solid #747BAA;
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

    &-box-dark {
      background-color: #2F2E4E;
      box-shadow: 0px 3px 6px #00000029;
      color: #BAC0E6;
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

    &-btn-dark {
      background-color: #242345;
      border: 1px solid #747BAA;
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

      &-right-outter-box {
        flex-direction: column;
      }

      &-right-box {
        width: 100%;
      }

      &-right-title {
        
      }

      &-input {
        width: calc(100% - 0px);
        height: 30px;
        padding: 0px;
      }

      &-right-bubble-box {

      }

      &-right-bubble {
        font-size: 16px;
      }

      &-textarea {
        width: 100%;
        height: 30px;
        padding: 8px 0px 8px;
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
