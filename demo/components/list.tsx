export function List({ items, renderItem }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
