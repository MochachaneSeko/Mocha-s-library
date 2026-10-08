createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Mocha-s-library">
      <LibraryProvider>
        <App />
      </LibraryProvider>
    </BrowserRouter>
  </StrictMode>,
);