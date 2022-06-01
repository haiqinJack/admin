// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "appointment_project_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "关联的预约项目"
  },
  "shop_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "门店"
  },
  "project_single_id": {
    "rules": [
      {
        "format": "array"
      }
    ],
    "defaultValue": [],
    "label": "关联的增值服务"
  },
  "mobile": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "联系方式"
  },
  "order_price": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "订单金额"
  },
  "pay_pirce": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "已支付金额"
  },
  "pay_status": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "已支付",
            "text": "已支付"
          },
          {
            "value": "未支付",
            "text": "未支付"
          }
        ]
      }
    ],
    "defaultValue": "未支付",
    "label": "支付状态"
  },
  "pay_type": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "alipay",
            "text": "支付宝支付"
          },
          {
            "value": "wxpay",
            "text": "微信支付"
          },
          {
            "value": "meituan",
            "text": "美团"
          }
        ]
      }
    ],
    "label": "下单渠道"
  },
  "status": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "预约中",
            "text": "预约中"
          },
          {
            "value": "服务完成",
            "text": "服务完成"
          }
        ]
      }
    ],
    "defaultValue": "预约中",
    "label": "服务状态"
  },
  "year": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "年"
  },
  "month": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "月"
  },
  "date": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "日"
  },
  "hour": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "时"
  },
  "outTradeNo": {
    "rules": [
      {
        "format": "string"
      }
    ]
  },
  "pet": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "object"
      }
    ],
    "label": "宠物信息"
  },
  "_createTime": {
    "rules": [
      {
        "format": "timestamp"
      }
    ]
  }
}

const enumConverter = {
  "pay_status_valuetotext": {
    "已支付": "已支付",
    "未支付": "未支付"
  },
  "pay_type_valuetotext": {
    "alipay": "支付宝支付",
    "wxpay": "微信支付",
    "meituan": "美团"
  },
  "status_valuetotext": {
    "预约中": "预约中",
    "服务完成": "服务完成"
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
