(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-opendb-mall-categories-list"],{"19fc":function(e,t,n){"use strict";n("a9e3"),n("2ca0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA:function(){return this._isH5=!0,!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created:function(){this._isH5=null},methods:{isMail:function(){return this.href.startsWith("mailto:")},isTel:function(){return this.href.startsWith("tel:")},openURL:function(){window.open(this.href)},makePhoneCall:function(e){uni.makePhoneCall({phoneNumber:e})}}};t.default=i},"52f0":function(e,t,n){"use strict";var i=n("4ea4");n("4d63"),n("ac1f"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.filterToWhere=l,t.enumConverter=t.validator=void 0;var a=i(n("3835")),r=i(n("b85c")),o={name:{rules:[{required:!0},{format:"string"}],label:"类别名称"},icon:{rules:[{format:"file"}],label:"图标地址"},sort:{rules:[{format:"int"}],label:"排序"},description:{rules:[{format:"string"}],label:"类别描述"},is_hot_show:{rules:[{format:"bool"}],label:"加入热门显示"},is_index_show:{rules:[{format:"bool"}],label:"首页显示"}};t.validator=o;var s={};function l(e,t){var n={};for(var i in e){var o=e[i],s=o.type,l=o.value;switch(s){case"search":"string"===typeof l&&l.length&&(n[i]=new RegExp(l));break;case"select":if(l.length){var u,c=[],d=(0,r.default)(l);try{for(d.s();!(u=d.n()).done;){var f=u.value;c.push(t.eq(f))}}catch(C){d.e(C)}finally{d.f()}n[i]=t.or(c)}break;case"range":if(l.length){var h=l[0],v=l[1];n[i]=t.and([t.gte(h),t.lte(v)])}break;case"date":if(l.length){var p=(0,a.default)(l,2),g=p[0],b=p[1],y=new Date(g),_=new Date(b);n[i]=t.and([t.gte(y),t.lte(_)])}break;case"timestamp":if(l.length){var m=(0,a.default)(l,2),w=m[0],x=m[1];n[i]=t.and([t.gte(w),t.lte(x)])}break}}return n}t.enumConverter=s},"6f9c":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,"\n.uni-link[data-v-604a1870]{cursor:pointer}\n.uni-link--withline[data-v-604a1870]{text-decoration:underline}",""]),e.exports=t},"9d1d":function(e,t,n){"use strict";n.r(t);var i=n("19fc"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},b167:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShowA?n("a",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},attrs:{href:e.href,download:e.download}},[e._t("default",[e._v(e._s(e.text))])],2):n("v-uni-text",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openURL.apply(void 0,arguments)}}},[e._t("default",[e._v(e._s(e.text))])],2)},r=[]},cc1c:function(e,t,n){"use strict";n.r(t);var i=n("b167"),a=n("9d1d");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("cd1e");var o,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"604a1870",null,!1,i["a"],o);t["default"]=l.exports},cd1e:function(e,t,n){"use strict";var i=n("de2b"),a=n.n(i);a.a},d553:function(e,t,n){"use strict";n.r(t);var i=n("f829"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},de2b:function(e,t,n){var i=n("6f9c");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("1926026a",i,!0,{sourceMap:!1,shadowMode:!1})},ecfb:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={downloadExcel:n("de02").default,unicloudDb:n("960d").default,uniTable:n("5c2e").default,uniTr:n("c400").default,uniTh:n("0823").default,uniTd:n("cf88").default,uniFilePicker:n("39de").default,uniLink:n("cc1c").default,uniPagination:n("6b69").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"uni-header"},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-view",{staticClass:"uni-title"}),n("v-uni-view",{staticClass:"uni-sub-title"})],1),n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:"请输入搜索内容"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}}},[e._v("搜索")]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navigateTo("./add")}}},[e._v("新增")]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini",disabled:!e.selectedIndexs.length},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delTable.apply(void 0,arguments)}}},[e._v("批量删除")]),n("download-excel",{staticClass:"hide-on-phone",attrs:{fields:e.exportExcel.fields,data:e.exportExcelData,type:e.exportExcel.type,name:e.exportExcel.filename}},[n("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",size:"mini"}},[e._v("导出 Excel")])],1)],1)],1),n("v-uni-view",{staticClass:"uni-container"},[n("unicloud-db",{ref:"udb",attrs:{collection:e.collectionList,field:"name,icon,sort,description,is_hot_show,is_index_show",where:e.where,"page-data":"replace",orderby:e.orderby,getcount:!0,"page-size":e.options.pageSize,"page-current":e.options.pageCurrent,options:e.options,loadtime:"manual"},on:{load:function(t){arguments[0]=t=e.$handleEvent(t),e.onqueryload.apply(void 0,arguments)}},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.data,a=t.pagination,r=t.loading,o=t.error;t.options;return[n("uni-table",{ref:"table",attrs:{loading:r,emptyText:o.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(t){arguments[0]=t=e.$handleEvent(t),e.selectionChange.apply(void 0,arguments)}}},[n("uni-tr",[n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"name")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"name")}}},[e._v("类别名称")]),n("uni-th",{attrs:{align:"center",sortable:!0},on:{"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"icon")}}},[e._v("图标地址")]),n("uni-th",{attrs:{align:"center","filter-type":"range",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"sort")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"sort")}}},[e._v("排序")]),n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"description")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"description")}}},[e._v("类别描述")]),n("uni-th",{attrs:{align:"center",sortable:!0},on:{"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"is_hot_show")}}},[e._v("加入热门显示")]),n("uni-th",{attrs:{align:"center",sortable:!0},on:{"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"is_index_show")}}},[e._v("首页显示")]),n("uni-th",{attrs:{align:"center"}},[e._v("操作")])],1),e._l(i,(function(t,i){return n("uni-tr",{key:i},[n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.name))]),n("uni-td",{attrs:{align:"center"}},[t.icon&&"image"==t.icon.fileType?n("uni-file-picker",{attrs:{value:t.icon,"file-mediatype":t.icon&&t.icon.fileType,"return-type":"object",imageStyles:e.imageStyles,readonly:!0}}):n("uni-link",{attrs:{href:t.icon&&t.icon.url,text:t.icon&&t.icon.url}})],1),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.sort))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.description))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(1==t.is_hot_show?"✅":"❌"))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(1==t.is_index_show?"✅":"❌"))]),n("uni-td",{attrs:{align:"center"}},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo("./edit?id="+t._id,!1)}}},[e._v("修改")]),n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.confirmDelete(t._id)}}},[e._v("删除")])],1)],1)],1)}))],2),n("v-uni-view",{staticClass:"uni-pagination-box"},[n("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(t){e.$set(a,"current",t)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]},f522:function(e,t,n){"use strict";n.r(t);var i=n("ecfb"),a=n("d553");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);var o,s=n("f0c5"),l=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"cf24ab24",null,!1,i["a"],o);t["default"]=l.exports},f829:function(e,t,n){"use strict";(function(e){var i=n("4ea4");n("4de4"),n("d81d"),n("b64b"),n("4d63"),n("ac1f"),n("25f0"),n("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("5530")),r=n("52f0"),o=e.database(),s="",l=[],u=20,c=1,d={ascending:"asc",descending:"desc"},f={data:function(){return{collectionList:"opendb-mall-categories",query:"",where:"",orderby:s,orderByFieldName:"",selectedIndexs:[],options:(0,a.default)({pageSize:u,pageCurrent:c,filterData:{}},r.enumConverter),imageStyles:{width:64,height:64},exportExcel:{filename:"opendb-mall-categories.xls",type:"xls",fields:{"类别名称":"name","图标地址":"icon","排序":"sort","类别描述":"description","加入热门显示":"is_hot_show","首页显示":"is_index_show"}},exportExcelData:[]}},onLoad:function(){this._filter={}},onReady:function(){this.$refs.udb.loadData()},methods:{onqueryload:function(e){this.exportExcelData=e},getWhere:function(){var e=this.query.trim();if(!e)return"";var t=new RegExp(e,"i");return l.map((function(e){return t+".test("+e+")"})).join(" || ")},search:function(){var e=this,t=this.getWhere();this.where=t,this.$nextTick((function(){e.loadData()}))},loadData:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:e})},onPageChanged:function(e){this.selectedIndexs.length=0,this.$refs.table.clearSelection(),this.$refs.udb.loadData({current:e.current})},navigateTo:function(e,t){var n=this;uni.navigateTo({url:e,events:{refreshData:function(){n.loadData(t)}}})},selectedItems:function(){var e=this.$refs.udb.dataList;return this.selectedIndexs.map((function(t){return e[t]._id}))},delTable:function(){var e=this;this.$refs.udb.remove(this.selectedItems(),{success:function(t){e.$refs.table.clearSelection()}})},selectionChange:function(e){this.selectedIndexs=e.detail.index},confirmDelete:function(e){var t=this;this.$refs.udb.remove(e,{success:function(e){t.$refs.table.clearSelection()}})},sortChange:function(e,t){var n=this;this.orderByFieldName=t,e.order?this.orderby=t+" "+d[e.order]:this.orderby="",this.$refs.table.clearSelection(),this.$nextTick((function(){n.$refs.udb.loadData()}))},filterChange:function(e,t){var n=this;this._filter[t]={type:e.filterType,value:e.filter};var i=(0,r.filterToWhere)(this._filter,o.command);Object.keys(i).length?this.where=i:this.where="",this.$nextTick((function(){n.$refs.udb.loadData()}))}}};t.default=f}).call(this,n("a9ff")["default"])}}]);