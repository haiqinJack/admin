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
      <unicloud-db ref="udb" :collection="collectionList" field="iconPath,title,desc,phone,latitude,longitude,status,restWeek" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'iconPath')">门店logo</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'title')" sortable @sort-change="sortChange($event, 'title')">门店标题</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'desc')" sortable @sort-change="sortChange($event, 'desc')">门店详细地址</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'phone')" sortable @sort-change="sortChange($event, 'phone')">门店管理员手机号</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'latitude')" sortable @sort-change="sortChange($event, 'latitude')">纬度</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'longitude')" sortable @sort-change="sortChange($event, 'longitude')">经度</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.status_localdata" @filter-change="filterChange($event, 'status')">门店状态</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.restWeek_localdata" @filter-change="filterChange($event, 'restWeek')">门店休息日</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">
              <uni-file-picker v-if="item.iconPath && item.iconPath.fileType == 'image'" :value="item.iconPath" :file-mediatype="item.iconPath && item.iconPath.fileType" return-type="object" :imageStyles="imageStyles" readonly></uni-file-picker>
              <uni-link v-else :href="item.iconPath && item.iconPath.url" :text="item.iconPath && item.iconPath.url"></uni-link>
            </uni-td>
            <uni-td align="center">{{item.title}}</uni-td>
            <uni-td align="center">{{item.desc}}</uni-td>
            <uni-td align="center">{{item.phone}}</uni-td>
            <uni-td align="center">{{item.latitude}}</uni-td>
            <uni-td align="center">{{item.longitude}}</uni-td>
            <uni-td align="center">{{options.status_valuetotext[item.status]}}</uni-td>
            <uni-td align="center">
              <uni-data-picker :localdata="options.restWeek_valuetotext" :value="item.restWeek" :border="false" :readonly="true" split=","></uni-data-picker>
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
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/shops.js';

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
        collectionList: "shops",
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {
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
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "shops.xls",
          "type": "xls",
          "fields": {
            "门店logo": "iconPath",
            "门店标题": "title",
            "门店详细地址": "desc",
            "门店管理员手机号": "phone",
            "纬度": "latitude",
            "经度": "longitude",
            "门店状态": "status",
            "门店休息日": "restWeek"
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
</style>
