<template>
  <div class="confirm" v-show="visible">
    <div class="confirm_wrapper">
      <div class="confirm_content">
        <p class="text">{{ text }}</p>
        <div class="operate">
          <div class="operate_btn left" @click="confirm">
            {{ confirmBtnText }}
          </div>
          <div class="operate_btn" @click.stop="cancel">
            {{ cancelBtnText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'con_firm',
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  emits: ['confirm', 'cancel'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
  .confirm_wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm_content{
      width: 270px;
      border-radius: 5px;
      background: $color-background;
      .text{
        line-height: 22px;
        padding: 12px 15px;
        text-align: center;
        font-size: $font-size-medium-x;
        color: $color-text;
      }
      .operate{
        display: flex;
        align-items: center;
        // text-align: center;
        justify-content: space-around;
        font-size: $font-size-medium-x;
        .operate_btn{
          // flex: 1;
          padding: 12px 0;
          line-height: 22px;
          // border-top: 1px solid $color-background;
          color: $color-theme;
          &.left{
            // border-right: 1px solid $color-background;
          }
        }
      }
    }
  }
}
</style>
