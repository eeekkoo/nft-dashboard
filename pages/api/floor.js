// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { floor } from 'lodash'

const a = '0xdca1bea642c7821efbe6a5612b2e130f9d8192ca'
const b = '0x8d3989436990e8f9Cf76c23cB2B4F24416B08d58'

export default async function helloAPI(req, res) {
  let items = []
  let data = await get(null, a)
  items.push(...data.items)
  while (data.cursor) {
    data = await get(data.cursor, a)
    items.push(...data.items)
  }

  data = await get(null, b)
  items.push(...data.items)
  while (data.cursor) {
    data = await get(data.cursor, b)
    items.push(...data.items)
  }

  let floors = []

  items.forEach(item => {
    item.items.forEach(mitems => {
      const collection = mitems?.saleInfo?.floor?.collection
      const amount = mitems?.saleInfo?.floor?.amount
      if (collection) {
        floors.push({ floor: amount, collection })
      }
    })
  })

  const key = 'collection'

  res
    .status(200)
    .json([...new Map(floors.map(item => [item[key], item])).values()])
}

const get = async (cursor, wallet) => {
  let url = `https://context.app/api/profile/${wallet}/feed`
  if (cursor) {
    url = url + '?cursor=' + cursor
  }
  let data = await fetch(url).then(r => r.json())
  return data
}
