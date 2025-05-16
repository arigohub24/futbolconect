// components/ProtectedLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useMediaQuery } from 'react-responsive';

const ProtectedLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 md:ml-72 overflow-y-auto transition-all duration-300">
          <div className={`p-6 max-w-7xl mx-auto ${isMobile ? 'pt-16' : ''}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;