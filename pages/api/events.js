// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function helloAPI(req, res) {
  let items = []
  let data = await get()
  items.push(...data.items)
  while (data.cursor) {
    data = await get(data.cursor)
    items.push(...data.items)
  }

  res.status(200).json(items)
}

const get = async cursor => {
  let url =
    'https://context.app/api/profile/0xdca1bea642c7821efbe6a5612b2e130f9d8192ca/feed'
  if (cursor) {
    url = url + '?cursor=' + cursor
  }
  let data = await fetch(url).then(r => r.json())
  return data
}
