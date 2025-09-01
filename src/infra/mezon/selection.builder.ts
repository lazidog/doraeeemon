import type { Spirit } from "@/domain";
import { EMessageComponentType, type SelectComponent } from "mezon-sdk";
import { spiritSelectorId } from "./id.builder";

export const spiritSelectionBuilder = (
  spirits: Spirit[],
  customId?: string,
): SelectComponent => ({
  id: customId || spiritSelectorId(),
  type: EMessageComponentType.SELECT,
  component: {
    options: spirits.map((spirit) => ({
      label: spirit.name,
      value: spirit.id,
    })),
  },
});
