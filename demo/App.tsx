import React, { type CSSProperties, type JSX } from 'react';
import { Gridster, type Item } from 'react-gridster2';

export default function App(): JSX.Element {
  const styles: CSSProperties = {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  };

  const items: Array<Item> = [
    /* eslint-disable max-len */
    { id: 1, x: 0, y: 0, cols: 2, rows: 1, content: <img style={ styles } src="https://images.unsplash.com/photo-1729251285078-5c7d915dbac7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735" /> },
    { id: 2, x: 2, y: 0, cols: 3, rows: 4, content: <img style={ styles } src="https://images.unsplash.com/photo-1612805273235-3f2e6120bbde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1473" /> },
    { id: 3, x: 5, y: 0, cols: 3, rows: 1, content: <img style={ styles } src="https://images.unsplash.com/photo-1614078119838-a707e0080f19?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGRhY2hzaHVuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500" /> },
    { id: 4, x: 8, y: 0, cols: 2, rows: 2, content: <img style={ styles } src="https://images.unsplash.com/photo-1627269542197-08588b2fec2a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470" /> },
    { id: 5, x: 10, y: 0, cols: 3, rows: 4, content: <img style={ styles } src="https://images.unsplash.com/photo-1626943034950-699cfa2fd3df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" /> },
    { id: 6, x: 5, y: 1, cols: 3, rows: 4, content: <img style={ styles } src="https://images.unsplash.com/photo-1621757298825-7ab62e5a953b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" /> }
    /* eslint-enable max-len */
  ];

  return (
    <div style={ { padding: '10px', color: 'white', fontSize: '100%' } }>
      <Gridster
        initItems={ items }
        centre={ true }
        themeColour="white"
        secondaryColour="black"
      />
    </div>
  );
}
