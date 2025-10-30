import { type JSX, type MouseEvent, useEffect, useRef, useState } from 'react';
import type { Item } from './item';

export interface GridsterItemProps {
  item: Item;
  cellSize: number;
  margin: number;
  themeColour: string;
  isColliding: (id: string | number, col: number, row: number, width: number, height: number) => boolean;
  findNextFreeSpot: (item: Item) => { x: number; y: number };
  draggable: boolean;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  resizable: boolean;
  resizing: boolean;
  setResizing: (resizing: boolean) => void;
  onItemChange: (newItem: Item) => void;
  children?: React.ReactNode;
  onContextClick?: (event: MouseEvent, item: Item) => void;
}

export function GridsterItem({
  item,
  cellSize,
  margin,
  themeColour,
  isColliding,
  findNextFreeSpot,
  draggable,
  dragging,
  setDragging,
  resizable,
  resizing,
  setResizing,
  onItemChange,
  children,
  onContextClick
}): JSX.Element {
  const [ hovered, setHovered ] = useState(false);
  const [ colliding, setColliding ] = useState(false);
  const [ position, setPosition ] = useState({ x: item.x, y: item.y });
  const [ floatingPos, setFloatingPos ] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [ size, setSize ] = useState({ cols: item.cols, rows: item.rows });

  const dragStartPosition = useRef<{ px: number; py: number } | null>(null);
  const resizeStartPosition = useRef<{ px: number; py: number; cols: number; rows: number } | null>(null);

  useEffect((): void => {
    setPosition({ x: item.x, y: item.y });
  }, [ item.x, item.y ]);

  useEffect((): void => {
    setSize({ cols: item.cols, rows: item.rows });
  }, [ item.cols, item.rows ]);

  const style: React.CSSProperties = {
    position: 'absolute',
    top: position.y * (cellSize + margin),
    left: position.x * (cellSize + margin),
    width: size.cols * (cellSize + margin) - margin,
    height: size.rows * (cellSize + margin) - margin,
    border: `1px ${ resizing && hovered ? 'dashed' : 'solid' } ${ colliding || ((dragging || resizing) && !hovered) ? 'red' : themeColour }`,
    cursor: dragging ?
      colliding ? 'not-allowed' : 'grabbing' :
      draggable ? 'pointer' : 'default',
    opacity: dragging && !hovered ? 0.3 : 1,
    zIndex: dragging || resizing ? 1 : 0
  };

  const floatingStyle: React.CSSProperties = {
    position: 'absolute',
    top: floatingPos.top,
    left: floatingPos.left,
    width: item.cols * (cellSize + margin) - margin,
    height: item.rows * (cellSize + margin) - margin,
    border: `1px dashed ${ !colliding ? themeColour : 'red' }`,
    pointerEvents: 'none',
    zIndex: 10
  };

  const calculatePositionDelta = (): [number, number] => {
    const dCol = Math.round(floatingPos.left / (cellSize + margin));
    const dRow = Math.round(floatingPos.top / (cellSize + margin));
    return [ dCol, dRow ];
  };

  const handleDragStart = (e: React.PointerEvent): void => {
    e.preventDefault();
    dragStartPosition.current = { px: e.clientX, py: e.clientY };
    setDragging(true);
    setFloatingPos({ left: 0, top: 0 });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDrag = (e: React.PointerEvent): void => {
    if (!dragging || !dragStartPosition.current) {
      return;
    }

    const dx = e.clientX - dragStartPosition.current.px;
    const dy = e.clientY - dragStartPosition.current.py;

    const [ dCol, dRow ] = calculatePositionDelta();
    setColliding(isColliding(item.id, item.x + dCol, item.y + dRow, item.cols, item.rows));

    setFloatingPos({
      left: dx,
      top: dy
    });
  };

  const handleDragEnd = (): void => {
    if (!dragging) {
      return;
    }
    setDragging(false);

    const [ dCol, dRow ] = calculatePositionDelta();
    const newCol = item.x + dCol;
    const newRow = item.y + dRow;

    let x: number;
    let y: number;
    if (!isColliding(item.id, newCol, newRow, item.cols, item.rows)) {
      x = newCol;
      y = newRow;
    } else {
      ({ x, y } = findNextFreeSpot(item));
    }

    onItemChange({ ...item, x, y });
    setPosition({ x, y });

    setColliding(false);
    dragStartPosition.current = null;
  };

  const handleResizeStart = (e: React.PointerEvent): void => {
    e.stopPropagation();
    setResizing(true);
    resizeStartPosition.current = { px: e.clientX, py: e.clientY, cols: item.cols, rows: item.rows };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleResize = (e: React.PointerEvent): void => {
    if (!resizing || !resizeStartPosition.current) {
      return;
    }

    const dx = e.clientX - resizeStartPosition.current.px;
    const dy = e.clientY - resizeStartPosition.current.py;

    const newCols = Math.max(
      1,
      Math.round((resizeStartPosition.current.cols * (cellSize + margin) + dx) / (cellSize + margin))
    );
    const newRows = Math.max(
      1,
      Math.round((resizeStartPosition.current.rows * (cellSize + margin) + dy) / (cellSize + margin))
    );

    setColliding(isColliding(item.id, item.x, item.y, newCols, newRows));
    setSize({ cols: newCols, rows: newRows });
  };

  const handleResizeEnd = (): void => {
    if (!resizing || !resizeStartPosition.current) {
      return;
    }
    if (!isColliding(item.id, item.x, item.y, size.cols, size.rows)) {
      onItemChange({ ...item, cols: size.cols, rows: size.rows });
    } else {
      setSize({ cols: item.cols, rows: item.rows });
    }

    setColliding(false);
    setResizing(false);
    resizeStartPosition.current = null;
  };

  return (
    <div
      className="gridster-item"
      style={ style }
      onPointerDown={ draggable !== false ? handleDragStart : undefined }
      onPointerMove={ draggable !== false ? handleDrag : undefined }
      onPointerUp={ draggable !== false ? handleDragEnd : undefined }
      onPointerCancel={ draggable !== false ? handleDragEnd : undefined }
      onMouseEnter={ (): void => setHovered(true) }
      onMouseLeave={ (): void => setHovered(false) }
      onContextMenu={ (event: MouseEvent): void => {
        event.preventDefault();
        if (!!onContextClick) {
          onContextClick(event, item);
        }
      } }
    >
      <div style={ { width: '100%', height: '100%' } } key={ `${ item.id }x${ size.cols }x${ size.rows }` }>{children}</div>

      { resizable && (
        <div
          className="resizer"
          style={ {
            position: 'absolute',
            width: 0,
            height: 0,
            bottom: 0,
            right: 0,
            borderLeft: '10px solid transparent',
            borderBottom: `10px solid ${ themeColour }`,
            opacity: hovered ? 1 : 0,
            cursor: resizable ? 'se-resize' : 'default',
            zIndex: 1,
            pointerEvents: 'auto'
          } }
          onPointerDown={ handleResizeStart }
          onPointerMove={ handleResize }
          onPointerUp={ handleResizeEnd }
          onPointerCancel={ handleResizeEnd }
        />
      ) }
      { dragging && hovered && <div style={ floatingStyle }>{children}</div> }
    </div>
  );
}
