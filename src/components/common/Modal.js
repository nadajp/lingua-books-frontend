// components/Modal.js
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

function Modal({ isOpen, onRequestClose, title, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="rounded bg-white p-6 w-2/5 mx-auto border border-gray-300"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </ReactModal>
  );
}

export default Modal;
