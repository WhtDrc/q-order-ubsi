'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/useCartStore'
import { supabase } from '@/lib/supabase'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const storeSlug = params.storeSlug as string
  
  const { cart, clearCart } = useCartStore()
  const [store, setStore] = useState<any>(null)
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    async function loadStore() {
      if (!storeSlug) return
      const { data } = await supabase.from('stores').select('*').eq('slug', storeSlug).maybeSingle()
      if (data) setStore(data)
    }
    loadStore()
  }, [storeSlug])

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  const handleSendWhatsApp = () => {
    if (!customerName.trim()) return alert('Nama kamu wajib diisi bro!')
    if (!store) return alert('Data merchant gagal dimuat.')
    if (cart.length === 0) return alert('Keranjang kamu masih kosong!')

    const orderIdCode = 'ORD-' + Date.now().toString().slice(-5)

    const waktuSekarang = new Date()
    const formatWaktu = waktuSekarang.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB'

    let textInvoice = '*🔥 PESANAN BARU - [' + store.name.toUpperCase() + ']*\n'
    textInvoice += '----------------------------------\n'
    textInvoice += '*Order ID:* #' + orderIdCode + '\n'
    textInvoice += '*Nama Pelanggan:* ' + customerName + '\n'
    textInvoice += '*Waktu Order:* ' + formatWaktu + '\n'
    textInvoice += '----------------------------------\n'
    textInvoice += '*Detail Pesanan:*\n'

    cart.forEach((item) => {
      textInvoice += '- ' + item.name + ' x' + item.qty + ' (Rp ' + (item.price * item.qty).toLocaleString('id-ID') + ')\n'
    })

    textInvoice += '----------------------------------\n'
    textInvoice += '*Total Bayar:* Rp ' + totalPrice.toLocaleString('id-ID') + '\n'
    textInvoice += '----------------------------------\n'
    textInvoice += 'Mohon segera dicek dan diproses ya Min! 🙏'

    const urlWA = 'https://wa.me/' + store.wa_number + '?text=' + encodeURIComponent(textInvoice)
    window.open(urlWA, '_blank')
    clearCart()
    router.push('/' + storeSlug)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-[#FCFBF7] min-h-screen font-sans text-[#0F172A] shadow-2xl border-x-2 border-slate-900 select-none flex flex-col justify-between">
      <div>
        <button onClick={() => router.back()} className="text-slate-400 hover:text-black text-[9px] font-black uppercase mb-4 tracking-widest flex items-center gap-1 transition-all">
          ￩ KEMBALI PILIH HIDANGAN
        </button>
        
        <h1 className="text-xl font-black mb-4 tracking-tight uppercase text-[#0B2F61]">STRUK BELANJA 📋</h1>

        {/* NOTA KASIR DENGAN SIZING LEBIH MINI */}
        <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] mb-4 relative overflow-hidden bg-gradient-to-b from-white to-[#F4F1EA]">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#EF4444]"></div>
          <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">// RINCIAN ITEM</h3>
          
          {cart.length === 0 ? (
            <div className="py-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-tight">Keranjang Belanja Kosong 🛒</div>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs font-bold text-slate-700">
                  <span className="flex-1 uppercase tracking-tight">{item.name} <b className="text-blue-600 ml-1">x{item.qty}</b></span>
                  <span className="font-black text-slate-900">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t border-dashed border-slate-300 my-3"></div>
          <div className="flex justify-between font-black text-sm text-emerald-700 tracking-tight">
            <span>TOTAL NOTA TAGIHAN</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* FORM IDENTITAS */}
        <div className="bg-white p-4 rounded-[1.5rem] border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-3">
          <div>
            <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">// Identitas Pemesan</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tulis nama kamu bro..." className="w-full border border-slate-300 p-2.5 rounded-lg text-xs font-bold focus:outline-none focus:border-slate-900 bg-slate-50 text-gray-800" />
          </div>
        </div>
      </div>

      <button onClick={handleSendWhatsApp} className="w-full mt-4 bg-[#EF4444] text-white p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-black text-xs uppercase tracking-widest">
        Kirim Nota ke WhatsApp Kasir 🚀
      </button>
    </div>
  )
}
