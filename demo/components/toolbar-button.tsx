import { Button } from "./button.tsx";

export function ToolbarButton(props) {
  return <Button onPress={props.onActivate}>{props.label}</Button>;
}
