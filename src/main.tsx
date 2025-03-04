import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@qpokychuk/sf-pro-display/index.css';
import '@qpokychuk/sf-pro-display/normal.css';
import './styles/fontello.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
