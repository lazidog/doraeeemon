import type { Example } from "@/domain";
import { EMessageComponentType, type SelectComponent } from "mezon-sdk";
import { exampleSelectorId } from "./id.builder";

export const exampleSelectionBuilder = (
  examples: Example[],
  customId?: string,
): SelectComponent => ({
  id: customId || exampleSelectorId(),
  type: EMessageComponentType.SELECT,
  component: {
    options: examples.map((example) => ({
      label: "label",
      value: "value",
    })),
  },
});
