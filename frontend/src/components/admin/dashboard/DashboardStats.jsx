import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { motion } from "framer-motion";

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
      {stats.map((stat, idx) => (
        <motion.div /* Animaciones que vinen desde framer-motion */
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <Card
            className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors"
            bodyStyle={{ padding: 24 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

DashboardStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default DashboardStats;