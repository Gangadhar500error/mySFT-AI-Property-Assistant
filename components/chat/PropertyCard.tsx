"use client";

import Image from "next/image";
import type { PropertyRecommendation } from "@/types";
import { Button } from "@/components/ui/Button";

interface PropertyCardProps {
  property: PropertyRecommendation;
  onBookSiteVisit?: (project: { projectId: string; projectName: string }) => void;
}

export function PropertyCard({ property, onBookSiteVisit }: PropertyCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-36 w-full overflow-hidden bg-gray-100">
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute top-3 right-3 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {property.matchScore}% Match
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h4 className="font-semibold text-gray-900">{property.name}</h4>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{property.configuration}</span>
          <span className="font-semibold text-gray-900">{property.price}</span>
        </div>

        <p className="text-xs text-gray-500">{property.availability}</p>

        <div className="flex flex-wrap gap-1.5">
          {property.reasons.map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
            >
              <span className="text-emerald-600">✔</span> {reason}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button variant="primary" size="sm" className="flex-1 text-xs">
            View Project
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() =>
              onBookSiteVisit?.({
                projectId: property.id,
                projectName: property.name,
              })
            }
          >
            Book Site Visit
          </Button>
          <Button variant="ghost" size="sm" className="px-2 text-xs">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
