import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Dna,
  FlaskConical
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    successRate: 0,
    avgAccuracy: 0,
    recentAnalyses: []
  })

  // Données simulées pour la démo
  const performanceData = [
    { name: 'Jan', accuracy: 98.5, analyses: 12 },
    { name: 'Fév', accuracy: 99.1, analyses: 18 },
    { name: 'Mar', accuracy: 98.8, analyses: 25 },
    { name: 'Avr', accuracy: 99.3, analyses: 31 },
    { name: 'Mai', accuracy: 99.0, analyses: 28 },
    { name: 'Jun', accuracy: 99.5, analyses: 35 },
  ]

  const modelComparison = [
    { name: 'CatBoost', accuracy: 99.5, color: '#3b82f6' },
    { name: 'XGBoost', accuracy: 98.8, color: '#06b6d4' },
    { name: 'RandomForest', accuracy: 97.2, color: '#8b5cf6' },
  ]

  const recentAnalyses = [
    {
      id: '1',
      name: 'Embryo_Sample_001',
      timestamp: '2024-01-15 14:30',
      status: 'completed',
      accuracy: 99.2,
      cellCount: 1063
    },
    {
      id: '2',
      name: 'Embryo_Sample_002',
      timestamp: '2024-01-15 13:15',
      status: 'completed',
      accuracy: 98.8,
      cellCount: 949
    },
    {
      id: '3',
      name: 'Embryo_Sample_003',
      timestamp: '2024-01-15 11:45',
      status: 'processing',
      accuracy: null,
      cellCount: 1205
    }
  ]

  useEffect(() => {
    // Simulation du chargement des statistiques
    setStats({
      totalAnalyses: 156,
      successRate: 98.7,
      avgAccuracy: 99.1,
      recentAnalyses: recentAnalyses
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Vue d'ensemble de vos analyses scRNAseq</p>
        </div>
        <Link to="/analyze">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <FlaskConical className="w-4 h-4 mr-2" />
            Nouvelle Analyse
          </Button>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Analyses</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalAnalyses}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Taux de Réussite</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.successRate}%</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.3% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Précision Moyenne</CardTitle>
            <Dna className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.avgAccuracy}%</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.5% ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Temps Moyen</CardTitle>
            <Clock className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.3s</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              -0.2s ce mois
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Performance des Modèles</CardTitle>
              <CardDescription className="text-slate-400">
                Évolution de la précision au fil du temps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[95, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Model Comparison */}
        <motion.div variants={itemVariants}>
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Comparaison des Modèles</CardTitle>
              <CardDescription className="text-slate-400">
                Précision moyenne par modèle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[95, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Analyses */}
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Analyses Récentes</CardTitle>
              <CardDescription className="text-slate-400">
                Vos dernières analyses scRNAseq
              </CardDescription>
            </div>
            <Link to="/history">
              <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white">
                Voir tout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      analysis.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {analysis.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{analysis.name}</h4>
                      <p className="text-sm text-slate-400">
                        {analysis.cellCount} cellules • {analysis.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {analysis.accuracy && (
                      <p className="text-lg font-semibold text-green-400">
                        {analysis.accuracy}%
                      </p>
                    )}
                    <p className={`text-sm ${
                      analysis.status === 'completed' ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {analysis.status === 'completed' ? 'Terminé' : 'En cours...'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Prêt pour une nouvelle analyse ?
                </h3>
                <p className="text-slate-400">
                  Uploadez vos données scRNAseq et obtenez des résultats en quelques secondes
                </p>
              </div>
              <Link to="/analyze">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  <Upload className="w-5 h-5 mr-2" />
                  Commencer l'Analyse
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard

