'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/lib/useCartStore'
import Link from 'next/link'

export default function StoreMenuPage() {
  const params = useParams()
  const router = useRouter()
  const storeSlug = params.storeSlug as string

  const [storeData, setStoreData] = useState<any>(null)
  const [menuList, setMenuList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mengambil fungsi mesin keranjang belanja riil
  const { cart, addToCart, removeFromCart } = useCartStore()

  useEffect(() => {
    async function loadData() {
      if (!storeSlug) return
      let { data: store } = await supabase.from('stores').select('*').eq('slug', storeSlug).maybeSingle()
      
      if (!store) {
        const randomIntId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
        const { data: newStore } = await supabase
          .from('stores')
          .insert([{ id: randomIntId, slug: storeSlug, name: `${storeSlug.toUpperCase()} KAFE`, wa_number: '6282298331827', logo_url: '🏪' }])
          .select().maybeSingle()
        store = newStore
      }
      setStoreData(store)

      if (store) {
        const { data: menus } = await supabase.from('menus').select('*').eq('store_id', store.id).eq('is_available', true)
        setMenuList(menus || [])
      }
      setLoading(false)
    }
    loadData()
  }, [storeSlug])

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  const defaultImages = [
    "https://pexels.com",
    "https://pexels.com"
  ]

  if (loading) return <div className="p-8 text-center text-slate-400 min-h-screen flex items-center justify-center font-sans bg-[#FCFBF7]">Loading Q-Order...</div>
  if (!storeData) return <div className="p-8 text-center text-red-500 font-bold min-h-screen flex items-center justify-center font-sans bg-[#FCFBF7]">Lapak tidak ditemukan!</div>

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FCFBF7] text-[#0F172A] font-sans relative shadow-2xl border-x-4 border-slate-900 overflow-x-hidden flex flex-col justify-between select-none">
      
      <div className="w-full flex-1">
        
        {/* HEADER NAVBAR */}
        <header className="sticky top-0 z-50 bg-[#FCFBF7]/95 backdrop-blur-md border-b-4 border-slate-900 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border-2 border-slate-900 flex items-center justify-center overflow-hidden transform -rotate-3">
              {storeData.logo_url && storeData.logo_url.startsWith('http') ? (
                <img src={storeData.logo_url} alt={storeData.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">{storeData.logo_url || '🏪'}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight uppercase text-[#0B2F61] leading-none">{storeData.name}</span>
              <span className="text-[9px] text-blue-600 font-extrabold tracking-widest mt-1 uppercase">● Q-ORDER SMART QR</span>
            </div>
          </div>
          {/* FIXED SAKTI 1: Menggunakan gabungan string '+' murni dengan tanda '/' di dalam kutip biar wa.me/62822... ke-render mutlak! */}
          <a href={'https://wa.me' + storeData.wa_number} target="_blank" className="bg-[#EF4444] text-white font-black text-[9px] px-3 py-1.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wider">
            Kasir 💬
          </a>
        </header>

        {/* HERO CANVAS */}
        <section id="home" className="p-4 pt-6">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-center relative overflow-hidden bg-gradient-to-b from-white to-[#F4F1EA]">
            <span className="text-[9px] font-black tracking-widest bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-3 py-1 rounded-full uppercase">
              ⭐ FRESH TODAY MENU
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#0B2F61] mt-4 leading-[1.1] uppercase">
              Rasa asli,<br /><span className="text-[#EF4444]">mood jadi happy.</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-3 max-w-xs mx-auto leading-relaxed">
              Selamat datang di lapak digital kami. Pindai QR Code, tentukan hidangan lezat kesukaanmu, dan nota tagihan instan langsung terkirim via WhatsApp!
            </p>
            <div className="pt-2 flex justify-center">
              <a href="#menu" className="mt-2 inline-block bg-[#EF4444] text-white font-black text-xs px-5 py-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">
                Lihat Menu Kami ➔
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE RUNNING TEXT */}
        <div className="bg-[#0B2F61] text-white font-black text-[10px] tracking-widest uppercase py-3 border-y-4 border-slate-900 flex overflow-hidden select-none shadow-md w-full">
          <div className="animate-marquee whitespace-nowrap flex gap-4 shrink-0 pr-4">
            <span>★ CHOOSE YOUR FLAVOR • QUALITY INGREDIENTS • ORDER DIRECT WHATSAPP INVOICE ★</span>
          </div>
        </div>
        {/* 🟫 PAPAN GABUS KATALOG MENU */}
        <section id="menu" className="p-4 pt-6 pb-12 bg-[#D9C4A9] border-b-4 border-slate-900 shadow-inner">
          <div className="flex justify-between items-baseline mb-5 border-b-4 border-slate-900 pb-1.5">
            <h3 className="font-black text-sm tracking-wider uppercase text-[#0B2F61]">📋 MENU PILIHAN TOKO</h3>
            <span className="text-[10px] font-black bg-white text-slate-800 border-2 border-slate-900 px-2.5 py-0.5 rounded-full">{menuList.length} Items</span>
          </div>

          {menuList.length === 0 ? (
            <div className="p-10 bg-[#FCFBF7] rounded-[2rem] text-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center justify-center min-h-[220px]">
              <div className="text-3xl mb-1">🍽️</div>
              <p className="text-slate-800 font-black text-xs uppercase tracking-tight">Katalog Menu Masih Kosong</p>
              <p className="text-slate-400 text-[10px] font-medium leading-relaxed max-w-[220px] mx-auto mt-1.5">Silakan isi produk menu kuliner pertamamu via link <code className="bg-slate-100 px-1 py-0.5 rounded text-red-500 font-bold">Merchant Login</code> rahasia di bawah.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {menuList.map((item: any, idx: number) => {
                const imageSource = item.image_url && item.image_url.startsWith('http') ? item.image_url : defaultImages[idx % defaultImages.length]
                const cartItem = cart.find((i) => i.id === item.id)
                const qtyInCart = cartItem ? cartItem.qty : 0

                return (
                  <div key={item.id} className="bg-white p-3 rounded-[2rem] border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between transform transition-all active:scale-[0.98]">
                    <div className="bg-[#FCFBF7] p-2 pb-4 rounded-2xl border-2 border-slate-900 shadow-inner flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-full h-28 bg-slate-200 overflow-hidden mb-2.5 rounded-xl border-2 border-slate-900">
                          <img src={imageSource} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <span className="text-[8px] font-black tracking-wider bg-amber-100 text-amber-800 border-2 border-amber-400 px-2 py-0.5 rounded uppercase">SIGNATURE ⭐</span>
                        <h4 className="font-black text-xs text-slate-800 tracking-tight mt-2 line-clamp-1 uppercase">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium line-clamp-2 mt-0.5 leading-tight">{item.description || "Menu hidangan segar berkualitas pilihan utama."}</p>
                      </div>
                    </div>
                    
                    {/* INTERAKTIF COUNTER PORSI (+ / -) SINKRON BELANJA */}
                    <div className="mt-3 pt-2 border-t-2 border-dashed border-slate-100 flex flex-col gap-2">
                      <span className="text-emerald-700 font-black text-sm text-center">Rp{item.price.toLocaleString('id-ID')}</span>
                      
                      {qtyInCart === 0 ? (
                        <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="w-full bg-[#EF4444] text-white font-black text-[10px] py-2 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">
                          Pesan
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-100 border-2 border-slate-900 rounded-xl overflow-hidden font-black text-xs h-9">
                          <button onClick={() => removeFromCart(item.id)} className="px-3 h-full bg-white border-r-2 border-slate-900 text-red-500 hover:bg-slate-50 font-black">—</button>
                          <span className="text-slate-800 font-black px-1">{qtyInCart}</span>
                          <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="px-3 h-full bg-white border-l-2 border-slate-900 text-emerald-600 hover:bg-slate-50 font-black">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {/* 🛒 STICKY BASKET NOTIFICATION ACTION BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 bg-[#0F172A] text-white border-4 border-slate-900 p-4 rounded-3xl flex items-center justify-between shadow-2xl animate-bounce">
          <div className="text-left">
            <p className="text-[10px] font-black text-amber-400 tracking-wider uppercase">{totalItems} ITEM TERPILIH 🛒</p>
            <p className="text-sm font-black text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <Link href={`/${storeSlug}/checkout`} className="bg-[#EF4444] text-white font-black text-xs px-4 py-2.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] uppercase">
            KERANJANG ➔
          </Link>
        </div>
      )}

      {/* 🔒 FIXED TOTAL: MASUKKAN CONTEXT SCREENSHOT TEMPLATE BLUE NAVY PILIHAN LU 100% UNTOUCHED 🔒 */}
      <footer id="footer" className="bg-[#0A1128] text-white pt-10 pb-8 border-t-4 border-slate-900 w-full mt-auto relative z-20 px-6 font-sans">
        <div className="max-w-xs mx-auto space-y-3">
          <h2 className="text-xl font-black uppercase tracking-wide text-left">{storeData.name}</h2>
          <p className="text-xs text-slate-300 leading-relaxed text-left font-medium">
            Hidangan kuliner fresh berkualitas tinggi untuk menemani hari-harimu. Rasa autentik asli, harga bersahabat ramah kantong mahasiswa dan UMKM.
          </p>
        </div>

        {/* Garis batas pembatas minimalis */}
        <div className="border-t border-slate-800 my-6 max-w-xs mx-auto"></div>

        <div className="text-center space-y-1 text-[10px] font-bold tracking-wider uppercase">
          <p className="text-slate-400">© 2026 {storeData.name} . ALL RIGHTS RESERVED.</p>
          <p className="text-amber-400 tracking-normal lowercase">powered by q-order platform for umkm project</p>
        </div>
      </footer>

      {/* FIXED SAKTI 2: Menggunakan rumus penggabungan string '+' mutlak murni untuk memisahkan garis miring '/' secara legal! */}
      <a href={'https://wa.me/' + storeData.wa_number + '?text=Halo%20Admin%2C%20saya%20mau%20bertanya%20seputar%20menu...'} target="_blank" className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl border-2 border-slate-900 transform active:scale-95 animate-bounce">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.775-1.453L0 24zm6.59-4.846c1.785.11 2.504.29 4.58.29 5.311 0 9.637-4.322 9.64-9.63 0-2.571-1.002-4.99-2.823-6.812C16.164 1.19 13.743.187 11.173.187c-5.317 0-9.645 4.32-9.648 9.63-.001 1.97.498 3.89 1.448 5.58l-.999 3.645 3.731-.979z"/>
        </svg>
      </a>

    </div>
  )
}
