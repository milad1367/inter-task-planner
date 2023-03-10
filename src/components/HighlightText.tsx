export const HighlightText = ({
  children,
  searchText,
}: {
  children: string;
  searchText: string;
}) => {
  const parts = children.split(new RegExp(`(${searchText})`, "gi"));
  if (!searchText) {
    return <>{children}</>;
  }

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === searchText.toLowerCase()
              ? { fontWeight: "bold", backgroundColor: "#e8bb49" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </>
  );
};
