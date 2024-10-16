import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 bg-[url('/stars-background.jpg')] bg-cover bg-center">
      <Card className="w-full max-w-md bg-gray-900 border-yellow-400 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-yellow-400" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.7)' }}>
            {isLogin ? 'Join the Rebellion' : 'Enlist in the Empire'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLogin ? (
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-2 px-4 m-0 rounded-full transition-colors',
                    formFieldInput: 'bg-gray-800 text-white border-gray-700 rounded-md',
                    formFieldLabel: 'text-blue-800',
                    footerActionLink: 'text-blue-400 hover:text-blue-500',
                  },
                }}
              />
            ) : (
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-full transition-colors',
                    formFieldInput: 'bg-gray-800 text-white border-gray-700 rounded-md',
                    formFieldLabel: 'text-blue-800',
                    footerActionLink: 'text-red-400 hover:text-red-500',
                  },
                }}
              />
            )}
            <div className="text-center mt-4">
              <Button
                onClick={() => setIsLogin(!isLogin)}
                variant="link"
                className="text-blue-400 hover:text-blue-500"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}