type Pagination = {
  current: number;
  pageSize: number;
  total: number;
};

type FileResponse = {
  originalname: string;
  filename: string;
  location: string;
};

type OptionType = {
  label: string;
  value: string;
  icon?: RenderNode;
};

type MenuItem = GetProp<MenuProps, 'items'>[number];
