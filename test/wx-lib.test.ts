import WeChatLib from '../src/wx-lib'

/**
 * Dummy test
 */
describe('#WeChat Library', () => {
  let wxLib: WeChatLib

  beforeEach(() => {
    wxLib = new WeChatLib()
  })

  it('should be instantiable', () => {
    expect(wxLib).toBeInstanceOf(WeChatLib)
    expect(wxLib.isWeChat).toBe(false)
    expect(wxLib.isMiniProgram).toBe(false)
    expect(wxLib.SDKReady).toBe(false)
    expect(wxLib.signed).toBe(false)
  })

  it('should add callback successfully', () => {
    wxLib.onSDKReady(() => {
      // will be executed when the jwexin SDK is ready
    })

    wxLib.onSigned(() => {
      // will be executed when get signed
    })
  })

  it('should return Promise', () => {
    expect(
      wxLib.getSigned({
        appId: '',
        nonceStr: '',
        signature: '',
        timestamp: new Date().getTime()
      })
    ).toBeInstanceOf(Promise)
  })
})
