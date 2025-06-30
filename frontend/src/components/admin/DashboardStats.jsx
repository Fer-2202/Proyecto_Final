import React from 'react';
import { Card, Row, Col, Progress, Statistic, Badge } from 'antd';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, Ticket, Calendar, 
  Activity, DollarSign, Eye, ShoppingCart, Star
} from 'lucide-react';

const DashboardStats = ({ data, activeTab }) => {
  // Calcular estadísticas
  const stats = {
    totalUsers: data["user-profiles"]?.length || 0,
    totalTickets: data.tickets?.length || 0,
    totalAnimals: data.animals?.length || 0,
    totalVisits: data.visits?.length || 0,
    totalOrders: data.orders?.length || 0,
    totalSpecies: data.species?.length || 0,
    totalHabitats: data.habitats?.length || 0,
    totalSections: data.sections?.length || 0,
  };

  // Calcular porcentajes de crecimiento (simulado)
  const growthRates = {
    users: 12.5,
    tickets: 8.3,
    animals: 15.7,
    visits: -2.1,
    orders: 23.4,
    species: 5.2,
    habitats: 9.8,
    sections: 3.1,
  };

  const getGrowthIcon = (rate) => {
    if (rate > 0) {
      return <TrendingUp size={16} className="text-green-500" />;
    } else {
      return <TrendingDown size={16} className="text-red-500" />;
    }
  };

  const getGrowthColor = (rate) => {
    if (rate > 0) return 'text-green-600';
    if (rate < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const statCards = [
    {
      title: "Total Usuarios",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      growth: growthRates.users,
      description: "Usuarios registrados"
    },
    {
      title: "Total Entradas",
      value: stats.totalTickets,
      icon: <Ticket size={24} />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      growth: growthRates.tickets,
      description: "Tickets vendidos"
    },
    {
      title: "Total Animales",
      value: stats.totalAnimals,
      icon: <Activity size={24} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      growth: growthRates.animals,
      description: "Animales en el parque"
    },
    {
      title: "Total Visitas",
      value: stats.totalVisits,
      icon: <Calendar size={24} />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      growth: growthRates.visits,
      description: "Visitas registradas"
    },
    {
      title: "Total Órdenes",
      value: stats.totalOrders,
      icon: <ShoppingCart size={24} />,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      growth: growthRates.orders,
      description: "Órdenes de compra"
    },
    {
      title: "Total Especies",
      value: stats.totalSpecies,
      icon: <Star size={24} />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      growth: growthRates.species,
      description: "Especies catalogadas"
    },
    {
      title: "Total Hábitats",
      value: stats.totalHabitats,
      icon: <Eye size={24} />,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      growth: growthRates.habitats,
      description: "Hábitats disponibles"
    },
    {
      title: "Total Secciones",
      value: stats.totalSections,
      icon: <DollarSign size={24} />,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      growth: growthRates.sections,
      description: "Secciones del parque"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Resumen del Parque Marino
        </h2>
        <p className="text-gray-600">
          Estadísticas generales y métricas de rendimiento
        </p>
      </motion.div>

      {/* Cards de estadísticas */}
      <Row gutter={[16, 16]}>
        {statCards.map((card, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.bgColor}`}>
                    <div className={card.textColor}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {getGrowthIcon(card.growth)}
                      <span className={`text-sm font-medium ${getGrowthColor(card.growth)}`}>
                        {Math.abs(card.growth)}%
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">vs mes anterior</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {card.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {card.description}
                  </p>
                </div>

                {/* Barra de progreso */}
                <div className="mt-4">
                  <Progress
                    percent={Math.min((card.value / 100) * 100, 100)}
                    strokeColor={{
                      '0%': '#3b82f6',
                      '100%': '#8b5cf6',
                    }}
                    showInfo={false}
                    strokeWidth={4}
                  />
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Métricas adicionales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Densidad de población */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Densidad de Población
            </h4>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              {stats.totalAnimals > 0 ? (stats.totalAnimals / stats.totalHabitats).toFixed(1) : 0}
            </p>
            <p className="text-sm text-gray-600">
              Animales por hábitat
            </p>
          </div>
        </Card>

        {/* Tasa de ocupación */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ticket size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Tasa de Ocupación
            </h4>
            <p className="text-2xl font-bold text-green-600 mb-2">
              {stats.totalVisits > 0 ? ((stats.totalVisits / stats.totalTickets) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-gray-600">
              Visitas vs Entradas
            </p>
          </div>
        </Card>

        {/* Diversidad de especies */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Diversidad de Especies
            </h4>
            <p className="text-2xl font-bold text-purple-600 mb-2">
              {stats.totalSpecies}
            </p>
            <p className="text-sm text-gray-600">
              Especies únicas
            </p>
          </div>
        </Card>

        {/* Eficiencia operativa */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">
              Eficiencia Operativa
            </h4>
            <p className="text-2xl font-bold text-orange-600 mb-2">
              {stats.totalSections > 0 ? ((stats.totalHabitats / stats.totalSections) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-sm text-gray-600">
              Hábitats por sección
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Badges de estado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Badge 
          status="success" 
          text="Sistema Operativo" 
          className="text-sm font-medium"
        />
        <Badge 
          status="processing" 
          text="Datos Actualizados" 
          className="text-sm font-medium"
        />
        <Badge 
          status="default" 
          text={`${new Date().toLocaleDateString('es-ES')}`} 
          className="text-sm font-medium"
        />
      </motion.div>
    </div>
  );
};

export default DashboardStats; 