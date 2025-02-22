import React, { useEffect, useState, useContext, useCallback } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../Context/AuthProvider';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useAxios from '../Hooks/useAxios';

// DroppableContainer: now passes data: { droppableId } so that even empty columns can be identified
function DroppableContainer({ droppableId, children }) {
  const { setNodeRef } = useDroppable({ id: droppableId, data: { droppableId } });
  return (
    <div ref={setNodeRef} className="min-h-[50px]">
      {children}
    </div>
  );
}

// TaskCard: memoized to prevent unnecessary re-renders
const TaskCard = React.memo(function TaskCard({ task, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded shadow p-2 mb-2 flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm">{task.description}</p>
        <p className="text-xs text-gray-500">{new Date(task.timestamp).toLocaleString()}</p>
      </div>
      <button onClick={() => onDelete(task._id)} className="text-red-500 text-xs ml-2">
        Delete
      </button>
    </div>
  );
});

const Board = () => {
  const { user } = useContext(AuthContext);
  const { getTasks, createTask, updateTask, deleteTask } = useAxios();
  const socket = io('http://localhost:3000'); // Adjust URL as needed

  // Define three default columns by category
  const [lists, setLists] = useState([
    { id: 'list-1', title: "To-Do", cards: [] },
    { id: 'list-2', title: "In Progress", cards: [] },
    { id: 'list-3', title: "Done", cards: [] }
  ]);

  // State for adding new tasks (only for To-Do column)
  const [activeTaskList, setActiveTaskList] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Fetch tasks on mount and group them by category (filtered by user.email)
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.email) return;
      try {
        // Append email query parameter so the backend returns only this user's tasks
        const tasks = await getTasks(`?email=${encodeURIComponent(user.email)}`);
        const grouped = { "To-Do": [], "In Progress": [], "Done": [] };
        tasks.forEach(task => {
          if (grouped[task.category]) {
            grouped[task.category].push(task);
          }
        });
        setLists(prevLists =>
          prevLists.map(list => ({
            ...list,
            cards: grouped[list.title] || []
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [getTasks, user]);

  // Listen for real-time updates via Socket.IO
  useEffect(() => {
    socket.on("taskAdded", (task) => {
      setLists(prevLists =>
        prevLists.map(list =>
          list.title === task.category && !list.cards.some(c => c._id === task._id)
            ? { ...list, cards: [...list.cards, task] }
            : list
        )
      );
    });
    socket.on("taskUpdated", (updatedTask) => {
      setLists(prevLists =>
        prevLists.map(list => ({
          ...list,
          cards: list.cards.map(card =>
            card._id === updatedTask._id ? updatedTask : card
          )
        }))
      );
    });
    socket.on("taskDeleted", (id) => {
      setLists(prevLists =>
        prevLists.map(list => ({
          ...list,
          cards: list.cards.filter(card => card._id !== id)
        }))
      );
    });
    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [socket]);

  // Handle drag-and-drop reordering/moving tasks between columns
  const handleDragEnd = useCallback(async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let sourceListIndex, sourceCardIndex, destinationListIndex, destinationCardIndex;
    let movedCard = null;

    // Find the source column and card index
    lists.forEach((list, li) => {
      const index = list.cards.findIndex(card => card._id === active.id);
      if (index !== -1) {
        sourceListIndex = li;
        sourceCardIndex = index;
        movedCard = list.cards[index];
      }
    });

    // Attempt to find destination column by matching card id
    lists.forEach((list, li) => {
      const index = list.cards.findIndex(card => card._id === over.id);
      if (index !== -1) {
        destinationListIndex = li;
        destinationCardIndex = index;
      }
    });

    // If destination not found, try to get it from droppable container's data
    if (destinationListIndex === undefined) {
      const droppableId = over.data?.current?.droppableId;
      if (droppableId) {
        destinationListIndex = lists.findIndex(list => list.id === droppableId);
        destinationCardIndex = lists[destinationListIndex].cards.length;
      }
    }

    let newLists;
    if (sourceListIndex === destinationListIndex) {
      // Reordering within the same column
      const newCards = arrayMove(lists[sourceListIndex].cards, sourceCardIndex, destinationCardIndex);
      newLists = [...lists];
      newLists[sourceListIndex] = { ...lists[sourceListIndex], cards: newCards };
      // Update order for tasks in this column (batch update)
      await Promise.all(newCards.map((card, index) => updateTask(card._id, { order: index })));
    } else {
      // Moving a task from one column to another: update category and order
      const sourceCards = Array.from(lists[sourceListIndex].cards);
      sourceCards.splice(sourceCardIndex, 1);
      const destinationCards = Array.from(lists[destinationListIndex].cards);
      destinationCards.splice(destinationCardIndex, 0, movedCard);
      newLists = [...lists];
      newLists[sourceListIndex] = { ...lists[sourceListIndex], cards: sourceCards };
      newLists[destinationListIndex] = { ...lists[destinationListIndex], cards: destinationCards };
      // Update the moved task's category and order in the database
      await updateTask(movedCard._id, {
        category: lists[destinationListIndex].title,
        order: destinationCardIndex,
      });
    }
    setLists(newLists);
  }, [lists, updateTask]);

  // Only the "To-Do" column shows add task functionality
  const handleAddTask = useCallback((listId) => {
    setActiveTaskList(listId);
  }, []);

  const handleSaveTask = useCallback(async (listId) => {
    if (!newTaskTitle.trim()) return;
    if (newTaskTitle.length > 50) {
      alert("Task title must be at most 50 characters");
      return;
    }
    if (newTaskDescription.length > 200) {
      alert("Task description must be at most 200 characters");
      return;
    }
    const list = lists.find(l => l.id === listId);
    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      timestamp: new Date().toISOString(),
      category: list.title,
      order: list.cards.length,
      email: user ? user.email : null,
    };
    try {
      await createTask(newTask);
      // Rely on socket "taskAdded" to update state
      setNewTaskTitle("");
      setNewTaskDescription("");
      setActiveTaskList(null);
    } catch (err) {
      console.error(err);
    }
  }, [newTaskTitle, newTaskDescription, lists, createTask, user]);

  const handleDeleteTask = useCallback(async (listId, taskId) => {
    try {
      await deleteTask(taskId);
      setLists(prevLists =>
        prevLists.map(l =>
          l.id === listId ? { ...l, cards: l.cards.filter(card => card._id !== taskId) } : l
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, [deleteTask]);

  return (
    <div className="p-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-auto items-start">
          {lists.map(list => (
            <div key={list.id} className="bg-gray-100 rounded-lg p-4 min-w-[200px] flex-shrink-0">
              <h2 className="font-bold mb-2">{list.title}</h2>
              <DroppableContainer droppableId={list.id}>
                <SortableContext items={list.cards.map(card => card._id)} strategy={rectSortingStrategy}>
                  {list.cards.map(card => (
                    <TaskCard
                      key={card._id}
                      task={card}
                      onDelete={(taskId) => handleDeleteTask(list.id, taskId)}
                    />
                  ))}
                </SortableContext>
                {list.cards.length === 0 && <div className="h-10" />}
              </DroppableContainer>
              {list.title === "To-Do" && (
                activeTaskList === list.id ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="Task Title (max 50 chars)"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="bg-white rounded shadow p-2 mb-2 w-full max-w-[180px]"
                    />
                    <textarea
                      placeholder="Task Description (optional, max 200 chars)"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      className="bg-white rounded shadow p-2 mb-2 w-full max-w-[180px]"
                      rows="2"
                    />
                    <button onClick={() => handleSaveTask(list.id)} className="btn mb-2">
                      Save Task
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleAddTask(list.id)} className="btn">
                    Add task
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Board;
