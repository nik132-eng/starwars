import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

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
          { label: 'Hyperdrive Rating', value: item.hyperdrive_rating },
          { label: 'MGLT', value: item.MGLT },
          { label: 'Starship Class', value: item.starship_class },
          { label: 'Vehicle Class', value: item.vehicle_class },
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
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-3xl max-h-[80vh]">
        <DialogHeader className='border-b border-yellow-400 pb-4 mb-4'>
          <DialogTitle className="text-2xl font-bold text-yellow-400">
            {item.name || item.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          {getDetailFields().map((field, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-yellow-400">{field.label}</h3>
              <p className="text-gray-300">{field.value || 'N/A'}</p>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}