import { useState } from 'react';
import { ChevronDown, Waves, User } from 'lucide-react';

const roles = [
  { value: 'guest', label: 'Guest' },
  { value: 'parent', label: 'Parent' },
  { value: 'therapist', label: 'Therapist' },
  { value: 'admin', label: 'Admin' },
];

export default function Header({ role, onChangeRole }) {
  const [open, setOpen] = useState(false);

  const selected = roles.find((r) => r.value === role) || roles[0];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow-sm">
            <Waves size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900 leading-tight">AquaKids Therapy</p>
            <p className="text-xs text-gray-500 -mt-0.5">Aquatic therapy & adaptive swim</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-sm shadow-sm"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <User size={16} className="text-cyan-700" />
            <span className="font-medium">{selected.label}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute right-0 mt-2 w-44 rounded-md border bg-white shadow-lg overflow-hidden"
            >
              {roles.map((r) => (
                <li
                  key={r.value}
                  role="option"
                  aria-selected={r.value === role}
                  onClick={() => {
                    onChangeRole(r.value);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                    r.value === role ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700'
                  }`}
                >
                  {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
