export default function Features() {
  return (
    <section className="py-20 bg-transparent text-white px-6">
      <h2 className="text-4xl text-center font-bold mb-12">
        Why Blockchain Voting?
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        <FeatureCard 
          title="Immutable Records"
          desc="Votes are permanently recorded and cannot be altered."
        />

        <FeatureCard 
          title="Full Transparency"
          desc="Every transaction is publicly verifiable."
        />

        <FeatureCard 
          title="Military-Grade Security"
          desc="SHA-256 hashing ensures vote integrity."
        />

        <FeatureCard 
          title="Multi-Factor Authentication"
          desc="OTP + ID + Biometric verification."
        />
      </div>
    </section>
  );
}

function FeatureCard({title, desc}) {
  return (
    <div className="bg-transparent p-8 rounded-2xl border border-cyan-900 hover:scale-105 transition">
      <h3 className="text-xl text-cyan-400 font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
