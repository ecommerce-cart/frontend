const globalAuth = {
  accessToken: '',
  setAccessToken: (accessToken: string) => {
    globalAuth.accessToken = accessToken
  },
  getAccessToken: () => globalAuth.accessToken,
}

export default globalAuth
