// Signal data for SwimScore video

export interface Signal {
  label: string;
  stars: number;
  emphasized: boolean; // Which signals are weighted more heavily
}

export const signals: Signal[] = [
  { label: 'Total moving swimmers', stars: 4, emphasized: true },
  { label: 'Movement speed', stars: 2, emphasized: false },
  { label: 'Cell shape', stars: 3, emphasized: false },
  { label: 'DNA quality', stars: 4, emphasized: true },
  { label: 'Testosterone', stars: 3, emphasized: true },
];
