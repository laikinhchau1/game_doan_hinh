import React, { useState, useEffect } from 'react';
import './Game.css'
const Game: React.FC = () => {
  const [pairs, setPairs] = useState<{ shape: string; color: string; }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    generatePairs();
  }, []);

const generatePairs = () => {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['red', 'green', 'blue'];
  
    const pairs = [];
    const colorCounts : any = {};
    const shapeCounts : any = {}
    for (let i = 0; i < 16; i++) {
      let shape = shapes[Math.floor(Math.random() * shapes.length)];
      let color = colors[Math.floor(Math.random() * colors.length)];
  
      // Kiểm tra xem màu đã xuất hiện hai lần chưa
      if (colorCounts[color] === 2 && shapeCounts[shape] === 2) {
        // Nếu đã xuất hiện hai lần, tìm một màu khác
        const remainingColors = colors.filter(c => colorCounts[c] !== 2);
        color = remainingColors[Math.floor(Math.random() * remainingColors.length)];

        const remainingShapes = shapes.filter(c => shapeCounts[c] !== 2);
        shape = remainingShapes[Math.floor(Math.random() * remainingShapes.length)];
      }
  
      pairs.push({ shape, color });
  
      // Tăng đếm số lần xuất hiện của màu
      if (colorCounts[color]) {
        colorCounts[color]++;
      } else {
        colorCounts[color] = 1;
      }

      if (shapeCounts[shape]) {
        shapeCounts[shape]++;
      } else {
        shapeCounts[shape] = 1;
      }
    }
  
    setPairs(pairs);
  };
  
  const handleCardClick = (index: number) => {
    if (selected.length === 2 || matched.includes(index)) {
      return;
    }
    // selected.push(index)
    setSelected([...selected, index]);
    console.log(selected);
    
    if (selected.length === 2) {
      checkMatch();
    }
  };

  const checkMatch = () => {
    const [firstIndex, secondIndex] = selected;
    const firstPair = pairs[firstIndex];
    const secondPair = pairs[secondIndex];
    // console.log(selected);
    // return
    
    if (firstPair.shape === secondPair.shape && firstPair.color === secondPair.color) {
      setMatched([...matched, firstIndex, secondIndex]);
    }

    setSelected([]);
  };

  return (
    <div>
      <h1>Find the Matching Pairs</h1>
      <div className="grid">
        {pairs.map((pair, index) => (
          <div
            key={index}
            className={`card ${selected.includes(index) ? 'selected' : ''} ${matched.includes(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className={`shape ${pair.shape} ${pair.color}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;