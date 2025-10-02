import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { tanks, getAllCountries } from '@/data/tanks';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Designer {
  name: string;
  years: string;
  role: string;
  achievements: string[];
}

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

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1915',
      title: 'Начало эры танков',
      description: 'Первые прототипы танков в России. Проект "Вездеход" Пороховщикова.',
      icon: 'Sprout'
    },
    {
      year: '1920',
      title: 'Период экспериментов',
      description: 'Создание первых советских танков на основе иностранных образцов.',
      icon: 'Cog'
    },
    {
      year: '1931',
      title: 'Индустриализация',
      description: 'Массовое производство легких танков серии Т-26 и БТ.',
      icon: 'Factory'
    },
    {
      year: '1940',
      title: 'Рождение легенды',
      description: 'Создание среднего танка Т-34 - лучшего танка Второй мировой войны.',
      icon: 'Award'
    },
    {
      year: '1943',
      title: 'Тяжелая броня',
      description: 'Разработка тяжелых танков ИС-2 и ИС-3 для прорыва укреплений.',
      icon: 'Shield'
    },
    {
      year: '1960',
      title: 'Послевоенная эволюция',
      description: 'Танки Т-54/55 и Т-62. Внедрение гладкоствольных орудий.',
      icon: 'TrendingUp'
    },
    {
      year: '1976',
      title: 'Революция в танкостроении',
      description: 'Принятие на вооружение Т-72 с композитной броней.',
      icon: 'Zap'
    },
    {
      year: '1992',
      title: 'Современность',
      description: 'Создание Т-90 и начало разработки Т-14 "Армата".',
      icon: 'Rocket'
    }
  ];

  const designers: Designer[] = [
    {
      name: 'Михаил Кошкин',
      years: '1898-1940',
      role: 'Главный конструктор танка Т-34',
      achievements: [
        'Создание легендарного Т-34',
        'Революционная концепция наклонной брони',
        'Оптимальное соотношение характеристик'
      ]
    },
    {
      name: 'Жозеф Котин',
      years: '1908-1979',
      role: 'Конструктор тяжелых танков',
      achievements: [
        'Серия тяжелых танков КВ',
        'Танки ИС (Иосиф Сталин)',
        'Послевоенные модификации'
      ]
    },
    {
      name: 'Александр Морозов',
      years: '1904-1979',
      role: 'Продолжатель дела Кошкина',
      achievements: [
        'Модернизация Т-34-85',
        'Создание Т-44 и Т-54',
        'Основа послевоенного танкостроения'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">История танкостроения России</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="#timeline" className="text-sm font-medium hover:text-primary transition-colors">Хронология</a>
            <a href="#tanks" className="text-sm font-medium hover:text-primary transition-colors">Энциклопедия</a>
            <a href="#designers" className="text-sm font-medium hover:text-primary transition-colors">Конструкторы</a>
            <Link to="/compare" className="text-sm font-medium hover:text-primary transition-colors">Сравнение</Link>
          </nav>
          <Button variant="default" className="hidden md:flex">
            <Icon name="Mail" className="mr-2 h-4 w-4" />
            Контакты
          </Button>
        </div>
      </header>

      <section id="home" className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -z-10" />
        <div className="container max-w-6xl mx-auto text-center animate-fade-in">
          <Badge className="mb-4 text-lg py-2 px-4">Интерактивная энциклопедия</Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Век российских танков
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            От Т-34 до современных ОБТ. Детальные 3D-схемы бронирования, анимации пробития и сравнение с западными аналогами.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg" asChild>
              <a href="#tanks">
                <Icon name="Database" className="mr-2 h-5 w-5" />
                Энциклопедия танков
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <Link to="/compare">
                <Icon name="ArrowLeftRight" className="mr-2 h-5 w-5" />
                Сравнить танки
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="timeline" className="py-20 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Хронология развития</h2>
            <p className="text-xl text-muted-foreground">Ключевые вехи истории танкостроения</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary" />
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-2xl">{event.year}</CardTitle>
                      <CardDescription className="text-lg font-semibold">{event.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background animate-scale-in z-10">
                  <Icon name={event.icon as any} className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tanks" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Энциклопедия танков</h2>
            <p className="text-xl text-muted-foreground">Полная база данных с 3D-схемами бронирования и анимациями пробития</p>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap justify-center">
            <Button 
              variant={selectedCountry === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCountry('all')}
            >
              Все танки ({tanks.length})
            </Button>
            {countries.map(country => (
              <Button
                key={country}
                variant={selectedCountry === country ? 'default' : 'outline'}
                onClick={() => setSelectedCountry(country)}
              >
                {country} ({tanks.filter(t => t.country === country).length})
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTanks.map((tank, index) => (
              <Link key={tank.id} to={`/tank/${tank.id}`}>
                <Card className="hover:shadow-2xl transition-all animate-fade-in group cursor-pointer h-full" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{tank.name}</CardTitle>
                      <Badge>{tank.year}</Badge>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{tank.country}</Badge>
                      <Badge variant="secondary">{typeLabels[tank.type]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Icon name="Shield" className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Броня</div>
                          <div className="font-bold">{tank.armorFront} мм</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Target" className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Орудие</div>
                          <div className="font-bold">{tank.gunCaliber} мм</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Zap" className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Мощность</div>
                          <div className="font-bold">{tank.horsepower} л.с.</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Gauge" className="h-4 w-4 text-primary" />
                        <div>
                          <div className="text-xs text-muted-foreground">Скорость</div>
                          <div className="font-bold">{tank.speed} км/ч</div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon name="Eye" className="mr-2 h-4 w-4" />
                      Подробнее
                    </Button>
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

      <section id="designers" className="py-20 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Великие конструкторы</h2>
            <p className="text-xl text-muted-foreground">Люди, создавшие легендарные машины</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designers.map((designer, index) => (
              <Card key={designer.name} className="hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="User" className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{designer.name}</CardTitle>
                  <CardDescription className="text-base">{designer.years}</CardDescription>
                  <Badge variant="secondary" className="w-fit mt-2">{designer.role}</Badge>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Достижения:</h4>
                  <ul className="space-y-2">
                    {designer.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="CheckCircle2" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-card border-t">
        <div className="container max-w-6xl mx-auto text-center">
          <Icon name="Shield" className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">История российского танкостроения</p>
          <p className="text-sm text-muted-foreground">&copy; 2024. Интерактивная энциклопедия танков</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
