import { useState, useEffect } from "react";
import { Plus, FileText, Trash2 } from "lucide-react";
import Select from "react-select";

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);


    // Load tasks from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(saved);
    }, []);

    const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // notify dashboard to update
    window.dispatchEvent(new Event("tasksUpdated"));
};

    const handleCreate = (e) => {
        e.preventDefault();

        if (!taskName) return;



        const newTask = {
            id: Date.now(),
            name: taskName,
            status: "Pending",
            created_at: new Date().toISOString()
        };
        const updated = [...tasks, newTask];
        saveTasks(updated);

        setTaskName("");
        setShowCreateModal(false);
    };

    const handleDelete = (id) => {
        setTaskToDelete(id);
        setShowDeleteModal(true);
    };

    

    const confirmDeleteTask = () => {

        const updated = tasks.filter(t => t.id !== taskToDelete);

        saveTasks(updated);

        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const toggleStatus = (id) => {

        const updatedTasks = tasks.map(task => {

            if (task.id === id) {
                return {
                    ...task,
                    status: task.status === "Pending" ? "Completed" : "Pending"
                };
            }

            return task;

        });

        saveTasks(updatedTasks);

    };

    

    return (

        <div className="p-8 bg-white border border-gray-200 rounded-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">

                    <div className="p-3 bg-indigo-50 rounded-xl">
                        <FileText className="w-6 h-6 text-indigo-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-800">
                            My Tasks
                        </h3>

                        <p className="text-sm text-slate-500">
                            Manage your tasks easily
                        </p>
                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">

                    {/* FILTER */}
                    <div className="w-48">

                        <Select
                            value={[
                                { label: "All Tasks", value: "all" },
                                { label: "Pending", value: "pending" },
                                { label: "Completed", value: "completed" }
                            ].find(opt => opt.value === filterStatus)}

                            onChange={(opt) => setFilterStatus(opt.value)}

                            options={[
                                { label: "All Tasks", value: "all" },
                                { label: "Pending", value: "pending" },
                                { label: "Completed", value: "completed" }
                            ]}

                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: "38px",
                                    borderRadius: "8px",
                                    borderColor: "#e5e7eb",
                                    boxShadow: "none",
                                    fontSize: "14px"
                                })
                            }}
                        />

                    </div>

                    {/* ADD BUTTON */}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 text-white font-semibold text-sm rounded bg-[#3245FF] hover:bg-[#1B2DFB]"
                    >
                        + Add Task
                    </button>

                </div>

            </div>


            {/* Table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm overflow-x-auto">

                <table className="w-full text-sm border-collapse">

                    <thead className="bg-gray-50">
                        <tr>

                            <th className="px-6 py-3 text-left font-semibold text-gray-600">
                                S.NO
                            </th>

                            <th className="px-6 py-3 text-left font-semibold text-gray-600">
                                TASK NAME
                            </th>

                            <th className="px-6 py-3 text-left font-semibold text-gray-600">
                                DATE
                            </th>

                            <th className="px-6 py-3 text-left font-semibold text-gray-600">STATUS</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">CHANGE STATUS</th>

                            <th className="px-6 py-3 text-right font-semibold text-gray-600">
                                ACTION
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {tasks.length === 0 ? (

                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    No tasks found
                                </td>
                            </tr>

                        ) : (

                            tasks
                                .filter(task => {

                                    if (filterStatus === "all") return true;
                                    if (filterStatus === "pending") return task.status === "Pending";
                                    if (filterStatus === "completed") return task.status === "Completed";

                                })
                                .map((task, index) => {

                                    const date = new Date(task.created_at);

                                    const formattedDate = date.toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    });

                                    return (

                                        <tr key={task.id} className="hover:bg-gray-50 transition">

                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {task.name}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {formattedDate}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4">

                                                {task.status === "Completed" ? (
                                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                                                        Completed
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                                                        Pending
                                                    </span>
                                                )}

                                            </td>

                                            {/* TOGGLE */}
                                            <td className="px-6 py-4">

                                                <button
                                                    onClick={() => toggleStatus(task.id)}
                                                    className={`w-10 h-5 flex items-center rounded-full p-1 transition ${task.status === "Completed"
                                                        ? "bg-indigo-500"
                                                        : "bg-gray-300"
                                                        }`}
                                                >

                                                    <div
                                                        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${task.status === "Completed"
                                                            ? "translate-x-5"
                                                            : ""
                                                            }`}
                                                    />

                                                </button>

                                            </td>

                                            {/* DELETE */}
                                            <td className="px-6 py-4 text-right">

                                                <button
                                                    onClick={() => handleDelete(task.id)}
                                                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </td>

                                        </tr>
                                    );

                                })

                        )}

                    </tbody>

                </table>

            </div>

            {/* Create Modal */}

            {showCreateModal && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-xl font-semibold">
                                Create New Task
                            </h2>

                            <button onClick={() => setShowCreateModal(false)}>
                                ✕
                            </button>

                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">

                            <div>

                                <label className="block text-sm font-medium mb-1">
                                    Task Name
                                </label>

                                <input
                                    type="text"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:outline-none"
                                    placeholder="Enter task name"
                                    required
                                />

                            </div>

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded"
                                >
                                    Create
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* Delete Modal */}

            {showDeleteModal && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white w-[360px] rounded shadow-xl p-6 text-center">

                        <div className="flex justify-center mb-4">
                            <Trash2 size={36} className="text-red-400" />
                        </div>

                        <h2 className="text-lg font-semibold mb-2">
                            Delete Task
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this task?
                        </p>

                        <div className="flex justify-center gap-3">

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDeleteTask}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}