import React, { useState, useRef, useEffect, useReducer, useCallback, useMemo } from 'react'
import './carousel.scss'

const baseCls = 'admin-carousel'

interface IProps {
  /** 轮播内容 */
  data: any[]
  /** 轮播时间 */
  intTime?: number
  /** 面板指示点位置 */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right'
}

type IReducerType = 'normal' | 'next' | 'pre' | undefined
type IReducerPayload = {
  currentIndex?: number
  animation?: string
}

const Carousel: React.FC<IProps> = (props) => {
  const { data = [], intTime = 3000, dotPosition } = props
  const [isnext, setIsnext] = useState(true)
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
  }, [])

  useEffect(() => {
    init()
  }, [init])


  const nextSlide = () => {
    if (currentIndex > data.length) {
      dispatch({ type: 'normal', payload: { currentIndex: 1, animation: 'none' } })
    } else {
      dispatch({ type: 'next', payload: { animation: '0.3s' } })
    }
  }

  const preSlide = () => {
    if (currentIndex === 0) {
      dispatch({ type: 'normal', payload: { currentIndex: data.length, animation: 'none' } })
    } else {
      dispatch({ type: 'pre', payload: { animation: '0.3s' } })
    }

    setIsnext(currentIndex !== 1)
  }

  useEffect(() => {
    const { currentIndex } = state
    timer.current && clearInterval(timer.current)
    const time = (currentIndex > data.length || currentIndex === 0) ? intTime / 10 : intTime

    timer.current = setInterval(isnext ? nextSlide : preSlide, time)
    return () => {
      clearInterval(timer.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isnext])

  const position = useMemo(() => {
    switch (dotPosition) {
      case 'top':
        return {top: 20, }
      case 'bottom':
        return {bottom: 20}
      case 'left':
        return {left: 20}
      case 'right':
        return {}
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
            transform: `translateX(${-currentIndex * 100}%)`,
            transition: animation
          }}
          ref={ref}
        >
          {data.map((i, index) => (
            <div key={index} className={`${baseCls}-content-item`}>
              <img src={require(`./images/img${index + 1}.jpg`)} alt='' />
            </div>
          ))}
        </div>

        <div
          className={`${baseCls}-points`}
          style={{...position}}
        >
          <div className={`${baseCls}-points-box`}>
            {data.map((i, index) => (
              <i
                key={index}
                className={`${baseCls}-point`}
                style={{ backgroundColor: currentIndex === index + 1 ? 'red' : '#fff' }}
                onClick={() => dispatch({ type: 'normal', payload: { currentIndex: index + 1 } })}
              />
            ))}
          </div>
        </div>

        <span
          className={`${baseCls}-preSlide`}
          onClick={preSlide}
          style={{ display: isShow ? 'block' : 'none' }}
        />
        <span
          className={`${baseCls}-nextSlide`}
          onClick={nextSlide}
          style={{ display: isShow ? 'block' : 'none' }}
        />
      </div>

    </React.Fragment>
  )
}

export default React.memo(Carousel) 
