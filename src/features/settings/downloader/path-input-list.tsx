import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'


export type PathItem = {
  id: string
  path: string
  label: string
}

export function PathListInput({
  value,
  onChange,
}: {
  value: PathItem[]
  onChange: (v: PathItem[]) => void
}) {
  const addPath = () =>
    onChange([...value, { id: crypto.randomUUID(), label: '', path: '' }])

  const updateItem = (id: string, key: 'label' | 'path', val: string) => {
    onChange(
      value.map((item) => (item.id === id ? { ...item, [key]: val } : item))
    )
  }

  const removePath = (id: string) => {
    onChange(value.filter((item) => item.id !== id))
  }

  return (
    <div className='space-y-2'>
      {value.map((item) => (
        <div key={item.id} className='grid grid-cols-11 gap-2'>
          <Input
            className='col-span-5'
            placeholder='名称（如：电影）'
            value={item.label}
            onChange={(e) => updateItem(item.id, 'label', e.target.value)}
          />
          <Input
            className='col-span-5'
            placeholder='/downloads/movie,fileid'
            value={item.path}
            onChange={(e) => updateItem(item.id, 'path', e.target.value)}
          />
          <Button
            size='icon'
            variant='ghost'
            onClick={() => removePath(item.id)}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ))}

      <Button variant='outline' onClick={addPath}>
        <Plus className='mr-2 h-4 w-4' />
        添加目录
      </Button>
    </div>
  )
}
