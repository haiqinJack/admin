// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "cart": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "object"
      }
    ],
    "label": "商品列表"
  },
  "type": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "订单类型"
  },
  "pay_type": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "wxpay",
            "text": "微信支付"
          },
          {
            "value": "alipay",
            "text": "支付宝支付"
          }
        ]
      }
    ],
    "label": "支付渠道"
  },
  "pay_pirce": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "已支付金额"
  },
  "total_fee": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "订单总金额"
  },
  "status": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
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
        ]
      }
    ],
    "label": "订单状态"
  },
  "info": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "其他信息"
  },
  "address": {
    "rules": [
      {
        "format": "object"
      }
    ],
    "label": "收件人"
  },
  "platform": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "mp-weixin",
            "text": "微信小程序"
          },
          {
            "value": "mp-alipay",
            "text": "支付宝小程序"
          }
        ]
      }
    ],
    "defaultValue": "mp-weixin",
    "label": "下单平台"
  },
  "create_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "label": "订单创建时间"
  }
}

const enumConverter = {
  "pay_type_valuetotext": {
    "wxpay": "微信支付",
    "alipay": "支付宝支付"
  },
  "status_valuetotext": {
    "待付款": "待付款",
    "已付款": "已付款",
    "退款审核中": "退款审核中",
    "已退款": "已退款",
    "已完成": "已完成",
    "退款拒绝": "退款拒绝"
  },
  "platform_valuetotext": {
    "mp-weixin": "微信小程序",
    "mp-alipay": "支付宝小程序"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
