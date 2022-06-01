// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "category_id": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "所属分类"
  },
  "bannerfile": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "file"
      }
    ],
    "label": "图片文件"
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
    "label": "标题"
  },
  "hours": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "array"
      },
      {
        "range": [
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
      }
    ],
    "label": "可预约时间段"
  },
  "price": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "价格"
  },
  "order": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "排序"
  }
}

const enumConverter = {
  "hours_valuetotext": [
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
