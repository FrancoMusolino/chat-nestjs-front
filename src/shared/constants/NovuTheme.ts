import { INovuThemeProvider } from '@novu/notification-center'

export const NOVU_THEME: INovuThemeProvider = {
  common: { fontFamily: 'Inter' },
  dark: {
    notificationItem: {
      read: {
        fontColor: '#E9EDD5',
        background: '#233138',
        timeMarkFontColor: '#869694',
      },
      unread: {
        background: '#313a3d',
        timeMarkFontColor: '#869694',
        fontColor: '#E9EDD5',
        notificationItemBeforeBrandColor:
          'linear-gradient(to bottom, #005C4B, #379f9f);',
      },
    },
    userPreferences: {
      accordion: {
        background: '#233138',
        fontColor: '#E9EDD5',
        secondaryFontColor: '#869694',
      },
      accordionItem: {
        fontColor: { active: '#E9EDD5' },
        switch: {
          backgroundChecked: 'linear-gradient(to bottom, #005C4B, #379f9f);',
        },
      },
    },

    layout: { background: '#202C33' },
  },
}
