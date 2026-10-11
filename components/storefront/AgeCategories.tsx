"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";

interface AgeTier {
  id: string;
  age: string;
  label: string;
  description: string;
  image: string;
  queryParam: string;
  badgeBg: string;
  borderColor: string;
  accentDot: string;
  fomoTag: string;
}

const ageTiers: AgeTier[] = [
  {
    id: "age-1",
    age: "0 – 12 Months",
    label: "The 'Everything Goes In The Mouth' Phase",
    description: "Naturally antibacterial Indian Neem rattles and teething cylinders. Safe to chew, gentle to grasp, and won't freak you out when baby drools on it.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
    queryParam: "0-12m",
    badgeBg: "bg-toy-yellow-500 text-white",
    borderColor: "border-toy-yellow-200 hover:border-toy-yellow-400",
    accentDot: "bg-toy-yellow-500",
    fomoTag: "Only 12 sets left",
  },
  {
    id: "age-2",
    age: "1 – 3 Years",
    label: "The 'Watch Me Build & Smash' Phase",
    description: "Chunky stacking rings and balance rockers built to survive epic toddler earthquakes on hard marble or tiled living room floors.",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
    queryParam: "1-3y",
    badgeBg: "bg-toy-coral-500 text-white",
    borderColor: "border-toy-coral-200 hover:border-toy-coral-400",
    accentDot: "bg-toy-coral-500",
    fomoTag: "Top Toddler Pick",
  },
  {
    id: "age-3",
    age: "3 – 5 Years",
    label: "The 'Architect Taking Over The Rug' Phase",
    description: "Proportional architectural blocks and clay sculpting tools. They'll build forts and bridges while you finally enjoy a hot cup of chai in peace.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    queryParam: "3-5y",
    badgeBg: "bg-toy-green-500 text-white",
    borderColor: "border-toy-green-200 hover:border-toy-green-400",
    accentDot: "bg-toy-green-500",
    fomoTag: "Restock in 4 wks",
  },
  {
    id: "age-4",
    age: "5+ Years",
    label: "The 'Screen-Free Brain Gymnastics' Phase",
    description: "Modular wooden gravity raceways and mathematical pegboards so captivating, even parents end up testing track runs past midnight.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    queryParam: "5y+",
    badgeBg: "bg-toy-teal-500 text-white",
    borderColor: "border-toy-teal-200 hover:border-toy-teal-400",
    accentDot: "bg-toy-teal-500",
    fomoTag: "Batch 90% Claimed",
  },
];

export const AgeCategories: React.FC = () => {
  return (
    <section id="ages" className="py-20 bg-cream-50/70 border-t border-wood-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-wood-300 text-forest-900 text-xs font-bold mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-toy-coral-500" />
            <span>Honest Stages Every Parent Knows</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
            Shop by Child Milestone (6m – 6y)
          </h2>
          <p className="text-sm text-wood-700 mt-3">
            Because a 14-month-old needs different challenges than a 4-year-old. Pick the stage they are conquering right now before this month&apos;s batch closes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageTiers.map((tier) => (
            <Link
              key={tier.id}
              href={`/shop?age=${tier.queryParam}`}
              className={`group bg-white rounded-4xl overflow-hidden border-2 ${tier.borderColor} shadow-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col hover:-translate-y-1`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-wood-100">
                <Image
                  src={tier.image}
                  alt={tier.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 ${tier.badgeBg} px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
                  {tier.age}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-forest-950/80 backdrop-blur-md text-toy-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-toy-coral-400" />
                  <span>{tier.fomoTag}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${tier.accentDot}`} />
                    <h3 className="font-serif text-base sm:text-lg font-bold text-forest-900 group-hover:text-forest-600 transition-colors leading-snug">
                      {tier.label}
                    </h3>
                  </div>
                  <p className="text-xs text-wood-600 mt-2 line-clamp-3 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-wood-100 flex items-center justify-between text-xs font-bold text-forest-800">
                  <span>Explore Toys for {tier.age}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
