import { getWeChatSDK } from './utils'

export interface IWX {
  config: VoidFunction<ISignConfig>
  ready: VoidFunction<VoidFunction>
  error: VoidFunction<VoidFunction>
  updateAppMessageShareData: VoidFunction<IShareConfig>
}

declare global {
  // tslint:disable-next-line: interface-name
  export interface Window {
    __wxjs_environment?: string
    wx: IWX
  }
}

const wx = window.wx

export interface IShareConfig {
  imgUrl: string
  title: string
}

export interface ISignConfig {
  appId: string // 必填，公众号的唯一标识
  timestamp: number // 必填，生成签名的时间戳
  nonceStr: string // 必填，生成签名的随机串
  signature: string // 必填，签名
  jsApiList?: string[]
}

type VoidFunction<T = any> = (...args: T[]) => void

type CallbackType = 'SDKReady' | 'signed'

const callbacksMap: Map<CallbackType, VoidFunction[]> = new Map()

const execute = (callbacks: VoidFunction[] = []) => {
  while (callbacks.length) {
    const handler = callbacks.shift()
    if (typeof handler === 'function') {
      handler()
    }
  }
}

const pushCallbacks = (
  callbackMap: Map<CallbackType, VoidFunction[]>,
  key: CallbackType,
  callback: VoidFunction
) => {
  const callbacks = callbackMap.get(key)
  if (!callbacks) {
    return callbackMap.set(key, [callback])
  }

  callbacks.push(callback)
}

export default class WeChatLib {
  isWeChat: boolean = /MicroMessenger\/([\d.]+)/i.test(window.navigator.userAgent)
  isMiniProgram: boolean =
    /MicroMessenger\/([\d.]+)/i.test(window.navigator.userAgent) &&
    (/MiniProgram/i.test(window.navigator.userAgent) || window.__wxjs_environment === 'miniprogram')
  SDKReady: boolean = false
  signed: boolean = false

  constructor() {
    if (this.isWeChat) {
      getWeChatSDK().then(() => {
        this.SDKReady = true
        execute(callbacksMap.get('SDKReady'))
      })
    }
  }

  getSigned(signConfig: ISignConfig): Promise<void> {
    if (!this.SDKReady) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      const {
        appId = '',
        timestamp = new Date().getTime(),
        nonceStr = '',
        signature = '',
        jsApiList = [],
      } = signConfig
      wx.config({
        appId,
        jsApiList,
        nonceStr,
        signature,
        timestamp,
      })
      wx.ready(() => {
        this.signed = true
        execute(callbacksMap.get('signed'))
        resolve()
      })
      wx.error(() => {
        reject()
      })
    })
  }

  onSigned(func: VoidFunction) {
    if (this.signed) {
      return func()
    }
    pushCallbacks(callbacksMap, 'signed', func)
  }

  onSDKReady(func: VoidFunction) {
    if (this.SDKReady) {
      return func()
    }
    pushCallbacks(callbacksMap, 'SDKReady', func)
  }
}
