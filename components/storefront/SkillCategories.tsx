"use client";

import React from "react";
import Link from "next/link";
import {
  Hand,
  Compass,
  Box,
  Volume2,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  queryParam: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  borderHover: string;
}

const skills: SkillItem[] = [
  {
    id: "skill-1",
    name: "Fine Motor Skills",
    queryParam: "Fine Motor Skills",
    tagline: "Pincer grasp & finger coordination",
    description: "Refining precision grip, wrist flexion, and bilateral coordination through tactile stacking, peg placing, and sorting.",
    icon: Hand,
    iconBg: "bg-toy-coral-100",
    iconColor: "text-toy-coral-600",
    badgeColor: "bg-toy-coral-50 text-toy-coral-700 border-toy-coral-200",
    borderHover: "hover:border-toy-coral-400",
  },
  {
    id: "skill-2",
    name: "STEM & Logic",
    queryParam: "STEM & Logic",
    tagline: "Physics, cause & effect, sequences",
    description: "Investigating mechanical motion, gravity raceways, kinetic momentum, and early counting patterns.",
    icon: Compass,
    iconBg: "bg-toy-teal-100",
    iconColor: "text-toy-teal-600",
    badgeColor: "bg-toy-teal-50 text-toy-teal-700 border-toy-teal-200",
    borderHover: "hover:border-toy-teal-400",
  },
  {
    id: "skill-3",
    name: "Spatial Reasoning",
    queryParam: "Spatial Reasoning",
    tagline: "3D geometry & architectural balance",
    description: "Understanding volume, balance points, symmetry, and architectural equilibrium with precision wooden solids.",
    icon: Box,
    iconBg: "bg-toy-green-100",
    iconColor: "text-toy-green-600",
    badgeColor: "bg-toy-green-50 text-toy-green-700 border-toy-green-200",
    borderHover: "hover:border-toy-green-400",
  },
  {
    id: "skill-4",
    name: "Sensory Play",
    queryParam: "Sensory Play",
    tagline: "Acoustic discernments & timber touch",
    description: "Organic tactile stimulation, soothing wooden acoustic resonances, and natural oil scents that calm the nervous system.",
    icon: Volume2,
    iconBg: "bg-toy-yellow-100",
    iconColor: "text-toy-yellow-600",
    badgeColor: "bg-toy-yellow-50 text-toy-yellow-700 border-toy-yellow-200",
    borderHover: "hover:border-toy-yellow-400",
  },
  {
    id: "skill-5",
    name: "Creative Expression",
    queryParam: "Creative Expression",
    tagline: "Open-ended world building & storytelling",
    description: "Toys with zero instructions or pre-determined outcomes, giving free rein to imaginative narratives and sculpting.",
    icon: Palette,
    iconBg: "bg-toy-walnut-100",
    iconColor: "text-toy-walnut-600",
    badgeColor: "bg-wood-100 text-toy-walnut-700 border-wood-300",
    borderHover: "hover:border-wood-400",
  },
];

export const SkillCategories: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 border border-wood-200 text-forest-900 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-toy-teal-500" />
              <span>Cognitive & Physical Growth</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
              Shop by Developmental Skill
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-toy-teal-700 hover:text-toy-teal-900 underline underline-offset-4"
          >
            <span>View All Skill-Building Toys</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <Link
                key={skill.id}
                href={`/shop?skill=${encodeURIComponent(skill.queryParam)}`}
                className={`group p-7 rounded-4xl bg-cream-50/60 border-2 border-wood-200/80 ${skill.borderHover} hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${skill.iconBg} ${skill.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border ${skill.badgeColor}`}
                    >
                      {skill.tagline}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-wood-600 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-wood-200/60 flex items-center justify-between text-xs font-bold text-forest-800">
                  <span>Browse {skill.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* Pedagogy Alignment Card with colorful border */}
          <div className="p-7 rounded-4xl bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 text-cream-50 flex flex-col justify-between shadow-warm border-2 border-forest-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-toy-yellow-300 text-[11px] font-bold mb-3 border border-forest-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pedagogy Framework</span>
              </div>
              <h3 className="font-serif text-2xl font-bold leading-snug">
                Montessori & Waldorf Aligned
              </h3>
              <p className="text-xs text-wood-200 mt-3 leading-relaxed">
                Rather than toys that flash, talk, and entertain passively, every Funloof design serves as a deliberate &ldquo;learning apparatus&rdquo; that empowers self-directed mastery.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-forest-800">
              <Link
                href="/journal/why-wooden-toys-beat-flashing-screens"
                className="inline-flex items-center gap-2 text-xs font-bold text-toy-yellow-300 hover:text-white underline underline-offset-4"
              >
                Read our Educational Philosophy &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
