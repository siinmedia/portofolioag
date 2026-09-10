import { createServerFn } from "@tanstack/react-start";
import { QRIS_CONFIG } from "./qris-config";

/**
 * Server function buat bikin QRIS dinamis.
 * Proxy ke https://anggeraji.web.id/qris/api dari server — biar gak kena CORS.
 * Server functions di project ini udah dilindungi CSRF middleware (lihat src/start.ts).
 */
export const generateQris = createServerFn({ method: "POST" })
  .validator((d: { amount: number }) => {
    if (!d || typeof d.amount !== "number" || !Number.isFinite(d.amount)) {
      throw new Error("Nominal tidak valid");
    }
    if (d.amount < 1 || d.amount > 100_000_000) {
      throw new Error("Nominal di luar batas (Rp1 – Rp100.000.000)");
    }
    return { amount: Math.round(d.amount) };
  })
  .handler(async ({ data }) => {
    if (!QRIS_CONFIG.qrisStatis || QRIS_CONFIG.qrisStatis.startsWith("000201010211...")) {
      return {
        ok: false as const,
        configured: false as const,
        error: "QRIS statis belum dikonfigurasi",
      };
    }

    const res = await fetch(QRIS_CONFIG.apiUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        qris_statis: QRIS_CONFIG.qrisStatis,
        amount: String(data.amount),
      }),
    });

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (!res.ok) {
      return {
        ok: false as const,
        configured: true as const,
        error: `QRIS API error (${res.status})`,
      };
    }

    const payload = json as {
      status?: string;
      qris_string?: string;
      message?: string;
    };

    if (payload.status !== "success" || !payload.qris_string) {
      return {
        ok: false as const,
        configured: true as const,
        error: payload.message || "Respons QRIS API tidak valid",
      };
    }

    return {
      ok: true as const,
      configured: true as const,
      amount: data.amount,
      qrisString: payload.qris_string,
    };
  });