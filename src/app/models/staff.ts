export interface Staff {
  id: string;
  name: string;
  surname: string;
  gamertag: string;
  workgroup: string | null;
  staff_roles: {
    id: string;
    name: string;
    description: string;
    subcategories: {
      id: string;
      name: string;
      categories: {
        id: string;
        name: string;
        description: string;
      };
    };
  };
}