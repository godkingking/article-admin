import { Outlet } from '@tanstack/react-router';
import { Monitor, Bell, Download, Folder, UserPen } from 'lucide-react'
import { ConfigDrawer } from '@/components/config-drawer';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { SidebarNav } from './components/sidebar-nav';


const sidebarNavItems = [
  {
    title: '账户',
    href: '/settings',
    icon: <UserPen size={18} />,
  },
  {
    title: '目录',
    href: '/settings/folder',
    icon: <Folder size={18} />,
  },
  {
    title: '下载器',
    href: '/settings/downloader',
    icon: <Download size={18} />,
  },
  {
    title: '通知',
    href: '/settings/notifications',
    icon: <Bell size={18} />,
  },
  {
    title: '外观',
    href: '/settings/display',
    icon: <Monitor size={18} />,
  },
]

export function Settings() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>

      <Main fixed>
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
