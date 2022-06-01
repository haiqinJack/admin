(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-pets-list"],{"0d7c":function(e,t,n){"use strict";n.r(t);var a=n("f4d89"),i=n("74df");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);var l,s=n("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"22399c4d",null,!1,a["a"],l);t["default"]=o.exports},"19fc":function(e,t,n){"use strict";n("a9e3"),n("2ca0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA:function(){return this._isH5=!0,!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created:function(){this._isH5=null},methods:{isMail:function(){return this.href.startsWith("mailto:")},isTel:function(){return this.href.startsWith("tel:")},openURL:function(){window.open(this.href)},makePhoneCall:function(e){uni.makePhoneCall({phoneNumber:e})}}};t.default=a},"5bcc":function(e,t,n){"use strict";var a=n("4ea4");n("4d63"),n("ac1f"),n("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.filterToWhere=o,t.enumConverter=t.validator=void 0;var i=a(n("3835")),r=a(n("b85c")),l={avatarUrl:{rules:[{format:"file"}],label:"宠物头像"},nickname:{rules:[{required:!0},{format:"string"}],label:"宠物昵称"},phone:{rules:[{required:!0},{format:"string"},{pattern:"^\\+?[0-9-]{3,20}$"}],label:"联系方式"},pet_group:{rules:[{required:!0},{format:"string"}],label:"宠物种类"},pet_type:{rules:[{required:!0},{format:"string"}],label:"宠物品种"},vaccines:{rules:[{required:!0},{format:"string"}],label:"疫苗情况"},pet_sex:{rules:[{required:!0},{format:"string"},{range:[{value:"公",text:"公"},{value:"母",text:"母"}]}],defaultValue:"母",label:"性别"},pet_weight:{rules:[{required:!0},{format:"double"}],label:"体重(kg)"},isSterilization:{rules:[{format:"string"},{range:[{value:"否",text:"否"},{value:"是",text:"是"}]}],defaultValue:"否",label:"是否绝育"},birthday:{rules:[{format:"date"}],label:"出生年月"}};t.validator=l;var s={pet_sex_valuetotext:{"公":"公","母":"母"},isSterilization_valuetotext:{"否":"否","是":"是"}};function o(e,t){var n={};for(var a in e){var l=e[a],s=l.type,o=l.value;switch(s){case"search":"string"===typeof o&&o.length&&(n[a]=new RegExp(o));break;case"select":if(o.length){var u,c=[],d=(0,r.default)(o);try{for(d.s();!(u=d.n()).done;){var f=u.value;c.push(t.eq(f))}}catch(k){d.e(k)}finally{d.f()}n[a]=t.or(c)}break;case"range":if(o.length){var h=o[0],v=o[1];n[a]=t.and([t.gte(h),t.lte(v)])}break;case"date":if(o.length){var p=(0,i.default)(o,2),g=p[0],b=p[1],_=new Date(g),y=new Date(b);n[a]=t.and([t.gte(_),t.lte(y)])}break;case"timestamp":if(o.length){var x=(0,i.default)(o,2),m=x[0],w=x[1];n[a]=t.and([t.gte(m),t.lte(w)])}break}}return n}t.enumConverter=s},"6f9c":function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"\n.uni-link[data-v-604a1870]{cursor:pointer}\n.uni-link--withline[data-v-604a1870]{text-decoration:underline}",""]),e.exports=t},"74df":function(e,t,n){"use strict";n.r(t);var a=n("81da"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},"81da":function(e,t,n){"use strict";(function(e){var a=n("4ea4");n("4de4"),n("d81d"),n("b64b"),n("4d63"),n("ac1f"),n("25f0"),n("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("5530")),r=n("5bcc"),l=e.database(),s="",o=[],u=20,c=1,d={ascending:"asc",descending:"desc"},f={data:function(){return{collectionList:[l.collection("pets").getTemp(),l.collection("pet-group").getTemp(),l.collection("pet-type").getTemp(),l.collection("vaccines").getTemp()],query:"",where:"",orderby:s,orderByFieldName:"",selectedIndexs:[],options:(0,i.default)({pageSize:u,pageCurrent:c,filterData:{pet_sex_localdata:[{value:"公",text:"公"},{value:"母",text:"母"}],isSterilization_localdata:[{value:"否",text:"否"},{value:"是",text:"是"}]}},r.enumConverter),imageStyles:{width:64,height:64},exportExcel:{filename:"pets.xls",type:"xls",fields:{"宠物头像":"avatarUrl","宠物昵称":"nickname","联系方式":"phone","宠物种类":"pet_group","宠物品种":"pet_type","疫苗情况":"vaccines","性别":"pet_sex","体重(kg)":"pet_weight","是否绝育":"isSterilization","出生年月":"birthday"}},exportExcelData:[]}},onLoad:function(){this._filter={}},onReady:function(){this.$refs.udb.loadData()},methods:{onqueryload:function(e){this.exportExcelData=e},getWhere:function(){var e=this.query.trim();if(!e)return"";var t=new RegExp(e,"i");return o.map((function(e){return t+".test("+e+")"})).join(" || ")},search:function(){var e=this,t=this.getWhere();this.where=t,this.$nextTick((function(){e.loadData()}))},loadData:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:e})},onPageChanged:function(e){this.selectedIndexs.length=0,this.$refs.table.clearSelection(),this.$refs.udb.loadData({current:e.current})},navigateTo:function(e,t){var n=this;uni.navigateTo({url:e,events:{refreshData:function(){n.loadData(t)}}})},selectedItems:function(){var e=this.$refs.udb.dataList;return this.selectedIndexs.map((function(t){return e[t]._id}))},delTable:function(){var e=this;this.$refs.udb.remove(this.selectedItems(),{success:function(t){e.$refs.table.clearSelection()}})},selectionChange:function(e){this.selectedIndexs=e.detail.index},confirmDelete:function(e){var t=this;this.$refs.udb.remove(e,{success:function(e){t.$refs.table.clearSelection()}})},sortChange:function(e,t){var n=this;this.orderByFieldName=t,e.order?this.orderby=t+" "+d[e.order]:this.orderby="",this.$refs.table.clearSelection(),this.$nextTick((function(){n.$refs.udb.loadData()}))},filterChange:function(e,t){var n=this;this._filter[t]={type:e.filterType,value:e.filter};var a=(0,r.filterToWhere)(this._filter,l.command);Object.keys(a).length?this.where=a:this.where="",this.$nextTick((function(){n.$refs.udb.loadData()}))}}};t.default=f}).call(this,n("a9ff")["default"])},"9d1d":function(e,t,n){"use strict";n.r(t);var a=n("19fc"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},b167:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShowA?n("a",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},attrs:{href:e.href,download:e.download}},[e._t("default",[e._v(e._s(e.text))])],2):n("v-uni-text",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openURL.apply(void 0,arguments)}}},[e._t("default",[e._v(e._s(e.text))])],2)},r=[]},cc1c:function(e,t,n){"use strict";n.r(t);var a=n("b167"),i=n("9d1d");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("cd1e");var l,s=n("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"604a1870",null,!1,a["a"],l);t["default"]=o.exports},cd1e:function(e,t,n){"use strict";var a=n("de2b"),i=n.n(a);i.a},de2b:function(e,t,n){var a=n("6f9c");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("1926026a",a,!0,{sourceMap:!1,shadowMode:!1})},f4d89:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var a={downloadExcel:n("de02").default,unicloudDb:n("960d").default,uniTable:n("5c2e").default,uniTr:n("c400").default,uniTh:n("0823").default,uniTd:n("cf88").default,uniFilePicker:n("39de").default,uniLink:n("cc1c").default,uniPagination:n("6b69").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"uni-header"},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-view",{staticClass:"uni-title"}),n("v-uni-view",{staticClass:"uni-sub-title"})],1),n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:"请输入搜索内容"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.search.apply(void 0,arguments)}}},[e._v("搜索")]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navigateTo("./add")}}},[e._v("新增")]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini",disabled:!e.selectedIndexs.length},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delTable.apply(void 0,arguments)}}},[e._v("批量删除")]),n("download-excel",{staticClass:"hide-on-phone",attrs:{fields:e.exportExcel.fields,data:e.exportExcelData,type:e.exportExcel.type,name:e.exportExcel.filename}},[n("v-uni-button",{staticClass:"uni-button",attrs:{type:"primary",size:"mini"}},[e._v("导出 Excel")])],1)],1)],1),n("v-uni-view",{staticClass:"uni-container"},[n("unicloud-db",{ref:"udb",attrs:{collection:e.collectionList,field:"avatarUrl,nickname,phone,pet_group{title as text},pet_type{title as text},vaccines{title as text},pet_sex,pet_weight,isSterilization,birthday",where:e.where,"page-data":"replace",orderby:e.orderby,getcount:!0,"page-size":e.options.pageSize,"page-current":e.options.pageCurrent,options:e.options,loadtime:"manual"},on:{load:function(t){arguments[0]=t=e.$handleEvent(t),e.onqueryload.apply(void 0,arguments)}},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.data,i=t.pagination,r=t.loading,l=t.error,s=t.options;return[n("uni-table",{ref:"table",attrs:{loading:r,emptyText:l.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(t){arguments[0]=t=e.$handleEvent(t),e.selectionChange.apply(void 0,arguments)}}},[n("uni-tr",[n("uni-th",{attrs:{align:"center",sortable:!0},on:{"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"avatarUrl")}}},[e._v("宠物头像")]),n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"nickname")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"nickname")}}},[e._v("宠物昵称")]),n("uni-th",{attrs:{align:"center","filter-type":"search",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"phone")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"phone")}}},[e._v("联系方式")]),n("uni-th",{attrs:{align:"center"}},[e._v("宠物种类")]),n("uni-th",{attrs:{align:"center"}},[e._v("宠物品种")]),n("uni-th",{attrs:{align:"center"}},[e._v("疫苗情况")]),n("uni-th",{attrs:{align:"center","filter-type":"select","filter-data":s.filterData.pet_sex_localdata},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"pet_sex")}}},[e._v("性别")]),n("uni-th",{attrs:{align:"center","filter-type":"range",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"pet_weight")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"pet_weight")}}},[e._v("体重(kg)")]),n("uni-th",{attrs:{align:"center","filter-type":"select","filter-data":s.filterData.isSterilization_localdata},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"isSterilization")}}},[e._v("是否绝育")]),n("uni-th",{attrs:{align:"center","filter-type":"date",sortable:!0},on:{"filter-change":function(t){arguments[0]=t=e.$handleEvent(t),e.filterChange(t,"birthday")},"sort-change":function(t){arguments[0]=t=e.$handleEvent(t),e.sortChange(t,"birthday")}}},[e._v("出生年月")]),n("uni-th",{attrs:{align:"center"}},[e._v("操作")])],1),e._l(a,(function(t,a){return n("uni-tr",{key:a},[n("uni-td",{attrs:{align:"center"}},[t.avatarUrl&&"image"==t.avatarUrl.fileType?n("uni-file-picker",{attrs:{value:t.avatarUrl,"file-mediatype":t.avatarUrl&&t.avatarUrl.fileType,"return-type":"object",imageStyles:e.imageStyles,readonly:!0}}):n("uni-link",{attrs:{href:t.avatarUrl&&t.avatarUrl.url,text:t.avatarUrl&&t.avatarUrl.url}})],1),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.nickname))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.phone))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.pet_group&&t.pet_group[0]&&t.pet_group[0].text))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.pet_type&&t.pet_type[0]&&t.pet_type[0].text))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.vaccines&&t.vaccines[0]&&t.vaccines[0].text))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(s.pet_sex_valuetotext[t.pet_sex]))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.pet_weight))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(s.isSterilization_valuetotext[t.isSterilization]))]),n("uni-td",{attrs:{align:"center"}},[e._v(e._s(t.birthday))]),n("uni-td",{attrs:{align:"center"}},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo("./edit?id="+t._id,!1)}}},[e._v("修改")]),n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.confirmDelete(t._id)}}},[e._v("删除")])],1)],1)],1)}))],2),n("v-uni-view",{staticClass:"uni-pagination-box"},[n("uni-pagination",{attrs:{"show-icon":!0,"page-size":i.size,total:i.count},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.onPageChanged.apply(void 0,arguments)}},model:{value:i.current,callback:function(t){e.$set(i,"current",t)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]}}]);