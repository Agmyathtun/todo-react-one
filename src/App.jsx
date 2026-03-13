import {useEffect, useState} from 'react';


function App() {
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const [darkMode, setDarkMode] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks,{text: inputValue, done:false}]);
      setInputValue('');
    }
  }

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditInputValue(tasks[index].text);
  }
  const saveEdit = (index) => {
    if (editInputValue.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[index].text = editInputValue;
      setTasks(newTasks);
      cancelEdit();
    }
  }
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditInputValue('');
  }
  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks)
  }

  const clearComplete = () => {
    const newTasks = tasks.filter(task => !task.done);
    setTasks(newTasks);
  }

  const Remaining = tasks.filter(task => !task.done).length;

  return (
    
    <div style={{
      textAlign:'center',
      maxWidth: '500px',
      margin: '50px auto',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
      background: darkMode ? '#0d1117' : '#f0f0f0',
      color: darkMode ? '#c9d1d9' : '#333',
      minHeight: '100vh',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <button
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px',
          background: darkMode ? '#333' : '#ddd',
          color: darkMode ? 'white' : 'black',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          zIndex:10
          
        }}
        onClick={()=>setDarkMode(!darkMode)}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <p style={{
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '18px',
        padding: '10px',
        background: '#238636',
        color: 'white',
        borderRadius: '20px',
        display: 'inline-block'
      }}>
        Total Tasks : {tasks.length}
      </p>
      <p>Remaining Tasks : {tasks.filter(t => !t.done).length}</p>
      <p>Done : {tasks.filter(t => t.done).length}</p>
      
      <h1 style={{ marginBottom: '20px' }}>My Todo List</h1>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' && addTask() }
          placeholder='Add a new tasks...'
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px 0 0 6px',
            outline: 'none',
            background: darkMode ? '#0d1117' : '#f0f0f0',
            color: darkMode ? '#c9d1d9' : '#333',
          }}
        />
        <button
          onClick={addTask}
          style={{
          padding: '12px 24px',
          borderRadius: '0 6px 6px 0',
          background: '#238636',
          color: '#ffffff',
        }}>
          Add
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {tasks.length === 0 ? (
        <p style={{textAlign:'center'}}>No tasks yet. Add one!</p>
        ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '15px',
                      marginBottom: '10px',
                      background: darkMode ? '#0d1117' : '#f0f0f0',
                      borderRadius: '6px',
                      textDecoration: task.done ? 'line-through' : 'none',
                      opacity: task.done ? 0.6 : 1
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={()=>toggleDone(index)}
                      style={{marginRight:'15px'}}
                    />
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editInputValue}
                          onChange={(e) => setEditInputValue(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            fontSize: '16px',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            background: '#0d1117',
                            color: '#c9d1d9'
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(index);
                            if(e.key==='Escape') cancelEdit();
                          }}
                        />
                        <button
                          onClick={() => saveEdit(index)}
                          style={{
                            marginLeft: '10px',
                            background: '#238636',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            marginLeft: '10px',
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={{ flex: 1 }}>{task.text}</span>
                          <button
                            onClick={() => startEdit(index)}
                            style={{
                            marginLeft: '10px',
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                            
                          >
                            Edit
                        </button>
                        <button
                          onClick={() => {
                              deleteTask(index)
                            }}
                          style={{
                            marginLeft: '10px',
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                            delete
                          </button>
                          
                      </>
                    )}

                  </li>
                ))}
              </ul>
              {tasks.some(task => task.done) && (
                <button
                  onClick={clearComplete}
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    background: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width:'30%'
                  }}
                >
                  clear all
                </button>
              )}
            </>
        )}
      </div>

    </div>
  )
}

export default App;