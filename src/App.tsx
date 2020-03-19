import React from 'react';
import { Router } from './components/MiniRouter';

export default function App() {
  return (
    <Router
      routes={{
        '/': <div>/</div>,
        '/a': <div>a</div>,
        '/b': <div>b</div>,
        '/c': <div>c</div>,
      }} />
  )
}