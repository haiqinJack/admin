<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="project_id" label="" required>
        <uni-data-checkbox :multiple="true" v-model="formData.project_id" collection="appointment-project" field="_id as value, title as text "></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="title" label="标题" required>
        <uni-easyinput v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="bannerfile" label="图片文件" required>
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.bannerfile"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="price" label="价格" required>
        <uni-easyinput placeholder="单位：分" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="order" label="排序">
        <uni-easyinput placeholder="数字越大越靠前" type="number" v-model="formData.order"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="detailed" label="详情图">
        <uni-file-picker file-mediatype="image" return-type="array" v-model="formData.detailed"></uni-file-picker>
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
  import { validator } from '../../js_sdk/validator/appointment-project-single.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'appointment-project-single';

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
        "project_id": [],
        "title": "",
        "bannerfile": null,
        "price": null,
        "order": 0,
        "detailed": []
      }
      return {
        formData,
        formOptions: {},
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
        db.collection(dbCollectionName).doc(id).field("project_id,title,bannerfile,price,order,detailed").get().then((res) => {
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
