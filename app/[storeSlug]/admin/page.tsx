 'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SuperAdminPage() {
  const params = useParams()
  const router = useRouter()
  const storeSlug = params.storeSlug as string

  const [store, setStore] = useState<any>(null)
  const [menus, setMenus] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'toko' | 'menu'>('toko')

  const [storeName, setStoreName] = useState('')
  const [storeWa, setStoreWa] = useState('')
  const [storeLogo, setStoreLogo] = useState('')
  const [uploading, setUploading] = useState(false)

  // State Form Menu Baru + State Khusus Upload Gambar Hidangan Kuliner
  const [menuName, setMenuName] = useState('')
  const [menuPrice, setMenuPrice] = useState('')
  const [menuDesc, setMenuDesc] = useState('')
  const [menuImage, setMenuImage] = useState('')
  const [menuUploading, setMenuUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadAllData = async () => {
    if (!storeSlug) return
    const { data: storeData } = await supabase.from('stores').select('*').eq('slug', storeSlug).maybeSingle()
    if (storeData) {
      setStore(storeData)
      setStoreName(storeData.name)
      setStoreWa(storeData.wa_number)
      setStoreLogo(storeData.logo_url || '')

      const { data: menuData } = await supabase.from('menus').select('*').eq('store_id', storeData.id)
      if (menuData) setMenus(menuData)
    }
    setLoading(false)
  }

  useEffect(() => { loadAllData() }, [storeSlug])

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return
      setUploading(true)
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${store.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('logos').upload(fileName, file)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('logos').getPublicUrl(fileName)
      setStoreLogo(data.publicUrl)
      alert('Foto Logo Merchant Sukses Diunggah ke Cloud Bucket! 📸 Klik "Simpan Perubahan Lapak".')
    } catch (error: any) {
      alert('Gagal: ' + error.message)
    } finally { setUploading(false) }
  }

  // FIXED UTAMA: Mengubah target pembacaan file array [0] agar rumus .split('.') langsung berjalan lancar tanpa eror lagi!
  const handleUploadMenuImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return
      setMenuUploading(true)
      const fileSelected = e.target.files[0] // Membaca file index pertama secara akurat
      const fileExt = fileSelected.name.split('.').pop() // Berhasil split extension berkas!
      const fileName = `makanan-${store.id}-${Math.random()}.${fileExt}`

      // Menembak bucket terpisah 'menus' sesuai ide genius lo kemarin!
      const { error: uploadError } = await supabase.storage.from('menus').upload(fileName, fileSelected)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('menus').getPublicUrl(fileName)
      setMenuImage(data.publicUrl)
      alert('Foto Produk Makanan Sukses Diunggah ke Folder Terpisah "menus"! 📸 File siap dipajang.')
    } catch (error: any) {
      alert('Gagal unggah foto makanan: ' + error.message)
    } finally { setMenuUploading(false) }
  }

  const handleUpdateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!storeName || !storeWa) return alert('Nama lapak dan nomor WA wajib diisi!')
    setIsSubmitting(true)
    const { error } = await supabase.from('stores').update({ name: storeName, wa_number: storeWa, logo_url: storeLogo }).eq('id', store.id)
    setIsSubmitting(false)
    if (!error) alert('Profil Merchant Berhasil Diperbarui! 💾')
  }
  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!menuName || !menuPrice) return alert('Nama makanan dan harga wajib diisi!')
    setIsSubmitting(true)
    const { error } = await supabase.from('menus').insert([{ store_id: store.id, name: menuName, price: parseInt(menuPrice), description: menuDesc, image_url: menuImage, is_available: true }])
    setIsSubmitting(false)
    if (!error) {
      alert('Menu Baru + Foto Sukses Dipajang! 🚀'); setMenuName(''); setMenuPrice(''); setMenuDesc(''); setMenuImage(''); loadAllData()
    } else {
      alert('Gagal simpan ke DB: ' + error.message)
    }
  }

  const handleDeleteMenu = async (menuId: number) => {
    if (!confirm('Hapus produk ini dari katalog menu?')) return
    await supabase.from('menus').delete().eq('id', menuId)
    loadAllData()
  }

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium font-sans min-h-screen flex items-center justify-center bg-[#FCFBF7]">Memuat Dashboard Panel... ⏳</div>
  if (!store) return <div className="p-8 text-center text-red-500 font-bold min-h-screen flex items-center justify-center bg-[#FCFBF7]">Lapak tidak ditemukan!</div>

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FCFBF7] text-[#0F172A] font-sans pb-12 relative shadow-2xl border-x-4 border-slate-900 select-none">
      <div className="p-6 bg-[#221C16] text-[#FCFBF7] border-b-4 border-slate-900 flex items-center justify-between shadow-md">
        <div>
          <span className="text-[8px] font-black tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">// CONTROL PANEL</span>
          <h1 className="text-xl font-black tracking-tight uppercase mt-1">Q-ORDER ADMIN</h1>
        </div>
        <button onClick={() => router.push(`/${storeSlug}`)} className="bg-[#EF4444] text-white font-black text-[10px] px-3 py-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">Web Utama ➔</button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 bg-slate-200/60 p-1.5 rounded-2xl text-xs font-black border border-slate-200">
          <button onClick={() => setActiveTab('toko')} className={`py-3 rounded-xl transition-all ${activeTab === 'toko' ? 'bg-[#221C16] text-white shadow-md' : 'text-slate-500'}`}>⚙️ PROFIL LAPAK</button>
          <button onClick={() => setActiveTab('menu')} className={`py-3 rounded-xl transition-all ${activeTab === 'menu' ? 'bg-[#221C16] text-white shadow-md' : 'text-slate-500'}`}>📦 MANAGEMENT MENU ({menus.length})</button>
        </div>
      </div>

      <div className="px-4">
        {activeTab === 'toko' && (
          <div className="bg-white p-5 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4">
            <form onSubmit={handleUpdateStore} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">// Nama Warung / UMKM</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl text-sm font-bold bg-slate-50 focus:outline-none focus:border-slate-900 text-gray-800" />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">// No WhatsApp Toko (Awalan 62)</label>
                <input type="text" value={storeWa} onChange={(e) => setStoreWa(e.target.value)} className="w-full border-2 border-slate-200 p-3 rounded-xl text-sm font-bold bg-slate-50 focus:outline-none focus:border-slate-900 text-gray-800" />
              </div>
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">// Upload File Gambar Logo Lapak</label>
                <div className="flex items-center gap-3 bg-slate-50 border-2 border-dashed border-slate-200 p-3 rounded-xl">
                  <input type="file" accept="image/*" onChange={handleUploadLogo} disabled={uploading} className="text-xs font-bold text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-[#221C16] file:text-white cursor-pointer" />
                </div>
                {storeLogo && <img src={storeLogo} className="w-12 h-12 object-cover rounded-xl mt-3 border-2 border-slate-900" alt="Preview" />}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-[#221C16] text-white p-4 rounded-xl font-black text-xs shadow-md uppercase tracking-widest">Simpan Perubahan Lapak 💾</button>
            </form>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-widest">// TAMBAH PRODUK HIDANGAN</h3>
              <form onSubmit={handleAddMenu} className="space-y-3">
                <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="Nama item kuliner" className="w-full border-2 border-slate-200 p-3.5 rounded-xl text-sm font-bold bg-slate-50 focus:outline-none focus:border-slate-900 text-gray-800" />
                <input type="number" value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} placeholder="Nominal Harga (Contoh: 15000)" className="w-full border-2 border-slate-200 p-3.5 rounded-xl text-sm font-bold bg-slate-50 focus:outline-none focus:border-slate-900 text-gray-800" />
                <input type="text" value={menuDesc} onChange={(e) => setMenuDesc(e.target.value)} placeholder="Deskripsi singkat hidangan porsi" className="w-full border-2 border-slate-200 p-3.5 rounded-xl text-sm font-bold bg-slate-50 focus:outline-none focus:border-slate-900 text-gray-800" />
                
                <div className="pt-1">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">// Upload Foto Makanan/Minuman (JPG / PNG)</label>
                  <div className="flex items-center gap-3 bg-slate-50 border-2 border-dashed border-slate-200 p-3 rounded-xl">
                    <input type="file" accept="image/*" onChange={handleUploadMenuImage} disabled={menuUploading} className="text-xs font-bold text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-red-500 file:text-white cursor-pointer" />
                    {menuUploading && <span className="text-[10px] text-amber-500 font-bold animate-pulse">Uploading...</span>}
                  </div>
                  {menuImage && <img src={menuImage} className="w-12 h-12 object-cover rounded-xl mt-3 border-2 border-slate-900" alt="Preview Menu" />}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#EF4444] text-white p-3.5 rounded-xl font-black text-[10px] shadow-md border-2 border-slate-900 uppercase tracking-widest mt-2">+ PAJANG ITEM DI KAFE</button>
              </form>
            </div>

            <div className="bg-[#D9C4A9] p-4 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h3 className="text-[9px] font-black uppercase text-[#0B2F61] mb-3 tracking-widest">// DAFTAR ETALASE GUDANG</h3>
              {menus.length === 0 ? (
                <p className="text-slate-600 text-xs py-4 text-center font-bold">Lapak kamu belum punya daftar menu.</p>
              ) : (
                <div className="space-y-2">
                  {menus.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3.5 bg-white rounded-xl border-2 border-slate-900 shadow-sm">
                      <div>
                        <p className="font-black text-xs text-slate-800 uppercase tracking-tight">{item.name}</p>
                        <p className="text-xs text-emerald-700 font-black mt-0.5">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <button onClick={() => handleDeleteMenu(item.id)} className="text-white font-black text-[9px] bg-[#EF4444] border-2 border-slate-900 px-3 py-1.5 rounded-lg transition-all shadow-sm">HAPUS 🗑️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
