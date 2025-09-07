import {
  type ButtonComponent,
  EButtonMessageStyle,
  EMessageComponentType,
} from "mezon-sdk";

export const exampleButtonBuilder = (): ButtonComponent => ({
  id: "example_button",
  type: EMessageComponentType.BUTTON,
  component: {
    label: "label",
    style: EButtonMessageStyle.DANGER,
  },
});
