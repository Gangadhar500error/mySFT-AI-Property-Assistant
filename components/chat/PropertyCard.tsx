"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { PropertyRecommendation } from "@/types";

interface PropertyCardProps {
  property: PropertyRecommendation;
  index?: number;
  onBookSiteVisit?: (project: { projectId: string; projectName: string }) => void;
}

export function PropertyCard({ property, index = 0, onBookSiteVisit }: PropertyCardProps) {
  const highlights = property.reasons.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft"
      style={{ maxHeight: 280 }}
    >
      <div className="flex h-[280px] flex-col">
        <div className="relative h-[110px] shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={property.imageUrl}
            alt={property.name}
            fill
            className="object-cover"
            sizes="400px"
          />
          <span className="absolute top-2 right-2 rounded-full bg-white/95 px-2 py-0.5 text-[12px] font-semibold text-emerald-700 shadow-sm">
            {property.matchScore}% Match
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            <h4 className="text-[14px] font-semibold text-gray-900">{property.name}</h4>
            <p className="text-[13px] text-gray-500">{property.location}</p>
            <p className="mt-1 text-[14px] font-semibold text-gray-900">{property.price}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {highlights.map((r) => (
                <span
                  key={r}
                  className="rounded-full bg-gray-50 px-2 py-0.5 text-[12px] text-gray-600"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 flex gap-1.5">
            <button className="flex-1 rounded-lg bg-gray-900 py-1.5 text-[12px] font-medium text-white hover:bg-gray-800">
              View Project
            </button>
            <button
              onClick={() =>
                onBookSiteVisit?.({
                  projectId: property.id,
                  projectName: property.name,
                })
              }
              className="flex-1 rounded-lg border border-gray-200 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-50"
            >
              Book Visit
            </button>
            <button className="rounded-lg border border-gray-200 px-2 py-1.5 text-[12px] text-gray-500 hover:bg-gray-50">
              Compare
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
