<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="cart" label="商品列表">
        <uni-data-checkbox :multiple="true" v-model="formData.cart"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="type" label="订单类型">
        <uni-easyinput placeholder="订单类型，如商品订单，会员订单，充值订单等" v-model="formData.type"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pay_type" label="支付渠道">
        <uni-data-checkbox v-model="formData.pay_type" :localdata="formOptions.pay_type_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pay_pirce" label="已支付金额">
        <uni-easyinput placeholder="支付金额，单位：分。" type="number" v-model="formData.pay_pirce"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="total_fee" label="订单总金额">
        <uni-easyinput placeholder="订单总金额，单位：分。" type="number" v-model="formData.total_fee"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="status" label="订单状态">
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="info" label="其他信息">
        <uni-easyinput placeholder="自定义的订单拓展信息，如商品信息、会员卡种类信息等" v-model="formData.info"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="address" label="收件人">
        <undefined v-model="formData.address"></undefined>
      </uni-forms-item>
      <uni-forms-item name="platform" label="下单平台">
        <uni-data-checkbox v-model="formData.platform" :localdata="formOptions.platform_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="create_time" label="订单创建时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.create_time"></uni-datetime-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/uni-id-base-order.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'uni-id-base-order';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  export default {
    data() {
      let formData = {
        "cart": [],
        "type": "",
        "pay_type": "",
        "pay_pirce": null,
        "total_fee": null,
        "status": "",
        "info": "",
        "address": null,
        "platform": "mp-weixin",
        "create_time": null
      }
      return {
        formData,
        formOptions: {
          "pay_type_localdata": [
            {
              "value": "wxpay",
              "text": "微信支付"
            },
            {
              "value": "alipay",
              "text": "支付宝支付"
            }
          ],
          "status_localdata": [
            {
              "value": "待付款",
              "text": "待付款"
            },
            {
              "value": "已付款",
              "text": "已付款"
            },
            {
              "value": "退款审核中",
              "text": "退款审核中"
            },
            {
              "value": "已退款",
              "text": "已退款"
            },
            {
              "value": "已完成",
              "text": "已完成"
            },
            {
              "value": "退款拒绝",
              "text": "退款拒绝"
            },
            {
              "value": "退款拒绝",
              "text": "退款拒绝"
            }
          ],
          "platform_localdata": [
            {
              "value": "mp-weixin",
              "text": "微信小程序"
            },
            {
              "value": "mp-alipay",
              "text": "支付宝小程序"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("cart,type,pay_type,pay_pirce,total_fee,status,info,address,platform,create_time").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>
