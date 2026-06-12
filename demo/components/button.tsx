export function Button({ onPress, children }) {
  return (
    <button type="button" onClick={onPress}>
      {children}
    </button>
  );
}
