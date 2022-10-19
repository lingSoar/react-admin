/**
 * @description 随机验证码
 */
import React, { useEffect, useRef } from 'react'

interface IVerification {
  /* 随机验证码的数量 */
  length?: number
  /* 验证码的样式 */
  style?: {
    /* 随机点 */
    dot: boolean
    /* 随机线 */
    line: boolean
    width: number
    height: number
  }
}

const Verification: React.FC<IVerification> = (props) => {
  const { length, style } = props
  const imgRef = useRef<HTMLImageElement>(null)

  class Verification {
    code: null | string
    path: null | string
    length: number
    width: number
    height: number
    dot: boolean
    line: boolean

    constructor(length = 6, style = {
      width: 300,
      height: 50,
      dot: true,
      line: true
    }) {
      this.code = null
      this.path = null
      this.length = length
      this.width = style.width
      this.height = style.height
      this.dot = style.dot
      this.line = style.line
    }

    createChars() {
      // 创建随机字符串
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const maxLength = chars.length
      let code = ''
      for (let i = 0; i < this.length; i++) {
        code = code + chars.charAt(Math.floor(Math.random() * maxLength))
      }
      this.code = code
      this.createPath()
    }

    // 构建canvas
    createPath() {
      const randomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) + min)
      }

      // 随机生成字体颜色
      const randomColor = (min: number, max: number) => {
        const r = randomNum(min, max)
        const g = randomNum(min, max)
        const b = randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      }

      const canvas = document.createElement('canvas')
      canvas.width = this.width
      canvas.height = this.height
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.textBaseline = 'middle'
        ctx.fillStyle = randomColor(180, 240)
        ctx.fillRect(0, 0, this.width, this.height)

        for (let i = 0; i <= this.length; i++) {
          const chart = this.code ? this.code[i] : ''
          const x = this.width / this.length * i
          const y = this.height / 2
          const deg = randomNum(-10, 10)

          ctx.font = randomNum(this.height / 2, this.height) + 'px SimHei'
          ctx.fillStyle = randomColor(50, 160)
          ctx.shadowOffsetX = randomNum(-3, 3)
          ctx.shadowOffsetY = randomNum(-3, 3)
          ctx.shadowBlur = randomNum(-3, 3)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
          ctx.translate(x, y)
          ctx.rotate(deg * Math.PI / 180)
          ctx.fillText(chart, 0, 0)
          ctx.rotate(-deg * Math.PI / 180)
          ctx.translate(-x, -y)
        }

        // 绘画随机线条
        if (this.line) {
          for (let i = 0; i < this.length; i++) {
            ctx.strokeStyle = randomColor(40, 180)
            ctx.beginPath()
            ctx.moveTo(randomNum(0, this.width), randomNum(0, this.height))
            ctx.lineTo(randomNum(0, this.width), randomNum(0, this.height))
            ctx.stroke()
          }
        }

        // 绘画随机点
        if (this.dot) {
          for (let i = 0; i < this.width / this.length; i++) {
            ctx.fillStyle = randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(randomNum(0, this.width), randomNum(0, this.height), 1, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      }

      this.path = canvas.toDataURL('image/png')
    }

    // 验证输入的验证码是否与生成的相等
    verifyEqual(code: string) {
      return code.toUpperCase() === this.code!.toUpperCase()
    }
  }

  useEffect(() => {
    const v = new Verification(length, style)
    v.createChars()
    imgRef.current && imgRef.current.setAttribute('src', v.path as string)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <img ref={imgRef} alt='' />
  )
}

export default Verification