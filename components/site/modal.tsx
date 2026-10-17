"use client"

import { useId, useRef, type ReactNode } from "react"
import { Dialog } from "radix-ui"
import { cn } from "@/lib/utils"

/** Shared keyboard and focus behaviour for site tools. */
export function Modal({ title, description, onClose, children, className }: { title: string; description?: string; onClose: () => void; children: ReactNode; className?: string }) {
  const returnFocus = useRef<HTMLElement | null>(null)
  const descriptionId = useId()
  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-1000/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-150" />
        <Dialog.Content
          aria-describedby={description ? descriptionId : undefined}
          className={cn("fixed top-1/2 left-1/2 z-50 grid max-h-[90dvh] w-[calc(100%-32px)] max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-6 overflow-y-auto border border-border bg-background p-6 shadow-overlay outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 duration-150", className)}
          onOpenAutoFocus={() => { returnFocus.current = document.activeElement as HTMLElement }}
          onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus.current?.focus({ preventScroll: true }) }}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          {description && <Dialog.Description id={descriptionId} className="sr-only">{description}</Dialog.Description>}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
