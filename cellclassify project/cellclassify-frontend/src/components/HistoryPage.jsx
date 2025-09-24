import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const HistoryPage = () => {
  const [analyses, setAnalyses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  // Données simulées pour la démo
  const mockAnalyses = [
    {
      analysis_id: 'analysis-001',
      filename: 'Embryo_Sample_001.csv',
      timestamp: '2024-01-15 14:30:25',
      data_shape: [1063, 18432],
      models_used: ['catboost', 'xgboost'],
      best_accuracy: 0.995,
      status: 'completed',
      duration: '2.3s'
    },
    {
      analysis_id: 'analysis-002',
      filename: 'Embryo_Sample_002.xlsx',
      timestamp: '2024-01-15 13:15:42',
      data_shape: [949, 16789],
      models_used: ['catboost', 'xgboost', 'randomforest'],
      best_accuracy: 0.988,
      status: 'completed',
      duration: '3.1s'
    },
    {
      analysis_id: 'analysis-003',
      filename: 'Embryo_Sample_003.csv',
      timestamp: '2024-01-15 11:45:18',
      data_shape: [1205, 19567],
      models_used: ['catboost'],
      best_accuracy: 0.992,
      status: 'completed',
      duration: '1.8s'
    },
    {
      analysis_id: 'analysis-004',
      filename: 'Embryo_Sample_004.xlsx',
      timestamp: '2024-01-14 16:22:33',
      data_shape: [876, 15234],
      models_used: ['xgboost', 'randomforest'],
      best_accuracy: 0.976,
      status: 'completed',
      duration: '2.7s'
    },
    {
      analysis_id: 'analysis-005',
      filename: 'Embryo_Sample_005.csv',
      timestamp: '2024-01-14 14:08:15',
      data_shape: [1134, 17892],
      models_used: ['catboost', 'xgboost'],
      best_accuracy: null,
      status: 'failed',
      duration: null
    }
  ]

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setAnalyses(mockAnalyses)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = analysis.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.analysis_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || analysis.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'processing':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'processing':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <Trash2 className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const deleteAnalysis = (analysisId) => {
    setAnalyses(prev => prev.filter(analysis => analysis.analysis_id !== analysisId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Historique des Analyses</h1>
        <p className="text-slate-400">Consultez et gérez vos analyses précédentes</p>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par nom de fichier ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-slate-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="completed">Terminé</option>
                <option value="processing">En cours</option>
                <option value="failed">Échoué</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400">
          {filteredAnalyses.length} analyse{filteredAnalyses.length !== 1 ? 's' : ''} trouvée{filteredAnalyses.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Analyses List */}
      <div className="space-y-4">
        {filteredAnalyses.map((analysis, index) => (
          <motion.div
            key={analysis.analysis_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {analysis.filename}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {analysis.timestamp}
                        </span>
                        <span>
                          {analysis.data_shape[0]} cellules × {analysis.data_shape[1]} gènes
                        </span>
                        {analysis.duration && (
                          <span>Durée: {analysis.duration}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getStatusColor(analysis.status)}>
                          {getStatusIcon(analysis.status)}
                          <span className="ml-1">
                            {analysis.status === 'completed' ? 'Terminé' : 
                             analysis.status === 'processing' ? 'En cours' : 'Échoué'}
                          </span>
                        </Badge>
                        
                        {analysis.models_used.map(model => (
                          <Badge key={model} variant="outline" className="text-slate-400 border-slate-600">
                            {model === 'catboost' ? 'CatBoost' : 
                             model === 'xgboost' ? 'XGBoost' : 'RandomForest'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {analysis.best_accuracy && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          {(analysis.best_accuracy * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-slate-400">Meilleure précision</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {analysis.status === 'completed' && (
                        <>
                          <Link to={`/results/${analysis.analysis_id}`}>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-slate-600 text-slate-400 hover:text-white"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-400 hover:text-red-300 hover:border-red-500"
                        onClick={() => deleteAnalysis(analysis.analysis_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAnalyses.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Aucune analyse trouvée</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Aucune analyse ne correspond à vos critères de recherche.'
                : 'Vous n\'avez pas encore effectué d\'analyse.'}
            </p>
            <Link to="/analyze">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Commencer une nouvelle analyse
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

export default HistoryPage

