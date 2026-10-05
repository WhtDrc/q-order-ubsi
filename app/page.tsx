import React from 'react'
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase langsung menggunakan kunci sakti kamu yang sudah valid
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TestKoneksiPage() {
  let statusKoneksi = "Mencoba terhubung..."
  let detailData: any = null
  let pesanError = ""

  try {
    // Uji coba super simpel: Ambil data dari tabel 'stores'
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .limit(1)

    if (error) {
      statusKoneksi = "Gagal terhubung ke database ❌"
      pesanError = error.message
    } else {
      statusKoneksi = "Koneksi Sukses Tembus! 🎉"
      detailData = data
    }
  } catch (err: any) {
    statusKoneksi = "Terjadi error sistem 💥"
    pesanError = err.message || "Unknown error"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 font-sans p-6 text-center text-white">
      <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 max-w-md w-full">
        <h1 className="text-2xl font-black mb-4 tracking-wide">⚡ UJI KONEKSI SUPABASE</h1>
        
        {/* Indikator Status */}
        <div className={`p-4 rounded-xl font-bold mb-6 text-sm ${
          statusKoneksi.includes('Sukses') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
        }`}>
          {statusKoneksi}
        </div>

        {/* Informasi Detail */}
        <div className="text-left text-xs bg-slate-950 p-4 rounded-xl font-mono text-slate-300 overflow-x-auto space-y-2">
          <p><span className="text-amber-400">URL:</span> {process.env.NEXT_PUBLIC_SUPABASE_URL || "Kosong!"}</p>
          <p><span className="text-amber-400">KEY:</span> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Terisi (Aman)" : "Kosong!"}</p>
          
          {pesanError && (
            <p className="text-rose-400 mt-2 border-t border-slate-800 pt-2">
              <span className="font-bold text-rose-500">Pesan Error:</span> {pesanError}
            </p>
          )}

          {detailData && (
            <div className="mt-2 border-t border-slate-800 pt-2">
              <span className="font-bold text-emerald-400">Respon Database:</span>
              <pre className="mt-1 text-[10px]">{JSON.stringify(detailData, null, 2)}</pre>
            </div>
          )}
        </div>

        <p className="text-[11px] text-slate-500 mt-6">
          Jika status Sukses, tandanya pondasi backend lo udah beres. Masalah kemarin murni di routing folder!
        </p>
      </div>
    </div>
  )
}
