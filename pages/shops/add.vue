<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="iconPath" label="门店logo" required>
        <uni-file-picker return-type="object" v-model="formData.iconPath"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="title" label="门店标题" required>
        <uni-easyinput placeholder="门店标题" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="desc" label="门店详细地址" required>
        <uni-easyinput placeholder="门店详细地址" v-model="formData.desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="phone" label="门店管理员手机号" required>
        <uni-easyinput type="number" v-model="formData.phone"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="latitude" label="纬度" required>
        <uni-easyinput type="number" v-model="formData.latitude"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="longitude" label="经度" required>
        <uni-easyinput type="number" v-model="formData.longitude"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="status" label="门店状态">
        <uni-data-checkbox v-model="formData.status" :localdata="formOptions.status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="restWeek" label="门店休息日">
        <uni-data-checkbox :multiple="true" v-model="formData.restWeek" :localdata="formOptions.restWeek_localdata"></uni-data-checkbox>
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
  import { validator } from '../../js_sdk/validator/shops.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'shops';

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
        "iconPath": null,
        "title": "",
        "desc": "",
        "phone": null,
        "latitude": null,
        "longitude": null,
        "status": "",
        "restWeek": []
      }
      return {
        formData,
        formOptions: {
          "status_localdata": [
            {
              "value": "营业中",
              "text": "营业中"
            },
            {
              "value": "休息中",
              "text": "休息中"
            }
          ],
          "restWeek_localdata": [
            {
              "value": 0,
              "text": "星期天"
            },
            {
              "value": 1,
              "text": "星期一"
            },
            {
              "value": 2,
              "text": "星期二"
            },
            {
              "value": 3,
              "text": "星期三"
            },
            {
              "value": 4,
              "text": "星期四"
            },
            {
              "value": 5,
              "text": "星期五"
            },
            {
              "value": 6,
              "text": "星期六"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
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
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>
