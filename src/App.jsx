import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import HomePage from '@/pages/HomePage.jsx';
import Popular from '@/pages/PresetPopularPage';

export const App = () => {
  return (
      <NextUIProvider>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/popular' element={<Popular />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
  );
};

