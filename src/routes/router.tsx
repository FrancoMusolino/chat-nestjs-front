import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Home } from "../auth/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<Home />} />

        <Route path="auth">
          <Route index element={<Navigate to="registro" replace />} />
          <Route path="registro" element={<h1>Holal</h1>} />
        </Route>
      </Route>
    </>
  )
);
