import './App.css';
import Nav from './components/Body/nav/Nav';
import routes from './routes'
import Footer from './components/Body/footer/Footer'

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
      <Footer />

    </div>
  );
}

export default App;
