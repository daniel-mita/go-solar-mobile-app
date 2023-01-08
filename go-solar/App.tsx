import AuthProvider from "./src/contexts/useAuth"
import React from "react"
import Router from "./src/Router"
import ImageProvider from "./src/contexts/useImage"

export default function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router />
      </ImageProvider>
    </AuthProvider>
  )
}
