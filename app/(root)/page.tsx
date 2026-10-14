import Link from "next/link"
import { Wordmark } from "@/components/brand/logo"
import { Stripe } from "@/components/brand/stripe"

// "/" opens English unless the visitor has chosen Chinese before.
const script = `try{var l=localStorage.getItem('rfs-lang')==='zh'?'zh':'en';location.replace('/'+l+'/'+location.hash)}catch(e){location.replace('/en/')}`

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ display: "grid", gap: 28, justifyItems: "start" }}>
          <Wordmark className="h-auto w-[min(320px,70vw)] text-white" />
          <span style={{ ["--mx-data" as string]: "#0062FF", ["--mx-parity" as string]: "#FF5E14" }}>
            <Stripe />
          </span>
          <nav style={{ display: "flex", gap: 8 }} aria-label="Language">
            <Link href="/en/" style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,.3)", padding: "8px 14px", textDecoration: "none", fontSize: 14 }}>English</Link>
            <Link href="/zh/" style={{ color: "#FFFFFF", border: "1px solid rgba(255,255,255,.3)", padding: "8px 14px", textDecoration: "none", fontSize: 14 }}>中文</Link>
          </nav>
        </div>
      </main>
    </>
  )
}
