/**
 * Konfigurasi QRIS statis.
 *
 * Ganti QRIS_STATIC dengan kode QRIS statis kamu (mulai dari "000201010211...").
 * QRIS ini dipakai sebagai basis saat membuat QRIS dinamis per nominal.
 *
 * API endpoint (dari user):
 *   POST https://anggeraji.web.id/qris/api
 *   body: { "qris_statis": "000201010211...6304163E", "amount": "50000" }
 *   response: { "status": "success", "message": "QRIS berhasil", "qris_string": "00020101...<CRC16>" }
 */

export const QRIS_CONFIG = {
  qrisStatis: "000201010211...6304163E", // TODO: ganti dengan QRIS statis asli kamu
  apiUrl: "https://anggeraji.web.id/qris/api",
  currency: "IDR",
} as const;