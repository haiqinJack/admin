(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-user-add"],{"076f":function(t,e,a){"use strict";var n=a("4ea4");a("4d63"),a("ac1f"),a("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.filterToWhere=l,e.enumConverter=e.validator=void 0;var i=n(a("3835")),o=n(a("b85c")),r={username:{rules:[{required:!0},{format:"string"},{minLength:2}],label:"用户名"},password:{rules:[{required:!0},{format:"password"},{minLength:6}],label:"密码"},mobile:{rules:[{format:"string"},{pattern:"^\\+?[0-9-]{3,20}$"}],label:"手机号码"},status:{rules:[{format:"int"},{range:[{text:"正常",value:0},{text:"禁用",value:1},{text:"审核中",value:2},{text:"审核拒绝",value:3}]}],defaultValue:0,label:"用户状态"},email:{rules:[{format:"string"},{format:"email"}],label:"邮箱"},role:{rules:[{format:"array"}],label:"角色"},last_login_date:{rules:[{format:"timestamp"}]}};e.validator=r;var s={status_valuetotext:{0:"正常",1:"禁用",2:"审核中",3:"审核拒绝"}};function l(t,e){var a={};for(var n in t){var r=t[n],s=r.type,l=r.value;switch(s){case"search":"string"===typeof l&&l.length&&(a[n]=new RegExp(l));break;case"select":if(l.length){var u,c=[],d=(0,o.default)(l);try{for(d.s();!(u=d.n()).done;){var f=u.value;c.push(e.eq(f))}}catch(k){d.e(k)}finally{d.f()}a[n]=e.or(c)}break;case"range":if(l.length){var p=l[0],m=l[1];a[n]=e.and([e.gte(p),e.lte(m)])}break;case"date":if(l.length){var h=(0,i.default)(l,2),v=h[0],b=h[1],g=new Date(v),x=new Date(b);a[n]=e.and([e.gte(g),e.lte(x)])}break;case"timestamp":if(l.length){var y=(0,i.default)(l,2),w=y[0],_=y[1];a[n]=e.and([e.gte(w),e.lte(_)])}break}}return a}e.enumConverter=s},"19e9":function(t,e,a){var n=a("1e50");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("01139f69",n,!0,{sourceMap:!1,shadowMode:!1})},"1e25":function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").end,o=a("c8d2"),r=o("trimEnd"),s=r?function(){return i(this)}:"".trimEnd;n({target:"String",proto:!0,forced:r},{trimEnd:s,trimRight:s})},"1e50":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,"[data-v-0b78a75d] .uni-forms-item__label{width:90px!important}",""]),t.exports=e},"24fa":function(t,e,a){"use strict";a.r(e);var n=a("4343"),i=a("cdfa");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("5083");var r,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"0b78a75d",null,!1,n["a"],r);e["default"]=l.exports},"25c1":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uniIcons:a("1c81").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-easyinput",class:{"uni-easyinput-error":t.msg},style:{color:t.inputBorder&&t.msg?"#e43d33":t.styles.color}},[a("v-uni-view",{staticClass:"uni-easyinput__content",class:{"is-input-border":t.inputBorder,"is-input-error-border":t.inputBorder&&t.msg,"is-textarea":"textarea"===t.type,"is-disabled":t.disabled},style:{"border-color":t.inputBorder&&t.msg?"#dd524d":t.styles.borderColor,"background-color":t.disabled?t.styles.disableColor:""}},[t.prefixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.prefixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("prefix")}}}):t._e(),"textarea"===t.type?a("v-uni-textarea",{staticClass:"uni-easyinput__content-textarea",class:{"input-padding":t.inputBorder},attrs:{name:t.name,value:t.val,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,disabled:t.disabled,"placeholder-class":"uni-easyinput__placeholder-class",maxlength:t.inputMaxlength,focus:t.focused,autoHeight:t.autoHeight},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}):a("v-uni-input",{staticClass:"uni-easyinput__content-input",style:{"padding-right":"password"===t.type||t.clearable||t.prefixIcon?"":"10px","padding-left":t.prefixIcon?"":"10px"},attrs:{type:"password"===t.type?"text":t.type,name:t.name,value:t.val,password:!t.showPassword&&"password"===t.type,placeholder:t.placeholder,placeholderStyle:t.placeholderStyle,"placeholder-class":"uni-easyinput__placeholder-class",disabled:t.disabled,maxlength:t.inputMaxlength,focus:t.focused,confirmType:t.confirmType},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.onFocus.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.onBlur.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.onInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}}),"password"===t.type&&t.passwordIcon?[t.val?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:t.showPassword?"eye-slash-filled":"eye-filled",size:18,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onEyes.apply(void 0,arguments)}}}):t._e()]:t.suffixIcon?[t.suffixIcon?a("uni-icons",{staticClass:"content-clear-icon",attrs:{type:t.suffixIcon,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClickIcon("suffix")}}}):t._e()]:[t.clearable&&t.val&&!t.disabled?a("uni-icons",{staticClass:"content-clear-icon",class:{"is-textarea-icon":"textarea"===t.type},attrs:{type:"clear",size:t.clearSize,color:"#c0c4cc"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}}):t._e()],t._t("right")],2)],1)},o=[]},"3ad0":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-easyinput[data-v-f6b46c1e]{width:100%;flex:1;position:relative;text-align:left;color:#333;font-size:14px}.uni-easyinput__content[data-v-f6b46c1e]{flex:1;width:100%;display:flex;box-sizing:border-box;min-height:36px;flex-direction:row;align-items:center}.uni-easyinput__content-input[data-v-f6b46c1e]{width:auto;position:relative;overflow:hidden;flex:1;line-height:1;font-size:14px}.uni-easyinput__placeholder-class[data-v-f6b46c1e]{color:#999;font-size:12px;font-weight:200}.is-textarea[data-v-f6b46c1e]{align-items:flex-start}.is-textarea-icon[data-v-f6b46c1e]{margin-top:5px}.uni-easyinput__content-textarea[data-v-f6b46c1e]{position:relative;overflow:hidden;flex:1;line-height:1.5;font-size:14px;padding-top:6px;padding-bottom:10px;height:80px;min-height:80px;width:auto}.input-padding[data-v-f6b46c1e]{padding-left:10px}.content-clear-icon[data-v-f6b46c1e]{padding:0 5px}.label-icon[data-v-f6b46c1e]{margin-right:5px;margin-top:-1px}.is-input-border[data-v-f6b46c1e]{display:flex;box-sizing:border-box;flex-direction:row;align-items:center;border:1px solid #dcdfe6;border-radius:4px}.uni-error-message[data-v-f6b46c1e]{position:absolute;bottom:-17px;left:0;line-height:12px;color:#e43d33;font-size:12px;text-align:left}.uni-error-msg--boeder[data-v-f6b46c1e]{position:relative;bottom:0;line-height:22px}.is-input-error-border[data-v-f6b46c1e]{border-color:#e43d33}.is-input-error-border .uni-easyinput__placeholder-class[data-v-f6b46c1e]{color:#f29e99}.uni-easyinput--border[data-v-f6b46c1e]{margin-bottom:0;padding:10px 15px;border-top:1px #eee solid}.uni-easyinput-error[data-v-f6b46c1e]{padding-bottom:0}.is-first-border[data-v-f6b46c1e]{border:none}.is-disabled[data-v-f6b46c1e]{border-color:red;background-color:#f7f6f6;color:#d5d5d5}.is-disabled .uni-easyinput__placeholder-class[data-v-f6b46c1e]{color:#d5d5d5;font-size:12px}',""]),t.exports=e},4343:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uniForms:a("5f92").default,uniFormsItem:a("8995").default,uniEasyinput:a("fcad").default,uniDataCheckbox:a("92b1").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-container"},[a("uni-forms",{ref:"form",attrs:{rules:t.rules,validateTrigger:"bind"},on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}},model:{value:t.formData,callback:function(e){t.formData=e},expression:"formData"}},[a("uni-forms-item",{attrs:{name:"username",label:"用户名",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入用户名"},model:{value:t.formData.username,callback:function(e){t.$set(t.formData,"username",e)},expression:"formData.username"}})],1),a("uni-forms-item",{attrs:{name:"password",label:"初始密码",required:!0}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入初始密码"},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}})],1),a("uni-forms-item",{staticClass:"flex-center-x",attrs:{name:"role",label:"角色列表"}},[a("uni-data-checkbox",{attrs:{multiple:!0,localdata:t.roles},model:{value:t.formData.role,callback:function(e){t.$set(t.formData,"role",e)},expression:"formData.role"}})],1),a("uni-forms-item",{staticClass:"flex-center-x",attrs:{name:"tags",label:"用户标签",labelWidth:"100"}},[a("uni-data-checkbox",{ref:"checkbox",attrs:{multiple:!0,collection:"uni-id-tag",field:"tagid as value, name as text"},model:{value:t.formData.tags,callback:function(e){t.$set(t.formData,"tags",e)},expression:"formData.tags"}}),a("span",{staticClass:"link-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTagAdd.apply(void 0,arguments)}}},[t._v("新增")]),a("span",{staticClass:"link-btn",staticStyle:{"margin-left":"10px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoTagList.apply(void 0,arguments)}}},[t._v("管理")])],1),a("uni-forms-item",{staticClass:"flex-center-x",attrs:{name:"dcloud_appid",label:"可登录应用",labelWidth:"100"}},[a("uni-data-checkbox",{attrs:{multiple:!0,collection:"opendb-app-list",field:"appid as value, name as text"},model:{value:t.formData.dcloud_appid,callback:function(e){t.$set(t.formData,"dcloud_appid",e)},expression:"formData.dcloud_appid"}}),a("span",{staticClass:"link-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gotoAppList.apply(void 0,arguments)}}},[t._v("管理")])],1),a("uni-forms-item",{attrs:{name:"mobile",label:"手机号"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入手机号"},model:{value:t.formData.mobile,callback:function(e){t.$set(t.formData,"mobile",e)},expression:"formData.mobile"}})],1),a("uni-forms-item",{attrs:{name:"email",label:"邮箱"}},[a("uni-easyinput",{attrs:{clearable:!1,placeholder:"请输入邮箱"},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}})],1),a("uni-forms-item",{attrs:{name:"status",label:"是否启用"}},[a("v-uni-switch",{attrs:{checked:t.formData.status},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.binddata("status",e.detail.value)}}})],1),a("v-uni-view",{staticClass:"uni-button-group"},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submitForm.apply(void 0,arguments)}}},[t._v(t._s(t.$t("common.button.submit")))]),a("v-uni-navigator",{staticStyle:{"margin-left":"15px"},attrs:{"open-type":"navigateBack"}},[a("v-uni-button",{staticClass:"uni-button",staticStyle:{width:"100px"}},[t._v(t._s(t.$t("common.button.back")))])],1)],1)],1)],1)},o=[]},"4b52":function(t,e,a){"use strict";(function(t){var n=a("4ea4");a("caad"),a("c975"),a("d81d"),a("a9e3"),a("d3b7"),a("2532"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("5530")),o=a("076f"),r=t.database();r.command;function s(t){var e={};for(var a in o.validator)t.includes(a)&&(e[a]=o.validator[a]);return e}var l={data:function(){return{formData:{username:"",password:"",role:[],dcloud_appid:[],tags:[],mobile:"",email:"",status:!0},rules:(0,i.default)((0,i.default)({},s(["username","password","role","mobile","email"])),{},{status:{rules:[{format:"bool"}]}}),roles:[]}},onLoad:function(){this.loadroles()},methods:{gotoAppList:function(){uni.navigateTo({url:"../app/list"})},gotoTagList:function(){uni.navigateTo({url:"../tag/list"})},gotoTagAdd:function(){var t=this;uni.navigateTo({url:"../tag/add",events:{refreshCheckboxData:function(){t.$refs.checkbox.loadData()}}})},submitForm:function(){this.$refs.form.submit()},submit:function(t){var e=this,a=t.detail,n=a.value,i=a.errors;i||(uni.showLoading({title:"提交中...",mask:!0}),"boolean"===typeof n.status&&(n.status=Number(!n.status)),this.$request("registerUser",n,{functionName:"uni-id-cf"}).then((function(t){uni.showToast({title:"新增成功"}),e.getOpenerEventChannel().emit("refreshData"),setTimeout((function(){return uni.navigateBack()}),500)})).catch((function(t){uni.showModal({content:t.message||"请求服务失败",showCancel:!1})})).finally((function(t){uni.hideLoading()})))},loadroles:function(){var t=this;r.collection("uni-id-roles").limit(500).get().then((function(e){var a=[];t.roles=e.result.data.map((function(t){return a.push(t.role_id),{value:t.role_id,text:t.role_name}})),-1===a.indexOf("admin")&&t.roles.unshift({value:"admin",text:"超级管理员"})})).catch((function(t){uni.showModal({title:"提示",content:t.message,showCancel:!1})}))}}};e.default=l}).call(this,a("a9ff")["default"])},5083:function(t,e,a){"use strict";var n=a("19e9"),i=a.n(n);i.a},6370:function(t,e,a){var n=a("3ad0");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("259271ad",n,!0,{sourceMap:!1,shadowMode:!1})},"8d76":function(t,e,a){"use strict";a("a9e3"),a("ac1f"),a("5319"),a("498a"),a("1e25"),a("eee7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"uni-easyinput",emits:["click","iconClick","update:modelValue","input","focus","blur","confirm"],model:{prop:"modelValue",event:"update:modelValue"},props:{name:String,value:[Number,String],modelValue:[Number,String],type:{type:String,default:"text"},clearable:{type:Boolean,default:!0},autoHeight:{type:Boolean,default:!1},placeholder:String,placeholderStyle:String,focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},clearSize:{type:[Number,String],default:15},inputBorder:{type:Boolean,default:!0},prefixIcon:{type:String,default:""},suffixIcon:{type:String,default:""},trim:{type:[Boolean,String],default:!0},passwordIcon:{type:Boolean,default:!0},styles:{type:Object,default:function(){return{color:"#333",disableColor:"#F7F6F6",borderColor:"#e5e5e5"}}},errorMessage:{type:[String,Boolean],default:""}},data:function(){return{focused:!1,errMsg:"",val:"",showMsg:"",border:!1,isFirstBorder:!1,showClearIcon:!1,showPassword:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg},inputMaxlength:function(){return Number(this.maxlength)}},watch:{value:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},modelValue:function(t){this.errMsg&&(this.errMsg=""),this.val=t,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(t))},focus:function(t){var e=this;this.$nextTick((function(){e.focused=e.focus}))}},created:function(){this.value||0===this.value||(this.val=this.modelValue),this.modelValue||0===this.modelValue||(this.val=this.value),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.is_reset||(this.is_reset=!1,this.formItem.setValue(this.val)),this.rename=this.formItem.name,this.form.inputChildrens.push(this))},mounted:function(){var t=this;this.$nextTick((function(){t.focused=t.focus}))},methods:{init:function(){},onClickIcon:function(t){this.$emit("iconClick",t)},getForm:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniForms",e=this.$parent,a=e.$options.name;while(a!==t){if(e=e.$parent,!e)return!1;a=e.$options.name}return e},onEyes:function(){this.showPassword=!this.showPassword},onInput:function(t){var e=t.detail.value;this.trim&&("boolean"===typeof this.trim&&this.trim&&(e=this.trimStr(e)),"string"===typeof this.trim&&(e=this.trimStr(e,this.trim))),this.errMsg&&(this.errMsg=""),this.val=e,this.$emit("input",e),this.$emit("update:modelValue",e)},onFocus:function(t){this.$emit("focus",t)},onBlur:function(t){t.detail.value;this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.val="",this.$emit("input",""),this.$emit("update:modelValue","")},fieldClick:function(){this.$emit("click")},trimStr:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"both";return"both"===e?t.trim():"left"===e?t.trimLeft():"right"===e?t.trimRight():"start"===e?t.trimStart():"end"===e?t.trimEnd():"all"===e?t.replace(/\s+/g,""):t}}};e.default=n},"9dc2":function(t,e,a){"use strict";var n=a("6370"),i=a.n(n);i.a},cdfa:function(t,e,a){"use strict";a.r(e);var n=a("4b52"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},e10f:function(t,e,a){"use strict";a.r(e);var n=a("8d76"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},eee7:function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").start,o=a("c8d2"),r=o("trimStart"),s=r?function(){return i(this)}:"".trimStart;n({target:"String",proto:!0,forced:r},{trimStart:s,trimLeft:s})},fcad:function(t,e,a){"use strict";a.r(e);var n=a("25c1"),i=a("e10f");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("9dc2");var r,s=a("f0c5"),l=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"f6b46c1e",null,!1,n["a"],r);e["default"]=l.exports}}]);