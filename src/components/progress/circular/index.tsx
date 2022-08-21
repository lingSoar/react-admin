/**
 * @CircularScale 定制化的进度圈组件
 */
import React, { useMemo } from 'react'
import './circular.scss'

const baseCls = 'admin-circular'

interface IProps {
  /** 进度，百分比 */
  schedule: number | string,
  /** 刻度份数 */
  copies?: number | string,
  /** 进度圈大小(宽度和高度) */
  size?: number | string,
  /** 外层刻度线的背景颜色 */
  reticuleBgColor?: string,
  /** 外层刻度线的遮罩层背景颜色 */
  maskBgColor?: string,
  /** 进度圈颜色 */
  stroke?: string,
  children?: JSX.Element | never[],
  /** 内容区背景色，渐变色 */
  contentBgColor?: {
    direction?: string
    startColor?: string
    endColor?: string
  }
}

const CircularScale: React.FC<IProps> = (props) => {
  const { copies, size, reticuleBgColor, children, maskBgColor, contentBgColor, stroke, schedule } = props

  const reticuleArr = useMemo(() => (new Array(Number(copies) || 36)).fill(1), [copies])

  const options = useMemo(() => ({
    cx: (Number(size) || 200) * 1.05 / 2,
    cy: (Number(size) || 200) * 1.05 / 2,
    r: (Number(size) || 200) / 2,
    strokeWidth: (Number(size) || 200) / 20,
    rotate: `-90 ${(Number(size) || 200) * 1.05 / 2} ${(Number(size) || 200) * 1.05 / 2}`,
  }), [size])
  const strokeDasharray = useMemo(() => Math.PI * (Number(size) || 200), [size])

  const strokeDashoffset = useMemo(() => strokeDasharray - Number(schedule) / 100 * strokeDasharray, [schedule, strokeDasharray])
  const deg = useMemo(() => 360 / (Number(copies) || 36), [copies])

  return (
    <>
      <div
        className={`${baseCls}`}
        style={{
          width: Number(size) || 200,
          height: Number(size) || 200,
        }}>
        <div
          className={`${baseCls}-content`}
          style={{ backgroundImage: `linear-gradient(${contentBgColor?.direction || '0deg'},${contentBgColor?.endColor || '#99D6FF'},${contentBgColor?.startColor || '#11A0FF'})` }}>
          {children || <h1>{schedule}%</h1>}
        </div>
        <svg className={`${baseCls}-svg`}>
          {/* 
               circle：<circle> SVG 元素，是一个 SVG 的基本形状，用来创建圆，基于一个圆心和一个半径
               cx：cx 属性定义一个中心点的 x 轴坐标
               cy：cy 属性定义一个中心点的 y 轴坐标
               r：r 属性用来定义圆的半径
               fill：fill 属性是外观属性，用来定义给定图形元素内部的颜色
               strokeWidth：stroke-width 属性指定了当前对象的轮廓的宽度
               transform：
               strokeDasharray：stroke-dasharray 作为一个外观属性，可控制用来描边的点划线的图案范式
               strokeDashoffset：stroke-dashoffset 属性指定了 dash 模式到路径开始的距离
               strokeLinecap：stroke-linecap 作为一个展现属性，制定了在开放子路径被设置描边的情况下，用于开放自路径两端的形状。
           */}
          <circle
            cx={options.cx}
            cy={options.cy}
            r={options.r}
            fill='none'
            strokeWidth={options.strokeWidth}
            stroke={stroke || 'rgba(91,186,250,0.6)'}
            transform={`rotate(${options.rotate})`}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
          />
        </svg>
        <div className={`${baseCls}-mask`} style={{ backgroundColor: `${maskBgColor || 'rgba(176,220,249,0.6)'}` }} />
        <div className={`${baseCls}-reticule`}>
          {
            reticuleArr.map((_, index) => (
              <span
                key={index}
                style={{
                  transform: `rotate(${(index + 1) * deg}deg)`,
                  backgroundColor: `${reticuleBgColor || '#219DEF'}`
                }}
              />
            ))
          }
        </div>
        <div className={`${baseCls}-reticule-mask`} />
      </div>
    </>
  )
}

export default React.memo(CircularScale, (prevProps, nextProps) => Object.is(prevProps, nextProps))