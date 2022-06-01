<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="avatarUrl" label="宠物头像">
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.avatarUrl"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="nickname" label="宠物昵称" required>
        <uni-easyinput v-model="formData.nickname" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="phone" label="联系方式" required>
        <uni-easyinput v-model="formData.phone" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="pet_group" label="宠物种类" required>
        <uni-data-checkbox v-model="formData.pet_group" collection="pet-group" field="_id as value, title as text" trim="both"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pet_type" label="宠物品种" required>
        <uni-data-picker placeholder="请选择宠物品种" v-model="formData.pet_type" collection="pet-type" field="_id as value, title as text" trim="both"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="vaccines" label="疫苗情况" required>
        <uni-data-picker placeholder="请选择疫苗情况" v-model="formData.vaccines" collection="vaccines" field="_id as value, title as text"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="pet_sex" label="性别" required>
        <uni-data-checkbox v-model="formData.pet_sex" :localdata="formOptions.pet_sex_localdata" trim="both"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="pet_weight" label="体重(kg)" required>
        <uni-easyinput type="number" v-model="formData.pet_weight"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="isSterilization" label="是否绝育">
        <uni-data-checkbox v-model="formData.isSterilization" :localdata="formOptions.isSterilization_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="birthday" label="出生年月">
        <uni-datetime-picker return-type="date" v-model="formData.birthday"></uni-datetime-picker>
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
  import { validator } from '../../js_sdk/validator/pets.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'pets';

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
        "avatarUrl": null,
        "nickname": "",
        "phone": "",
        "pet_group": "",
        "pet_type": "",
        "vaccines": "",
        "pet_sex": "母",
        "pet_weight": null,
        "isSterilization": "否",
        "birthday": null
      }
      return {
        formData,
        formOptions: {
          "pet_sex_localdata": [
            {
              "value": "公",
              "text": "公"
            },
            {
              "value": "母",
              "text": "母"
            }
          ],
          "isSterilization_localdata": [
            {
              "value": "否",
              "text": "否"
            },
            {
              "value": "是",
              "text": "是"
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
        db.collection(dbCollectionName).doc(id).field("avatarUrl,nickname,phone,pet_group,pet_type,vaccines,pet_sex,pet_weight,isSterilization,birthday").get().then((res) => {
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
