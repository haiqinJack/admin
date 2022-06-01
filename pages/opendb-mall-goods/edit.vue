<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="category_id" label="分类" required>
        <uni-data-picker self-field="_id" parent-field="parent_id" v-model="formData.category_id" collection="opendb-mall-categories" field="_id as value, name as text"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="goods_sn" label="货号" required>
        <uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="名称" required>
        <uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="keywords" label="关键字">
        <uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_desc" label="详细描述">
        <uni-easyinput placeholder="商品详细描述" v-model="formData.goods_desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_thumb" label="缩略图地址">
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.goods_thumb"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="goods_banner_imgs" label="商品详情页图片">
        <uni-file-picker file-mediatype="image" return-type="array" v-model="formData.goods_banner_imgs"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="sku_name" label="规格名称" required>
        <uni-easyinput placeholder="SKU名称" v-model="formData.sku_name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="price" label="价格" required>
        <uni-easyinput placeholder="价格，以分为单位。实际付款金额" type="number" v-model="formData.price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="market_price" label="市场价" required>
        <uni-easyinput placeholder="市场价，以分为单位。虚晃一枪" type="number" v-model="formData.market_price"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="stock" label="库存" required>
        <uni-easyinput placeholder="库存" type="number" v-model="formData.stock"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month_sell_count" label="月销量">
        <uni-easyinput placeholder="月销量" type="number" v-model="formData.month_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="total_sell_count" label="总销量">
        <uni-easyinput placeholder="总销量" type="number" v-model="formData.total_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="comment_count" label="累计评论数">
        <uni-easyinput placeholder="累计评论数" type="number" v-model="formData.comment_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_real" label="是否为实物">
        <switch @change="binddata('is_real', $event.detail.value)" :checked="formData.is_real"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_on_sale" label="是否上架" required>
        <switch @change="binddata('is_on_sale', $event.detail.value)" :checked="formData.is_on_sale"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_alone_sale" label="是否能单独销售">
        <switch @change="binddata('is_alone_sale', $event.detail.value)" :checked="formData.is_alone_sale"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_best" label="是否精品">
        <switch @change="binddata('is_best', $event.detail.value)" :checked="formData.is_best"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_new" label="是否新品">
        <switch @change="binddata('is_new', $event.detail.value)" :checked="formData.is_new"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_hot" label="是否热销">
        <switch @change="binddata('is_hot', $event.detail.value)" :checked="formData.is_hot"></switch>
      </uni-forms-item>
      <uni-forms-item name="add_date" label="上架时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.add_date"></uni-datetime-picker>
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
  import { validator } from '../../js_sdk/validator/opendb-mall-goods.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'opendb-mall-goods';

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
        "goods_sn": "",
        "name": "",
        "keywords": "",
        "goods_desc": "",
        "goods_thumb": null,
        "goods_banner_imgs": [],
        "sku_name": "",
        "price": null,
        "market_price": null,
        "stock": null,
        "month_sell_count": 0,
        "total_sell_count": 0,
        "comment_count": 0,
        "is_real": true,
        "is_on_sale": true,
        "is_alone_sale": true,
        "is_best": true,
        "is_new": true,
        "is_hot": true,
        "add_date": null
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
        db.collection(dbCollectionName).doc(id).field("category_id,goods_sn,name,keywords,goods_desc,goods_thumb,goods_banner_imgs,sku_name,price,market_price,stock,month_sell_count,total_sell_count,comment_count,is_real,is_on_sale,is_alone_sale,is_best,is_new,is_hot,add_date").get().then((res) => {
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
