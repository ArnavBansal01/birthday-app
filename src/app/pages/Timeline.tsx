import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, MapPin, Heart } from "lucide-react";

const MOMENTS = [
  {
    id: 1,
    title: "The Beginning",
    date: "May 2022",
    description: "The day our story started. Just two bears in a coffee shop.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzc1MzYwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "bg-pink-100",
  },
  {
    id: 2,
    title: "First Adventure",
    date: "August 2023",
    description: "That unforgettable trip to the mountains. Cold paws, warm hearts.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBjb3VwbGV8ZW58MXx8fHwxNzc1MzYwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "bg-purple-100",
  },
  {
    id: 3,
    title: "A Big Step",
    date: "December 2024",
    description: "Moving in together. Building our own little cozy den.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBrZXlzfGVufDF8fHx8MTc3NTM2MDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "bg-indigo-100",
  },
  {
    id: 4,
    title: "Today",
    date: "February 25, 2026",
    description: "Celebrating you, the most amazing person in the world.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5fGVufDF8fHx8MTc3NTM2MDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "bg-rose-100",
  },
];

export function Timeline() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-24 px-4 pt-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 font-serif mb-2">Our Journey</h2>
        <p className="text-gray-500">Every moment with you is a treasure</p>
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-200 via-purple-200 to-transparent rounded-full" />

        <div className="space-y-16 py-8">
          {MOMENTS.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center justify-between ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Content Side */}
              <div className="w-5/12"></div>
              
              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedId(moment.id)}
                  className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center ${moment.color} text-pink-500 transition-colors hover:bg-pink-500 hover:text-white group`}
                >
                  <Heart size={20} className={`fill-current group-hover:fill-white transition-colors`} />
                </motion.button>
              </div>

              {/* Card Side */}
              <div className={`w-5/12 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                <motion.div
                   whileHover={{ y: -5 }}
                   className="cursor-pointer"
                   onClick={() => setSelectedId(moment.id)}
                >
                   <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-500 mb-2 shadow-sm border border-white/50">
                     {moment.date}
                   </span>
                   <h3 className="text-xl font-bold text-gray-800 mb-1">{moment.title}</h3>
                   <p className="text-sm text-gray-500 line-clamp-2">{moment.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`} // Actually layoutId isn't connected to the list items here directly, just animating presence
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 p-2 rounded-full text-white z-10 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="h-64 overflow-hidden relative">
                 <img 
                   src={MOMENTS.find(m => m.id === selectedId)?.image} 
                   alt="Memory" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 text-sm font-medium mb-1">
                      <Calendar size={14} />
                      {MOMENTS.find(m => m.id === selectedId)?.date}
                    </div>
                    <h3 className="text-2xl font-bold">{MOMENTS.find(m => m.id === selectedId)?.title}</h3>
                 </div>
              </div>

              <div className="p-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {MOMENTS.find(m => m.id === selectedId)?.description}
                </p>
                
                <div className="mt-8 flex justify-center">
                   <motion.div 
                     animate={{ scale: [1, 1.2, 1] }} 
                     transition={{ repeat: Infinity, duration: 2 }}
                     className="text-pink-400"
                   >
                     <Heart size={32} fill="currentColor" />
                   </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
