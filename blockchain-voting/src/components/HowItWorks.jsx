import { ShieldCheck, Vote, Link, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Secure Authentication",
      description:
        "Voters verify their identity before accessing the voting system, ensuring only eligible participants can vote.",
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Cast Your Vote",
      description:
        "Users select their preferred candidate and submit their vote securely through encrypted channels.",
      icon: <Vote size={22} />
    },
    {
      title: "Blockchain Recording",
      description:
        "Each vote is immutably stored as a block, cryptographically linked to maintain transparency and integrity.",
      icon: <Link size={22} />
    },
    {
      title: "Instant Verification",
      description:
        "Voters can verify their transaction using a unique blockchain transaction ID.",
      icon: <CheckCircle size={22} />
    }
  ];

  return (
    <section className="relative py-24 px-6">

      {/* Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A transparent and secure voting lifecycle powered by blockchain technology.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">

        {/* Vertical Line */}
        <div className="absolute left-6 top-0 h-full w-[2px]
        bg-gradient-to-b from-cyan-500 via-blue-600 to-purple-600 opacity-40" />

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex items-start gap-8 group"
            >

              {/* Circle Node */}
              <div className="relative z-10 flex items-center justify-center
              w-12 h-12 rounded-full
              bg-[#0b1220] border border-cyan-500
              text-cyan-400
              group-hover:scale-110
              transition-all duration-300
              shadow-lg shadow-cyan-500/30">

                {step.icon}

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full
                bg-cyan-500 blur-xl opacity-0
                group-hover:opacity-40 transition" />
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-[#0b1220]/80
              backdrop-blur-md border border-cyan-800
              rounded-2xl p-6
              hover:scale-[1.02]
              transition-all duration-300">

                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}