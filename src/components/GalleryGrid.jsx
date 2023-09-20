import SortableUser from "./SortableUser";

const GalleryGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-5">
      {data.map((item) => (
        <SortableUser key={item.id} item={item} />
      ))}
    </div>
  );
};


export default GalleryGrid;
