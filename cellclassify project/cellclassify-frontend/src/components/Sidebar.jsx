import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  FlaskConical, 
  BarChart3, 
  History, 
  BookOpen, 
  Menu,
  X,
  Dna
} from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: FlaskConical, label: 'Nouvelle Analyse', path: '/analyze' },
    { icon: BarChart3, label: 'Résultats', path: '/results' },
    { icon: History, label: 'Historique', path: '/history' },
    { icon: BookOpen, label: 'Documentation', path: '/docs' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 z-50 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <motion.div
            className="flex items-center space-x-3"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Dna className="w-6 h-6 text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="text-lg font-bold text-white">CellClassify</h1>
                <p className="text-xs text-slate-400">Pro</p>
              </div>
            )}
          </motion.div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-slate-400" />
            ) : (
              <Menu className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path || 
              (item.path === '/results' && location.pathname.startsWith('/results/'))
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                {isOpen && (
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <p className="text-xs text-slate-400 mb-1">Version 1.0.0</p>
              <p className="text-xs text-slate-500">scRNAseq Analysis Platform</p>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  )
}

export default Sidebar

