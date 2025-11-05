import { useState } from 'react';
import Header from './components/Header';
import RoleContent from './components/RoleContent';

export default function App() {
  const [role, setRole] = useState('guest');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50">
      <Header role={role} onChangeRole={setRole} />
      <main>
        <RoleContent role={role} onRequestCtaToParent={() => setRole('parent')} />
      </main>
      <footer className="mt-10 border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AquaKids Therapy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
