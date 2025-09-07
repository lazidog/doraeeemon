import { Color } from "@/colors";
import type { Example } from "@/domain";
import type {
  ButtonComponent,
  ChannelMessageContent,
  IEmbedProps,
  IMessageActionRow,
  SelectComponent,
} from "mezon-sdk";
import { exampleButtonBuilder } from "./button.builder";
import { exampleSelectionBuilder } from "./selection.builder";

// #region: Example

export const createExampleMessage = (
  _exampleId: string,
  examples: Example[],
): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "Example title",
    color: Color.PRIMARY.toString(),
  };
  const buttons: ButtonComponent[] = [exampleButtonBuilder()];
  const buttonRow: IMessageActionRow = {
    components: buttons,
  };
  const selectors: SelectComponent[] = [
    exampleSelectionBuilder(examples, "exampleSelectorId1"),
    exampleSelectionBuilder(examples, "exampleSelectorId2"),
    exampleSelectionBuilder(examples, "exampleSelectorId3"),
  ];
  const selectionRow: IMessageActionRow = {
    components: selectors,
  };

  return { embed: [embed], components: [selectionRow, buttonRow] };
};
// #endregion: Example
