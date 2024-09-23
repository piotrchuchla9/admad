import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-rose-500 p-4">
        <Header />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Home />
      </main>
      <footer className="bg-rose-500 text-white p-4 text-center">
        <Footer />
      </footer>
    </div>
  );
}
