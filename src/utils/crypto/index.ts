import CryptoJS from "crypto-js"

export const decryptAes = (value: string) => {
  const key = CryptoJS.enc.Utf8.parse( process.env.REACT_APP_AES_KEY || "" );
  const iv  = CryptoJS.enc.Utf8.parse( process.env.REACT_APP_AES_IV || "" );
 
  return CryptoJS.AES.decrypt(value, key, { iv: iv }).toString(CryptoJS.enc.Utf8)
}