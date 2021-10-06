import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { styled, keyframes } from '@stitches/react'
import { violet, blackA, mauve, green } from '@radix-ui/colors'
import { Cross2Icon } from '@radix-ui/react-icons'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import Chart from 'chart.js'
import moment from 'moment'
import * as _ from 'lodash'
import { Table, Button, ButtonDropdown } from '@geist-ui/react'

const osLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    fill="none"
    viewBox="0 0 100 100"
  >
    <path
      fill="#2081E2"
      d="M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z"
    />
    <path
      fill="#fff"
      d="M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z"
    />
    <path
      fill="#fff"
      d="M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z"
    />
  </svg>
)
const External = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
      fill="#111"
    ></path>
  </svg>
)
const getFloor = async (collection, date) => {
  var dt = new Date()
  dt.setHours(dt.getHours() - date)

  const params = new URLSearchParams({
    offset: '0',
    event_type: 'successful',
    only_opensea: 'false',
    occurred_after: dt.toISOString(),
    collection_slug: collection,
    limit: 300
  })

  const openSeaResponse = await fetch(
    `https://api.opensea.io/api/v1/events?collection_slug=${collection}&event_type=successful&only_opensea=false&offset=0&limit=300&occurred_after=${dt.toISOString()}`
    //'https://api.opensea.io/api/v1/events?' + params
  ).then(resp => resp.json())
  const floor = Math.min(
    ...openSeaResponse.asset_events.map(x => parseInt(x.total_price))
  )
  return { sold: openSeaResponse.asset_events.length, floor }
}
const collections = [
  {
    slug: 'deadfellaz',
    quantity: 1,
    cost: 0.383,
    img: 'https://lh3.googleusercontent.com/seJEwLWJP3RAXrxboeG11qbc_MYrxwVrsxGH0s0qxvF68hefOjf5qrPSKkIknUTYzfvinOUPWbYBdM8VEtGEE980Qv2ti_GGd86OWQ=s130'
  },
  {
    slug: 'fanggangnft',
    quantity: 1,
    cost: 0.099,
    img: 'https://lh3.googleusercontent.com/Nc1-09BlzwmD5Yg60hcSq9myqWV2XOTw3wbqtMX1YPxKKMJ4-aaGAEckZK0DkYerBi1OenpH-7CuQrKl5zVRE7Q_lWOi_GbDWh51Gw=s130'
  },
  {
    slug: 'peaceful-groupies',
    quantity: 1,
    cost: 0.69,
    img: 'https://lh3.googleusercontent.com/cG9j3L8r61_Y5VKNUE3pfHnWPWPNt1ld8Zmyyslx6VV_54-ffsRAuYCg838IhOuek9cL5bHahpgj10ugtKkomDqFOuBAhcIxemow9w=s130'
  },

  {
    slug: 'tunesproject',
    quantity: 6,
    cost: 0,
    img: 'https://lh3.googleusercontent.com/Nb-AyBcWvFIx4ca8om3GE1innjt59zcTPOIWm67zqaRTjGScBpu2-LFpHp92OISFbtM1Df_N-pcwUlA4x0iMOh8C8ZYvtScd6yWy=s130'
  },
  {
    slug: 'sadgirlsbar',
    quantity: 1,
    cost: 0.12,
    img: 'https://lh3.googleusercontent.com/tDq_9Vqull9yDeWdotD818etAFEIJo8r893K-rEg_ZFTnBQGzzGAjk6SkMjrpADnmo7t0RKUE53j-uQnB72buAP0PgAB9tH6GIV9=s130'
  },
  {
    slug: 'woodies-generative',
    quantity: 1,
    cost: 0.08,
    img: 'https://storage.opensea.io/files/26800018286d6911a3795d83fb07ac4f.svg'
  },
  {
    slug: 'gawds',
    quantity: 4,
    cost: 0.08,
    img: 'https://lh3.googleusercontent.com/rXYyWGkuxuTRjzYTlPG6arr6IouFhRR0RtfLcps3NXPPy837MS1QsnQAjxnJGKTdzzfIJaLpIS_PRzOJDTR9iX3O1Hw5KuaNVngRaQ=s130'
  }
]

