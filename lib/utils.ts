/**
 * Alias untuk `cn` (merge class Tailwind).
 *
 * File ini sengaja dipertahankan: `components.json` menunjuk ke
 * `@/lib/utils` sebagai alias utilitas, jadi `npx shadcn add` menulis
 * `import { cn } from "@/lib/utils"` pada komponen baru. Hapus file ini
 * tanpa mengganti alias tersebut, dan komponen shadcn berikutnya akan
 * gagal di-resolve.
 */
export { cn } from "cn"
