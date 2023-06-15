import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import HomePage from '@/pages/HomePage.jsx';
import FullsetPage from '@/pages/Fullset.jsx';
import DevsetPage from '@/pages/DevPreset.jsx';
import PopularPage from '@/pages/Popular.jsx';

export const App = () => {
  return (
      <NextUIProvider>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/fullset' element={<FullsetPage />} />
            <Route path='/devset' element={<DevsetPage />} />
            <Route path='/popular' element={<PopularPage />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
  );
};

