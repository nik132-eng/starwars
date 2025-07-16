import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { ItemDetailsModal } from "./ItemDetailsModal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { getImageUrl } from "@/utils/imageUtils";
import { FALLBACK_IMAGES } from "@/utils/fallbackImages";

interface Item {
  [key: string]: any;
}

interface DataDashboardProps {
  category: string;
}

const ITEMS_PER_PAGE = 10;

export default function DataDashboard({ category }: DataDashboardProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCardClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_SWAPI_BASE_URL
          }/${category}?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
          setTotalPages(1);
        } else {
          setItems(Array.isArray(data.results) ? data.results : []);
          setTotalPages(
            data.count ? Math.ceil(data.count / ITEMS_PER_PAGE) : 1
          );
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchItems();
  }, [category, currentPage]);

  useEffect(() => {
    const sortOptions = getSortOptions();

    if (sortOptions.length > 0 && !sortBy) {
      setSortBy(sortOptions[0].value);
    }
  }, [items, sortBy]);

  const getDisplayFields = (item: Item) => {
    return [
      { label: "Image", value: getImageUrl(category, item.url) },
      ...(category === "people"
        ? [
            { label: "Height", value: item.height },
            { label: "Mass", value: item.mass },
            { label: "Birth Year", value: item.birth_year },
          ]
        : category === "films"
        ? [
            { label: "Director", value: item.director },
            { label: "Producer", value: item.producer },
            { label: "Release Date", value: item.release_date },
          ]
        : category === "starships" || category === "vehicles"
        ? [
            { label: "Model", value: item.model },
            { label: "Manufacturer", value: item.manufacturer },
            {
              label: "Class",
              value: item.starship_class || item.vehicle_class,
            },
          ]
        : category === "species"
        ? [
            { label: "Classification", value: item.classification },
            { label: "Designation", value: item.designation },
            { label: "Language", value: item.language },
          ]
        : category === "planets"
        ? [
            { label: "Climate", value: item.climate },
            { label: "Terrain", value: item.terrain },
            { label: "Population", value: item.population },
          ]
        : []),
    ];
  };

  const getSortOptions = () => {
    const options = [{ value: "name", label: "Name" }];
    if (items.length > 0) {
      const fields = getDisplayFields(items[0]);
      fields.forEach((field) => {
        options.push({ value: field.label.toLowerCase(), label: field.label });
      });
    }
    return options;
  };

  const sortedItems = items
    .filter((item) => {
      const itemName = category === "films" ? item.title : item.name;
      return (
        itemName && itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      const aValue = a[sortBy] || "";
      const bValue = b[sortBy] || "";
      return aValue.localeCompare(bValue);
    });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

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
          className="w-full md:w-2/3 bg-gray-800 text-white border-gray-700"
        />

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-2/3 bg-gray-800 text-white border-gray-700">
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
          <CardContainer key={item.name || item.title} className="w-full">
            <CardBody className="bg-gray-800 text-white border-gray-700 hover:border-yellow-400 transition-colors rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-yellow-400"
              >
                {item.name || item.title}
              </CardItem>
              <CardItem
                as="div"
                translateZ="60"
                className="text-neutral-300 text-sm mt-2"
              >
                {getDisplayFields(item).map(
                  (field, index) =>
                    field.label !== "Image" && (
                      <p key={index} className="mb-2 flex justify-between">
                        <span className="font-semibold text-gray-400">
                          {field.label}:
                        </span>
                        <span className="text-right">
                          {field.value || "N/A"}
                        </span>
                      </p>
                    )
                )}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={getImageUrl(category, item.url) || "/assets/plan.png"}
                  alt={item.name || item.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      FALLBACK_IMAGES[
                        category as keyof typeof FALLBACK_IMAGES
                      ] || FALLBACK_IMAGES.default;
                  }}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>
              {category === "films" && (
                <CardItem translateZ="50" className="mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-400 text-gray-900"
                  >
                    {`Episode ${item.episode_id}`}
                  </Badge>
                </CardItem>
              )}
              <CardItem
                translateZ={20}
                as="button"
                className="w-fit px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 text-xs font-bold mt-4"
                onClick={() => handleCardClick(item)}
              >
                View Details
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-center  items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex space-x-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 px-2 sm:px-4"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Previous</span>
          </Button>
          <span className="text-white text-sm sm:text-base flex items-center justify-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 px-2 sm:px-4"
            aria-label="Next page"
          >
            <span className="hidden sm:inline mr-2">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ItemDetailsModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={category}
      />
    </div>
  );
}
