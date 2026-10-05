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

  if (loading) return <div className="p-6 text-center text-slate-400 min-h-screen flex items-center justify-center font-sans bg-[#FCFBF7]">Loading Q-Order...</div>
  if (!storeData) return <div className="p-6 text-center text-red-500 font-bold min-h-screen flex items-center justify-center font-sans bg-[#FCFBF7]">Lapak tidak ditemukan!</div>

  return (
    // RESPONSIF FIX: max-w-md memastikan pas seukuran HP di device apa pun
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#FCFBF7] text-[#0F172A] font-sans relative shadow-2xl border-x-2 border-slate-900 overflow-x-hidden flex flex-col justify-between select-none">
      
      <div className="w-full flex-1">
        
        {/* HEADER NAVBAR (PADDING DIKECILKAN BIAR COMPACT) */}
        <header className="sticky top-0 z-50 bg-[#FCFBF7]/95 backdrop-blur-md border-b-2 border-slate-900 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg border border-slate-900 flex items-center justify-center overflow-hidden transform -rotate-3">
              {storeData.logo_url && storeData.logo_url.startsWith('http') ? (
                <img src={storeData.logo_url} alt={storeData.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-base">{storeData.logo_url || '🏪'}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs tracking-tight uppercase text-[#0B2F61] leading-none">{storeData.name}</span>
              <span className="text-[8px] text-blue-600 font-extrabold tracking-widest mt-0.5 uppercase">● Q-ORDER SMART QR</span>
            </div>
          </div>
          <a href={'https://wa.me/' + storeData.wa_number} target="_blank" className="bg-[#EF4444] text-white font-black text-[8px] px-2.5 py-1.5 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">
            Kasir 💬
          </a>
        </header>

        {/* HERO CANVAS (TEXT DIKECILKAN BIAR TIDAK MAKAN TEMPAT) */}
        <section id="home" className="p-3 pt-4">
          <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-center relative overflow-hidden bg-gradient-to-b from-white to-[#F4F1EA]">
            <span className="text-[8px] font-black tracking-widest bg-emerald-100 border border-emerald-400 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
              ⭐ FRESH TODAY MENU
            </span>
            <h2 className="text-xl font-black tracking-tight text-[#0B2F61] mt-2.5 leading-tight uppercase">
              Rasa asli,<br /><span className="text-[#EF4444]">mood jadi happy.</span>
            </h2>
            <p className="text-[10px] text-slate-500 font-medium mt-1.5 max-w-xs mx-auto leading-relaxed">
              Selamat datang di lapak digital kami. Pindai QR Code, tentukan hidangan lezat kesukaanmu, dan nota tagihan instan langsung terkirim via WhatsApp!
            </p>
          </div>
        </section>

        {/* MARQUEE RUNNING TEXT */}
        <div className="bg-[#0B2F61] text-white font-black text-[9px] tracking-widest uppercase py-2 border-y-2 border-slate-900 flex overflow-hidden select-none w-full">
          <div className="animate-marquee whitespace-nowrap flex gap-4 shrink-0 pr-4">
            <span>★ CHOOSE YOUR FLAVOR • QUALITY INGREDIENTS • ORDER DIRECT WHATSAPP INVOICE ★</span>
          </div>
        </div>
        {/* 🟫 PAPAN GABUS KATALOG MENU RESPONSIF */}
        <section id="menu" className="p-3 pt-4 pb-12 bg-[#D9C4A9] border-b-2 border-slate-900 shadow-inner">
          <div className="flex justify-between items-baseline mb-3.5 border-b-2 border-slate-900 pb-1">
            <h3 className="font-black text-xs tracking-wider uppercase text-[#0B2F61]">📋 MENU PILIHAN TOKO</h3>
            <span className="text-[9px] font-black bg-white text-slate-800 border border-slate-900 px-2 py-0.5 rounded-full">{menuList.length} Items</span>
          </div>

          {menuList.length === 0 ? (
            <div className="p-8 bg-[#FCFBF7] rounded-[1.5rem] text-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center justify-center min-h-[160px]">
              <div className="text-2xl mb-1">🍽️</div>
              <p className="text-slate-800 font-black text-xs uppercase tracking-tight">Katalog Menu Masih Kosong</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {menuList.map((item: any, idx: number) => {
                const imageSource = item.image_url && item.image_url.startsWith('http') ? item.image_url : defaultImages[idx % defaultImages.length]
                const cartItem = cart.find((i) => i.id === item.id)
                const qtyInCart = cartItem ? cartItem.qty : 0

                return (
                  <div key={item.id} className="bg-white p-2 rounded-[1.5rem] border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between transform transition-all active:scale-[0.98]">
                    <div className="bg-[#FCFBF7] p-1.5 pb-2 rounded-xl border border-slate-900 shadow-inner flex-1 flex flex-col justify-between">
                      <div>
                        <div className="w-full h-20 bg-slate-200 overflow-hidden mb-1.5 rounded-lg border border-slate-900">
                          <img src={imageSource} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <span className="text-[7px] font-black tracking-wider bg-amber-100 text-amber-800 border border-amber-400 px-1 rounded uppercase">SIGNATURE ⭐</span>
                        <h4 className="font-black text-xs text-slate-800 tracking-tight mt-1 line-clamp-1 uppercase">{item.name}</h4>
                        <p className="text-[9px] text-slate-400 font-medium line-clamp-2 mt-0.5 leading-tight">{item.description || "Menu hidangan segar pilihan utama."}</p>
                      </div>
                    </div>
                    
                    {/* COUNTER INTERAKTIF +/- YANG DIKECILKAN UKURANNYA */}
                    <div className="mt-2 pt-1 border-t border-dashed border-slate-100 flex flex-col gap-1.5">
                      <span className="text-emerald-700 font-black text-xs text-center">Rp{item.price.toLocaleString('id-ID')}</span>
                      
                      {qtyInCart === 0 ? (
                        <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="w-full bg-[#EF4444] text-white font-black text-[9px] py-1.5 rounded-lg border border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] uppercase tracking-wider">
                          Pesan
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-100 border border-slate-900 rounded-lg overflow-hidden font-black text-[10px] h-7">
                          <button onClick={() => removeFromCart(item.id)} className="px-2 h-full bg-white border-r border-slate-900 text-red-500 font-black">—</button>
                          <span className="text-slate-800 font-black px-1">{qtyInCart}</span>
                          <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="px-2 h-full bg-white border-l border-slate-900 text-emerald-600 font-black">+</button>
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

      {/* 🛒 STICKY BASKET BANNER (DIRESALE AGAR PAS JEMPOL) */}
      {totalItems > 0 && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xs z-50 bg-[#0F172A] text-white border-2 border-slate-900 p-3 rounded-2xl flex items-center justify-between shadow-2xl animate-bounce">
          <div className="text-left">
            <p className="text-[8px] font-black text-amber-400 tracking-wider uppercase">{totalItems} ITEM TERPILIH 🛒</p>
            <p className="text-xs font-black text-white">Rp {totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <Link href={`/${storeSlug}/checkout`} className="bg-[#EF4444] text-white font-black text-[10px] px-3 py-1.5 rounded-lg border border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] uppercase">
            KERANJANG ➔
          </Link>
        </div>
      )}

      {/* 🔒 100% LOCK FOOTER NAVY PILIHAN LU UNTOUCHED (RESPONSIVE SCALED) 🔒 */}
      <footer id="footer" className="bg-[#0A1128] text-white pt-6 pb-6 border-t-2 border-slate-900 w-full mt-auto relative z-20 px-4 font-sans">
        <div className="max-w-xs mx-auto space-y-2">
          <h2 className="text-base font-black uppercase tracking-wide text-left">{storeData.name}</h2>
          <p className="text-[10px] text-slate-300 leading-relaxed text-left font-medium">
            Hidangan kuliner fresh berkualitas tinggi untuk menemani hari-harimu. Rasa autentik asli, harga bersahabat ramah kantong mahasiswa dan UMKM.
          </p>
        </div>
        <div className="border-t border-slate-800 my-4 max-w-xs mx-auto"></div>
        <div className="text-center space-y-0.5 text-[8px] font-bold tracking-wider uppercase">
          <p className="text-slate-400">© 2026 {storeData.name} . ALL RIGHTS RESERVED.</p>
          <p className="text-amber-400 tracking-normal lowercase">powered by q-order platform for umkm project</p>
        </div>
      </footer>

      <a href={'https://wa.me/' + storeData.wa_number + '?text=Halo%20Admin%2C%20saya%20mau%20bertanya%20seputar%20menu...'} target="_blank" className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center text-xl border border-slate-900 transform active:scale-95 animate-bounce">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.775-1.453L0 24zm6.59-4.846c1.785.11 2.504.29 4.58.29 5.311 0 9.637-4.322 9.64-9.63 0-2.571-1.002-4.99-2.823-6.812C16.164 1.19 13.743.187 11.173.187c-5.317 0-9.645 4.32-9.648 9.63-.001 1.97.498 3.89 1.448 5.58l-.999 3.645 3.731-.979z"/></svg>
      </a>

    </div>
  )
}
