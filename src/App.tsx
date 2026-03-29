/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Writing from "./pages/Writing";
import Videos from "./pages/Videos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/capstone" element={<Projects category="capstone" />} />
          <Route path="projects/mini" element={<Projects category="mini" />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="writing" element={<Writing />} />
          <Route path="videos" element={<Videos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
