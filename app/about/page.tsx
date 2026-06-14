export default function AboutPage() {
 const axioms = [
   {
     number: "01",
     title: "Clarity",
     description:
       " We transform complex stories into concise, readable briefings that highlight the key facts, context, and developments without overwhelming readers with unnecessary detail.",
   },
   {
     number: "02",
     title: "Trust",
     description:
       "Every claim made by Sandesa is backed by traceable, immutable data sources and verification logs.",
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
           


           <h1
             className="mb-8 text-7xl leading-none"
             style={{ fontFamily: "Georgia, serif" }}
           >
             About Sandesa
           </h1>


           <p className="max-w-xl text-lg leading-9 text-neutral-700">
            Sandesa is an AI-powered news platform that brings you the news you care about. Instead of browsing multiple websites, you can choose your favorite topics and receive concise, reliable summaries from trusted sources. By personalizing content based on individual interests, the platform helps readers stay informed quickly and efficiently, making it easier to keep up with important news without information overload.
           </p>


           <div className="mt-12 flex gap-12">
             <div className="border-l border-neutral-400 pl-4">
             </div>
             <div className="border-l border-neutral-400 pl-4"> 
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
           <h2
             className="mb-8 text-5xl"
             style={{ fontFamily: "Georgia, serif" }}
           >
             Why We Exist
           </h2>


           <div className="space-y-6 text-neutral-700">
             <p className="leading-8">
               The modern news landscape is fragmented. Important stories are scattered across websites, social platforms, newsletters, and feeds competing for attention.
               Sandesa was created to bring those signals together, filter out unnecessary noise, and deliver the information that truly matters.
             </p>


             
           </div>
         </div>


         {/* About Image */}
<div className="flex items-center justify-center p-10">
  <div className="w-full overflow-hidden border border-neutral-300">
    <img
      src="/IMG_2539.webp"
      alt="Sandesa"
      className="w-full h-auto"
    />
  </div>
</div>
       </div>
     </section>


     {/* CORE AXIOMS */}
     <section className="px-10 py-20">
       <div className="mx-auto max-w-7xl">
         <div className="mb-12 flex items-center justify-between">
           <div>
             


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
             To make quality information accessible through intelligent summarization, helping people understand important events faster and make better-informed decisions every day.
           </p>


           
         </div>


         <div className="bg-black p-16 text-white">
           <h2
             className="mb-8 text-7xl"
             style={{ fontFamily: "Georgia, serif" }}
           >
             The Vision
           </h2>


           <p className="max-w-lg text-lg leading-9 text-neutral-300">
             We envision a world where knowledge is organized, accessible, unbiased, and available to everyone regardless of time, background, or expertise.
           </p>
         </div>
       </div>
     </section>
   </main>
 );
}
