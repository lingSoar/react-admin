import React, { Fragment, useCallback, useMemo } from 'react'

interface IImages {
  id: string | number,
  src: string,
  alt?: string,
  [propName: string]: any
}

/**
 * @description 图片懒加载的自定义hook
 * @param {IImages[]} imgs 懒加载的图片数组
 * @param {React.CSSProperties} imgsStyle 图片的样式配置
 * @return React.ReactNode
 */
export default function useLazyImgs(imgs: IImages[], imgsStyle?: React.CSSProperties) {
  const allTarget = useMemo(() => {
    const refs: HTMLImageElement[] = []
    const images: JSX.Element[] = []

    for (let i = 0; i < imgs.length; i++) {
      const imgRef = React.createRef() as any
      refs.push(imgRef)
      images.push(
        <img
          data-src={imgs[i]?.src}
          alt={imgs[i]?.alt || ''}
          key={imgs[i]?.id || i}
          style={imgsStyle || {}}
          ref={imgRef}
        />
      )
    }
    return ({ refs, images })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const io = useMemo(() => {
    return new IntersectionObserver(entries => {
      entries.forEach(item => {
        if (item.isIntersecting) {
          const img = item.target as HTMLImageElement
          img.src = img.dataset.src as string
          io.unobserve(img)
        }
      })
    }, {
      root: null
    })
  }, [])

  const onload = useCallback(() => {
    allTarget.refs.forEach(item => io.observe((item as any).current))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {allTarget.images}
      <img onError={onload} src='' alt='' />
    </Fragment>
  )
}