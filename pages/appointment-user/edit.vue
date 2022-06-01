<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="appointment_project_id" label="关联的预约项目" required>
        <uni-data-checkbox v-model="formData.appointment_project_id" collection="appointment-project" field="_id as value, title as text"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="shop_id" label="门店" required>
        <uni-data-checkbox v-model="formData.shop_id" collection="shops" field="_id as value, title as text"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="project_single_id" label="关联的增值服务">
        <uni-data-checkbox :multiple="true" v-model="formData.project_single_id" collection="appointment-project-single" field="_id as value, title as text"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="mobile" label="联系方式" required>
        <uni-easyinput placeholder="原始的号码" v-model="formData.mobile" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="order_price" label="订单金额" required>
        <uni-easyinput type="number" v-model="formData.order_price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pay_pirce" label="已支付金额" required>
        <uni-easyinput type="number" v-model="formData.pay_pirce"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pay_status" label="支付状态" required>
        <uni-data-checkbox v-model="formData.pay_status" :localdata="formOptions.pay_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pay_type" label="下单渠道" required>
        <uni-data-checkbox v-model="formData.pay_type" :localdata="formOptions.pay_type_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="status" label="服务状态" required>
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="year" label="年" required>
        <uni-easyinput type="number" v-model="formData.year"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month" label="月" required>
        <uni-easyinput type="number" v-model="formData.month"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="date" label="日" required>
        <uni-easyinput type="number" v-model="formData.date"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="hour" label="时" required>
        <uni-easyinput type="number" v-model="formData.hour"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="outTradeNo" label="">
        <uni-easyinput placeholder="支付结果商户订单号" v-model="formData.outTradeNo"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pet" label="宠物信息" required>
        <undefined v-model="formData.pet"></undefined>
      </uni-forms-item>
      <uni-forms-item name="_createTime" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData._createTime"></uni-datetime-picker>
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
  import { validator } from '../../js_sdk/validator/appointment-user.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'appointment-user';

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
        "appointment_project_id": "",
        "shop_id": "",
        "project_single_id": [],
        "mobile": "",
        "order_price": null,
        "pay_pirce": null,
        "pay_status": "未支付",
        "pay_type": "",
        "status": "预约中",
        "year": null,
        "month": null,
        "date": null,
        "hour": null,
        "outTradeNo": "",
        "pet": null,
        "_createTime": null
      }
      return {
        formData,
        formOptions: {
          "pay_status_localdata": [
            {
              "value": "已支付",
              "text": "已支付"
            },
            {
              "value": "未支付",
              "text": "未支付"
            }
          ],
          "pay_type_localdata": [
            {
              "value": "alipay",
              "text": "支付宝支付"
            },
            {
              "value": "wxpay",
              "text": "微信支付"
            },
            {
              "value": "meituan",
              "text": "美团"
            }
          ],
          "status_localdata": [
            {
              "value": "预约中",
              "text": "预约中"
            },
            {
              "value": "服务完成",
              "text": "服务完成"
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
        db.collection(dbCollectionName).doc(id).field("appointment_project_id,shop_id,project_single_id,mobile,order_price,pay_pirce,pay_status,pay_type,status,year,month,date,hour,outTradeNo,pet,_createTime").get().then((res) => {
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
