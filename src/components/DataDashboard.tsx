import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Item {
  [key: string]: any
}

interface DataDashboardProps {
  category: string
}

export default function DataDashboard({ category }: DataDashboardProps) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/${category}/`)
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        setItems(data.results)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchItems()
    setSortBy('name')
  }, [category])

  const getDisplayFields = (item: Item) => {
    switch (category) {
      case 'people':
        return [
          { label: 'Height', value: item.height },
          { label: 'Mass', value: item.mass },
          { label: 'Birth Year', value: item.birth_year },
        ]
      case 'films':
        return [
          { label: 'Director', value: item.director },
          { label: 'Producer', value: item.producer },
          { label: 'Release Date', value: item.release_date },
        ]
      case 'starships':
      case 'vehicles':
        return [
          { label: 'Model', value: item.model },
          { label: 'Manufacturer', value: item.manufacturer },
          { label: 'Class', value: item.starship_class || item.vehicle_class },
        ]
      case 'species':
        return [
          { label: 'Classification', value: item.classification },
          { label: 'Designation', value: item.designation },
          { label: 'Language', value: item.language },
        ]
      case 'planets':
        return [
          { label: 'Climate', value: item.climate },
          { label: 'Terrain', value: item.terrain },
          { label: 'Population', value: item.population },
        ]
      default:
        return []
    }
  }

  const getSortOptions = () => {
    const options = [{ value: 'name', label: 'Name' }]
    if (items.length > 0) {
      const fields = getDisplayFields(items[0])
      fields.forEach(field => {
        options.push({ value: field.label.toLowerCase(), label: field.label })
      })
    }
    return options
  }

  const sortedItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortBy] || ''
      const bValue = b[sortBy] || ''
      return aValue.localeCompare(bValue)
    })

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
    </div>
  )
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">
        {`${category.charAt(0).toUpperCase() + category.slice(1)} Dashboard`}
      </h1>

      <div className="mb-6 flex space-x-4">
        <Input
          placeholder={`Search by name`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 bg-gray-800 text-white border-gray-700"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-1/4 bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {getSortOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item) => (
          <Card key={item.name} className="bg-gray-800 text-white border-gray-700 hover:border-yellow-400 transition-colors">
            <CardHeader className="bg-gray-700 rounded-t-lg">
              <CardTitle className="text-yellow-400">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {getDisplayFields(item).map((field, index) => (
                <p key={index} className="mb-2 flex justify-between">
                  <span className="font-semibold text-gray-400">{field.label}:</span>
                  <span>{field.value || 'N/A'}</span>
                </p>
              ))}
              {category === 'films' && (
                <Badge variant="secondary" className="mt-2 bg-yellow-400 text-gray-900">
                  {`Episode ${item.episode_id}`}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}