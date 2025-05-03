
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container max-w-md text-center">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button size="lg" asChild className="bg-gradient-primary button-glow">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
      
      
    </div>
  );
};

export default NotFound;
