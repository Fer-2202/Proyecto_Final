import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from '@radix-ui/react-dialog';

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
        <Dialog.Root open={open} onOpenChange={v => { if (!v) onClose(); }}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
            <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.2 }}
              >
                <Dialog.Title className="text-xl font-bold mb-4">{title}</Dialog.Title>
                <div>{children}</div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                    onClick={onClose}
                    disabled={loading}
                  >
                    {cancelText || "Cancelar"}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                    onClick={onOk}
                    disabled={loading}
                  >
                    {okText || "Guardar"}
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
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