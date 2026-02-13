export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserStatus = "active" | "inactive" | "banned";

export type UserResponse =
  | { status: "success"; user: User }
  | { status: "error"; message: string };

/*
I used an interface for User because interfaces are ideal for defining object shapes
and can be easily extended or implemented by classes in the future. Types were chosen
for UserStatus and UserResponse because they better represent union types and literal values.
 */
