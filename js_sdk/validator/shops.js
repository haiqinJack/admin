// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "iconPath": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "file"
      }
    ],
    "label": "门店logo"
  },
  "title": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "门店标题"
  },
  "desc": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "门店详细地址"
  },
  "phone": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      },
      {
        "pattern": "^\\+?[0-9-]{3,20}$"
      }
    ],
    "label": "门店管理员手机号"
  },
  "latitude": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "double"
      }
    ],
    "label": "纬度"
  },
  "longitude": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "double"
      }
    ],
    "label": "经度"
  },
  "status": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "营业中",
            "text": "营业中"
          },
          {
            "value": "休息中",
            "text": "休息中"
          }
        ]
      }
    ],
    "label": "门店状态"
  },
  "restWeek": {
    "rules": [
      {
        "format": "array"
      },
      {
        "range": [
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
      }
    ],
    "label": "门店休息日"
  }
}

const enumConverter = {
  "status_valuetotext": {
    "营业中": "营业中",
    "休息中": "休息中"
  },
  "restWeek_valuetotext": [
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
