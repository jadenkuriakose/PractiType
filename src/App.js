import React, { useState, useEffect } from 'react';
import './App.css';


//100 AI prompts --> later add a new option for a user to add texts
const typingTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "In the middle of difficulty lies opportunity.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Success usually comes to those who are too busy to be looking for it.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "What we fear doing most is usually what we most need to do.",
  "Believe you can and you're halfway there.",
  "You are never too old to set another goal or to dream a new dream.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "The only way to do great work is to love what you do.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Dream big and dare to fail.",
  "Act as if what you do makes a difference. It does.",
  "Success is not in what you have, but who you are.",
  "The best way to predict your future is to create it.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Do not wait to strike till the iron is hot, but make it hot by striking.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "The only place where success comes before work is in the dictionary.",
  "Opportunities don't happen, you create them.",
  "You miss 100% of the shots you don’t take.",
  "I find that the harder I work, the more luck I seem to have.",
  "The secret to success is to be ready when your opportunity comes.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "The way to get started is to quit talking and begin doing.",
  "Your time is limited, so don’t waste it living someone else’s life.",
  "Don't be afraid to give up the good to go for the great.",
  "You cannot swim for new horizons until you have courage to lose sight of the shore.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "It always seems impossible until it’s done.",
  "You cannot change your future, but you can change your habits, and surely your habits will change your future.",
  "A person who never made a mistake never tried anything new.",
  "If you want to achieve greatness, stop asking for permission.",
  "Dreams don't work unless you do.",
  "The best revenge is massive success.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Failure is simply the opportunity to begin again, this time more intelligently.",
  "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
  "If you are not willing to risk the usual, you will have to settle for the ordinary.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "If you really look closely, most overnight successes took a long time.",
  "The road to success and the road to failure are almost exactly the same.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "The key to success is to focus on goals, not obstacles.",
  "Success is not just about what you accomplish in your life, it’s about what you inspire others to do.",
  "Never give up on a dream that you’ve been chasing for a long time.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "A winner is a dreamer who never gives up.",
  "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "Do not wait to strike till the iron is hot, but make it hot by striking.",
  "The only way to achieve the impossible is to believe it is possible.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "You are never too old to set another goal or to dream a new dream.",
  "Success is how high you bounce when you hit bottom.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "I have not failed. I’ve just found 10,000 ways that won’t work.",
  "Keep your eyes on the stars, and your feet on the ground.",
  "If you want to achieve greatness stop asking for permission.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "What we fear doing most is usually what we most need to do.",
  "You don’t have to be great to start, but you have to start to be great.",
  "If you want to live a happy life, tie it to a goal, not to people or things.",
  "The way to get started is to quit talking and begin doing.",
  "Success is not in what you have, but who you are.",
  "The best time to plant a tree was twenty years ago. The second best time is now.",
  "You can’t build a reputation on what you are going to do.",
  "Your time is limited, don’t waste it living someone else’s life.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Don't be afraid to give up the good to go for the great.",
  "The only person you are destined to become is the person you decide to be.",
  "The future depends on what you do today.",
  "You miss 100% of the shots you don’t take.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Success is not the key to happiness. Happiness is the key to success."
];

function App() {
  const [themeColor, setThemeColor] = useState('#ffffff');
  const [text, setText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [keys, setKey] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [editKeyIndex, setEditKeyIndex] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', themeColor);
    document.documentElement.style.setProperty('--text-color', getContrastColor(themeColor));
    document.documentElement.style.setProperty('--section-bg-color', adjustBrightness(themeColor, -30));
  }, [themeColor]);

  const getContrastColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#ffffff';
  };

  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };

  const handleColorChange = (event) => {
    setThemeColor(event.target.value);
  };

  const startTypingTest = () => {
    const randomIndex = Math.floor(Math.random() * typingTexts.length);
    setCurrentText(typingTexts[randomIndex]);
    setText('');
    setIsTyping(true);
    setStartTime(null);
    setWpm(null);
    setEditIndex()
  };

  const handleTypingChange = (event) => {
    setText(event.target.value);
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (event.target.value === currentText) {
      setIsTyping(false);
      const timeTaken = (Date.now() - startTime) / 1000;
      const wordCount = currentText.split(' ').length;
      const wpm = Math.round((wordCount / timeTaken) * 60);
      setWpm(wpm);
    }
  };

  const handleDone = () => {
    setIsTyping(false);
    const timeTaken = (Date.now() - startTime) / 1000;
    const wordCount = currentText.split(' ').length;
    const wpm = Math.round((wordCount / timeTaken) * 60);
    setWpm(wpm);
    setText('');
  };


  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      if (editIndex !== null) {
        const updatedGoals = goals.map((goal, index) => 
          index === editIndex ? newGoal : goal
        );
        setGoals(updatedGoals);
        setEditIndex(null);
      } else {
        setGoals([...goals, newGoal]);
      }
      setNewGoal('');
    }
  };

  const editGoals = (index) => {
    setNewGoal(goals[index]);
    setEditIndex(index);
 };

  const deleteGoals = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  const addKeys = (e) => {
    e.preventDefault();
    if (newKey.trim()) {
      if (editKeyIndex !== null) {
        const updatedKeys = keys.map((key, index) => 
          index === editKeyIndex ? newKey : keys
        );
        setKey(updatedKeys);
        setEditKeyIndex(null);
      } else {
        setKey([...keys, newKey]);
      }
      setNewKey('');
    }
  };

  const editKeys = (index) => {
    setNewKey(keys[index]);
    setEditKeyIndex(index);
 };

  const deleteKeys = (index) => {
    const updatedKeys = keys.filter((_, i) => i !== index);
    setKey(updatedKeys);
  };

  return (
    <div className="App">
      <header>
        <h1>PractiType</h1>
        <h3>{dateTime}</h3>
      </header>
      <main>
        <section>
          <h2>Typing Test</h2>
          <p>{currentText}</p>
          {isTyping ? (
            <>
              <input
                type="text"
                value={text}
                onChange={handleTypingChange}
                autoFocus
                placeholder="Start typing..."
              />
              <button onClick={handleDone}>Done</button>
            </>
          ) : (
            <button onClick={startTypingTest}>Start Typing Test</button>
          )}
          {wpm && <p>Your typing speed: {wpm} WPM</p>}
        </section>

        <section>
          <h2>Goal Setting</h2>
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Set a new goal"
          />
          <button type="submit" onClick = {addGoal}>
          {editIndex !== null ? 'Update' : 'Add Goal'} 
          </button>

          <ul className="goals-list">
            {goals.map((goal, index) => (
             <li key={index} className="goal">
              <p>{goal}</p>
              <button onClick={() => editGoals(index)} aria-label={`Edit goal ${index + 1}`}>
               Edit
              </button>
              <button onClick={() => deleteGoals(index)} aria-label={`Delete goal ${index + 1}`}>
              Delete
              </button>
            </li>
          ))}
        </ul>

        </section>
        <section>
          <h2>Key Understanding</h2>
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Add a Key"
          />
          <button type="submit" onClick = {addKeys}>
          {editIndex !== null ? 'Update' : 'Add key'} 
          </button>

          <ul className="key-list">
            {keys.map((keys, index) => (
             <li key={index} className="goal">
              <p>{keys}</p>
              <button onClick={() => editKeys(index)} aria-label={`Edit key ${index + 1}`}>
               Edit
              </button>
              <button onClick={() => deleteKeys(index)} aria-label={`Delete key ${index + 1}`}>
              Delete
              </button>
            </li>
          ))}
        </ul>
  </section>
  </main>
  </div>
  );
}

export default App;
