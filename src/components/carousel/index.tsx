import React, { useState, useRef, useEffect, useReducer, useCallback, useMemo } from 'react'
import './carousel.scss'

const baseCls = 'admin-carousel'

interface IProps {
  /** 轮播时间，默认三秒 */
  intTime?: number
  /** 面板指示点位置，默认bottom */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right'
  children: Array<JSX.Element>
}

type IReducerType = 'normal' | 'next' | 'pre' | undefined
type IReducerPayload = {
  currentIndex?: number
  animation?: string
}

const Carousel: React.FC<IProps> = (props) => {
  const { intTime = 3000, dotPosition = 'bottom', children } = props
  const [isNext, setIsNext] = useState(true)
  const [isShow, setIsShow] = useState(false)

  const ref = useRef(null)
  const timer = useRef<any>(null)

  const [state, dispatch] = useReducer((preState: any, action: { type?: IReducerType; payload?: IReducerPayload }) => {
    const { currentIndex } = preState
    const { type, payload } = action

    switch (type) {
      case 'normal':
        return { ...preState, ...payload }
      case 'next':
        return { ...preState, currentIndex: currentIndex + 1, ...payload }
      case 'pre':
        return { ...preState, currentIndex: currentIndex - 1, ...payload }
      default:
        return { ...preState }
    }
  }, { currentIndex: 1, animation: 'none' } as IReducerPayload)
  const { currentIndex, animation } = state

  // 初始化操作，复制第一个元素到最后，复制最后一个元素到最前头，解决轮播切换首尾的的不连贯
  const init = useCallback(() => {
    const dom = (ref.current as unknown as HTMLDivElement)
    const firstNode = dom?.firstElementChild?.cloneNode(true);
    const lastNode = dom?.lastElementChild?.cloneNode(true);

    dom?.appendChild(firstNode as Node);
    dom?.insertBefore(lastNode as Node, dom?.firstElementChild);

    // 解决flex 布局中，主轴宽度不够，子元素不认宽高的问题
    Array.from(dom.children).forEach((item: any) => item.style.flex = 'none')
  }, [])

  useEffect(() => {
    init()
  }, [init])

  // 下一面板的处理函数
  const nextSlide = () => {
    if (currentIndex > children.length) {
      dispatch({ type: 'normal', payload: { currentIndex: 1, animation: 'none' } })
    } else {
      dispatch({ type: 'next', payload: { animation: '0.3s' } })
    }
  }

  // 上一面板的处理函数
  const preSlide = () => {
    if (currentIndex === 0) {
      dispatch({ type: 'normal', payload: { currentIndex: children.length, animation: 'none' } })
    } else {
      dispatch({ type: 'pre', payload: { animation: '0.3s' } })
    }

    setIsNext(currentIndex !== 1)
  }

  useEffect(() => {
    const { currentIndex } = state
    timer.current && clearInterval(timer.current)
    const time = (currentIndex > children.length || currentIndex === 0) ? intTime / 10 : intTime

    timer.current = setInterval(isNext ? nextSlide : preSlide, time)
    return () => {
      clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isNext])

  // 画板指点是否为水平布局
  const isHorizontal = useMemo(() => dotPosition === 'top' || dotPosition === 'bottom', [dotPosition])

  const pointsStyle = useMemo(() => {
    switch (dotPosition) {
      case 'top':
        return { width: '100%', height: 10, top: 20 }
      case 'bottom':
        return { width: '100%', height: 10, bottom: 20 }
      case 'left':
        return { width: 10, height: '100%', bottom: 0, left: 20 }
      case 'right':
        return { width: 10, height: '100%', bottom: 0, right: 20 }
      default:
        return {}
    }
  }, [dotPosition]) 

  return (
    <React.Fragment>
      <div
        className={`${baseCls}`}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <div
          className={`${baseCls}-content`}
          style={{
            transform: isHorizontal ? `translateX(${-currentIndex * 100}%)` : `translateY(${-currentIndex * 100}%)`,
            transition: animation,
            flexDirection: isHorizontal ? 'row' : 'column'
          }}
          ref={ref}
        >
          {React.Children.map(children, item => [item])}
        </div>

        <div className={`${baseCls}-points`} style={{ ...pointsStyle }}>
          <div
            className={`${baseCls}-points-box`}
            style={{ flexDirection: isHorizontal ? 'row' : 'column' }}
          >
            {children.map((_: JSX.Element, index: number) => (
              <i
                key={index}
                className={`${baseCls}-point`}
                style={{ backgroundColor: currentIndex === index + 1 ? 'red' : '#fff' }}
                onClick={() => dispatch({ type: 'normal', payload: { currentIndex: index + 1 } })}
              />
            ))}
          </div>
        </div>

        {isHorizontal && <span className={`${baseCls}-preSlide`} style={{ display: isShow ? 'block' : 'none' }} onClick={preSlide} />}
        {isHorizontal && <span className={`${baseCls}-nextSlide`} style={{ display: isShow ? 'block' : 'none' }} onClick={nextSlide} />}
      </div>
    </React.Fragment>
  )
}

export default React.memo(Carousel) 
