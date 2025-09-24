import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  FileText, 
  Code, 
  HelpCircle,
  ChevronRight,
  Upload,
  Settings,
  BarChart3,
  Download,
  Dna
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    {
      id: 'getting-started',
      title: 'Guide de Démarrage',
      icon: BookOpen,
      content: {
        title: 'Commencer avec CellClassify Pro',
        description: 'Apprenez les bases de l\'utilisation de la plateforme',
        items: [
          {
            title: 'Introduction',
            content: `CellClassify Pro est une plateforme avancée d'analyse de données scRNAseq (single-cell RNA sequencing) 
            qui utilise des algorithmes d'apprentissage automatique de pointe pour classifier les cellules embryonnaires 
            en types ICM (Inner Cell Mass) et TE (Trophectoderm).`
          },
          {
            title: 'Fonctionnalités Principales',
            content: `• Classification automatique ICM vs TE avec >99% de précision
            • Support de 3 modèles ML: CatBoost, XGBoost, RandomForest
            • Visualisations interactives (UMAP, t-SNE, heatmaps)
            • Export des résultats en CSV/Excel/PDF
            • Historique complet des analyses`
          },
          {
            title: 'Première Utilisation',
            content: `1. Préparez vos données scRNAseq au format CSV ou Excel
            2. Accédez à la page "Nouvelle Analyse"
            3. Uploadez votre fichier de données
            4. Sélectionnez les modèles à utiliser
            5. Lancez l'analyse et consultez les résultats`
          }
        ]
      }
    },
    {
      id: 'data-format',
      title: 'Format des Données',
      icon: FileText,
      content: {
        title: 'Préparer vos Données scRNAseq',
        description: 'Spécifications et recommandations pour le format des données',
        items: [
          {
            title: 'Formats Supportés',
            content: `• CSV (.csv) - Recommandé pour les gros datasets
            • Excel (.xlsx, .xls) - Pratique pour les petits datasets
            • Encodage UTF-8 recommandé
            • Séparateur virgule pour les CSV`
          },
          {
            title: 'Structure des Données',
            content: `Les données doivent être organisées avec:
            • Lignes: Cellules individuelles
            • Colonnes: Gènes (features)
            • Première ligne: Noms des gènes (headers)
            • Première colonne: IDs des cellules (optionnel)
            • Valeurs: Niveaux d'expression génique (counts ou normalized)`
          },
          {
            title: 'Exemple de Structure',
            content: `Cell_ID,Gene1,Gene2,Gene3,...
            Cell_001,0.5,1.2,0.8,...
            Cell_002,1.1,0.3,1.5,...
            Cell_003,0.7,0.9,0.4,...`
          },
          {
            title: 'Recommandations',
            content: `• Minimum 100 cellules pour des résultats fiables
            • Minimum 1000 gènes pour une classification optimale
            • Données pré-filtrées (gènes peu exprimés supprimés)
            • Normalisation recommandée mais non obligatoire`
          }
        ]
      }
    },
    {
      id: 'models',
      title: 'Modèles ML',
      icon: Dna,
      content: {
        title: 'Algorithmes de Classification',
        description: 'Détails sur les modèles d\'apprentissage automatique disponibles',
        items: [
          {
            title: 'CatBoost (Recommandé)',
            content: `• Gradient boosting avec gestion automatique des features catégorielles
            • Précision: >99% sur les données de test
            • Vitesse: Très rapide (1-3 secondes)
            • Avantages: Robuste, peu de surapprentissage, excellente performance
            • Idéal pour: Tous types de datasets scRNAseq`
          },
          {
            title: 'XGBoost',
            content: `• Extreme Gradient Boosting optimisé
            • Précision: >98% sur les données de test
            • Vitesse: Rapide (2-4 secondes)
            • Avantages: Très populaire, bien documenté, performances élevées
            • Idéal pour: Datasets de taille moyenne à grande`
          },
          {
            title: 'Random Forest',
            content: `• Ensemble d'arbres de décision
            • Précision: >95% sur les données de test
            • Vitesse: Moyenne (3-6 secondes)
            • Avantages: Interprétable, stable, baseline solide
            • Idéal pour: Analyse exploratoire, comparaison de référence`
          },
          {
            title: 'Sélection des Modèles',
            content: `• Utilisez CatBoost pour la meilleure précision
            • Combinez plusieurs modèles pour validation croisée
            • Random Forest comme baseline de comparaison
            • Tous les modèles peuvent être exécutés simultanément`
          }
        ]
      }
    },
    {
      id: 'api',
      title: 'API Documentation',
      icon: Code,
      content: {
        title: 'Interface de Programmation',
        description: 'Documentation technique pour l\'intégration API',
        items: [
          {
            title: 'Endpoints Disponibles',
            content: `POST /api/upload - Upload de fichier
            POST /api/analyze - Lancement d'analyse
            GET /api/results/{id} - Récupération des résultats
            GET /api/export/{id} - Export des résultats
            GET /api/models/info - Informations sur les modèles
            GET /api/history - Historique des analyses`
          },
          {
            title: 'Exemple d\'Upload',
            content: `curl -X POST http://localhost:5000/api/upload \\
              -F "file=@data.csv" \\
              -H "Content-Type: multipart/form-data"`
          },
          {
            title: 'Exemple d\'Analyse',
            content: `curl -X POST http://localhost:5000/api/analyze \\
              -H "Content-Type: application/json" \\
              -d '{"file_id": "uuid", "models": ["catboost", "xgboost"]}'`
          },
          {
            title: 'Format de Réponse',
            content: `{
              "analysis_id": "uuid",
              "results": {
                "catboost": {
                  "accuracy": 0.995,
                  "f1_score": 0.994,
                  "auc_score": 0.998
                }
              }
            }`
          }
        ]
      }
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: HelpCircle,
      content: {
        title: 'Questions Fréquentes',
        description: 'Réponses aux questions les plus courantes',
        items: [
          {
            title: 'Quelle est la taille maximale de fichier supportée?',
            content: `La plateforme peut traiter des fichiers jusqu'à 500 MB. Pour des datasets plus volumineux, 
            nous recommandons de pré-filtrer les données ou de nous contacter pour des solutions personnalisées.`
          },
          {
            title: 'Combien de temps prend une analyse?',
            content: `Le temps d'analyse dépend de la taille du dataset:
            • <1000 cellules: 1-3 secondes
            • 1000-5000 cellules: 3-10 secondes  
            • 5000-10000 cellules: 10-30 secondes
            • >10000 cellules: 30 secondes - 2 minutes`
          },
          {
            title: 'Mes données sont-elles sécurisées?',
            content: `Oui, toutes les données sont traitées localement et supprimées automatiquement après 24h. 
            Aucune donnée n'est partagée avec des tiers. La connexion est sécurisée par HTTPS.`
          },
          {
            title: 'Puis-je utiliser mes propres modèles?',
            content: `Actuellement, la plateforme utilise des modèles pré-entraînés optimisés. 
            Pour des besoins spécifiques ou l'intégration de modèles personnalisés, contactez notre équipe.`
          },
          {
            title: 'Comment interpréter les résultats?',
            content: `• ICM: Inner Cell Mass (masse cellulaire interne)
            • TE: Trophectoderm (trophectoderme)
            • Accuracy: Pourcentage de prédictions correctes
            • F1-Score: Moyenne harmonique de précision et rappel
            • AUC: Aire sous la courbe ROC (qualité de classification)`
          },
          {
            title: 'Que faire si l\'analyse échoue?',
            content: `Vérifiez que:
            • Le fichier est au bon format (CSV/Excel)
            • Les données contiennent au moins 50 cellules
            • Il n'y a pas de valeurs manquantes importantes
            • Le fichier n'est pas corrompu
            Si le problème persiste, contactez le support.`
          }
        ]
      }
    }
  ]

  const currentSection = sections.find(s => s.id === activeSection)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-slate-400">Guide complet d'utilisation de CellClassify Pro</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm sticky top-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-500/20 text-blue-400 border-r-2 border-blue-500'
                          : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{section.title}</span>
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  {React.createElement(currentSection.icon, { className: "w-6 h-6 mr-3" })}
                  {currentSection.content.title}
                </CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  {currentSection.content.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {currentSection.content.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-l-4 border-blue-500/30 pl-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Upload</h4>
              <p className="text-sm text-slate-400">Formats CSV/Excel supportés</p>
            </div>
            <div className="text-center">
              <Settings className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Configuration</h4>
              <p className="text-sm text-slate-400">3 modèles ML disponibles</p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Analyse</h4>
              <p className="text-sm text-slate-400">Résultats en temps réel</p>
            </div>
            <div className="text-center">
              <Download className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white mb-1">Export</h4>
              <p className="text-sm text-slate-400">CSV, Excel, PDF</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DocsPage

