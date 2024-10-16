import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="min-h-screen bg-black text-yellow-400 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: 'url(/stars-background.jpg)', backgroundSize: 'cover'}}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" style={{textShadow: '0 0 10px rgba(255,215,0,0.7)'}}>
          About the Galactic Empire
        </h1>
        
        <Card className="bg-gray-900 border-yellow-400 border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>The Galactic Empire seeks to bring order and stability to the galaxy through unified governance and technological advancement. Our goal is to create a safe and prosperous society for all sentient beings.</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-yellow-400 border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400">Imperial History</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>Founded at the end of the Clone Wars, the Galactic Empire rose from the ashes of the Old Republic. Under the leadership of Emperor Palpatine, we have brought peace and security to countless worlds.</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-yellow-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400">Join the Empire</CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>The Empire offers numerous opportunities for loyal citizens to serve and advance. Whether in the Imperial Navy, Stormtrooper Corps, or various administrative roles, there's a place for you in our grand vision.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}