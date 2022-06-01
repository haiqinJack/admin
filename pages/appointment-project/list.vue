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
      <unicloud-db ref="udb" :collection="collectionList" field="category_id{title as text},bannerfile,title,hours,price,order" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center">所属分类</uni-th>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'bannerfile')">图片文件</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'title')" sortable @sort-change="sortChange($event, 'title')">标题</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.hours_localdata" @filter-change="filterChange($event, 'hours')">可预约时间段</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'price')" sortable @sort-change="sortChange($event, 'price')">价格</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'order')" sortable @sort-change="sortChange($event, 'order')">排序</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">{{item.category_id && item.category_id[0] && item.category_id[0].text}}</uni-td>
            <uni-td align="center">
              <uni-file-picker v-if="item.bannerfile && item.bannerfile.fileType == 'image'" :value="item.bannerfile" :file-mediatype="item.bannerfile && item.bannerfile.fileType" return-type="object" :imageStyles="imageStyles" readonly></uni-file-picker>
              <uni-link v-else :href="item.bannerfile && item.bannerfile.url" :text="item.bannerfile && item.bannerfile.url"></uni-link>
            </uni-td>
            <uni-td align="center">{{item.title}}</uni-td>
            <uni-td align="center">
              <uni-data-picker :localdata="options.hours_valuetotext" :value="item.hours" :border="false" :readonly="true" split=","></uni-data-picker>
            </uni-td>
            <uni-td align="center">{{item.price}}</uni-td>
            <uni-td align="center">{{item.order}}</uni-td>
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
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/appointment-project.js';

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
        collectionList: [ db.collection('appointment-project').getTemp(), db.collection('appointment-category').getTemp() ],
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {
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
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "appointment-project.xls",
          "type": "xls",
          "fields": {
            "所属分类": "category_id",
            "图片文件": "bannerfile",
            "标题": "title",
            "可预约时间段": "hours",
            "价格": "price",
            "排序": "order"
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
