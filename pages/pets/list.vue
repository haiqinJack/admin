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
      <unicloud-db ref="udb" :collection="collectionList" field="avatarUrl,nickname,phone,pet_group{title as text},pet_type{title as text},vaccines{title as text},pet_sex,pet_weight,isSterilization,birthday" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options" loadtime="manual" @load="onqueryload">
        <uni-table ref="table" :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
            <uni-th align="center" sortable @sort-change="sortChange($event, 'avatarUrl')">宠物头像</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'nickname')" sortable @sort-change="sortChange($event, 'nickname')">宠物昵称</uni-th>
            <uni-th align="center" filter-type="search" @filter-change="filterChange($event, 'phone')" sortable @sort-change="sortChange($event, 'phone')">联系方式</uni-th>
            <uni-th align="center">宠物种类</uni-th>
            <uni-th align="center">宠物品种</uni-th>
            <uni-th align="center">疫苗情况</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.pet_sex_localdata" @filter-change="filterChange($event, 'pet_sex')">性别</uni-th>
            <uni-th align="center" filter-type="range" @filter-change="filterChange($event, 'pet_weight')" sortable @sort-change="sortChange($event, 'pet_weight')">体重(kg)</uni-th>
            <uni-th align="center" filter-type="select" :filter-data="options.filterData.isSterilization_localdata" @filter-change="filterChange($event, 'isSterilization')">是否绝育</uni-th>
            <uni-th align="center" filter-type="date" @filter-change="filterChange($event, 'birthday')" sortable @sort-change="sortChange($event, 'birthday')">出生年月</uni-th>
            <uni-th align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
            <uni-td align="center">
              <uni-file-picker v-if="item.avatarUrl && item.avatarUrl.fileType == 'image'" :value="item.avatarUrl" :file-mediatype="item.avatarUrl && item.avatarUrl.fileType" return-type="object" :imageStyles="imageStyles" readonly></uni-file-picker>
              <uni-link v-else :href="item.avatarUrl && item.avatarUrl.url" :text="item.avatarUrl && item.avatarUrl.url"></uni-link>
            </uni-td>
            <uni-td align="center">{{item.nickname}}</uni-td>
            <uni-td align="center">{{item.phone}}</uni-td>
            <uni-td align="center">{{item.pet_group && item.pet_group[0] && item.pet_group[0].text}}</uni-td>
            <uni-td align="center">{{item.pet_type && item.pet_type[0] && item.pet_type[0].text}}</uni-td>
            <uni-td align="center">{{item.vaccines && item.vaccines[0] && item.vaccines[0].text}}</uni-td>
            <uni-td align="center">{{options.pet_sex_valuetotext[item.pet_sex]}}</uni-td>
            <uni-td align="center">{{item.pet_weight}}</uni-td>
            <uni-td align="center">{{options.isSterilization_valuetotext[item.isSterilization]}}</uni-td>
            <uni-td align="center">{{item.birthday}}</uni-td>
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
  import { enumConverter, filterToWhere } from '../../js_sdk/validator/pets.js';

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
        collectionList: [ db.collection('pets').getTemp(), db.collection('pet-group').getTemp(), db.collection('pet-type').getTemp(), db.collection('vaccines').getTemp() ],
        query: '',
        where: '',
        orderby: dbOrderBy,
        orderByFieldName: "",
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          filterData: {
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
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        },
        exportExcel: {
          "filename": "pets.xls",
          "type": "xls",
          "fields": {
            "宠物头像": "avatarUrl",
            "宠物昵称": "nickname",
            "联系方式": "phone",
            "宠物种类": "pet_group",
            "宠物品种": "pet_type",
            "疫苗情况": "vaccines",
            "性别": "pet_sex",
            "体重(kg)": "pet_weight",
            "是否绝育": "isSterilization",
            "出生年月": "birthday"
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
