import { useState } from 'react';
import { Plus, Edit, Trash2, Users, LayoutGrid, BookOpen, BarChart3 } from 'lucide-react';

const initialPools = [
  { id: 1, name: 'Therapy Pool', capacity: 6, status: 'Available' },
  { id: 2, name: 'Sensory Pool', capacity: 4, status: 'Under Maintenance' },
  { id: 3, name: 'Warm Water Therapy Pool', capacity: 5, status: 'Available' },
];

const initialPrograms = [
  { id: 1, title: 'Adaptive Beginners Group', therapist: 'Alex Morgan', schedule: 'Mon/Wed 3:00 PM' },
  { id: 2, title: 'Social Therapy Group', therapist: 'Jamie Lee', schedule: 'Tue/Thu 4:30 PM' },
];

const initialUsers = [
  { id: 1, name: 'Jordan Smith', role: 'Parent' },
  { id: 2, name: 'Alex Morgan', role: 'Therapist' },
  { id: 3, name: 'Jamie Lee', role: 'Therapist' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('pools');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="text-cyan-700" />
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="inline-flex rounded-lg border bg-white p-1 shadow-sm">
          <TabButton active={tab === 'pools'} onClick={() => setTab('pools')}>Pool Management</TabButton>
          <TabButton active={tab === 'programs'} onClick={() => setTab('programs')}>Program/Class Management</TabButton>
          <TabButton active={tab === 'users'} onClick={() => setTab('users')}>User Management</TabButton>
          <TabButton active={tab === 'reports'} onClick={() => setTab('reports')}>Reports</TabButton>
        </div>
      </div>

      <div className="mt-6">
        {tab === 'pools' && <PoolManager />}
        {tab === 'programs' && <ProgramManager />}
        {tab === 'users' && <UserManager />}
        {tab === 'reports' && <ReportsPlaceholder />}
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-4 py-2 text-sm rounded-md whitespace-nowrap ${
        active ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}

function PoolManager() {
  const [pools, setPools] = useState(initialPools);
  const [form, setForm] = useState({ id: null, name: '', capacity: '', status: 'Available' });

  const reset = () => setForm({ id: null, name: '', capacity: '', status: 'Available' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.capacity) return;
    if (form.id) {
      setPools((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...form, capacity: Number(form.capacity) } : p)));
    } else {
      const id = Math.max(0, ...pools.map((p) => p.id)) + 1;
      setPools((prev) => [...prev, { id, name: form.name, capacity: Number(form.capacity), status: form.status }]);
    }
    reset();
  };

  const edit = (p) => setForm({ id: p.id, name: p.name, capacity: String(p.capacity), status: p.status });
  const remove = (id) => setPools((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Pools</h3>
        <ul className="divide-y">
          {pools.map((p) => (
            <li key={p.id} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-gray-900">{p.name}</p>
                <p className="text-sm text-gray-500">Capacity: {p.capacity}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === 'Available'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {p.status}
                </span>
                <button onClick={() => edit(p)} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Edit">
                  <Edit size={16} />
                </button>
                <button onClick={() => remove(p.id)} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">{form.id ? 'Update Pool' : 'Add Pool'}</h3>
        <form className="grid sm:grid-cols-2 gap-3" onSubmit={submit}>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-700">Pool Name</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Sensory Pool"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Capacity</label>
            <input
              type="number"
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              placeholder="6"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Status</label>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Available</option>
              <option>Under Maintenance</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
              <Plus size={16} /> {form.id ? 'Save Changes' : 'Add Pool'}
            </button>
            {form.id && (
              <button type="button" onClick={() => reset()} className="px-4 py-2 rounded-md border hover:bg-gray-50">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function ProgramManager() {
  const [programs, setPrograms] = useState(initialPrograms);
  const [form, setForm] = useState({ id: null, title: '', therapist: '', schedule: '' });

  const reset = () => setForm({ id: null, title: '', therapist: '', schedule: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.therapist || !form.schedule) return;
    if (form.id) {
      setPrograms((prev) => prev.map((p) => (p.id === form.id ? { ...form } : p)));
    } else {
      const id = Math.max(0, ...programs.map((p) => p.id)) + 1;
      setPrograms((prev) => [...prev, { id, ...form }]);
    }
    reset();
  };

  const edit = (p) => setForm(p);
  const remove = (id) => setPrograms((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Programs & Classes</h3>
        <ul className="divide-y">
          {programs.map((p) => (
            <li key={p.id} className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-gray-900">{p.title}</p>
                <p className="text-sm text-gray-500">{p.therapist} • {p.schedule}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => edit(p)} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Edit">
                  <Edit size={16} />
                </button>
                <button onClick={() => remove(p.id)} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">{form.id ? 'Update Program' : 'Add Program'}</h3>
        <form className="grid gap-3" onSubmit={submit}>
          <div>
            <label className="text-sm text-gray-700">Title</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Adaptive Beginners Group"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Therapist</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.therapist}
              onChange={(e) => setForm({ ...form, therapist: e.target.value })}
              placeholder="e.g., Alex Morgan"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Schedule</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              placeholder="Mon/Wed 3:00 PM"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
              <Plus size={16} /> {form.id ? 'Save Changes' : 'Add Program'}
            </button>
            {form.id && (
              <button type="button" onClick={() => reset()} className="px-4 py-2 rounded-md border hover:bg-gray-50">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function UserManager() {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Parent');

  const add = (e) => {
    e.preventDefault();
    if (!name) return;
    const id = Math.max(0, ...users.map((u) => u.id)) + 1;
    setUsers((prev) => [...prev, { id, name, role }]);
    setName('');
    setRole('Parent');
  };
  const remove = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Users</h3>
        <ul className="divide-y">
          {users.map((u) => (
            <li key={u.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users className="text-cyan-700" size={18} />
                <div>
                  <p className="font-medium text-gray-900">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.role}</p>
                </div>
              </div>
              <button onClick={() => remove(u.id)} className="p-2 rounded-md border hover:bg-gray-50" aria-label="Delete">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 rounded-xl border bg-white shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Add User</h3>
        <form className="grid sm:grid-cols-2 gap-3" onSubmit={add}>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Taylor Brooks"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Role</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Parent</option>
              <option>Therapist</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
              <Plus size={16} /> Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReportsPlaceholder() {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center">
        <BarChart3 className="text-cyan-700" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">Reports Coming Soon</h3>
      <p className="mt-1 text-gray-600 max-w-2xl mx-auto">
        This area will include financial and operational insights such as monthly bookings, pool utilization, and therapist workloads.
      </p>
    </div>
  );
}
