import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getImageUrl } from '@/utils/imageUtils'
import { FALLBACK_IMAGES } from '@/utils/fallbackImages'

interface ItemDetailsModalProps {
  item: any
  isOpen: boolean
  onClose: () => void
  category: string
}

export function ItemDetailsModal({ item, isOpen, onClose, category }: ItemDetailsModalProps) {
  if (!item) return null

  const getDetailFields = () => {
    switch (category) {
      case 'people':
        return [
          { label: 'Height', value: item.height },
          { label: 'Mass', value: item.mass },
          { label: 'Hair Color', value: item.hair_color },
          { label: 'Skin Color', value: item.skin_color },
          { label: 'Eye Color', value: item.eye_color },
          { label: 'Birth Year', value: item.birth_year },
          { label: 'Gender', value: item.gender },
        ]
      case 'films':
        return [
          { label: 'Episode', value: item.episode_id },
          { label: 'Director', value: item.director },
          { label: 'Producer', value: item.producer },
          { label: 'Release Date', value: item.release_date },
          { label: 'Opening Crawl', value: item.opening_crawl },
        ]
      case 'starships':
      case 'vehicles':
        return [
          { label: 'Model', value: item.model },
          { label: 'Manufacturer', value: item.manufacturer },
          { label: 'Cost in Credits', value: item.cost_in_credits },
          { label: 'Length', value: item.length },
          { label: 'Max Atmosphering Speed', value: item.max_atmosphering_speed },
          { label: 'Crew', value: item.crew },
          { label: 'Passengers', value: item.passengers },
          { label: 'Cargo Capacity', value: item.cargo_capacity },
          { label: 'Consumables', value: item.consumables },
        ]
      case 'species':
        return [
          { label: 'Classification', value: item.classification },
          { label: 'Designation', value: item.designation },
          { label: 'Average Height', value: item.average_height },
          { label: 'Skin Colors', value: item.skin_colors },
          { label: 'Hair Colors', value: item.hair_colors },
          { label: 'Eye Colors', value: item.eye_colors },
          { label: 'Average Lifespan', value: item.average_lifespan },
          { label: 'Homeworld', value: item.homeworld },
          { label: 'Language', value: item.language },
        ]
      case 'planets':
        return [
          { label: 'Rotation Period', value: item.rotation_period },
          { label: 'Orbital Period', value: item.orbital_period },
          { label: 'Diameter', value: item.diameter },
          { label: 'Climate', value: item.climate },
          { label: 'Gravity', value: item.gravity },
          { label: 'Terrain', value: item.terrain },
          { label: 'Surface Water', value: item.surface_water },
          { label: 'Population', value: item.population },
        ]
      default:
        return []
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          <div className="flex-1 p-6 overflow-hidden">
            <DialogHeader className='border-b border-yellow-400 pb-4 mb-4'>
              <DialogTitle className="text-3xl font-bold text-yellow-400">
                {item.name || item.title}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[calc(100%-80px)] pr-4 overflow-y-auto flex-1">
              {getDetailFields().map((field, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-yellow-400">{field.label}</h3>
                  <p className="text-gray-300">{field.value || 'N/A'}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900 z-10" />
            <img
              src={getImageUrl(category, item.url)}
              alt={item.name || item.title}
              onError={(e) => {
                e.currentTarget.src =
                  FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default;
              }}
              className="z-0 w-full h-full mb-2 rounded object-cover" 
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}