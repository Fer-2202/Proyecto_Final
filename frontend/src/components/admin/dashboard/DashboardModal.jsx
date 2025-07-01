import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";

function DashboardModal({
  open,
  onClose,
  title,
  children,
  onOk,
  okText,
  cancelText,
  loading,
}) {
  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onCancel={onClose}
          title={title}
          footer={[
            <Button key="back" onClick={onClose}>
              {cancelText || "Cancelar"}
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={onOk}
            >
              {okText || "Guardar"}
            </Button>,
          ]}
          centered
          className="dashboard-modal"
          width={480}
          closeIcon={false}
          maskClosable={!loading}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

DashboardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
};

export default DashboardModal;