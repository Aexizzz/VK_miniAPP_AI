import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom'

vkBridge.send('VKWebAppInit');

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
