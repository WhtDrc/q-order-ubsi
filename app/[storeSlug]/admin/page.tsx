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
      const fileSelected = e.target.files[0]
      const fileExt = fileSelected.name.split('.').pop()
      const fileName = `logo-${store.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('logos').upload(fileName, fileSelected)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('logos').getPublicUrl(fileName)
      setStoreLogo(data.publicUrl)
      alert('Foto Logo Sukses Diunggah! 📸 Klik Simpan Perubahan Lapak.')
    } catch (error: any) {
      alert('Gagal: ' + error.message)
    } finally { setUploading(false) }
  }

  const handleUploadMenuImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return
      setMenuUploading(true)
      const fileSelected = e.target.files[0]
      const fileExt = fileSelected.name.split('.').pop()
      const fileName = `makanan-${store.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('menus').upload(fileName, fileSelected)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('menus').getPublicUrl(fileName)
      setMenuImage(data.publicUrl)
      alert('Foto Produk Makanan Sukses Diunggah! 📸')
    } catch (error: any) {
      alert('Gagal: ' + error.message)
    } finally { setMenuUploading(false) }
  }

  const handleUpdateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!storeName || !storeWa) return alert('Nama lapak dan nomor WA wajib!')
    setIsSubmitting(true)
    await supabase.from('stores').update({ name: storeName, wa_number: storeWa, logo_url: storeLogo }).eq('id', store.id)
    setIsSubmitting(false)
    alert('Profil Merchant Berhasil Diperbarui! 💾')
  }
  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!menuName || !menuPrice) return alert('Nama makanan dan harga wajib!')
    setIsSubmitting(true)
    const { error } = await supabase.from('menus').insert([{ store_id: store.id, name: menuName, price: parseInt(menuPrice), description: menuDesc, image_url: menuImage, is_available: true }])
    setIsSubmitting(false)
    if (!error) {
      alert('Menu Berhasil Dipajang! 🚀'); setMenuName(''); setMenuPrice(''); setMenuDesc(''); setMenuImage(''); loadAllData()
    }
  }

  const handleDeleteMenu = async (menuId: number) => {
    if (!confirm('Hapus produk ini?')) return
    await supabase.from('menus').delete().eq('id', menuId)
    loadAllData()
  }

  if (loading) return <div className="p-4 text-center text-slate-500 font-medium font-sans min-h-screen flex items-center justify-center bg-[#FCFBF7]">Loading... ⏳</div>
  if (!store) return <div className="p-4 text-center text-red-500 font-bold">Lapak tidak ditemukan!</div>

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FCFBF7] text-[#0F172A] font-sans pb-6 relative shadow-2xl border-x-2 border-slate-900 select-none">
      <div className="p-4 bg-[#221C16] text-[#FCFBF7] border-b-2 border-slate-900 flex items-center justify-between shadow-md">
        <div>
          <span className="text-[7px] font-black tracking-widest text-amber-400 uppercase">// CONTROL PANEL</span>
          <h1 className="text-base font-black tracking-tight uppercase">Q-ORDER ADMIN</h1>
        </div>
        <button onClick={() => router.push(`/${storeSlug}`)} className="bg-[#EF4444] text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg border border-slate-900 uppercase">Web Utama ➔</button>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 bg-slate-200/60 p-1 rounded-xl text-[10px] font-black border border-slate-200">
          <button onClick={() => setActiveTab('toko')} className={`py-2 rounded-lg transition-all ${activeTab === 'toko' ? 'bg-[#221C16] text-white shadow' : 'text-slate-500'}`}>⚙️ PROFIL</button>
          <button onClick={() => setActiveTab('menu')} className={`py-2 rounded-xl transition-all ${activeTab === 'menu' ? 'bg-[#221C16] text-white shadow' : 'text-slate-500'}`}>📦 MENU ({menus.length})</button>
        </div>
      </div>

      <div className="px-3">
        {activeTab === 'toko' && (
          <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] space-y-3">
            <form onSubmit={handleUpdateStore} className="space-y-3">
              <div>
                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">// Nama Warung / UMKM</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold text-gray-800 bg-slate-50" />
              </div>
              <div>
                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">// No WhatsApp Toko (Awalan 62)</label>
                <input type="text" value={storeWa} onChange={(e) => setStoreWa(e.target.value)} className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold text-gray-800 bg-slate-50" />
              </div>
              <div>
                <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">// Upload Gambar Logo Lapak</label>
                <input type="file" accept="image/*" onChange={handleUploadLogo} disabled={uploading} className="text-[10px] font-bold text-slate-500" />
                {storeLogo && <img src={storeLogo} className="w-10 h-10 object-cover rounded-lg mt-2 border border-slate-900" alt="Preview" />}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-[#221C16] text-white p-3 rounded-xl font-black text-[10px] uppercase">Simpan Perubahan Lapak 💾</button>
            </form>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <form onSubmit={handleAddMenu} className="space-y-2">
                <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="Nama item" className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold bg-slate-50 text-gray-800" />
                <input type="number" value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} placeholder="Harga (Contoh: 15000)" className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold bg-slate-50 text-gray-800" />
                <input type="text" value={menuDesc} onChange={(e) => setMenuDesc(e.target.value)} placeholder="Deskripsi singkat" className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold bg-slate-50 text-gray-800" />
                <div>
                  <input type="file" accept="image/*" onChange={handleUploadMenuImage} disabled={menuUploading} className="text-[9px] font-bold text-slate-500" />
                  {menuImage && <img src={menuImage} className="w-10 h-10 object-cover rounded-lg mt-2 border border-slate-900" alt="Preview Menu" />}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#EF4444] text-white p-2.5 rounded-xl font-black text-[9px] uppercase">+ PAJANG ITEM DI KAFE</button>
              </form>
            </div>

            <div className="bg-[#D9C4A9] p-3 rounded-[1.5rem] border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="space-y-2">
                {menus.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-slate-900">
                    <div>
                      <p className="font-black text-xs text-slate-800 uppercase leading-none">{item.name}</p>
                      <p className="text-[10px] text-emerald-700 font-black mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button onClick={() => handleDeleteMenu(item.id)} className="text-white font-black text-[8px] bg-[#EF4444] border border-slate-900 px-2 py-1 rounded">HAPUS 🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
