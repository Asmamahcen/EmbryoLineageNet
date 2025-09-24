import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  Download, 
  BarChart3, 
  TrendingUp, 
  CheckCircle,
  Target,
  Zap,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const ResultsPage = () => {
  const { id } = useParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  // Données simulées pour la démo
  const mockResults = {
    analysis_id: id,
    timestamp: '2024-01-15 14:30:25',
    data_info: {
      samples: 1063,
      features: 18432,
      test_size: 319
    },
    models_used: ['catboost', 'xgboost', 'randomforest'],
    results: {
      catboost: {
        accuracy: 0.995,
        f1_score: 0.994,
        auc_score: 0.998,
        classification_report: {
          'ICM': { precision: 0.992, recall: 0.988, 'f1-score': 0.990 },
          'TE': { precision: 0.996, recall: 0.998, 'f1-score': 0.997 }
        }
      },
      xgboost: {
        accuracy: 0.988,
        f1_score: 0.987,
        auc_score: 0.995,
        classification_report: {
          'ICM': { precision: 0.985, recall: 0.982, 'f1-score': 0.984 },
          'TE': { precision: 0.990, recall: 0.992, 'f1-score': 0.991 }
        }
      },
      randomforest: {
        accuracy: 0.972,
        f1_score: 0.970,
        auc_score: 0.988,
        classification_report: {
          'ICM': { precision: 0.968, recall: 0.965, 'f1-score': 0.967 },
          'TE': { precision: 0.975, recall: 0.978, 'f1-score': 0.977 }
        }
      }
    }
  }

  // Données UMAP simulées
  const umapData = Array.from({ length: 319 }, (_, i) => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    predicted: Math.random() > 0.12 ? 'TE' : 'ICM',
    confidence: 0.8 + Math.random() * 0.2
  }))

  // Données de distribution
  const distributionData = [
    { name: 'ICM', value: 38, color: '#3b82f6' },
    { name: 'TE', value: 281, color: '#06b6d4' }
  ]

  useEffect(() => {
    // Simulation du chargement des résultats
    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }, [id])

  const exportResults = () => {
    // Simulation de l'export
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Sample_ID,True_Label,CatBoost_Prediction,CatBoost_Confidence,XGBoost_Prediction,XGBoost_Confidence\n" +
      umapData.map((item, index) => 
        `Sample_${index + 1},${item.predicted},${item.predicted},${item.confidence.toFixed(3)},${item.predicted},${(item.confidence - 0.02).toFixed(3)}`
      ).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `analysis_${id}_results.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Résultats d'Analyse</h1>
          <p className="text-slate-400">
            Analyse terminée le {results.timestamp} • {results.data_info.samples} cellules analysées
          </p>
        </div>
        <Button onClick={exportResults} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
          <Download className="w-4 h-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.models_used.map((modelName) => {
          const modelResults = results.results[modelName]
          const modelInfo = {
            catboost: { name: 'CatBoost', color: 'from-blue-500 to-blue-600' },
            xgboost: { name: 'XGBoost', color: 'from-cyan-500 to-cyan-600' },
            randomforest: { name: 'Random Forest', color: 'from-purple-500 to-purple-600' }
          }[modelName]

          return (
            <motion.div
              key={modelName}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${modelInfo.color} mr-2`} />
                      {modelInfo.name}
                    </span>
                    {modelName === 'catboost' && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Meilleur
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Target className="w-4 h-4 text-blue-400 mr-1" />
                        <span className="text-sm text-slate-400">Précision</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {(modelResults.accuracy * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Zap className="w-4 h-4 text-cyan-400 mr-1" />
                        <span className="text-sm text-slate-400">F1-Score</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {(modelResults.f1_score * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-slate-400">AUC Score</span>
                    </div>
                    <p className="text-xl font-bold text-white">
                      {(modelResults.auc_score * 100).toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UMAP Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Visualisation UMAP</CardTitle>
              <CardDescription className="text-slate-400">
                Projection 2D des cellules classifiées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={umapData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="x" stroke="#9ca3af" />
                  <YAxis dataKey="y" stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      name === 'predicted' ? value : value.toFixed(3),
                      name === 'predicted' ? 'Type' : name === 'confidence' ? 'Confiance' : name
                    ]}
                  />
                  <Scatter 
                    dataKey="y" 
                    fill={(entry) => entry.predicted === 'ICM' ? '#3b82f6' : '#06b6d4'}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Distribution des Classifications</CardTitle>
              <CardDescription className="text-slate-400">
                Répartition ICM vs TE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Métriques Détaillées</CardTitle>
            <CardDescription className="text-slate-400">
              Performance par classe pour chaque modèle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400">Modèle</th>
                    <th className="text-left py-3 px-4 text-slate-400">Classe</th>
                    <th className="text-left py-3 px-4 text-slate-400">Précision</th>
                    <th className="text-left py-3 px-4 text-slate-400">Rappel</th>
                    <th className="text-left py-3 px-4 text-slate-400">F1-Score</th>
                  </tr>
                </thead>
                <tbody>
                  {results.models_used.map((modelName) => {
                    const modelResults = results.results[modelName]
                    const modelInfo = {
                      catboost: { name: 'CatBoost' },
                      xgboost: { name: 'XGBoost' },
                      randomforest: { name: 'Random Forest' }
                    }[modelName]

                    return ['ICM', 'TE'].map((className, index) => (
                      <tr key={`${modelName}-${className}`} className="border-b border-slate-700/50">
                        {index === 0 && (
                          <td rowSpan={2} className="py-3 px-4 text-white font-medium">
                            {modelInfo.name}
                          </td>
                        )}
                        <td className="py-3 px-4 text-white">{className}</td>
                        <td className="py-3 px-4 text-white">
                          {(modelResults.classification_report[className].precision * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-white">
                          {(modelResults.classification_report[className].recall * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-white">
                          {(modelResults.classification_report[className]['f1-score'] * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default ResultsPage

