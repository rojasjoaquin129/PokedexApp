export interface Pokemon {
  id: string;
  name: string;
  lvl: number;
  abilities: [
    {
      name: string;
      description: string;
    }
  ];
  type: [string];
  image: string;
}
