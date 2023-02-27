import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_SECRET_KEY

export const encrypt = (dataForCipher: any) =>
  CryptoJS.AES.encrypt(JSON.stringify(dataForCipher), SECRET_KEY).toString()

export const decrypt = (cipherData: any) => {
  const bytes = CryptoJS.AES.decrypt(cipherData, SECRET_KEY)

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
