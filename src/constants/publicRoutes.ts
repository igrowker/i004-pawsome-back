import { match } from "path-to-regexp";

const allPublicRoutes = [
  { path: "/user", method: "GET" },
  { path: "/user/:id", method: "GET" },
  { path: "/user/:id", method: "PUT" },
  { path: "/auth/login", method: "POST" },
  { path: "/auth/register", method: "POST" },
  { path: "/auth/forgot-password", method: "POST" },
  { path: "/auth/reset-password", method: "POST" },
  { path: "/refugees", method: "GET" },
  { path: "/refugees/:id", method: "GET" },
  { path: "/refugees/:id/needs", method: "GET" },
  { path: "/animals", method: "GET" },
  { path: "/animals/available", method: "GET" },
  { path: "/animals/refugee/:refugeeId", method: "GET" },
  { path: "/animals/:id", method: "GET" },
  { path: "/admin/dashboard", method: "GET" },
  { path: "/volunteer", method: "GET"},
  { path: "/files/upload", method: "POST"}
];

export const isPublicRoute = (path: string, method: string): boolean => {
  return allPublicRoutes.some(
    (route) => match(route.path, { decode: decodeURIComponent })(path) && route.method === method
  );
};