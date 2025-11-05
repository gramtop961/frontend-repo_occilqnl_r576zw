import { useMemo, useState } from 'react';
import LandingPage from './LandingPage';
import AdminDashboard from './AdminDashboard';
import { Calendar, Clock, PlusCircle } from 'lucide-react';

export default function RoleContent({ role, onRequestCtaToParent }) {
  if (role === 'guest') return <LandingPage onPrimaryCta={onRequestCtaToParent} />;
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'parent') return <ParentDashboard />;
  if (role === 'therapist') return <TherapistDashboard />;
  return null;
}

function Section({ title, description, children, action }) {
  return (
    <section className="p-5 rounded-xl border bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

// Parent Dashboard
function ParentDashboard() {
  const pools = ['Warm Water Therapy Pool', 'Adaptive Training Pool', 'Sensory Pool'];
  const programs = useMemo(
    () => [
      { id: 1, title: 'Adaptive Beginners Group', spots: 3, schedule: 'Mon/Wed 3:00 PM' },
      { id: 2, title: 'Social Therapy Group', spots: 2, schedule: 'Tue/Thu 4:30 PM' },
      { id: 3, title: 'Confidence Builders', spots: 4, schedule: 'Sat 10:00 AM' },
    ],
    []
  );

  const [bookings, setBookings] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [form, setForm] = useState({ pool: pools[0], date: '', time: '', therapist: '' });

  const submitBooking = (e) => {
    e.preventDefault();
    if (!form.date || !form.time) return;
    const id = Date.now();
    setBookings((prev) => [
      ...prev,
      {
        id,
        pool: form.pool,
        datetime: `${form.date} ${form.time}`,
        therapist: form.therapist || 'TBD',
        type: 'Private Session',
      },
    ]);
    setForm({ pool: pools[0], date: '', time: '', therapist: '' });
  };

  const registerProgram = (p) => {
    if (registrations.find((r) => r.id === p.id)) return;
    setRegistrations((prev) => [...prev, p]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Parent Dashboard</h2>
        <p className="text-sm text-gray-600">Manage private sessions and group class registrations.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Section title="Book a Session" description="Private one-on-one aquatic therapy in a specific pool.">
          <form className="grid sm:grid-cols-2 gap-3" onSubmit={submitBooking}>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Pool</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.pool}
                onChange={(e) => setForm({ ...form, pool: e.target.value })}
              >
                {pools.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Preferred Therapist (optional)</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="e.g., Alex Morgan"
                value={form.therapist}
                onChange={(e) => setForm({ ...form, therapist: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
                <PlusCircle size={18} /> Book Session
              </button>
            </div>
          </form>
        </Section>

        <Section title="Register for Programs" description="Browse and register your child for group classes.">
          <ul className="space-y-3">
            {programs.map((p) => (
              <li key={p.id} className="p-4 rounded-lg border flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.schedule} • {p.spots} spots left</p>
                </div>
                <button
                  onClick={() => registerProgram(p)}
                  className="px-3 py-2 rounded-md border hover:bg-gray-50 text-sm"
                >
                  Register
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="My Child's Schedule" description="All upcoming bookings and registered classes.">
          {bookings.length === 0 && registrations.length === 0 ? (
            <p className="text-sm text-gray-600">No upcoming items yet. Book a session or register for a class to get started.</p>
          ) : (
            <ul className="space-y-3">
              {bookings.map((b) => (
                <li key={b.id} className="p-4 rounded-lg border flex items-center gap-3">
                  <Calendar className="text-cyan-700" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">{b.type} — {b.pool}</p>
                    <p className="text-sm text-gray-500">{b.datetime} • Therapist: {b.therapist}</p>
                  </div>
                </li>
              ))}
              {registrations.map((r) => (
                <li key={r.id} className="p-4 rounded-lg border flex items-center gap-3">
                  <Clock className="text-cyan-700" size={18} />
                  <div>
                    <p className="font-medium text-gray-900">{r.title}</p>
                    <p className="text-sm text-gray-500">{r.schedule}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}

// Therapist Dashboard
function TherapistDashboard() {
  const [schedule, setSchedule] = useState([
    { id: 1, title: 'Private Session — Warm Water Therapy Pool', when: 'Today 3:00 PM' },
    { id: 2, title: 'Adaptive Beginners Group', when: 'Wed 3:00 PM' },
  ]);
  const [availability, setAvailability] = useState([{ id: 1, day: 'Tue', time: '2:00 PM - 5:00 PM' }]);

  const [poolForm, setPoolForm] = useState({ pool: 'Warm Water Therapy Pool', date: '', time: '' });
  const [availForm, setAvailForm] = useState({ day: 'Mon', time: '' });

  const bookPool = (e) => {
    e.preventDefault();
    if (!poolForm.date || !poolForm.time) return;
    const id = Date.now();
    setSchedule((prev) => [
      ...prev,
      { id, title: `Prep Time — ${poolForm.pool}`, when: `${poolForm.date} ${poolForm.time}` },
    ]);
    setPoolForm({ pool: 'Warm Water Therapy Pool', date: '', time: '' });
  };

  const addAvailability = (e) => {
    e.preventDefault();
    if (!availForm.time) return;
    const id = Date.now();
    setAvailability((prev) => [...prev, { id, day: availForm.day, time: availForm.time }]);
    setAvailForm({ day: 'Mon', time: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Therapist Dashboard</h2>
        <p className="text-sm text-gray-600">View assignments, book prep time, and manage availability.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Section title="My Schedule">
          <ul className="space-y-3">
            {schedule.map((s) => (
              <li key={s.id} className="p-4 rounded-lg border">
                <p className="font-medium text-gray-900">{s.title}</p>
                <p className="text-sm text-gray-500">{s.when}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Book a Pool for Prep" description="Reserve time for private training or preparation.">
          <form className="grid sm:grid-cols-2 gap-3" onSubmit={bookPool}>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Pool</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={poolForm.pool}
                onChange={(e) => setPoolForm({ ...poolForm, pool: e.target.value })}
              >
                <option>Warm Water Therapy Pool</option>
                <option>Adaptive Training Pool</option>
                <option>Sensory Pool</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={poolForm.date}
                onChange={(e) => setPoolForm({ ...poolForm, date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Time</label>
              <input
                type="time"
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={poolForm.time}
                onChange={(e) => setPoolForm({ ...poolForm, time: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
                Reserve
              </button>
            </div>
          </form>
        </Section>

        <Section title="Manage Availability" description="Set office hours or block off time.">
          <form className="grid sm:grid-cols-3 gap-3" onSubmit={addAvailability}>
            <div>
              <label className="text-sm text-gray-700">Day</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2"
                value={availForm.day}
                onChange={(e) => setAvailForm({ ...availForm, day: e.target.value })}
              >
                <option>Mon</option>
                <option>Tue</option>
                <option>Wed</option>
                <option>Thu</option>
                <option>Fri</option>
                <option>Sat</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">Time Window</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="e.g., 1:00 PM - 4:00 PM"
                value={availForm.time}
                onChange={(e) => setAvailForm({ ...availForm, time: e.target.value })}
              />
            </div>
            <div className="sm:col-span-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700">
                Add
              </button>
            </div>
          </form>
          <ul className="mt-4 space-y-2">
            {availability.map((a) => (
              <li key={a.id} className="p-3 rounded-lg border text-sm text-gray-700">
                {a.day} — {a.time}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
