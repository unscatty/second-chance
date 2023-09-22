import axios, { type AxiosInstance } from 'axios'

export class AuthService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_DOGS_ENDPOINT,
      withCredentials: true,
    })
  }

  get instance() {
    return this.axiosInstance
  }

  async login(userData: {email: string, name: string}) {
    const { data } = await this.axiosInstance.post('/auth/login', userData)

    return data
  }

  async logout() {
    await this.axiosInstance.post('/auth/logout')
  }
}

export default new AuthService()
