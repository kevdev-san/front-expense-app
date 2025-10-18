import { DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent">
              GastosApp
            </span>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors">
              <Link href={"/login"}>Iniciar Sesión</Link>
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-black to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
              <Link href={"/registro"}>Registrarse</Link>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-purple-600 to-black bg-clip-text text-transparent leading-tight">
            Controla tus gastos de forma inteligente
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organiza, visualiza y optimiza tus finanzas personales. Todo en un solo lugar, simple y poderoso.
          </p>
        </div>
      </section>
      </div>
  );
}
