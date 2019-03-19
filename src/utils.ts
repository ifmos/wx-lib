export function getWeChatSDK(): Promise<void> {
  if (window.wx) {
    return Promise.resolve()
  }
  const src = `//res.wx.qq.com/open/js/jweixin-1.4.0.js`
  return loadScript(src)
}

export function loadScript(url: string): Promise<void> {
  const removeScript = (script: HTMLScriptElement) => {
    try {
      document.body.removeChild(script)
    } catch (e) {
      //
    }
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      removeScript(script)
      resolve()
    }
    script.onerror = () => {
      removeScript(script)
      reject()
    }
    document.body.appendChild(script)
  })
}
