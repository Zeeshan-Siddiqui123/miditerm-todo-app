import React, { useState } from 'react';

const Input = () => {
    const [name, setName] = useState("");
    const [inputs, setInputs] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = (event) => {
      event.preventDefault();
      if (name.trim!== "") {
        if (editIndex !== null) {
            const updatedInputs = [...inputs]
            updatedInputs[editIndex] = name
            setInputs(updatedInputs)
            setEditIndex(null)
        }else{setInputs([...inputs,name])}
        setName("")
      }
    //   if (name.trim() !== "") {
    //     if (editIndex !== null) {
    //       const updatedInputs = [...inputs];
    //       updatedInputs[editIndex] = name;
    //       setInputs(updatedInputs);
    //       setEditIndex(null);
    //     } else {
    //       setInputs([...inputs, name]);
    //     }
    //     setName("");
    //   }
    };

    const handleDelete = (index) => {
      setInputs(inputs.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
      setName(inputs[index]);
      setEditIndex(index);
    };
  
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Todo List</h2>
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task..."
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>
        <div className="space-y-2">
          {inputs.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
              <span className="text-gray-700">{item}</span>
              <div className="space-x-2">
                <button 
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Input;
