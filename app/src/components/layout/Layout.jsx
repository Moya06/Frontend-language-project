import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Toast from '../ui/Toast'
import { Outlet } from 'react-router-dom'
import { useApp } from '../../store/AppContext'

export default function Layout() {
  const { toast } = useApp()
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-page)' }}>
      {/* Animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full -top-52 -left-52 animate-orb"
          style={{ background: 'radial-gradient(circle, #4f46e5, #7c3aed)', filter: 'blur(100px)', opacity: 'var(--orb-opacity)' }} />
        <div className="absolute w-[550px] h-[550px] rounded-full -bottom-40 -right-40 animate-orb"
          style={{ background: 'radial-gradient(circle, #0891b2, #0369a1)', filter: 'blur(100px)', opacity: 'var(--orb-opacity)', animationDelay: '-5s', animationDuration: '15s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orb"
          style={{ background: 'radial-gradient(circle, #ec4899, #be185d)', filter: 'blur(100px)', opacity: 'var(--orb-opacity)', animationDelay: '-3s', animationDuration: '18s' }} />
      </div>

      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}
