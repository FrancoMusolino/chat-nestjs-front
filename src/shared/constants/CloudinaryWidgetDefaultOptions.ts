export const CLOUDINARY_WIDGET_DEFAULT_OPTIONS = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  sources: ['local', 'url', 'camera'],
  multiple: false,
  singleUploadAutoClose: false,
  maxImageFileSize: 1500000, // 1.5MB
  styles: {
    palette: {
      window: '#202C33',
      windowBorder: '#869694',
      inactiveTabIcon: '#005C4B',
      tabIcon: '#00735E',
      menuIcons: '#E9EDD5',
      link: '#00735E',
      textDark: '#869694',
      textLight: '#E9EDD5',
      action: '#005C4B',
      error: '#F15C6D',
      inProgress: '#0078FF',
      complete: '#20B832',
      sourceBg: '#E4EBF1',
    },
    frame: {
      background: '#111B21',
    },
    fonts: {
      "'Poppins', sans-serif":
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
    },
  },
}
