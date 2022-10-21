<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <van-form @submit="onSubmit" ref="loginForm">
    <!-- 表单 -->
    <van-field
      v-model="user.mobile"
      name="mobile"
      label="手机号"
      clearable required
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      maxlength="11"
   >
   <i slot="left-icon" class="toutiao toutiao-shouji"></i>
   </van-field>

    <van-field
      v-model= "user.code"
      type="number"
      name="code"
      label="验证码"
      clearable
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      maxlength="6"
    >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
    <template #button>
      <van-count-down
      :time="1000*3"
      format="ss s"
      v-if="isCountDownShow"
      @finish="isCountDownShow=false"
      />
      <van-button class="send-sms-btn"
      @click="onSendSms"
      round size="small"
      type="default"
      v-else
      >发送验证码</van-button>
    </template>
   </van-field>
    <div class="login-btn-wrap">
    <van-button class="login-btn" block type="info" native-type="submit">登录
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  onSubmit () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })
      const user = this.user
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        console.log('存入本地成功,用户密钥为:', this.$store.state.user)
        this.$toast.success('登录成功')
        console.log('登录成功', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('请求参数错误,登录失败', err)
        } else {
          console.log('登录失败,发生其他错误', err)
        }
        this.$toast.fail('登陆失败')
      }
    },
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    padding: 0; // 原有button 带有 padding 需要清除
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
