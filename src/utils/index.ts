export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export const removeByIndex = (list: any[], index: number) => [
  ...list.slice(0, index),
  ...list.slice(index + 1),
];

export function percentage(partialValue: number, totalValue: number) {
  return Math.round((100 * partialValue) / totalValue);
}

export const labelsSrc = [...Array(10)].map((item, index) => `Label${index}`);
export const taskStatus = ["Pending", "Processing", "Done"];
