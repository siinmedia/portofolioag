import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Terminal,
  Braces,
  Loader2,
  Lock,
  Server,
} from "lucide-react";
import { QRIS_CONFIG } from "@/lib/qris-config";

export const Route = createFileRoute("/api-docs")({
  head: () => ({
    meta: [
      { title: "API Documentation — QRIS | Angger Aji Prayogo" },
      {
        name: "description",
        content:
          "Dokumentasi API QRIS Angger Aji Prayogo — endpoint, request & response untuk integrasi QRIS dinamis.",
      },
    ],
  }),
  component: ApiDocsPage,
});

/* ---------- helpers ---------- */

const btnBase =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

function Mark() {
  return (
    <span className="grid h-7 w-7 shrink-0 select-none place-items-center rounded-full bg-ink text-[11px] font-black text-ink-foreground">
      A
    </span>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/20 bg-ink text-ink-foreground">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider opacity-70">
          <Terminal className="h-3.5 w-3.5" />
          {title}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`${btnBase} rounded-lg px-2.5 py-1 text-[11px] font-medium text-white/80 hover:bg-white/10 hover:text-white`}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Tersalin!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Salin
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink/20 bg-card p-5 sm:p-6">
      <h3 className="flex items-center gap-2 text-base font-bold tracking-tight">
        <span className="grid h-8 w-8 select-none place-items-center rounded-xl bg-primary text-primary-foreground">
          {icon}
        </span>
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function Table({ rows }: { rows: { field: string; type: string; desc: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/15">
      <table className="w-full min-w-[520px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-ink/15 bg-muted/50 text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="px-3 py-2 font-semibold">Field</th>
            <th className="px-3 py-2 font-semibold">Tipe</th>
            <th className="px-3 py-2 font-semibold">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.field} className="border-b border-ink/10 last:border-0">
              <td className="px-3 py-2.5 font-mono text-[12px] font-semibold text-primary">
                {r.field}
              </td>
              <td className="px-3 py-2.5 font-mono text-[12px] text-muted-foreground">
                {r.type}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApiBadge({ method }: { method: "POST" }) {
  return (
    <span className="rounded-lg bg-primary px-2.5 py-1 font-mono text-[11px] font-bold text-primary-foreground">
      {method}
    </span>
  );
}

/* ---------- page ---------- */

function ApiDocsPage() {
  const qrisConfigured = Boolean(
    QRIS_CONFIG.qrisStatis && !QRIS_CONFIG.qrisStatis.startsWith("000201010211..."),
  );

  const exampleRequest = `POST ${QRIS_CONFIG.apiUrl}
Content-Type: application/json

{
  "qris_statis": "${qrisConfigured ? QRIS_CONFIG.qrisStatis : "000201010211...6304163E"}",
  "amount": "50000"
}`;

  const exampleResponse = `{
  "status": "success",
  "message": "QRIS berhasil",
  "qris_string": "00020101...<CRC16>"
}`;

  const exampleCurl = `curl -X POST ${QRIS_CONFIG.apiUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "qris_statis": "${qrisConfigured ? QRIS_CONFIG.qrisStatis : "000201010211...6304163E"}",
    "amount": "50000"
  }'`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-ink/15 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate text-base font-bold tracking-tight sm:text-lg">
              Angger Aji P.
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] font-medium text-muted-foreground md:inline">
              API Documentation
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-10 sm:px-8 sm:pt-14">
        <Link
          to="/"
          className={`${btnBase} text-[13px] font-semibold text-muted-foreground hover:text-ink`}
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Portofolio
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="select-none text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            API Reference
          </span>
          <ApiBadge method="POST" />
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          QRIS Dynamic API
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Generate QRIS dinamis dari kode QRIS statis dengan nominal yang bisa diatur.
          Cocok untuk donasi, pembayaran, atau top-up. Endpoint melayani request JSON
          dan mengembalikan QRIS string siap scan.
        </p>

        {/* Status konfigurasi */}
        <div
          className={`mt-6 flex flex-wrap items-center gap-2 rounded-2xl border px-4 py-3 text-[13px] ${
            qrisConfigured
              ? "border-green-600/30 bg-green-600/5 text-green-700"
              : "border-amber-600/30 bg-amber-600/5 text-amber-700"
          }`}
        >
          {qrisConfigured ? (
            <>
              <Server className="h-4 w-4" />
              Konfigurasi QRIS aktif — endpoint siap dipakai.
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span>
                QRIS statis belum dikonfigurasi. Buka{" "}
                <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[12px]">
                  src/lib/qris-config.ts
                </code>{" "}
                dan ganti <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[12px]">QRIS_STATIC</code>.
              </span>
            </>
          )}
        </div>
      </section>

      {/* Endpoint */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Endpoint</h2>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-ink/20 bg-card px-4 py-3.5">
                <ApiBadge method="POST" />
                <code className="break-all font-mono text-[13px] text-muted-foreground">
                  {QRIS_CONFIG.apiUrl}
                </code>
              </div>
            </div>

            <SectionCard icon={<Braces className="h-4 w-4" />} title="Request Body (JSON)">
              <Table
                rows={[
                  {
                    field: "qris_statis",
                    type: "string",
                    desc: "Kode QRIS statis kamu (awalan 000201010211...).",
                  },
                  {
                    field: "amount",
                    type: "string",
                    desc: "Nominal pembayaran dalam Rupiah, contoh \"50000\".",
                  },
                ]}
              />
            </SectionCard>

            <SectionCard icon={<Braces className="h-4 w-4" />} title="Success Response">
              <Table
                rows={[
                  {
                    field: "status",
                    type: "string",
                    desc: "Selalu \"success\" saat berhasil.",
                  },
                  {
                    field: "message",
                    type: "string",
                    desc: "Pesan keterangan, contoh \"QRIS berhasil\".",
                  },
                  {
                    field: "qris_string",
                    type: "string",
                    desc: "QRIS dinamis siap scan / ditampilkan sebagai QR code.",
                  },
                ]}
              />
            </SectionCard>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Contoh Penggunaan</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Kirim QRIS statis + nominal, dapatkan QRIS dinamis yang sudah dihitung
                CRC16-nya.
              </p>
            </div>

            <div className="space-y-4">
              <CodeBlock title="request" code={exampleRequest} />
              <CodeBlock title="response" code={exampleResponse} />
              <CodeBlock title="curl" code={exampleCurl} />
            </div>
          </div>
        </div>

        {/* Integrasi sederhana */}
        <div className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">Contoh Integrasi</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Panggil endpoint dari JavaScript client — cukup satu kali fetch:
          </p>
          <div className="mt-4">
            <CodeBlock
              title="javascript"
              code={`const res = await fetch("${QRIS_CONFIG.apiUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    qris_statis: "${qrisConfigured ? QRIS_CONFIG.qrisStatis : "000201010211...6304163E"}",
    amount: "50000"
  })
});

const data = await res.json();
// data.qris_string -> render jadi QR code
console.log(data.qris_string);`}
            />
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] text-muted-foreground">
          Butuh bantuan integrasi atau endpoint lain? Hubungi via kontak di halaman utama.
        </p>
      </section>

      <footer className="border-t border-ink/15 bg-background/80 backdrop-blur">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-6 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate text-sm font-medium">Angger Aji Prayogo — 2026</span>
          </div>
          <Link
            to="/"
            className={`${btnBase} hidden items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-ink sm:inline-flex`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portofolio
          </Link>
        </div>
      </footer>
    </main>
  );
}