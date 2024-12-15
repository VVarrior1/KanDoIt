"use client";

import React, { useState } from "react";

interface CardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  tasks: string[];
  completedTasks: boolean[];
}

export default function Card({
  id,
  title,
  description,
  dueDate,
  tasks,
  completedTasks,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentDueDate, setCurrentDueDate] = useState(dueDate);
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [currentCompletedTasks, setCurrentCompletedTasks] = useState(completedTasks);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleTaskChange = (index: number) => {
    const newCompletedTasks = [...currentCompletedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCurrentCompletedTasks(newCompletedTasks);
  };

  const handleTaskTextChange = (index: number, value: string) => {
    const newTasks = [...currentTasks];
    newTasks[index] = value;
    setCurrentTasks(newTasks);
  };

  return (
    <div className="card bg-base-100 w-full rounded-2xl shadow-md p-4">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="input input-bordered w-full mb-2"
              placeholder="Edit title"
            />
            <textarea
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              className="textarea textarea-bordered w-full mb-2"
              placeholder="Edit description"
            />
            <input
              type="date"
              value={currentDueDate ?? ''}
              onChange={(e) => setCurrentDueDate(e.target.value)}
              className="input input-bordered w-full mb-2"
            />
            <div className="flex flex-col gap-2 mb-2">
              {currentTasks.map((task, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentCompletedTasks[index]}
                    onChange={() => handleTaskChange(index)}
                    className="checkbox checkbox-primary"
                  />
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => handleTaskTextChange(index, e.target.value)}
                    className="input input-bordered w-full ml-2"
                    placeholder="Edit task"
                  />
                </div>
              ))}
            </div>
            <button onClick={handleSave} className="btn btn-primary w-full mt-2">
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="card-title my-0">{currentTitle}</h2>
            <p>{currentDescription}</p>
            <p className="text-sm text-gray-500">Due {currentDueDate}</p>
            <div className="flex flex-col gap-2 mt-2">
              {currentTasks.map((task, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentCompletedTasks[index]}
                    onChange={() => handleTaskChange(index)}
                    className="checkbox checkbox-primary"
                    disabled
                  />
                  <span
                    className={`ml-2 ${currentCompletedTasks[index] ? "line-through" : ""}`}
                  >
                    {task}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary mt-2"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}