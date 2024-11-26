import { match } from "path-to-regexp";

const allPublicRoutes = [
  { path: "/user", method: "GET" },
  { path: "/user/:id", method: "GET" },
  { path: "/user/:id", method: "PUT" },
  { path: "/auth/login", method: "POST" },
  { path: "/auth/login", method: "POST" },
  { path: "/auth/login", method: "POST" },
  { path: "/auth/register", method: "POST" },
  { path: "/auth/forgot-password", method: "POST" },
  { path: "/auth/reset-password", method: "POST" },
  { path: "/refugees", method: "GET" },
  { path: "/refugees", method: "POST" },
  { path: "/refugees/:id/needs", method: "GET" },
  { path: "/animals", method: "GET" },
  { path: "/animals", method: "POST" },
  { path: "/animals/available", method: "GET" },
  { path: "/animals/refugee/:refugeeId", method: "GET" },
  { path: "/animals/:id", method: "GET" },
  { path: "/animals/:id", method: "PUT" },
  { path: "/animals/:id", method: "DELETE" },
];

export const isPublicRoute = (path: string, method: string): boolean => {
  return allPublicRoutes.some(
    (route) => match(route.path, { decode: decodeURIComponent })(path) && route.method === method
  );
};