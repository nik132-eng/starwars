import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import DataDashboard from '../components/DataDashboard'
import useStore from '../store/authStore';


export default function Dashboard() {
  // const [selectedCategory, setSelectedCategory] = useState<string>('vehicles')
  const selectedCategory = useStore((state) => state.selectedCategory)
  const setSelectedCategory = useStore((state) => state.setSelectedCategory)

  const categories = ['people', 'films', 'starships', 'vehicles', 'species', 'planets']

  return (
    <div className="min-h-screen bg-black text-white" style={{backgroundImage: 'url(/stars-background.jpg)', backgroundSize: 'cover'}}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400" style={{textShadow: '0 0 10px rgba(255,255,0,0.5)'}}>
          Star Wars Data Explorer
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        <DataDashboard category={selectedCategory} />
      </div>
    </div>
  )
}