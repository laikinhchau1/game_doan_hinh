import React, { useState } from 'react';

type Shape = 'circle' | 'square' | 'triangle';
type Color = 'red' | 'green' | 'blue';

interface Cell {
  shape: Shape;
  color: Color;
  isOpen: boolean;
}

const Grid: React.FC = () => {
  const [cells, setCells] = useState<Cell[]>([]);

  // Hàm tạo ngẫu nhiên các cặp hình dạng/màu sắc
  const generateRandomPairs = (): Cell[] => {
    const shapes: Shape[] = ['circle', 'square', 'triangle'];
    const colors: Color[] = ['red', 'green', 'blue'];
    const pairs: Cell[] = [];

    for (let i = 0; i < 8; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      pairs.push({ shape, color, isOpen: false });
      pairs.push({ shape, color, isOpen: false });
    }

    return pairs;
  };

  // Hàm xử lý sự kiện khi người dùng nhấp vào ô
  const handleClick = (index: number) => {
    if (cells[index].isOpen) {
      return;
    }

    const updatedCells = [...cells];
    updatedCells[index].isOpen = true;
    setCells(updatedCells);

    const openedCells = updatedCells.filter((cell) => cell.isOpen);
    if (openedCells.length === 2) {
      if (
        openedCells[0].shape === openedCells[1].shape &&
        openedCells[0].color === openedCells[1].color
      ) {
        // Các ô khớp, giữ mở
      } else {
        setTimeout(() => {
          const resetCells = updatedCells.map((cell) => ({
            ...cell,
            isOpen: false,
          }));
          setCells(resetCells);
        }, 1000);
      }
    }
  };

  // Kiểm tra xem tất cả các cặp đã khớp hay chưa
  const isGameComplete = (): boolean => {
    return cells.every((cell) => cell.isOpen);
  };

  // Render lưới trò chơi
  const renderGrid = () => {
    return cells.map((cell, index) => (
      <div
        key={index}
        onClick={() => handleClick(index)}
        style={{
          backgroundColor: cell.isOpen ? cell.color : 'gray',
          width: '50px',
          height: '50px',
          margin: '5px',
        }}
      >
        {cell.isOpen && cell.shape}
      </div>
    ));
  };

  return (
    <div>
      {renderGrid()}
      {isGameComplete() && <div>Hoàn thành!</div>}
    </div>
  );
};

export default Grid;