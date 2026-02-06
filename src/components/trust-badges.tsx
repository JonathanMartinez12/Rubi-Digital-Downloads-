import { Lock, Zap, ShieldCheck, Users } from "lucide-react";

const badges = [
  { icon: Lock, label: "Secure Payments" },
  { icon: Zap, label: "Instant Delivery" },
  { icon: ShieldCheck, label: "30-Day Guarantee" },
  { icon: Users, label: "2,000+ Happy Customers" },
];

export function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 text-gray-500"
            >
              <badge.icon className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
