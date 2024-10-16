import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: 'url(/stars-background.jpg)', backgroundSize: 'cover'}}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8" style={{textShadow: '0 0 10px rgba(255,215,0,0.7)'}}>
          Contact the Imperial Command
        </h1>
        
        <Card className="bg-gray-900 border-yellow-400 border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-400">Send a Transmission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-yellow-400 mb-1">Name</label>
                <Input id="name" name="name" required className="bg-gray-800 text-white border-gray-700" />
              </div>
              <div>
                <label htmlFor="planet" className="block text-sm font-medium text-yellow-400 mb-1">Planet</label>
                <Input id="planet" name="planet" required className="bg-gray-800 text-white border-gray-700" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-yellow-400 mb-1">Hologram Address</label>
                <Input id="email" name="email" type="email" required className="bg-gray-800 text-white border-gray-700" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-yellow-400 mb-1">Message</label>
                <Textarea id="message" name="message" required className="bg-gray-800 text-white border-gray-700" rows={4} />
              </div>
              <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                Send Transmission
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}