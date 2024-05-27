export interface User {
  id: number;
  email: string;
  password: string;
  fname: string;
  lname: string;
}

export interface Todo {
  id: number;
  task: string;
  userId: number;
}

export interface Category {
  category_id: string; // UUID
  category_name: string;
  user_id: string; // UUID (reference to user)
}

export interface Subcategory {
  subcategory_id: string; // UUID
  subcategory_name: string;
  category_id: string; // UUID (reference to category)
}

export interface Item {
  item_id: string; // UUID
  item_name: string;
  category_id: string; // UUID (reference to category)
  subcategory_id?: string; // Optional UUID (reference to subcategory)
  user_id: string; // UUID (reference to user)
}
