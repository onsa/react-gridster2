import { type ForwardRefExoticComponent, type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState, forwardRef, useImperativeHandle, type JSX, type RefAttributes } from 'react';
import type { Item } from './item';
import { GridsterItem } from './GridsterItem';

export interface GridsterProps {
  initItems: Array<Item>;
  cellSize?: number;
  minHeight?: number;
  gap?: number;
  margin?: number;
  themeColour: string;
  secondaryColour: string;
  onChange?: (items: Array<Item>) => void;
  onItemContextClick?: (event: MouseEvent, item: Item) => void;
  centre?: boolean;
  draggable?: boolean;
  resizable?: boolean;
}

export interface GridsterHandle {
  findNextFreeSpot: (item: Item) => { x: number; y: number };
}

export const Gridster: ForwardRefExoticComponent<GridsterProps & RefAttributes<GridsterHandle>> = forwardRef<GridsterHandle, GridsterProps>(({
  initItems,
  cellSize = 100,
  minHeight = 4,
  gap = 10,
  margin = 10,
  themeColour = 'black',
  secondaryColour = 'white',
  onChange = (): void => {},
  onItemContextClick,
  centre = false,
  draggable = true,
  resizable = true
}, gridsterHandleReference): JSX.Element => {
  const [ size, setSize ] = useState({ width: 0, height: 0, maxCol: 0, maxRow: 0 });
  const [ items, setItems ] = useState(initItems);
  const [ dragging, setDragging ] = useState(false);
  const [ resizing, setResizing ] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    setItems(initItems);
  }, [ initItems ]);

  useLayoutEffect(() => {
    const handleResize = (): void => {
      if (!containerRef.current || !containerRef.current.parentElement) {
        return;
      }

      const oldWidth: number = size.width;
      const oldHeight: number = size.height;
      const { width: parentWidth } = containerRef.current.parentElement.getBoundingClientRect();
      const height: number = Math.max(minHeight * cellSize, ...items.map((item: Item): number => ((item.y + item.rows) * (cellSize + gap)) - gap));
      const maxCol: number = Math.floor(((parentWidth + gap) / (cellSize + gap)));
      const maxRow: number = Math.floor(((height + gap) / (cellSize + gap)));
      const width: number = maxCol * (cellSize + gap) - gap + 2 * margin;
      if (width !== oldWidth || height !== oldHeight) {
        setSize({
          width,
          height,
          maxCol,
          maxRow
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ size.width, size.height, minHeight, cellSize, items, gap, margin ]);

  const isColliding = useCallback((id: string | number, col: number, row: number, width: number, height: number): boolean => {
    if (!size.maxCol) {
      return false;
    }

    if (col < 0 || col + width > size.maxCol) {
      return true;
    }

    return items.some((other: Item): boolean => {
      if (other.id === id) {
        return false;
      }

      const xOverlap = col < other.x + other.cols && col + width > other.x;
      const yOverlap = row < other.y + other.rows && row + height > other.y;
      return xOverlap && yOverlap;
    });
  }, [ items, size.maxCol ]);

  const findNextFreeSpot = useCallback((item: Item): { x: number; y: number } => {
    if (!size.maxCol) {
      return item;
    }

    for (let row = 0; row < (size.maxRow + item.rows + 10); row++) {
      for (let col = 0; col < size.maxCol; col++) {
        if (col + item.cols > size.maxCol) {
          continue;
        }

        let overlaps = false;
        for (let r = 0; r < item.rows; r++) {
          for (let c = 0; c < item.cols; c++) {
            if (isColliding(item.id, col + c, row + r, 1, 1)) {
              overlaps = true;
              break;
            }
          }
          if (overlaps) {
            break;
          }
        }

        if (!overlaps) {
          return { x: col, y: row };
        }
      }
    }

    return { x: item.x, y: item.y };
  }, [ isColliding, size.maxCol, size.maxRow ]);

  useImperativeHandle(gridsterHandleReference, (): GridsterHandle => ({
    findNextFreeSpot
  }), [ findNextFreeSpot ]);

  useEffect((): void => {
    let changed: boolean = false;
    const newItems: Array<Item> = items.map(
      (item: Item): Item => {
        if (isColliding(item.id, item.x, item.y, item.cols, item.rows)) {
          const { x, y } = findNextFreeSpot(item);
          if (x !== item.x || y !== item.y) {
            changed = true;
            // must mutate existing array, otherwise the next item is misled for available space
            item.x = x;
            item.y = y;
            return { ...item, x, y };
          }
        }
        return item;
      }
    );

    if (changed) {
      setItems(newItems);
      if (!!onChange) {
        onChange(newItems);
      }
    }
  }, [ items, size.maxCol, size.maxRow, cellSize, gap, isColliding, findNextFreeSpot, onChange ]);

  const onItemChange = useCallback((newItem: Item): void => {
    const changedItems = items.map((item: Item): Item => (item.id === newItem.id ? newItem : item));
    setItems(changedItems);
    if (!!onChange) {
      onChange(changedItems);
    }
  }, [ items, onChange ]);

  return (
    <div
      ref={ containerRef }
      className="gridster"
      style={ {
        position: 'relative',
        background: secondaryColour,
        padding: `${ margin }px`,
        width: !size.width ? '100%' : `${ size.width }px`,
        margin: `0 ${ centre ? 'auto' : 0 }`
      } }
    >
      <div
        className="gridline-container"
        style={ {
          display: 'flex',
          alignContent: 'start',
          flexWrap: 'wrap',
          gap: `${ gap }px`,
          width: `calc(${ size.width }px - ${ 2 * margin }px)`,
          height: size.height
        } }
      >
        { Array(size.maxCol * size.maxRow).fill(null).map(
          (_, index): JSX.Element => (
            <div
              key={ index }
              style={ {
                width: `${ cellSize }px`,
                height: `${ cellSize }px`,
                border: `1px solid ${ themeColour }`
              } }
            >
            </div>
          )
        ) }
      </div>
      <div
        className="gridster-items"
        style={ {
          position: 'absolute',
          left: `${ margin }px`,
          top: `${ margin }px`,
          width: `calc(${ size.width }px - ${ 2 * margin }px)`,
          height: size.height,
          background: secondaryColour,
          opacity: dragging || resizing ? 0.8 : 1
        } }
      >
        {
          size.width > 0 &&
          items.map((item: Item): JSX.Element => (
            <GridsterItem
              key={ item.id }
              item={ item }
              cellSize={ cellSize }
              margin={ gap }
              themeColour={ themeColour }
              isColliding={ isColliding }
              findNextFreeSpot={ findNextFreeSpot }
              draggable={ draggable }
              dragging={ dragging }
              setDragging={ setDragging }
              resizable={ resizable }
              resizing={ resizing }
              setResizing={ setResizing }
              onItemChange={ onItemChange }
              onContextClick={ onItemContextClick }
            >
              { item.content }
            </GridsterItem>
          ))
        }
      </div>
    </div>
  );
});
