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
    "label": "分类"
  },
  "goods_sn": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "货号"
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "名称"
  },
  "keywords": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "关键字"
  },
  "goods_desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "详细描述"
  },
  "goods_thumb": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "label": "缩略图地址"
  },
  "goods_banner_imgs": {
    "rules": [
      {
        "format": "array"
      },
      {
        "arrayType": "file"
      }
    ],
    "label": "商品详情页图片"
  },
  "sku_name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "规格名称"
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
  "market_price": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "市场价"
  },
  "stock": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "label": "库存"
  },
  "month_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "月销量"
  },
  "total_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "总销量"
  },
  "comment_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0,
    "label": "累计评论数"
  },
  "is_real": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否为实物"
  },
  "is_on_sale": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否上架"
  },
  "is_alone_sale": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否能单独销售"
  },
  "is_best": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否精品"
  },
  "is_new": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否新品"
  },
  "is_hot": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": true,
    "label": "是否热销"
  },
  "add_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    },
    "label": "上架时间"
  }
}

const enumConverter = {}

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
