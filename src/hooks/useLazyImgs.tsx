/**
 * @useMenu 图片懒加载
 */

import React, { Fragment, useCallback, useMemo } from 'react'

interface IImages {
  id: string | number,
  src: string,
  alt?: string,
  [propName: string]: any
}

export default function useLazyImgs(imgs: IImages[], imgsStyle?: Record<string, string>) {
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
          const img = item.target as any
          img.src = img.dataset.src
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