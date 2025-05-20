import { Outlet } from 'react-router-dom';

const NoSidebarLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default NoSidebarLayout;
