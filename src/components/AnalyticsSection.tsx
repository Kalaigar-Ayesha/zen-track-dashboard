
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export const AnalyticsSection = ({ compact = false }: { compact?: boolean }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  if (compact) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Analytics Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">45,048</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Carbon Footprint</p>
                  <div className="flex items-center justify-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500 text-xs">+16%</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">123</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Energy Intensity</p>
                  <div className="flex items-center justify-center mt-1">
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-red-500 text-xs">-22%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Brand Kits & Analytics
        </h2>
      </motion.div>

      {/* Brand Kits Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-purple-900 to-blue-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse-slow"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-xl">Brand Kits</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            {[
              { name: 'ECorp', color: 'bg-green-500', selected: false },
              { name: 'ICorp', color: 'bg-orange-500', selected: false },
              { name: 'The Agency', color: 'bg-red-500', selected: true }
            ].map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center justify-between p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 cursor-pointer transition-all duration-200 ${
                  brand.selected ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {brand.selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </motion.div>
                  )}
                  <div className={`w-8 h-8 ${brand.color} rounded-full`}></div>
                  <span className="font-medium">{brand.name}</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((dot) => (
                    <div key={dot} className="w-1 h-1 bg-white/60 rounded-full"></div>
                  ))}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Carbon Emissions Chart */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Embodied Carbon Emissions</CardTitle>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Intensity measured by kgCO₂e/m²
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download data</span>
            </motion.button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-2">
              {['Refurbishment', 'New build', 'All'].map((filter, index) => (
                <motion.button
                  key={filter}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === 'All' 
                      ? 'bg-red-700 text-white' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
            
            <div className="relative h-64 overflow-hidden rounded-lg bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src="/lovable-uploads/4360ce40-1250-41f4-b60e-d0dd3c3172d0.png"
                alt="Carbon Emissions Chart"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Metrics */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 overflow-hidden rounded-lg">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src="/lovable-uploads/af85049c-fca6-456e-bc90-54cbfa902af1.png"
                alt="Portfolio Metrics"
                className="w-full h-full object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              ></motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { label: 'Carbon Footprint', value: '45,048', change: '+16%', trend: 'up' },
                { label: 'Energy Intensity', value: '123', change: '-22%', trend: 'down' },
                { label: 'Energy Consumption', value: '47,790,662', change: '-27%', trend: 'down' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
