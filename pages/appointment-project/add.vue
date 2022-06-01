<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="category_id" label="所属分类" required>
        <uni-data-checkbox v-model="formData.category_id" collection="appointment-category" field="_id as value, title as text"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="bannerfile" label="图片文件" required>
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.bannerfile"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="title" label="标题" required>
        <uni-easyinput v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="hours" label="可预约时间段" required>
        <uni-data-checkbox :multiple="true" v-model="formData.hours" :localdata="formOptions.hours_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="price" label="价格" required>
        <uni-easyinput placeholder="单位：分" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="order" label="排序">
        <uni-easyinput placeholder="数字越大越靠前" type="number" v-model="formData.order"></uni-easyinput>
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
  import { validator } from '../../js_sdk/validator/appointment-project.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'appointment-project';

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
        "category_id": "",
        "bannerfile": null,
        "title": "",
        "hours": [],
        "price": null,
        "order": 0
      }
      return {
        formData,
        formOptions: {
          "hours_localdata": [
            {
              "value": "9",
              "text": "9:00~10:00"
            },
            {
              "value": "10",
              "text": "10:00~11:00"
            },
            {
              "value": "11",
              "text": "11:00~12:00"
            },
            {
              "value": "12",
              "text": "12:00~13:00"
            },
            {
              "value": "13",
              "text": "13:00~14:00"
            },
            {
              "value": "14",
              "text": "14:00~15:00"
            },
            {
              "value": "15",
              "text": "15:00~16:00"
            },
            {
              "value": "16",
              "text": "16:00~17:00"
            },
            {
              "value": "17",
              "text": "17:00~18:00"
            },
            {
              "value": "18",
              "text": "18:00~19:00"
            },
            {
              "value": "19",
              "text": "19:00~20:00"
            },
            {
              "value": "20",
              "text": "20:00~21:00"
            },
            {
              "value": "21",
              "text": "21:00~22:00"
            },
            {
              "value": "22",
              "text": "22:00~23:00"
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
