import React from 'react';
import Map from '../../components/Map';
import HomePage from '../../components/HomePage';
import VideoSection from '../../components/VideoSection';
import CounterSection from '../../components/CounterSection';
import TestimonialSection from '../../components/TestimonialSection';

function Home() {
  return (
    <>
    <HomePage />
    <CounterSection />
    <TestimonialSection/>
    <VideoSection />
    <Map />
    </>
  );
}

export default Home;