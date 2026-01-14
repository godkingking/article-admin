import { ContentSection } from '@/features/settings/components/content-section.tsx'
import { FolderForm } from '@/features/settings/folder/folder-form.tsx'

export function SettingsFolder() {
  return (
    <ContentSection title='下载目录配置' desc='管理类目-下载器-下载目录的关系'>
      <FolderForm />
    </ContentSection>
  )
}
