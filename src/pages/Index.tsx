import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { tanks, getAllCountries } from '@/data/tanks';

const Index = () => {
  const typeLabels: Record<string, string> = {
    light: 'Легкий танк',
    medium: 'Средний танк',
    heavy: 'Тяжелый танк',
    'tank-destroyer': 'ПТ-САУ',
    modern: 'ОБТ'
  };

  const countries = getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const filteredTanks = selectedCountry === 'all' ? tanks : tanks.filter(t => t.country === selectedCountry);

  const featuredTanks = [
    tanks.find(t => t.id === 't-34'),
    tanks.find(t => t.id === 'is-2'),
    tanks.find(t => t.id === 't-90')
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-primary">Энциклопедия танков России</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="#featured" className="text-sm font-medium hover:text-primary transition-colors">Избранное</a>
            <a href="#tanks" className="text-sm font-medium hover:text-primary transition-colors">Все танки</a>
            <Link to="/compare" className="text-sm font-medium hover:text-primary transition-colors">Сравнение</Link>
            <Link to="/content" className="text-sm font-medium hover:text-primary transition-colors">Содержание</Link>
          </nav>
        </div>
      </header>

      <section id="home" className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 -z-10" />
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="text-base py-1 px-3">Полная энциклопедия</Badge>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                История советского и российского танкостроения
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                От легендарного Т-34 до современных Т-90. Детальные описания, исторические факты, технические характеристики, боевое применение.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" asChild>
                  <a href="#tanks">
                    <Icon name="Database" className="mr-2 h-5 w-5" />
                    Все танки ({tanks.length})
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/compare">
                    <Icon name="ArrowLeftRight" className="mr-2 h-5 w-5" />
                    Сравнить
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src={tanks[0].image}
                  alt={tanks[0].name}
                  className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <img 
                  src={tanks[2].image}
                  alt={tanks[2].name}
                  className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src={tanks[1].image}
                  alt={tanks[1].name}
                  className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform"
                />
                <img 
                  src={tanks[3].image}
                  alt={tanks[3].name}
                  className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Легендарные танки</h2>
            <p className="text-lg text-muted-foreground">Машины, изменившие ход истории</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTanks.map((tank) => (
              <Link key={tank!.id} to={`/tank/${tank!.id}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all group cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={tank!.image}
                      alt={tank!.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="text-base">{tank!.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {tank!.name}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{tank!.country}</Badge>
                      <Badge variant="secondary">{typeLabels[tank!.type]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {tank!.history.substring(0, 150)}...
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Icon name="Shield" className="h-3 w-3 text-primary" />
                        <span>{tank!.armorFront} мм</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Target" className="h-3 w-3 text-primary" />
                        <span>{tank!.gunCaliber} мм</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Zap" className="h-3 w-3 text-primary" />
                        <span>{tank!.horsepower} л.с.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Gauge" className="h-3 w-3 text-primary" />
                        <span>{tank!.speed} км/ч</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="tanks" className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Полная энциклопедия</h2>
            <p className="text-lg text-muted-foreground">
              {tanks.length} танков с детальными описаниями и реальными фотографиями
            </p>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            <Button 
              variant={selectedCountry === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCountry('all')}
              size="sm"
            >
              Все ({tanks.length})
            </Button>
            {countries.map(country => (
              <Button
                key={country}
                variant={selectedCountry === country ? 'default' : 'outline'}
                onClick={() => setSelectedCountry(country)}
                size="sm"
              >
                {country} ({tanks.filter(t => t.country === country).length})
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTanks.map((tank) => (
              <Link key={tank.id} to={`/tank/${tank.id}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all group cursor-pointer h-full">
                  <div className="relative h-40 overflow-hidden bg-secondary/20">
                    <img 
                      src={tank.image}
                      alt={tank.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2">{tank.year}</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {tank.name}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{tank.country}</Badge>
                      <Badge variant="secondary" className="text-xs">{typeLabels[tank.type]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Shield" className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>Броня {tank.armorFront} мм</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Target" className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>Орудие {tank.gunCaliber} мм</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Zap" className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>{tank.horsepower} л.с.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Gauge" className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>{tank.speed} км/ч</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Произведено: {tank.produced.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/compare">
              <Button size="lg" className="gap-2">
                <Icon name="ArrowLeftRight" className="h-5 w-5" />
                Сравнить танки
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-secondary/50 border-t">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="h-8 w-8 text-primary" />
              <span className="font-bold">Энциклопедия танков России</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/content" className="hover:text-primary transition-colors">Содержание</Link>
              <Link to="/compare" className="hover:text-primary transition-colors">Сравнение</Link>
              <a href="#tanks" className="hover:text-primary transition-colors">Все танки</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
