import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react'
import './carousel.scss'

const baseCls = 'admin-carousel'

interface IProps {
  /** 轮播时间 */
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
  const { data = [], intTime = 3000 } = props
  const [isnext, setIsnext] = useState(true)

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
  const ref = useRef(null)
  const timer = useRef<any>(null)

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

    // timer.current = setInterval(isnext ? nextSlide : preSlide, time)
    return () => {
      clearInterval(timer.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isnext])
  console.log(11111);


  return (
    <>
      <div className={`${baseCls}`}>
        {currentIndex}
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
              <h1>{i}</h1>
            </div>
          ))}
        </div>
      </div>

      <button onClick={preSlide}>{'<'}</button>
      <button onClick={nextSlide}>{'>'}</button>
    </>
  )
}

export default React.memo(Carousel, (prevProps, nextProps) => {

  // console.log(prevProps, nextProps)

  return Object.is(prevProps, nextProps)
}
) 
