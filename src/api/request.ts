import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/response'
import axios from './axios'
import { toast } from 'sonner'

/**
 * 通用 request 方法
 * - 自动解析 ApiResponse
 * - 成功返回 T
 * - 失败抛 Error
 */
export function request<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return axios<ApiResponse<T>>(config).then((response) => {
    const body = response.data

    if (body.code !== 0) {
      toast.error(body.message)
    }
    return body
  })
}
