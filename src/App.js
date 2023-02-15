import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <div className="grid-container">
      <Header />
      <main>
        <HomeScreen />
      </main>
      <Footer />
    </div>
  );
};

export default App;
