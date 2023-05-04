import './App.css';
import { useEffect, useState } from 'react';

function App() {  
  const [checklist, setCheckList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedList = localStorage.getItem('checklist');
    setCheckList(!savedList ? [] : JSON.parse(savedList));
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      setCheckList((prev) => {
        setInput('');
        const newList = prev.concat([e.target.value]);
        localStorage.setItem('checklist', JSON.stringify(newList));
        return newList;
      });
    }
  }

  const handleCheckItem = (idx) => {
    setCheckList((prev) => {
      const newList = prev.filter((item, i) => i != idx);
      localStorage.setItem('checklist', JSON.stringify(newList));
      return newList;
    })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        Checklist
      </header>
      <div className="input-box">
        <label htmlFor='new-check'>Add New Item</label>
        <input type="text" id='new-check' value={input} onChange={handleInput} onKeyPress={handleEnterKey} />
      </div>
      <div className="check-list">
        {checklist.length === 0 
          ? <div className='check-item'>No data found</div>
          : (checklist.map((item, index) => {
              return (
                <div className='check-item' key={`check-item${index}`}>
                  <input type="checkbox" checked={false} onChange={() => handleCheckItem(index)}  />
                  {item}
                </div>
              )
            })
          )}
      </div>
    </div>
  );
}

export default App;
