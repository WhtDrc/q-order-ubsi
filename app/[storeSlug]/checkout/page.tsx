'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/useCartStore'
import { supabase } from '@/lib/supabase'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const storeSlug = params.storeSlug as string
  
  // Menarik data mutlak belanjaan riil dari halaman depan pembeli
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
    if (cart.length === 0) return alert('Keranjang kamu masih kosong! Silakan pilih makanan dulu di halaman depan.')

    const orderIdCode = 'ORD-' + Date.now().toString().slice(-5)

    // Logika Waktu Jam Otomatis HP Pembeli Riel
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

    // FIXED UTAMA: Menggunakan penggabungan string '+' yang aman tanpa template literal agar nomor otomatis ditarik dari database secara sempurna!
    const urlWA = 'https://wa.me/' + store.wa_number + '?text=' + encodeURIComponent(textInvoice)
    
    window.open(urlWA, '_blank')
    clearCart()
    router.push('/' + storeSlug)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-[#FCFBF7] min-h-screen font-sans text-[#0F172A] shadow-2xl border-x-4 border-slate-900 select-none">
      <button onClick={() => router.back()} className="text-slate-400 hover:text-black text-xs font-black uppercase mb-5 tracking-widest flex items-center gap-1 transition-all">
        ￩ KEMBALI PILIH HIDANGAN
      </button>
      
      <h1 className="text-2xl font-black mb-6 tracking-tight uppercase text-[#0B2F61]">STRUK BELANJA KAMU 📋</h1>

      {/* STRUK RESMI RIEL */}
      <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] mb-6 relative overflow-hidden bg-gradient-to-b from-white to-[#F4F1EA]">
        <div className="absolute top-0 left-0 w-full h-2.5 bg-[#EF4444]"></div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">// RINCIAN ITEM STRUK</h3>
        
        {cart.length === 0 ? (
          <div className="py-4 text-center text-slate-400 text-xs font-bold uppercase tracking-tight">Keranjang Belanja Kosong 🛒</div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-sm font-bold text-slate-700">
                <span className="flex-1 uppercase tracking-tight">{item.name} <b className="text-blue-600 ml-1">x{item.qty}</b></span>
                <span className="font-black text-slate-900">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="border-t-2 border-dashed border-slate-300 my-4"></div>
        <div className="flex justify-between font-black text-base text-emerald-700 tracking-tight">
          <span>TOTAL NOTA TAGIHAN</span>
          <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
      {/* FORM INPUT NAMA */}
      <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">// Identitas Pemesan</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Tulis nama kamu bro..." className="w-full border-2 border-slate-100 p-3.5 rounded-xl text-sm font-bold focus:outline-none focus:border-slate-900 bg-slate-50 focus:bg-white transition-all text-gray-800" />
        </div>
        <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-1">💡 Waktu pencatatan transaksi invoice akan terekam secara otomatis berbasis jam digital cloud saat lo menekan tombol kirim di bawah.</p>
      </div>

      {/* Button Tembak WhatsApp */}
      <button onClick={handleSendWhatsApp} className="w-full mt-6 bg-[#EF4444] text-white p-4 rounded-2xl font-black text-sm border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-widest">
        Kirim Nota ke WhatsApp Kasir 🚀
      </button>
    </div>
  )
}
