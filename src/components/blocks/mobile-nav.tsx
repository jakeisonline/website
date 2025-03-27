"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { setMobileMenu, useMobileMenu } from "@/stores/mobile-menu"
import { MenuIcon } from "lucide-react"
import { Logo } from "@/components/blocks/logo"
import { useEffect } from "react"
export function MobileNav({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const isOpen = useMobileMenu()

  // Close the mobile menu when Astro fires a navigation event
  useEffect(() => {
    document.addEventListener("astro:before-preparation", function () {
      setMobileMenu(false)
    })
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setMobileMenu}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-6 hover:bg-transparent lg:hidden", className)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-4" side="left">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Menu used for navigation on mobile.
        </SheetDescription>
        <Logo />
        {children}
      </SheetContent>
    </Sheet>
  )
}