export default function Home() {
  const [results, setResults] = useState([])
  const [floor, setFloor] = useState([])
  const resultsRef = useRef()
  const tableDataRef = useRef()
  const [date, setDate] = useState(1)
  const [tableData, setTableData] = useState()
  const [total, setTotal] = useState(0)
  const [liquidGBP, setLiquidGBP] = useState(0)
  const [collection, setCollection] = useState('deadfellaz')
  useEffect(() => {
    const run = async () => {
      const results = await Promise.all(
        collections.map(async c => {
          const { _, sold } = await getFloor(c.slug, date)
          //c.floor = floor / 1000000000000000000
          //c.floor = parseInt(floor?.find(x => x.collection === c.slug)) / 1000000000000000000
          c.floor =
            parseInt(floor.find(x => x.collection == c.slug)?.floor) /
            1000000000000000000
          c.sold = sold
          return c
        })
      )
      setResults(results)
      resultsRef.current = results
    }
    run()
  }, [date, floor])

  useEffect(() => {
    const run = async () => {
      let res = await fetch('/api/floor').then(r => r.json())
      console.log(res)
      setFloor(res)
    }
    run()
  }, [])

  useEffect(() => {
    const run = async () => {
      let rates = await fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR,GBP'
      ).then(r => r.json())
      setLiquidGBP(rates.GBP * total)
    }
    run()
  }, [total])

  useEffect(() => {
    let total = 0
    results.forEach(item => {
      let assetTotal = item.quantity * item.floor
      if (isFinite(assetTotal)) {
        console.log(assetTotal)
        total = total + assetTotal
      }
    })

    setTotal(total)
  }, [resultsRef])
  useEffect(() => {
    let tableData = results
      .map(x => {
        x.percent = (x.floor - x.cost) * 100
        return x
      })
      .sort((a, b) => (a.percent < b.percent ? 1 : -1))
      .map(({ img, floor, slug, sold, cost }) => {
        return {
          return: `${((floor - cost) * 100).toFixed(2)}%`,
          os: (
            <a target="_blank" href={`https://opensea.io/collection/${slug}`}>
              os
            </a>
          ),
          slug: (
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full mr-2" src={img} />
              {slug}
            </div>
          ),
          slug2: slug,
          floor,
          sold: sold
        }
      })
    setTableData(tableData)
    tableDataRef.current = tableData
  }, [resultsRef])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full flex-1 px-20 container max-w-5xl">
        <span className="text-md text-gray-500">
          liquidity ETH:{' '}
          <span className="font-bold text-gray-800">♦{total.toFixed(3)}</span>
        </span>

        <span className="text-md text-gray-500">
          liquidity GBP:{' '}
          <span className="font-bold text-gray-800">£{liquidGBP}</span>
        </span>
        {/* <div className="mx-auto py-20 grid gap-x-1  gap-y-1 grid-cols-1 lg:grid-cols-4 lg:gap-y-4 lg:gap-x-4"> */}
        <div className=" py-20">
          {(() => {
            //const [data, setData] = useState(dataSource)
            const renderAction = (value, rowData, index) => {
              const removeHandler = () => {
                setCollection(rowData.slug2)
              }
              return (
                <Button
                  type="default"
                  auto
                  scale={1 / 3}
                  onClick={removeHandler}
                >
                  Show Chart
                </Button>
              )
            }
            return (
              <Table data={tableDataRef.current}>
                <Table.Column prop="slug" label="slug" />
                <Table.Column prop="floor" label="floor" />
                <Table.Column prop="return" label="return" />
                <Table.Column prop="os" label="os" />
                <Table.Column prop="sold" label="sold past hour" />
                <Table.Column
                  prop="slug2"
                  label="toggle chart"
                  //width={150}
                  render={renderAction}
                />
              </Table>
            )
          })()}
        </div>

        <ButtonDropdown>
          <ButtonDropdown.Item onClick={_ => setDate(1)} main>
            1h Ago
          </ButtonDropdown.Item>
          <ButtonDropdown.Item onClick={_ => setDate(3)}>
            3h Ago
          </ButtonDropdown.Item>
          <ButtonDropdown.Item onClick={_ => setDate(12)}>
            12h Ago
          </ButtonDropdown.Item>
          <ButtonDropdown.Item onClick={_ => setDate(24)}>
            1d ago
          </ButtonDropdown.Item>
        </ButtonDropdown>

        <SalesChart date={date} collection={collection} />
        <FloorChart date={date} collection={collection} />
      </main>
    </div>
  )
}

