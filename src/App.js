import React from 'react';
import './App.css';

function darkenHexColor(hex, factor = 0.65) {
  const r = Math.floor(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.floor(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.floor(parseInt(hex.slice(5, 7), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function App() {
  const [lists, setLists] = React.useState(() => {
    const stored = localStorage.getItem('stickyNotes');
    return stored ? JSON.parse(stored) : [];
  });

  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [listToDelete, setListToDelete] = React.useState(null);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState('#ffeaa7');
  const [recentlyDeleted, setRecentlyDeleted] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(lists));
  }, [lists]);

  React.useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchInput.trim());
    }
  };

  const addList = () => {
    setLists([
      ...lists,
      { title: '', items: [], color: selectedColor, isNew: true, isEditingTitle: true },
    ]);
    setShowColorPicker(false);
  };

  const updateListTitle = (index, newTitle) => {
    const updated = [...lists];
    updated[index].title = newTitle;
    setLists(updated);
  };

  const finishEditingListTitle = (index) => {
    const updated = [...lists];
    updated[index].isEditingTitle = false;
    updated[index].isNew = false;
    setLists(updated);
  };

  const enableListTitleEditing = (index) => {
    const updated = [...lists];
    updated[index].isEditingTitle = true;
    setLists(updated);
  };

  const addItemToList = (index) => {
    const updated = [...lists];
    updated[index].items.push({ text: '', completed: false, isEditing: true });
    setLists(updated);
  };

  const updateItemText = (listIndex, itemIndex, newText) => {
    const updated = [...lists];
    updated[listIndex].items[itemIndex].text = newText;
    setLists(updated);
  };

  const finishEditingItem = (listIndex, itemIndex) => {
    const updated = [...lists];
    updated[listIndex].items[itemIndex].isEditing = false;
    setLists(updated);
  };

  const enableItemEditing = (listIndex, itemIndex) => {
    const updated = [...lists];
    updated[listIndex].items[itemIndex].isEditing = true;
    setLists(updated);
  };

  const toggleItem = (listIndex, itemIndex) => {
    const updated = [...lists];
    updated[listIndex].items[itemIndex].completed = !updated[listIndex].items[itemIndex].completed;
    setLists(updated);
  };

  const deleteList = () => {
    setRecentlyDeleted({ type: 'note', data: lists[listToDelete] });
    setLists(lists.filter((_, i) => i !== listToDelete));
    setConfirmVisible(false);
    setListToDelete(null);
  };

  const deleteTask = (listIndex, itemIndex) => {
    const deletedTask = lists[listIndex].items[itemIndex];
    const updated = [...lists];
    updated[listIndex].items.splice(itemIndex, 1);
    setLists(updated);
    setRecentlyDeleted({
      type: 'task',
      data: { task: deletedTask, listIndex, taskIndex: itemIndex }
    });
  };

  const undoDelete = () => {
    if (recentlyDeleted?.type === 'note') {
      setLists([...lists, recentlyDeleted.data]);
    } else if (recentlyDeleted?.type === 'task') {
      const { listIndex, task, taskIndex } = recentlyDeleted.data;
      const updated = [...lists];
      if (!updated[listIndex]) return;
      updated[listIndex].items.splice(taskIndex, 0, task);
      setLists(updated);
    }
    setRecentlyDeleted(null);
  };

  const wallStyle = darkMode ? {
    backgroundImage: `url(/dark-bg.jpg)`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    minHeight: '100vh',
    padding: '20px'
  } : {};

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-mode-toggle"
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 999,
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: darkMode ? 'grey' : 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          transition: 'background-color 0.2s ease, color 0.2s ease'
          
        }}
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <aside className="sidebar">
        <h2>Menu</h2>
        <input
          type="text"
          placeholder="🔍 Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyPress}
        />
        <div className="sidebar-section">
          <h3 className="section-heading">Tasks</h3>
          <ul className="sidebar-list">
            <li className="sidebar-item">⏳ Upcoming</li>
            <li className="sidebar-item">🕑 Today</li>
            <li className="sidebar-item">🗓️ Calendar</li>
          </ul>
          <hr className="sidebar-divider" />
        </div>
        <div className="sidebar-section">
          <h3 className="section-heading">Category</h3>
          <ul className="sidebar-list">
            <li className="sidebar-item">Personal</li>
            <li className="sidebar-item">Work</li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <ul>
            <li className="sidebar-item">⚙️ Settings</li>
            <li className="sidebar-item">Log Out</li>
          </ul>
        </div>
      </aside>

      <main className="main-wall" style={wallStyle}>
        <h1>Sticky Wall</h1>
        <div className="sticky-notes">
          {lists.map((list, index) => (
            <StickyNote
              key={index}
              index={index}
              title={list.title}
              items={list.items}
              addItem={addItemToList}
              toggleItem={toggleItem}
              updateItemText={updateItemText}
              finishEditingItem={finishEditingItem}
              enableItemEditing={enableItemEditing}
              onDelete={() => {
                setListToDelete(index);
                setConfirmVisible(true);
              }}
              color={list.color}
              isNew={list.isNew}
              updateTitle={updateListTitle}
              isEditingTitle={list.isEditingTitle}
              finishEditingTitle={finishEditingListTitle}
              enableTitleEditing={enableListTitleEditing}
              deleteTask={deleteTask}
              searchTerm={searchTerm}
            />
          ))}
        </div>
        <div className="floating-buttons">
          <div className="add-card" onClick={() => setShowColorPicker(true)} title="Add a new note">+</div>
          {recentlyDeleted && (
            <button className="undo-button" onClick={undoDelete} title="Undo last delete">↩️</button>
          )}
        </div>
      </main>

      {showColorPicker && (
        <ColorPickerModal
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onCancel={() => setShowColorPicker(false)}
          onConfirm={addList}
        />
      )}

      {confirmVisible && (
        <ConfirmModal
          onConfirm={deleteList}
          onCancel={() => setConfirmVisible(false)}
        />
      )}
    </div>
  );
}

