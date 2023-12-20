import React, { useState } from 'react';
export default function EditLanguageModal({ isOpen, onClose, language, onSave }) {
    const [name, setName] = useState(language.name);
  
    const handleSave = () => {
      onSave({ ...language, name });
      onClose();
    };
  
    return (
      <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
        {/* Modal content */}
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Edit Language</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    );
  }
  