
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This ensures the app works with both Vite and Next.js
// For Vite, it will use createRoot
// For Next.js, it will use the pages/_app.tsx file
if (typeof window !== 'undefined') {
  createRoot(document.getElementById("root")!).render(<App />);
}

export default App;
