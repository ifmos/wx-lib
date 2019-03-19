import { getWeChatSDK, loadScript } from '../src/utils'

describe('#Utils', () => {
  it('should get WeChat SDK', () => {
    expect(getWeChatSDK()).resolves.toBeTruthy()
  })

  it('should load script', () => {
    const p = loadScript('/script.js')
    expect(p).resolves.toBeTruthy()
  })
})
