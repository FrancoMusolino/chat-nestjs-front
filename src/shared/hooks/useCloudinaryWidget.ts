import { useEffect } from 'react'

import { CLOUDINARY_WIDGET_DEFAULT_OPTIONS } from '../constants'

let cloudinary: any

type UseCloudinaryWidgetProps = {
  opts: { uploadPreset: string } & Record<string, any>
  successFn: (secureUrl: string) => void
}

type WidgetInUse = { uploadPreset: string; widget: any }

const widgetsInUse: WidgetInUse[] = []

export const useCloudinaryWidget = ({
  successFn,
  opts,
}: UseCloudinaryWidgetProps) => {
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = (window as any).cloudinary
    }

    if (!existWidget()) {
      let newWidget: WidgetInUse = {
        uploadPreset: opts.uploadPreset,
        widget: null,
      }

      newWidget.widget = createWidget()

      return () => {
        widgetsInUse.push(newWidget)
      }
    }
  }, [opts])

  const existWidget = () =>
    widgetsInUse.find((widget) => widget.uploadPreset === opts?.uploadPreset)

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
    let widget
    const exists = existWidget()

    if (!exists) {
      widget = createWidget()
    } else {
      widget = exists.widget
    }

    widget && widget.open()
  }

  return { open }
}
