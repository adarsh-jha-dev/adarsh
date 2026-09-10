import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center px-6">
      <div className="max-w-md text-center">
        <span className="eyebrow">404</span>
        <h1 className="display mt-4 text-5xl md:text-6xl">
          Nothing here.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          Either it moved, it never existed, or the URL picked up a typo on the
          way over.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft />
            Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
