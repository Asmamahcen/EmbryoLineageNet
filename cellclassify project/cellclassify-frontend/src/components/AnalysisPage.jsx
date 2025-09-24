import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Play,
  Settings,
  Info,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const AnalysisPage = () => {
  const navigate = useNavigate()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileInfo, setFileInfo] = useState(null)
  const [selectedModels, setSelectedModels] = useState(['catboost', 'xgboost'])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const models = [
    {
      id: 'catboost',
      name: 'CatBoost',
      description: 'Gradient boosting avec gestion automatique des features catégorielles',
      performance: 'Très haute (>99% accuracy)',
      speed: 'Rapide',
      recommended: true,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'xgboost',
      name: 'XGBoost',
      description: 'Extreme Gradient Boosting optimisé',
      performance: 'Haute (>98% accuracy)',
      speed: 'Rapide',
      recommended: true,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'randomforest',
      name: 'Random Forest',
      description: 'Ensemble de arbres de décision',
      performance: 'Bonne (>95% accuracy)',
      speed: 'Moyenne',
      recommended: false,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileUpload = async (file) => {
    if (!file) return

    // Validation du type de fichier
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if (!allowedTypes.includes(file.type)) {
      alert('Type de fichier non supporté. Veuillez utiliser CSV ou Excel.')
      return
    }

    setUploadedFile(file)
    
    // Simulation de l'upload et de l'analyse du fichier
    const mockFileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      shape: [Math.floor(Math.random() * 1000) + 500, Math.floor(Math.random() * 20000) + 10000],
      preview: [
        { Gene1: 0.5, Gene2: 1.2, Gene3: 0.8 },
        { Gene1: 1.1, Gene2: 0.3, Gene3: 1.5 },
        { Gene1: 0.7, Gene2: 0.9, Gene3: 0.4 }
      ]
    }
    
    setFileInfo(mockFileInfo)
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const toggleModel = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const startAnalysis = async () => {
    if (!uploadedFile || selectedModels.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulation du processus d'analyse
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Redirection vers les résultats après un délai
          setTimeout(() => {
            navigate('/results/demo-analysis-id')
          }, 1000)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFileInfo(null)
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
        <h1 className="text-3xl font-bold text-white mb-2">Nouvelle Analyse</h1>
        <p className="text-slate-400">Uploadez vos données scRNAseq et configurez votre analyse</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload de Fichier
              </CardTitle>
              <CardDescription className="text-slate-400">
                Formats supportés: CSV, Excel (.xlsx, .xls)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Glissez-déposez votre fichier ici
                  </h3>
                  <p className="text-slate-400 mb-4">ou cliquez pour sélectionner</p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Sélectionner un fichier
                    </Button>
                  </label>
                </div>
              ) : (
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div>
                        <h4 className="font-medium text-white">{uploadedFile.name}</h4>
                        <p className="text-sm text-slate-400">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {fileInfo && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">Fichier validé avec succès</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Dimensions:</span>
                          <span className="text-white ml-2">
                            {fileInfo.shape[0]} × {fileInfo.shape[1]}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Cellules:</span>
                          <span className="text-white ml-2">{fileInfo.shape[0]}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Model Selection */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Sélection des Modèles
              </CardTitle>
              <CardDescription className="text-slate-400">
                Choisissez les modèles à utiliser pour la classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {models.map((model) => (
                  <motion.div
                    key={model.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedModels.includes(model.id)
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => toggleModel(model.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${model.color}`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-white">{model.name}</h4>
                            {model.recommended && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Recommandé
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{model.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-300">{model.performance}</p>
                        <p className="text-xs text-slate-400">{model.speed}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Analysis Summary */}
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Résumé de l'Analyse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-slate-400">Fichier:</span>
                <p className="text-white font-medium">
                  {uploadedFile ? uploadedFile.name : 'Aucun fichier'}
                </p>
              </div>
              
              <div>
                <span className="text-slate-400">Modèles sélectionnés:</span>
                <div className="mt-2 space-y-1">
                  {selectedModels.length > 0 ? (
                    selectedModels.map(modelId => {
                      const model = models.find(m => m.id === modelId)
                      return (
                        <Badge key={modelId} className="mr-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {model?.name}
                        </Badge>
                      )
                    })
                  ) : (
                    <p className="text-slate-500">Aucun modèle sélectionné</p>
                  )}
                </div>
              </div>

              {fileInfo && (
                <div>
                  <span className="text-slate-400">Données:</span>
                  <p className="text-white">
                    {fileInfo.shape[0]} cellules, {fileInfo.shape[1]} gènes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Start Analysis */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              {!isAnalyzing ? (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Prêt à analyser
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Lancez l'analyse de classification ICM vs TE
                  </p>
                  <Button
                    onClick={startAnalysis}
                    disabled={!uploadedFile || selectedModels.length === 0}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Lancer l'Analyse
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Analyse en cours...
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Classification des cellules en cours
                  </p>
                  <Progress value={analysisProgress} className="mb-4" />
                  <p className="text-sm text-slate-400">
                    {Math.round(analysisProgress)}% terminé
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalysisPage

