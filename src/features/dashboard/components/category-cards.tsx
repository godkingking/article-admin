import type { Category } from '@/types/article.ts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Layers } from 'lucide-react'

export function CategoryCards({ data }: { data: Category[] }) {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {data.map((cat) => (
        <Card
          className="
    bg-gradient-to-br from-background to-muted
    hover:shadow-lg transition
  "
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">
              {cat.category}
            </CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-semibold">
              {cat.count.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              总数
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
