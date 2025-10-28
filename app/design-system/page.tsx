'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/app/components/ui/Card';
import { Badge } from '@/app/components/ui/Badge';
import { Alert, AlertTitle, AlertDescription } from '@/app/components/ui/Toast';
import { Label } from '@/app/components/ui/Label';

export default function DesignSystemShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">VeoFlow Design System</h1>
          <Button onClick={toggleTheme} variant="outline">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Button Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Button Component</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">★</Button>
              </div>
            </CardContent>
          </Card>

          {/* Input Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Input Component</CardTitle>
              <CardDescription>Text input with various states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
          </Card>

          {/* Badge Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Component</CardTitle>
              <CardDescription>Various badge styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Alert Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Component</CardTitle>
              <CardDescription>Notification components with dismissible option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAlert && (
                <Alert>
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the CLI.
                  </AlertDescription>
                </Alert>
              )}
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Your session has expired. Please log in again.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button onClick={() => setShowAlert(true)}>Show Alert</Button>
                <Button variant="destructive" onClick={() => setShowAlert(false)}>
                  Hide Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theme Showcase */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Theme Colors</CardTitle>
            <CardDescription>These colors adapt to light/dark mode</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-md bg-primary mb-2" />
                <span className="text-sm">Primary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-md bg-secondary mb-2" />
                <span className="text-sm">Secondary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-md bg-destructive mb-2" />
                <span className="text-sm">Destructive</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}