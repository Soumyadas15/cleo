"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AuditTable = () => {
  const [data, setData] = useState([
    { id: 1, date: '2024-02-29', comments: 'Initial comment' },
    { id: 2, date: '2024-02-28', comments: 'Another comment' },
  ]);

  const { register, handleSubmit } = useForm();

  const [editableRow, setEditableRow] = useState(null);

  //@ts-ignore
  const handleEdit = (id) => {
    setEditableRow(id);
  };

    //@ts-ignore
  const handleSave = (submittedData) => {
    const dateValue = submittedData[`date-${editableRow}`];
    const commentsValue = submittedData[`comments-${editableRow}`];
  
    if (!dateValue.trim() || !commentsValue.trim()) {
      alert("Please fill in both date and comments fields.");
      return; // Do not save if any field is empty
    }
  
    const newData = data.map((row) =>
      row.id === editableRow ? { ...row, date: dateValue, comments: commentsValue } : row
    );
    setData(newData);
    setEditableRow(null);
  
    console.log("Edited Row Values:", newData.find(row => row.id === editableRow));
  };

  const handleAddRow = () => {
    const newData = [...data, { id: data.length + 1, date: '', comments: '' }];
    setData(newData);
    handleEdit(newData.length);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Comments</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">
                {editableRow === row.id ? (
                  <input
                    type="date"
                    defaultValue={row.date}
                      //@ts-ignore
                    {...register(`date-${row.id}`)}
                    className="w-full"
                  />
                ) : (
                  row.date
                )}
              </td>
              <td className="border px-4 py-2">
                {editableRow === row.id ? (
                  <textarea
                    defaultValue={row.comments}
                      //@ts-ignore
                    {...register(`comments-${row.id}`)}
                    className="w-full"
                  />
                ) : (
                  row.comments
                )}
              </td>
              <td className="border px-4 py-2">
                {editableRow === row.id ? (
                  <button onClick={handleSubmit(handleSave)} className="text-blue-500 hover:text-blue-700 mr-2">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(row.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="py-2">
              <button onClick={handleAddRow} className="text-green-500 hover:text-green-700">
                Add Row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;