import API from "../api/api";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
function Dashboard() {
  // ADD BELOW YOUR EXISTING STATES (inside Dashboard function)

const [profile,setProfile]=useState(()=>{
  try{
    const stored = localStorage.getItem("profile");
    if(stored) return JSON.parse(stored);
  }catch(e){/* ignore */}

  return {
    name:"Khushi Pandit",
    email:"panditkhushi485@gmail.com",
    role:"Frontend Developer",
    bio:"Building scalable and beautiful interfaces.",
    avatar:null,
    location: "Mathura, India",
    phone: "+91 7668913401",
    skills: "React, Tailwind, Recharts"
  };
});

const [editProfile,setEditProfile]=useState(false);

// PROFILE HANDLERS

const handleProfileChange=(e)=>{
  const updated = {...profile,[e.target.name]:e.target.value};
  setProfile(updated);
  try{ localStorage.setItem("profile", JSON.stringify(updated)); }catch(e){}
};

const handleAvatarUpload=(e)=>{
  const file=e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = ()=>{
      const dataUrl = reader.result;
      const updated = {...profile, avatar: dataUrl};
      setProfile(updated);
      try{ localStorage.setItem("profile", JSON.stringify(updated)); }catch(e){}
    };
    reader.readAsDataURL(file);
  }
};

const avatarInputRef = useRef(null);


  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("overview");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("all");
const [categoryFilter, setCategoryFilter] = useState("all");
const [statusFilter, setStatusFilter] = useState("all");




  // 👇 ADD THIS BLOCK HERE
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }

  }, []);

  const [newTask,setNewTask]=useState("");
  const [newDeadline,setNewDeadline]=useState("");
  const [newCategory,setNewCategory]=useState("Personal");
  const [editingTask,setEditingTask]=useState(null);

  // CRUD

 const addTask = async () => {

  if (!newTask.trim()) return;

  try {

    const res = await API.post("/tasks", {
      title: newTask,
      deadline: newDeadline,
      category: newCategory,
    });

    setTasks([...tasks, res.data]);

    setNewTask("");
    setNewDeadline("");
    setNewCategory("Personal");

  } catch (err) {
    console.error(err);
  }
};

  const deleteTask = async (id) => {

  try {

    await API.delete(`/tasks/${id}`);

    setTasks(tasks.filter(t => t._id !== id));

  } catch (err) {
    console.error(err);
  }
};

 const toggleComplete = async (task) => {

  try {

    const res = await API.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });

    setTasks(tasks.map(t => 
      t._id === task._id ? res.data : t
    ));

  } catch (err) {
    console.error(err);
  }
};

