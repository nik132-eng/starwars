import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    planet: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Transmission sent successfully!')
        setFormData({ name: '', planet: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send transmission')
      }
    } catch (error) {
      console.error('Error sending transmission:', error)
      toast.error('Failed to send transmission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{backgroundImage: 'url(/stars-background.jpg)', backgroundSize: 'cover'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto relative z-10"
      >
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
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 focus:ring-yellow-400" 
                />
              </div>
              <div>
                <label htmlFor="planet" className="block text-sm font-medium text-yellow-400 mb-1">Planet</label>
                <Input 
                  id="planet" 
                  name="planet" 
                  value={formData.planet}
                  onChange={handleChange}
                  required 
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 focus:ring-yellow-400" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-yellow-400 mb-1">Hologram Address</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 focus:ring-yellow-400" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-yellow-400 mb-1">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 focus:ring-yellow-400" 
                  rows={4} 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Transmission...' : 'Send Transmission'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}