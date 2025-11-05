import { ArrowRight, Heart, ShieldCheck, Users } from 'lucide-react';

export default function LandingPage({ onPrimaryCta }) {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-white to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              Compassionate aquatic therapy for every child
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We combine warm-water therapy, certified professionals, and playful learning to help children build strength, confidence, and joy in the water.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onPrimaryCta}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm"
              >
                Book a Consultation
                <ArrowRight size={18} />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-5 py-3 rounded-md border text-cyan-700 bg-white hover:bg-gray-50"
              >
                Learn More
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 max-w-md text-center">
              <div className="px-3">
                <p className="text-2xl font-bold text-gray-900">10+</p>
                <p className="text-xs text-gray-500">Certified therapists</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-xs text-gray-500">Happy families</p>
              </div>
              <div className="px-3">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-500">Specialty pools</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 shadow-inner border flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1200&auto=format&fit=crop"
                alt="Smiling child in a therapy pool with a coach"
                className="w-full h-full object-cover rounded-2xl mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Our Services</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Tailored programs designed for children of all abilities.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Heart className="text-cyan-700" />}
              title="Individual Aquatic Therapy"
              desc="One-on-one sessions focused on motor skills, coordination, and sensory regulation."
            />
            <ServiceCard
              icon={<Users className="text-cyan-700" />}
              title="Adaptive Swim Classes"
              desc="Group classes that build confidence and water safety in a supportive environment."
            />
            <ServiceCard
              icon={<ShieldCheck className="text-cyan-700" />}
              title="Certified Therapists"
              desc="Experienced pediatric professionals trained in aquatic therapy and adaptive instruction."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="h-10 w-10 rounded-md bg-cyan-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