function StickyNote({
  title, items, addItem, toggleItem, updateItemText, finishEditingItem,
  enableItemEditing, index, onDelete, color, isNew, updateTitle,
  isEditingTitle, finishEditingTitle, enableTitleEditing, deleteTask, searchTerm
}) {
  const [filter, setFilter] = React.useState('all');

  const buttonStyle = {
    backgroundColor: darkenHexColor(color),
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease"
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') handler();
  };

  const filteredItems = items.filter(item =>
    filter === 'completed' ? item.completed :
    filter === 'active' ? !item.completed :
    true
  );

  return (
    <div className="sticky-note" style={{ backgroundColor: color }}>
      <div className="note-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        {isEditingTitle ? (
          <input
            type="text"
            autoFocus
            value={title}
            onChange={(e) => updateTitle(index, e.target.value)}
            onBlur={() => finishEditingTitle(index)}
            onKeyDown={(e) => handleKeyPress(e, () => finishEditingTitle(index))}
            className="note-title-input"
            style={{ flexGrow: 1 }}
          />
        ) : (
          <h3 onDoubleClick={() => enableTitleEditing(index)} title="Double click to edit" style={{ flexGrow: 1, margin: 0 }}>{title}</h3>
        )}
        <button
          style={buttonStyle}
          title="Delete this note"
          onMouseEnter={(e) => e.target.style.backgroundColor = color}
          onMouseLeave={(e) => e.target.style.backgroundColor = darkenHexColor(color)}
          onClick={onDelete}
        >
          🗑️
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
        <button onClick={() => setFilter('all')} style={buttonStyle}
          title="Display all tasks">All</button>
        <button onClick={() => setFilter('active')} style={buttonStyle}
          title="Display pending tasks">Pending</button>
        <button onClick={() => setFilter('completed')} style={buttonStyle}
          title="Display completed tasks">Done</button>
      </div>

      <ul style={{ padding: 0 }}>
        {filteredItems.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', listStyleType: 'none' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(index, items.indexOf(item))}
            />
            {item.isEditing ? (
              <input
                type="text"
                autoFocus
                value={item.text}
                onChange={(e) => updateItemText(index, items.indexOf(item), e.target.value)}
                onBlur={() => finishEditingItem(index, items.indexOf(item))}
                onKeyDown={(e) => handleKeyPress(e, () => finishEditingItem(index, items.indexOf(item)))}
                placeholder="Enter task"
                style={{ flexGrow: 1 }}
              />
            ) : (
              <span
                onDoubleClick={() => enableItemEditing(index, items.indexOf(item))} title="Double click to edit"
                style={{ textDecoration: item.completed ? 'line-through' : 'none', flexGrow: 1 }}
                dangerouslySetInnerHTML={{
                  __html: searchTerm
                    ? item.text.replace(
                        new RegExp(`(${searchTerm})`, 'gi'),
                        '<mark style="background: yellow;">$1</mark>'
                      )
                    : item.text
                }}
              />
            )}
            <button
              style={buttonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = color}
              onMouseLeave={(e) => e.target.style.backgroundColor = darkenHexColor(color)}
              onClick={() => deleteTask(index, items.indexOf(item))}
              title="Delete this task"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = color}
        onMouseLeave={(e) => e.target.style.backgroundColor = darkenHexColor(color)}
        onClick={() => addItem(index)}
        title="Add new task"
      >
        ➕ Add Task
      </button>
    </div>
  );
}

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure?</h3>
        <p>This note and its tasks will be deleted permanently.</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>Yes, Delete</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function ColorPickerModal({ selectedColor, onSelectColor, onCancel, onConfirm }) {
  const colors = ['#ffeaa7', '#fab1a0', '#a29bfe', '#55efc4', '#fdcb6e', '#81ecec', '#e17055'];
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Select a Color 🎨</h3>
        <div className="color-options">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
            />
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>Create Note</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default App;
