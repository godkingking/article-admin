import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getConfig, postConfig } from '@/api/config.ts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type FieldType = 'text' | 'password' | 'url' | 'number'

export interface FieldSchema {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
}

export interface DownloaderSchema {
  id: string
  name: string
  fields: FieldSchema[]
}

export const DOWNLOADERS: DownloaderSchema[] = [
  {
    id: 'qbittorrent',
    name: 'qBittorrent',
    fields: [
      { key: 'url', label: 'Web UI URL', type: 'url', required: true },
      { key: 'username', label: '用户名', type: 'text', required: true },
      { key: 'password', label: '密码', type: 'password', required: true },
    ],
  },
  {
    id: 'transmission',
    name: 'Transmission',
    fields: [
      { key: 'url', label: 'Web UI URL', type: 'url', required: true },
      { key: 'username', label: '用户名', type: 'text', required: true },
      { key: 'password', label: '密码', type: 'password', required: true },
    ],
  },
  {
    id: 'clouddrive',
    name: 'CloudDrive',
    fields: [
      { key: 'url', label: 'Web UI URL', type: 'url', required: true },
      { key: 'username', label: '用户名', type: 'text', required: true },
      { key: 'password', label: '密码', type: 'password', required: true },
    ],
  },
  {
    id: 'thunder',
    name: '迅雷',
    fields: [
      { key: 'url', label: 'Web UI URL', type: 'url', required: true },
      { key: 'authorization', label: '认证头', type: 'text' },
    ],
  },
]

type ConfigValue = Record<string, string>

export function DownloaderForm() {
  const [downloaderId, setDownloaderId] = useState<string>('qbittorrent')
  const [values, setValues] = useState<ConfigValue>({})

  const schema: DownloaderSchema | undefined = DOWNLOADERS.find(
    (d) => d.id === downloaderId
  )

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleFetchDownloaderConfig = (val: string) => {
    getConfig('Downloader.' + val).then((res) => {
      const data = res.data as ConfigValue
      setValues(data ?? {})
    })
  }

  const handleSave = () => {
    postConfig('Downloader.' + downloaderId, values as never).then((res) => {
      toast.success(res.message)
    })
  }

  useEffect(() => {
    handleFetchDownloaderConfig(downloaderId)
  }, [downloaderId])

  return (
    <div className='max-w-xl space-y-6'>
      <Select
        value={downloaderId}
        onValueChange={(value) => {
          setDownloaderId(value)
          setValues({})
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='选择下载器' />
        </SelectTrigger>
        <SelectContent>
          {DOWNLOADERS.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 动态字段 */}
      {schema && (
        <div className='space-y-4'>
          {schema.fields.map((field) => (
            <Input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder || field.label}
              value={values[field.key] || ''}
              onChange={(e) => updateValue(field.key, e.target.value)}
            />
          ))}
        </div>
      )}

      {/* 操作 */}
      {schema && (
        <div className='flex justify-end'>
          <Button onClick={handleSave}>保存配置</Button>
        </div>
      )}
    </div>
  )
}
