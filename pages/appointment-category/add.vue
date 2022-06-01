<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="shop_id" label="所属门店">
        <uni-data-checkbox v-model="formData.shop_id" collection="shops" field="_id as value, title as text"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="imageUrl" label="分类图片" required>
        <uni-file-picker return-type="object" v-model="formData.imageUrl"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="title" label="分类名称" required>
        <uni-easyinput placeholder="分类名称" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="desc" label="价格描述" required>
        <uni-easyinput placeholder="如：35元起" v-model="formData.desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="type" label="类型">
        <uni-data-checkbox v-model="formData.type" :localdata="formOptions.type_localdata"></uni-data-checkbox>
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
  import { validator } from '../../js_sdk/validator/appointment-category.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'appointment-category';

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
        "shop_id": "",
        "imageUrl": null,
        "title": "",
        "desc": "",
        "type": "",
        "_updateTime": null
      }
      return {
        formData,
        formOptions: {
          "type_localdata": [
            {
              "value": "洗护",
              "text": "洗护"
            },
            {
              "value": "寄养",
              "text": "寄养"
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
		value._updateTime = new Date().getTime()
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
