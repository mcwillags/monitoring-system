// vite.config.ts
import { defineConfig } from "file:///D:/desktop-files/dyplomna/monitoring-web/node_modules/vite/dist/node/index.js";
import react from "file:///D:/desktop-files/dyplomna/monitoring-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "path";
var __vite_injected_original_dirname = "D:\\desktop-files\\dyplomna\\monitoring-web";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@controllers": path.resolve(__vite_injected_original_dirname, "src/controllers"),
      "@common": path.resolve(__vite_injected_original_dirname, "src/common"),
      "@context": path.resolve(__vite_injected_original_dirname, "src/context"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@types": path.resolve(__vite_injected_original_dirname, "src/types"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@layout": path.resolve(__vite_injected_original_dirname, "src/layout"),
      "@store": path.resolve(__vite_injected_original_dirname, "src/store"),
      "@models": path.resolve(__vite_injected_original_dirname, "src/models"),
      "@router": path.resolve(__vite_injected_original_dirname, "src/router"),
      "@src": path.resolve(__vite_injected_original_dirname, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXNrdG9wLWZpbGVzXFxcXGR5cGxvbW5hXFxcXG1vbml0b3Jpbmctd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkZXNrdG9wLWZpbGVzXFxcXGR5cGxvbW5hXFxcXG1vbml0b3Jpbmctd2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kZXNrdG9wLWZpbGVzL2R5cGxvbW5hL21vbml0b3Jpbmctd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYmFzZTogJycsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnQGNvbnRyb2xsZXJzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250cm9sbGVycycpLFxuICAgICAgJ0Bjb21tb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbW1vbicpLFxuICAgICAgJ0Bjb250ZXh0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250ZXh0JyksXG4gICAgICAnQGhvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgJ0B0eXBlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3BhZ2VzJyksXG4gICAgICAnQHV0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy91dGlscycpLFxuICAgICAgJ0BsYXlvdXQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xheW91dCcpLFxuICAgICAgJ0BzdG9yZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3RvcmUnKSxcbiAgICAgICdAbW9kZWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9tb2RlbHMnKSxcbiAgICAgICdAcm91dGVyJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9yb3V0ZXInKSxcbiAgICAgICdAc3JjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWtULFNBQVMsb0JBQW9CO0FBQy9VLE9BQU8sV0FBVztBQUNsQixZQUFZLFVBQVU7QUFGdEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxlQUFvQixhQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ3ZELGdCQUFxQixhQUFRLGtDQUFXLGlCQUFpQjtBQUFBLE1BQ3pELFdBQWdCLGFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQy9DLFlBQWlCLGFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2pELFVBQWUsYUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsVUFBZSxhQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxVQUFlLGFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFVBQWUsYUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsV0FBZ0IsYUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDL0MsVUFBZSxhQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxXQUFnQixhQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMvQyxXQUFnQixhQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMvQyxRQUFhLGFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3ZDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
