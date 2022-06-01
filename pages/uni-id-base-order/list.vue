<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title"></view>
        <view class="uni-sub-title"></view>
      </view>
      <view class="uni-group">
        <input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
        <button class="uni-button" type="default" size="mini" @click="search">搜索</button>
        <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
        <button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length" @click="delTable">批量删除</button>
        <download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData" :type="exportExcel.type" :name="exportExcel.filename">
          <button class="uni-button" type="primary" size="mini">导出 Excel</button>
        </download-excel>
      </view>
    </view>
    <view class="uni-container">
      <unicloud-db ref="udb" :collection="collectionList" field="cart,type,pay_type,pay_pirce,total_fee,status,info,address,platform,create_time" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'address')">收件人</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'cart')">商品列表</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'type')" sortable @sort-change="sortChange($event, 'type')">订单类型</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.pay_type_localdata" @filter-change="filterChange($event, 'pay_type')">支付渠道</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'pay_pirce')" sortable @sort-change="sortChange($event, 'pay_pirce')">已支付金额</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'total_fee')" sortable @sort-change="sortChange($event, 'total_fee')">订单总金额</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.status_localdata" @filter-change="filterChange($event, 'status')">订单状态</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'info')" sortable @sort-change="sortChange($event, 'info')">其他信息</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.platform_localdata" @filter-change="filterChange($event, 'platform')">下单平台</uni-th>
            <uni-th align="center" filter-type="timestamp" @filter-change="filterChange($event, 'create_time')" sortable @sort-change="sortChange($event, 'create_time')">订单创建时间</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">
				<view class="">
					<text class="chat-custom-text">{{  item.address.userName }} {{ item.address.mobile }}  </text>
					<text class="chat-custom-text"> {{ item.address.info }}</text>
				</view>
			</uni-td>
            <uni-td align="center">
				<uni-list>
					<uni-list-chat 
						v-for="(goods, index) in item.cart"
						:title="goods.name" 
						:note="goods.sku_name" 
						:avatar="goods.goods_thumb ? goods.goods_thumb.url : ''"
					>
						<view class="chat-custom-right">
							<text class="chat-custom-text">¥{{ parseFloat(goods.price / 100).toFixed(2)  }}</text>
							<text class="chat-custom-text">x{{ goods.num }}</text>
						</view>
					</uni-list-chat>
				</uni-list>
			</uni-td>
            <uni-td align="center">{{item.type}}</uni-td>
            <uni-td align="center">{{options.pay_type_valuetotext[item.pay_type]}}</uni-td>
            <uni-td align="center">{{ parseFloat(item.pay_pirce / 100).toFixed(2) }}</uni-td>
            <uni-td align="center">{{ parseFloat(item.total_fee / 100).toFixed(2) }}</uni-td>
            <uni-td align="center">{{options.status_valuetotext[item.status]}}</uni-td>
            <uni-td align="center">{{item.info}}</uni-td>
            <uni-td align="center">{{options.platform_valuetotext[item.platform]}}</uni-td>
            <uni-td align="center">
              <uni-dateformat :threshold="[0, 0]" :date="item.create_time"></uni-dateformat>
            </uni-td>
            <uni-td align="center">
              <view class="uni-group">
                <button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
                <button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count" @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script>
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/uni-id-base-order.js';

  const db = uniCloud.database()
  // 表查询配置
  const dbOrderBy = '' // 排序字段
  const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表。联表查询格式: 主表字段名.副表字段名，例如用户表关联角色表 role.role_name
  // 分页配置
  const pageSize = 20
  const pageCurrent = 1

  const orderByMapping = {
    "ascending": "asc",
    "descending": "desc"
  }

  export default {
    data() {
      return {
        collectionList: "uni-id-base-order",
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {
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
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "uni-id-base-order.xls",
          "type": "xls",
          "fields": {
            "商品列表": "cart",
            "订单类型": "type",
            "支付渠道": "pay_type",
            "已支付金额": "pay_pirce",
            "订单总金额": "total_fee",
            "订单状态": "status",
            "其他信息": "info",
            "收件人": "address",
            "下单平台": "platform",
            "订单创建时间": "create_time"
          }
        },
        exportExcelData: []
      }
    },
    onLoad() {
      this._filter = {}
    },
    onReady() {
      this.$refs.udb.loadData()
    },
    methods: {
      onqueryload(data) {
        this.exportExcelData = data
      },
      getWhere() {
        const query = this.query.trim()
        if (!query) {
          return ''
        }
        const queryRe = new RegExp(query, 'i')
        return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
      },
      search() {
        const newWhere = this.getWhere()
        this.where = newWhere
        this.$nextTick(() => {
          this.loadData()
        })
      },
      loadData(clear = true) {
        this.$refs.udb.loadData({
          clear
        })
      },
      onPageChanged(e) {
        this.selectedIndexs.length = 0
        this.$refs.table.clearSelection()
        this.$refs.udb.loadData({
          current: e.current
        })
      },
      navigateTo(url, clear) {
        // clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
        uni.navigateTo({
          url,
          events: {
            refreshData: () => {
              this.loadData(clear)
            }
          }
        })
      },
      // 多选处理
      selectedItems() {
        var dataList = this.$refs.udb.dataList
        return this.selectedIndexs.map(i => dataList[i]._id)
      },
      // 批量删除
      delTable() {
        this.$refs.udb.remove(this.selectedItems(), {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      // 多选
      selectionChange(e) {
        this.selectedIndexs = e.detail.index
      },
      confirmDelete(id) {
        this.$refs.udb.remove(id, {
          success:(res) => {
            this.$refs.table.clearSelection()
          }
        })
      },
      sortChange(e, name) {
        this.orderByFieldName = name;
        if (e.order) {
          this.orderby = name + ' ' + orderByMapping[e.order]
        } else {
          this.orderby = ''
        }
        this.$refs.table.clearSelection()
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      },
      filterChange(e, name) {
        this._filter[name] = {
          type: e.filterType,
          value: e.filter
        }
        let newWhere = filterToWhere(this._filter, db.command)
        if (Object.keys(newWhere).length) {
          this.where = newWhere
        } else {
          this.where = ''
        }
        this.$nextTick(() => {
          this.$refs.udb.loadData()
        })
      }
    }
  }
</script>

<style>
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>
