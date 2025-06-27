import GranjaListItem from "./GranjaListItem";

function GranjasListComponent({ granjas, onSelect }) {
  return (
    <div className="space-y-8">
      {granjas.map((granja, index) => (
        <GranjaListItem key={index} granja={granja} index={index} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default GranjasListComponent;
