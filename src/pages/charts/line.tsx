import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as echarts from 'echarts'

const Line: React.FC = () => {
  const chartRef = useRef<any>(null)

  const navigate = useNavigate()

  const change = () => {
    navigate('/charts/line/a/other')
  }

  useEffect(() => {
    const chartDom = document.querySelector('.aaaa')
    console.log('chartDom', chartDom)

    const myChart = echarts.init(chartDom as any)
    let option

    const datas = [
      ////////////////////////////////////////
      [
        { name: '圣彼得堡来客', value: 5.6 },
        { name: '陀思妥耶夫斯基全集', value: 1 },
        { name: '史记精注全译（全6册）', value: 0.8 },
        { name: '加德纳艺术通史', value: 0.5 },
        { name: '表象与本质', value: 0.5 },
        { name: '其它', value: 3.8 }
      ],
      // ////////////////////////////////////////
    ]

    // eslint-disable-next-line prefer-const
    option = {
      title: {
        text: '阅读书籍分布',
        left: 'center',
        textStyle: {
          color: '#999',
          fontWeight: 'normal',
          fontSize: 14
        }
      },
      series: datas.map(function (data, idx) {
        const top = idx * 33.3
        return {
          type: 'pie',
          radius: [20, 60],
          top: top + '%',
          height: '33.33%',
          left: 'center',
          width: 400,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c} 小时}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999'
              }
            }
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80
          },
          labelLayout: function (params: any) {
            const isLeft = params.labelRect.x < myChart.getWidth() / 2
            const points = params.labelLinePoints
            // Update the end point.
            points[2][0] = isLeft
              ? params.labelRect.x
              : params.labelRect.x + params.labelRect.width
            return {
              labelLinePoints: points
            }
          },
          data: data
        }
      })
    }

    option && myChart.setOption(option)
  }, [])
  return (
    <div>
      <div ref={chartRef} className={'aaaa'} style={{ widows: 500, height: 500 }}>折线图</div>
      <button onClick={change}>跳转</button>
    </div>

  )
}

export default Line