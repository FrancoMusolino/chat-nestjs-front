import { useEffect } from 'react'

import { CLOUDINARY_WIDGET_DEFAULT_OPTIONS } from '../constants'

let cloudinary: any
let widget: any

type UseCloudinaryWidgetProps = {
  opts?: Record<string, any>
  successFn: (secureUrl: string) => void
}

export const useCloudinaryWidget = ({
  successFn,
  opts,
}: UseCloudinaryWidgetProps) => {
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = (window as any).cloudinary
    }

    const onIdle = () => {
      if (!widget) {
        widget = createWidget()
      }
    }

    const canIUseRIC = 'requestIdleCallback' in window

    const idleCallback = canIUseRIC
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1)

    return () => {
      canIUseRIC
        ? cancelIdleCallback(idleCallback as number)
        : clearTimeout(idleCallback)
    }
  }, [])

  const createWidget = () => {
    const options = {
      ...CLOUDINARY_WIDGET_DEFAULT_OPTIONS,
      ...opts,
    }

    return cloudinary?.createUploadWidget(options, (error: any, res: any) => {
      if (res.event && res.event === 'success') {
        return successFn(res.info.secure_url)
      }
    })
  }

  const open = () => {
    if (!widget) {
      widget = createWidget()
    }

    widget && widget.open()
  }

  return { open }
}
