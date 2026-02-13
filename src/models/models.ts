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
and can be easily extended or implemented by classes in the future. User is an object with properties
and therefore was better suited for an interface. Types were chosen for UserStatus and 
UserResponse because they better represent union types and literal values. Both of these
will probably not require extension or more varied implementation, so types make more sense for them. 
Types also allow for more complex type definitions, which is useful for UserResponse.
 */
