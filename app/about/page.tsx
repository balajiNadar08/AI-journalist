export default function AboutPage() {
 const axioms = [
   {
     number: "01",
     title: "Clarity",
     description:
       "Complexity is often a shroud for inaccuracy. We strip away the fluff to present the core facts of every story rendered in high-definition precision.",
   },
   {
     number: "02",
     title: "Trust",
     description:
       "Trust is earned through transparency. Every claim made by AI Journalist is backed by traceable, immutable data sources and verification logs.",
   },
   {
     number: "03",
     title: "Speed",
     description:
       "Information loses value over time. Our systems operate at the edge of the network, delivering the briefing before the news cycle even begins.",
   },
 ];

 return (
   <main className="min-h-screen bg-[#f5f4f2] text-black">
     {/* HERO */}
     <section className="border-b border-neutral-300">
       <div className="mx-auto grid max-w-7xl grid-cols-2 gap-20 px-10 py-20">
         {/* Left */}
         <div>
           <div className="mb-8 inline-block border border-neutral-400 px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
             Manifesto v1.0.4
           </div>

           <h1
             className="mb-8 text-7xl leading-none"
             style={{ fontFamily: "Georgia, serif" }}
           >
             About AI Journalist
           </h1>

           <p className="max-w-xl text-lg leading-9 text-neutral-700">
             We are a computational news laboratory dedicated to the pursuit
             of objective truth through algorithmic transparency and rigorous
             data verification. Our platform synthesizes global signals into
             clear, actionable intelligence.
           </p>

           <div className="mt-12 flex gap-12">
             <div className="border-l border-neutral-400 pl-4">
               <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                 Status
               </div>

               <div className="mt-1 text-sm uppercase tracking-wide">
                 Operational
               </div>
             </div>

             <div className="border-l border-neutral-400 pl-4">
               <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                 Signal
               </div>

               <div className="mt-1 text-sm uppercase tracking-wide">
                 Unfiltered
               </div>
             </div>
           </div>
         </div>

         {/* Right Image */}
         <div>
           <div className="relative overflow-hidden border border-neutral-300">
             <img
             src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200"
             alt="Newspaper"
             className="h-[520px] w-full object-cover grayscale"
             />

            
           </div>
         </div>
       </div>
     </section>

     {/* WHY WE EXIST */}
     <section className="border-b border-neutral-300">
       <div className="mx-auto grid max-w-7xl grid-cols-2">
         <div className="border-r border-neutral-300 p-10">
           <div className="mb-8 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
             00 / Genesis
           </div>

           <h2
             className="mb-8 text-5xl"
             style={{ fontFamily: "Georgia, serif" }}
           >
             Why We Exist
           </h2>

           <div className="space-y-6 text-neutral-700">
             <p className="leading-8">
               The modern information landscape is fractured by noise, bias,
               and institutional decay. Traditional journalism often fails to
               keep pace with the velocity of digital change.
             </p>

             <p className="leading-8">
               AI Journalist was founded to bridge this gap. By leveraging
               neural networks and decentralized data verification, we provide
               a definitive record of events that is immune to emotional
               distortion and corporate influence.
             </p>
           </div>
         </div>

         {/* Newspaper ASCII Panel */}
         <div className="flex items-center justify-center p-10">
           <div className="w-full bg-black p-8 font-mono text-xs text-white">
             <pre>{`
AI JOURNALIST // CORE ENGINE

[✓] SIGNAL PROCESSING
[✓] SOURCE VERIFICATION
[✓] FACT EXTRACTION
[✓] BIAS REDUCTION
[✓] REAL-TIME ANALYSIS

STATUS: OPERATIONAL
VERSION: 4.0.2
             `}</pre>
           </div>
         </div>
       </div>
     </section>

     {/* CORE AXIOMS */}
     <section className="px-10 py-20">
       <div className="mx-auto max-w-7xl">
         <div className="mb-12 flex items-center justify-between">
           <div>
             <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
               01 / Principles
             </div>

             <h2
               className="text-5xl"
               style={{ fontFamily: "Georgia, serif" }}
             >
               Core Axioms
             </h2>
           </div>

          
         </div>

         <div className="grid grid-cols-3 border border-neutral-300">
           {axioms.map((axiom) => (
             <div
               key={axiom.number}
               className="border-r border-neutral-300 p-10 last:border-r-0"
             >
               <div className="mb-8 text-3xl text-neutral-400">
                 {axiom.number}
               </div>

               <h3
                 className="mb-6 text-3xl"
                 style={{ fontFamily: "Georgia, serif" }}
               >
                 {axiom.title}
               </h3>

               <p className="leading-8 text-neutral-700">
                 {axiom.description}
               </p>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* MISSION + VISION */}
     <section className="border-t border-neutral-300">
       <div className="mx-auto grid max-w-7xl grid-cols-2">
         <div className="p-16">
           <h2
             className="mb-8 text-7xl"
             style={{ fontFamily: "Georgia, serif" }}
           >
             The Mission
           </h2>

           <p className="max-w-lg text-lg leading-9 text-neutral-700">
             To build the world's first autonomous, ethical newsroom —
             empowering citizens with the unvarnished data they need to
             navigate a complex global reality.
           </p>

           <button className="mt-12 border border-neutral-400 px-8 py-4 text-xs uppercase tracking-[0.3em]">
             Read The White Paper
           </button>
         </div>

         <div className="bg-red-500/90 p-16 text-white">
           <h2
             className="mb-8 text-7xl"
             style={{ fontFamily: "Georgia, serif" }}
           >
             The Vision
           </h2>

           <p className="max-w-lg text-lg leading-9 text-neutral-300">
             A future where information is a public utility: clean,
             unbiased, and universally accessible. We envision a society
             informed by logic and shared reality.
           </p>
         </div>
       </div>
     </section>
   </main>
 );
}