import React, { useState } from "react";
import { SearchInput } from "../../components";
import { galleryData } from "../../constants/data";
import styles from "../../style";
import { closestCenter, DndContext, KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import GalleryGrid from "../../components/GalleryGrid";

  const Gallery = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGalleryData, setFilteredGalleryData] = useState(galleryData);

    // Function to handle the search and update the search term
    const handleSearch = (term) => {
      setSearchTerm(term);
      // Filter the galleryData based on the search term
      const filteredData = galleryData.filter((item) =>
        item.tag.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGalleryData(filteredData);
    };

    // Function to handle the drag and drop
    const handleDragEnd = (event) => {
      const {active, over} = event;
      if(active.id === over.id || !over.id) {
        return;
      }
      // Rearranging the galleryData based on the drag and drop
      setFilteredGalleryData((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);     
      });
    }

    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor),
    );
    
  return (
    <main className={`min-h-screen ${styles.padding} `}>
      <div>
        <h2 className={`${styles.heading2} text-center`}>Gallery</h2>
        <p className={`${styles.paragraph} text-center`}>This is a gallery page that allows users to search for images with tags such as Movie and TV series and also drag and drop to rearrange images.</p>
        <SearchInput onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={filteredGalleryData} strategy={verticalListSortingStrategy}>
            <GalleryGrid data={filteredGalleryData} />
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );
};

export default Gallery;
