import Card from '@/components/card';
import React from 'react';

const Home = () => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card areaOfWork="Technology" companyName="Apple" price="$300" percentageChange="+20%" />
    </div>
  );
};

export default Home;
