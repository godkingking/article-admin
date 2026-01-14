import { ContentSection } from '@/features/settings/components/content-section.tsx'
import { DownloaderForm } from '@/features/settings/downloader/downloader-form.tsx'

export function SettingsDownloader() {
  return (
    <ContentSection title='下载目录配置' desc='管理类目-下载器-下载目录的关系'>
      <DownloaderForm />
    </ContentSection>
  )
}
