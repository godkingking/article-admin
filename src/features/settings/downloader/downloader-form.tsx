import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DOWNLOADER_META } from '@/features/settings/data/downloader-list.ts'
import { CommonDownloader } from '@/features/settings/downloader/common-downloader.tsx'
import { Thunder } from '@/features/settings/downloader/thunder.tsx'
import { Label } from '@/components/ui/label.tsx'

export function DownloaderForm() {
  const [downloaderId, setDownloaderId] = useState<string>('qbittorrent')

  return (
    <div className='w-full space-y-6'>
      <Label>选择下载器</Label>
      <Select
        value={downloaderId}
        onValueChange={(value) => {
          setDownloaderId(value)
        }}
      >
        <SelectTrigger className='w-full'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='w-full'>
          {DOWNLOADER_META.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {downloaderId === 'thunder' ? (
        <Thunder downloaderId={downloaderId}></Thunder>
      ) : (
        <CommonDownloader
          downloaderId={downloaderId}
          key={downloaderId}
        ></CommonDownloader>
      )}
    </div>
  )
}
