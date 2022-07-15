import React, { useEffect } from 'react';
import client from './api/client';
import './common/common.css'
import Header from './components/header/Header';
import Like from './components/like/Like';
import More from './components/more/More';
import OtherApp from './components/otherapp/OtherApp';
import Search from './components/search/Search';
import Spike from './components/spike/Spike';
function App() {

  useEffect(() => {
    // client.get('/api/users').then(data => {
    //   console.log('App--users--', data);
    // }).catch(error => {
    //   console.log({ error });
    // });
    // client.get('/api/swiper').then(data => {
    //   console.log('App--swiper--', data);
    // }).catch(error => {
    //   console.log({ error });
    // });
  }, []);

  return (
    <div className="App">
      <Search />
      <Header />
      <OtherApp />
      <Spike />
      <More />
      <Like />
    </div>
  );
}

export default App;
