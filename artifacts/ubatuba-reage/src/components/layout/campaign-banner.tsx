import React from "react";
import Link from "next/link";
import { ChevronRight } from "@/components/icons";
import {
  CAMPAIGN_BANNER_ENABLED,
  CAMPAIGN_BANNER_TEXT,
  CAMPAIGN_BANNER_CTA,
  CAMPAIGN_BANNER_HREF,
} from "@/lib/site-config";

export function CampaignBanner() {
  if (!CAMPAIGN_BANNER_ENABLED) return null;

  return (
    <div className="w-full bg-[#FF4444] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.2) 20px, rgba(255,255,255,0.2) 21px)",
        }}
      />
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 px-4 md:px-8 py-3 text-center">
        <p className="text-white text-xs md:text-sm font-black uppercase tracking-[0.1em] font-mono">
          {CAMPAIGN_BANNER_TEXT}
        </p>
        <Link
          href={CAMPAIGN_BANNER_HREF}
          className="flex items-center gap-1 bg-white text-[#FF4444] hover:bg-gray-100 transition-colors px-5 py-1.5 text-[11px] font-black uppercase tracking-[0.15em] font-mono whitespace-nowrap flex-shrink-0"
        >
          {CAMPAIGN_BANNER_CTA}
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