const saveEdit = async (id, title, deadline, completed, category) => {

  try {

    const token = localStorage.getItem("token");

    // ⭐ 1. Instant UI update (Notion-style)
    setTasks(prev =>
      prev.map(task =>
        task._id === id
          ? { ...task, title, deadline, completed, category }
          : task
      )
    );

    // ⭐ 2. Update backend database
    await API.put(
      `/tasks/${id}`,
      { title, deadline, completed, category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ⭐ close edit panel
    setEditingTask(null);

  } catch (err) {

    console.error("Edit failed:", err);

  }
};

  // OVERVIEW DATA

  const totalTasks=tasks.length;
  const completedTasks=tasks.filter(t=>t.completed).length;
  const pendingTasks=totalTasks-completedTasks;

  const taskStats=[
    {name:"Completed",value:completedTasks},
    {name:"Pending",value:pendingTasks},
  ];

  const COLORS=["#22c55e","#facc15"];

  const categoryMap={};
  tasks.forEach(t=>{
    categoryMap[t.category]=(categoryMap[t.category]||0)+1;
  });

  const categoryData=Object.keys(categoryMap).map(k=>({name:k,tasks:categoryMap[k]}));

  const weeklyProgress=tasks.map((t,i)=>({
    day:`T${i+1}`,
    completed:t.completed?1:0
  }));



const fetchTasks = async () => {
  try {
    const { data } = await API.get("/tasks");
    setTasks(data);
  } catch (error) {
    console.log("Error fetching tasks:", error);
  }
};


  const renderContent=()=>{

    if(activeSection==="overview"){
      return(
        <>
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p>Total Tasks</p>
              <h2 className="text-3xl font-bold">{totalTasks}</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p>Completed</p>
              <h2 className="text-3xl font-bold text-green-600">{completedTasks}</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p>Pending</p>
              <h2 className="text-3xl font-bold text-yellow-600">{pendingTasks}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow-md h-[350px]">
              <h3>Tasks by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="tasks" fill="#3b82f6"/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3>Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={taskStats} dataKey="value" outerRadius={100}>
                    {taskStats.map((e,i)=><Cell key={i} fill={COLORS[i]}/>)}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
            <h3>Completion Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="day"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="completed" stroke="#22c55e"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      );
    }

    if(activeSection==="tasks"){
      return(
        <>
          <h1 className="text-3xl font-bold mb-6">Tasks</h1>
          <div className="flex gap-4 mb-6 flex-wrap">

  {/* Search */}
  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="border p-2 rounded-lg"
  />

  {/* Category Filter */}
  <select
    value={categoryFilter}
    onChange={(e)=>setCategoryFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="all">All Categories</option>
    <option value="Academics">Academics</option>
    <option value="Job Prep">Job Prep</option>
    <option value="Client Work">Client Work</option>
    <option value="Personal">Personal</option>
  </select>

  {/* Status Filter */}
  <select
    value={statusFilter}
    onChange={(e)=>setStatusFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="all">All Status</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>

</div>

          {/* ADD TASK */}
          <div className="flex gap-4 mb-6">
            <input value={newTask}
              onChange={e=>setNewTask(e.target.value)}
              placeholder="Task title"
              className="border p-2 rounded-lg"/>
            <input type="date"
              value={newDeadline}
              onChange={e=>setNewDeadline(e.target.value)}
              className="border p-2 rounded-lg"/>
            <select
              value={newCategory}
              onChange={e=>setNewCategory(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="Academics">Academics</option>
              <option value="Job Prep">Job Prep</option>
              <option value="Client Work">Client Work</option>
              <option value="Personal">Personal</option>
            </select>
            <button onClick={addTask}
              className="bg-blue-600 text-white px-4 rounded-lg">
              Add Task
            </button>
          </div>

          {/* TASK LIST */}
          {filteredTasks.map(task=>{

            const isDelayed = !task.completed && task.deadline && new Date(task.deadline) < new Date();

            return(
              <div key={task._id} className={`p-4 rounded-xl mb-4 shadow ${task.completed ? 'bg-green-100' : 'bg-white'}`}>

                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-semibold ${task.completed?"line-through":""}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 text-sm">

  <span className="text-gray-500">
    Deadline: {task.deadline || "N/A"}
  </span>

  <span className="text-gray-500">
    Category: {task.category || "Personal"}
  </span>

  {/* Status Badge */}
  <span className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      task.completed
        ? "bg-green-100 text-green-700"
        : task.deadline && new Date(task.deadline) < new Date()
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {
      task.completed
        ? "Completed"
        : task.deadline && new Date(task.deadline) < new Date()
        ? "Delayed"
        : "Pending"
    }
  </span>

</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={()=>toggleComplete(task._id)} className="px-2 py-1 bg-gray-200 rounded">✓</button>
                    <button onClick={()=>setEditingTask(task._id)} className="px-3 py-1 bg-green-500 text-white rounded">Edit</button>
                    <button onClick={()=>deleteTask(task._id)} className="px-3 py-1 bg-blue-500 text-white rounded">Delete</button>
                  </div>
                </div>

                {/* EXPAND EDIT PANEL */}
                {editingTask===task._id && (
                  <EditPanel task={task} saveEdit={saveEdit}/>
                )}

              </div>
            );
          })}
        </>
      );
    }

   if(activeSection==="profile"){
  return(
    <>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* PROFILE CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <div className="flex items-center gap-6 mb-6">

            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 relative">
              {profile.avatar ? (
                <img src={profile.avatar} className="w-full h-full object-cover"/>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}

              <button
                type="button"
                onClick={()=>avatarInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow text-gray-600 hover:text-blue-600 transition z-10 border border-gray-200"
                aria-label="Edit avatar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.465.263l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.263-.465l9.9-9.9a2 2 0 012.828 0z" />
                </svg>
              </button>

              <input ref={avatarInputRef} type="file" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500">{profile.role}</p>
              <p className="text-sm text-gray-400">{profile.email}</p>

              <p className="text-sm text-gray-500 mt-2">{profile.location} · {profile.phone}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills && profile.skills.split(",").map((s,idx)=>(
                  <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{s.trim()}</span>
                ))}
              </div>
            </div>

          </div>

          <p className="text-gray-600 mb-6">{profile.bio}</p>

          <button
            onClick={()=>setEditProfile(!editProfile)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {editProfile ? "Cancel" : "Edit Profile"}
          </button>

        </div>

        {/* PRODUCTIVITY STATS */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h3 className="text-lg font-semibold mb-4">Productivity</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-bold">{totalTasks}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-bold text-green-600">{completedTasks}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
          </div>

          {/* charts were moved out of this block to appear in a separate section below */}

        </div>

      </div>

      {/* EDIT FORM */}
      {editProfile && (
        <div className="bg-white p-8 rounded-2xl shadow-md mt-8">

          <h3 className="font-semibold mb-4">Edit Profile</h3>

          <div className="grid gap-4">

            <input name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="border p-2 rounded"/>

            <input name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="border p-2 rounded"/>

            <input name="role"
              value={profile.role}
              onChange={handleProfileChange}
              className="border p-2 rounded"/>

            <textarea name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              className="border p-2 rounded"/>

            <input type="file" onChange={handleAvatarUpload}/>

          </div>

        </div>
      )}

      {/* SEPARATE CHARTS SECTION */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Productivity Charts</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Status (Completed vs Pending)</p>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={taskStats} dataKey="value" outerRadius={70} innerRadius={34}>
                    {taskStats.map((e,i)=>(<Cell key={i} fill={COLORS[i%COLORS.length]}/>))}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Weekly Progress</p>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="day"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="completed" stroke="#3b82f6" dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Tasks by Category</p>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="tasks" fill="#3b82f6"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
  };
const filteredTasks = tasks.filter(task => {
  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "all" ||
    task.category === categoryFilter;

  const matchesStatus =
    statusFilter === "all" ||
    (statusFilter === "completed" && task.completed) ||
    (statusFilter === "pending" && !task.completed);

  return matchesSearch && matchesCategory && matchesStatus;
});

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Sidebar setActiveSection={setActiveSection}/>
      <div className="flex-1">
        <Topbar/>
        <div className="p-10">
          <div className="bg-gradient-to-b from-blue-200 via-blue-100 to-indigo-200 rounded-3xl p-10 shadow-inner">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditPanel({task,saveEdit}){

  const [title,setTitle]=useState(task.title);
  const [deadline,setDeadline]=useState(task.deadline);
  const [completed,setCompleted]=useState(task.completed);
  const [category,setCategory]=useState(task.category || "Personal");

  return(
    <div className="mt-4 p-4 border rounded-xl bg-gray-50">
      <input value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 mr-2" placeholder="Title"/>
      <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="border p-2 mr-2"/>
      <select
        value={category}
        onChange={e=>setCategory(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="Academics">Academics</option>
        <option value="Job Prep">Job Prep</option>
        <option value="Client Work">Client Work</option>
        <option value="Personal">Personal</option>
      </select>
      <label className="mr-2">
        <input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)} className="mr-1"/>
        Completed
      </label>
      <button onClick={()=>saveEdit(task._id,title,deadline,completed,category)} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
    </div>
  );
}

export default Dashboard;