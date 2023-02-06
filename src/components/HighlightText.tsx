export const HighlightText = ({
  children,
  term,
}: {
  children: string;
  term: string;
}) => {
  const parts = children.split(new RegExp(`(${term})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === term.toLowerCase()
              ? { fontWeight: "bold", backgroundColor: "#e8bb49" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};
