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
      transition={{ duration: 0.25, delay: 0.08 * index }}
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
      className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-shadow"
    >
      <div className="relative h-32 overflow-hidden bg-gray-100">
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          className="object-cover"
          sizes="380px"
        />
        <span className="absolute top-2 right-2 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 shadow-sm">
          {property.matchScore}% AI Match
        </span>
      </div>

      <div className="space-y-2 p-3">
        <div>
          <h4 className="text-[14px] font-semibold text-gray-900">{property.name}</h4>
          <p className="text-[12px] text-gray-500">{property.location}</p>
        </div>

        <div className="flex items-center justify-between text-[13px]">
          <span className="text-gray-600">{property.configuration}</span>
          <span className="font-semibold text-gray-900">{property.price}</span>
        </div>

        <p className="text-[11px] text-gray-400">{property.availability}</p>

        <div className="flex flex-wrap gap-1">
          {highlights.map((r) => (
            <span
              key={r}
              className="rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-600"
            >
              {r}
            </span>
          ))}
        </div>

        <div className="flex gap-1.5 pt-1">
          <button className="flex-1 rounded-lg bg-blue-600 py-1.5 text-[11px] font-medium text-white hover:bg-blue-700">
            View Project
          </button>
          <button
            onClick={() =>
              onBookSiteVisit?.({
                projectId: property.id,
                projectName: property.name,
              })
            }
            className="flex-1 rounded-lg border border-gray-200 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
          >
            Book Site Visit
          </button>
          <button className="rounded-lg border border-gray-200 px-2 py-1.5 text-[11px] text-gray-500 hover:bg-gray-50">
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}
