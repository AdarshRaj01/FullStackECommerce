// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      cleanBody?: any

      // cleanBody?: Record<string, any>; // Using Record to specify that it's an object with string keys and any values

    }
  }
}