const createChart = (ctx, labels, data, gradient) => {
  return new Chart(ctx, {
    type: 'line',
    options: {
      hover: {
        animationDuration: 0
      },
      legend: {
        labels: {
          usePointStyle: true,
          boxWidth: 6
        }
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            gridLines: {
              color: '#fff',
              display: false,
              drawBorder: false //<- set this
            },
            ticks: {
              fontColor: '#CCC' // this here
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: '#fff',
              display: false,
              drawBorder: false //<- set this
            },
            ticks: {
              fontColor: '#CCC' // this here
            }
          }
        ]
      }
    },
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient, // Put the gradient here as a fill color
          borderColor: 'rgb(110, 121, 214, 1)',
          pointBackgroundColor: 'rgb(110, 121, 214, 1)',
          pointBorderColor: 'rgb(110, 121, 214, 1)',
          pointHighlightFill: 'rgb(110, 121, 214, 1)',
          pointHighlightStroke: 'rgb(110, 121, 214, 1)',
          pointStyle: 'circle',
          pointRadius: 4,
          label: 1 + ' floor',
          trendlineLinear: {
            style: '#rgb(110, 121, 214, .5)',
            lineStyle: 'line',
            width: 5
          },
          data: data,
          borderWidth: 1
        }
      ]
    }
  })
}

const FloorChart = ({ collection, date }) => {
  const ref = useRef()
  useEffect(() => {
    const run = async () => {
      if (!ref.current) return
      var dt = new Date()
      dt.setHours(dt.getHours() - date)
      const params = new URLSearchParams({
        offset: '0',
        event_type: 'successful',
        only_opensea: 'false',
        occurred_after: dt.toISOString(),
        collection_slug: collection,
        limit: 300
      })

      const res = await fetch('https://api.opensea.io/api/v1/events?' + params)
        .then(r => r.json())
        .then(
          d =>
            d.asset_events.reverse().map(x => ({
              eth: x.total_price / 1000000000000000000,
              created_date: x.created_date,
              transaction_date: x.transaction.timestamp
            }))
          //.filter((x) => x.eth < 1)
        )

      var ctx = ref.current.getContext('2d')
      var gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgb(110, 121, 214, 1)')
      gradient.addColorStop(1, 'rgb(110, 121, 214, .1)')
      let data = res.map(x => ({ t: x.transaction_date, y: x.eth }))
      let labels = res.map(x => x.transaction_date)
      createChart(ctx, labels, data, gradient)
    }
    run()
  }, [ref, collection])

  return <canvas ref={ref} />
}

const SalesChart = ({ collection, date }) => {
  const ref = useRef()
  useEffect(() => {
    const run = async () => {
      if (!ref.current) return
      var dt = new Date()
      dt.setHours(dt.getHours() - date)
      const params = new URLSearchParams({
        offset: '0',
        event_type: 'successful',
        only_opensea: 'false',
        occurred_after: dt.toISOString(),
        collection_slug: collection,
        limit: 300
      })

      const res = await fetch(
        'https://api.opensea.io/api/v1/events?' + params
      ).then(r => r.json())

      let sales = res.asset_events.reverse().map(x => x.transaction.timestamp)
      var groups = _.groupBy(sales, function (date) {
        return moment(date).startOf('minutes').format()
      })
      //console.log(groups);
      var ctx = ref.current.getContext('2d')

      var gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgb(110, 121, 214, 1)')
      gradient.addColorStop(1, 'rgb(110, 121, 214, .1)')

      let labels = Object.keys(groups)
      let data = Object.keys(groups).map(x => ({ t: x, y: groups[x].length }))

      createChart(ctx, labels, data, gradient)
    }
    run()
  }, [ref, collection])

  return <canvas ref={ref} />
}
