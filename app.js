const fs = require('fs')
let d = fs.readFileSync('./a-events.json').toString()
d = JSON.parse(d)
let log = console.log
const str = d => JSON.stringify(d, null, 2)
let collection = []
d.forEach(x => x.items.forEach(y => y.owner == '0xdca1bea642c7821efbe6a5612b2e130f9d8192ca' ? collection.push(x) : ''))
// log(collection.map(x => x.items.map(y => y.events.map(z => z.extraData?.sale?.amount))))
//

let total=0
let totalUSD = 0
let totalFloor = 0
let totalFloorUSD = 0
d.forEach(c => {
		c.items.forEach(i =>  {
			  // find what i have spent
				// i.events.forEach(e => {
				// 		let sale = e.extraData?.sale?.amount
				// 		let saleUSD = e.extraData?.sale?.usdCents
				// 		if (sale){
				// 			total = total + sale
				// 		}
				// 	  if(saleUSD) {
				// 		  totalUSD = totalUSD + saleUSD
				// 		}
				// })

			log(i.metadata.name)
			let floor = parseInt(i.saleInfo.floor.amount)
			let floorUSD = parseInt(i.saleInfo.floor.usdCents)
			totalFloor = totalFloor + floor
			totalFloorUSD = totalFloorUSD + floorUSD
		})
})
log(total / 1000000000000000000)
log(total / 1000000000000000000)
log(totalFloor / 1000000000000000000)
log(totalFloorUSD / 1000)
log(collection.length)
