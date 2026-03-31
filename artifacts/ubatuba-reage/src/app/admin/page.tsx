"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  articles: number;
  denuncias: number;
  contatos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Matérias</p>
          <p className="text-3xl font-bold text-white">{stats?.articles ?? "—"}</p>
          <Link href="/admin/materias" className="text-blue-400 text-sm hover:underline mt-2 inline-block">
            Ver todas
          </Link>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Denúncias recebidas</p>
          <p className="text-3xl font-bold text-white">{stats?.denuncias ?? "—"}</p>
          <Link href="/admin/denuncias" className="text-blue-400 text-sm hover:underline mt-2 inline-block">
            Ver todas
          </Link>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Contatos recebidos</p>
          <p className="text-3xl font-bold text-white">{stats?.contatos ?? "—"}</p>
          <Link href="/admin/contatos" className="text-blue-400 text-sm hover:underline mt-2 inline-block">
            Ver todas
          </Link>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/materias/nova"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          + Nova Matéria
        </Link>
      </div>
    </div>
  );
}
