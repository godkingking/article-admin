import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Trash2, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { getCategories } from '@/api/article.ts'
import { getConfig, postConfig } from '@/api/config.ts'
import { useIsMobile } from '@/hooks/use-mobile.tsx'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface Config {
  category: string
  downloader: string
  path: string
}

const DOWNLOADER_OPTIONS = [
  { id: 'qbittorrent', label: 'qBittorrent' },
  { id: 'transmission', label: 'Transmission' },
  { id: 'clouddrive', label: 'CloudDrive' },
  { id: 'thunder', label: '迅雷' },
]

export function FolderForm() {
  const isMobile = useIsMobile()

  const [configs, setConfigs] = useState<Config[]>([])

  const { data, isSuccess } = useQuery({
    queryKey: ['configs'],
    queryFn: async () => {
      const res = await getConfig<Config[]>('DownloadFolder')
      return res.data as Config[]
    },
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setConfigs(data)
    }
  }, [isSuccess, data])

  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await getCategories()
      return res.data
    },
    staleTime: 5 * 60 * 1000,
  })

  const updateConfig = <K extends keyof Config>(
    index: number,
    key: K,
    value: Config[K]
  ) => {
    setConfigs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    )
  }

  const addConfig = () => {
    setConfigs((prev) => [...prev, { category: '', downloader: '', path: '' }])
  }

  const removeConfig = (index: number) => {
    setConfigs((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveConfig = () => {
    postConfig('DownloadFolder', configs as never).then((res) => {
      toast.success(res.message)
    })
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        {configs.map((cfg, index) =>
          isMobile ? (
            <Collapsible key={index} className='rounded-lg border'>
              <div className='flex items-center justify-between px-4 py-3'>
                <div className='space-y-0.5'>
                  <div className='text-sm font-medium'>
                    {cfg.category || '未选择类目'} ·{' '}
                    {cfg.downloader || '未选择下载器'}
                  </div>
                  {cfg.path && (
                    <div className='truncate text-xs text-muted-foreground'>
                      {cfg.path}
                    </div>
                  )}
                </div>

                <div className='flex items-center gap-1'>
                  <CollapsibleTrigger asChild>
                    <Button size='icon' variant='ghost'>
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </CollapsibleTrigger>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => removeConfig(index)}
                    disabled={configs.length === 1}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <CollapsibleContent className='space-y-3 border-t px-4 py-4'>
                <Select
                  value={cfg.category}
                  onValueChange={(v) => updateConfig(index, 'category', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='选择类目' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c.category} value={c.category}>
                        {c.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={cfg.downloader}
                  onValueChange={(v) => updateConfig(index, 'downloader', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='选择下载器' />
                  </SelectTrigger>
                  <SelectContent>
                    {DOWNLOADER_OPTIONS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  rows={2}
                  placeholder='保存目录，例如 /downloads/movie/aria2'
                  value={cfg.path}
                  onChange={(e) => updateConfig(index, 'path', e.target.value)}
                />
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div key={index} className='grid grid-cols-4 items-center gap-3'>
              <Select
                value={cfg.category}
                onValueChange={(v) => updateConfig(index, 'category', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='选择类目' />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => (
                    <SelectItem key={c.category} value={c.category}>
                      {c.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={cfg.downloader}
                onValueChange={(v) => updateConfig(index, 'downloader', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='选择下载器' />
                </SelectTrigger>
                <SelectContent>
                  {DOWNLOADER_OPTIONS.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder='/downloads/movie/aria2'
                value={cfg.path}
                onChange={(e) => updateConfig(index, 'path', e.target.value)}
              />

              <Button
                size='icon'
                variant='ghost'
                onClick={() => removeConfig(index)}
                disabled={configs.length === 1}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          )
        )}
      </div>

      <div className='flex justify-between pt-4'>
        <Button variant='outline' onClick={addConfig}>
          <Plus className='mr-2 h-4 w-4' />
          添加配置
        </Button>

        <Button onClick={handleSaveConfig}>保存配置</Button>
      </div>
    </div>
  )
}
