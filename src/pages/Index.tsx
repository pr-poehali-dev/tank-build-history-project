import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Tank {
  id: string;
  name: string;
  year: string;
  category: string;
  image: string;
  specs: {
    weight: string;
    crew: string;
    armament: string;
    speed: string;
  };
  description: string;
}

interface Designer {
  name: string;
  years: string;
  role: string;
  achievements: string[];
}

const Index = () => {
  const [activeTank, setActiveTank] = useState<string | null>(null);
  const [rotateAngle, setRotateAngle] = useState(0);

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

  const tanks: Tank[] = [
    {
      id: 't34',
      name: 'Т-34',
      year: '1940',
      category: 'Средний танк',
      image: '/img/aa7591ba-a596-4f23-a865-cc3f9fdbfb20.jpg',
      specs: {
        weight: '26.5 т',
        crew: '4 человека',
        armament: '76-мм пушка Ф-34',
        speed: '54 км/ч'
      },
      description: 'Легендарный средний танк, сыгравший ключевую роль в победе во Второй мировой войне. Оптимальное сочетание огневой мощи, защищенности и подвижности.'
    },
    {
      id: 'is2',
      name: 'ИС-2',
      year: '1943',
      category: 'Тяжелый танк',
      image: '/img/23267ece-c1b5-4b41-9cf2-ddbeebdf647b.jpg',
      specs: {
        weight: '46 т',
        crew: '4 человека',
        armament: '122-мм пушка Д-25Т',
        speed: '37 км/ч'
      },
      description: 'Тяжелый танк прорыва с мощнейшим орудием. Предназначался для уничтожения укреплений и тяжелых немецких танков.'
    },
    {
      id: 't90',
      name: 'Т-90',
      year: '1992',
      category: 'Основной боевой танк',
      image: '/img/4bfb2098-b756-4615-a9dc-07243c9cf135.jpg',
      specs: {
        weight: '46.5 т',
        crew: '3 человека',
        armament: '125-мм пушка 2А46М',
        speed: '60 км/ч'
      },
      description: 'Современный основной боевой танк с активной защитой, динамической броней и системой управления огнем последнего поколения.'
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

  const handleTankRotate = (tankId: string, direction: 'left' | 'right') => {
    setActiveTank(tankId);
    setRotateAngle(prev => direction === 'left' ? prev - 15 : prev + 15);
  };

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
            <a href="#tanks" className="text-sm font-medium hover:text-primary transition-colors">Модели</a>
            <a href="#designers" className="text-sm font-medium hover:text-primary transition-colors">Конструкторы</a>
            <a href="#museums" className="text-sm font-medium hover:text-primary transition-colors">Музеи</a>
            <a href="#articles" className="text-sm font-medium hover:text-primary transition-colors">Статьи</a>
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
          <Badge className="mb-4 text-lg py-2 px-4">Интерактивный музей</Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Век российских танков
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            От первых прототипов до современных боевых машин. Исследуйте эволюцию танкостроения через интерактивные 3D-модели и исторические материалы.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="text-lg">
              <Icon name="PlayCircle" className="mr-2 h-5 w-5" />
              Начать экскурсию
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              <Icon name="BookOpen" className="mr-2 h-5 w-5" />
              Исследования
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Модели танков</h2>
            <p className="text-xl text-muted-foreground">Интерактивные 3D-модели с детальными характеристиками</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tanks.map((tank) => (
              <Card key={tank.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={tank.image}
                    alt={tank.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      transform: activeTank === tank.id ? `rotateY(${rotateAngle}deg)` : 'none',
                      transformStyle: 'preserve-3d'
                    }}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleTankRotate(tank.id, 'left')}
                    >
                      <Icon name="RotateCcw" className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleTankRotate(tank.id, 'right')}
                    >
                      <Icon name="RotateCw" className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 left-2">{tank.year}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{tank.name}</CardTitle>
                  <CardDescription>{tank.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{tank.description}</p>
                  <Tabs defaultValue="specs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="specs">Характеристики</TabsTrigger>
                      <TabsTrigger value="info">Информация</TabsTrigger>
                    </TabsList>
                    <TabsContent value="specs" className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Масса:</span>
                        <span className="font-semibold">{tank.specs.weight}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Экипаж:</span>
                        <span className="font-semibold">{tank.specs.crew}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Вооружение:</span>
                        <span className="font-semibold">{tank.specs.armament}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Скорость:</span>
                        <span className="font-semibold">{tank.specs.speed}</span>
                      </div>
                    </TabsContent>
                    <TabsContent value="info">
                      <Button className="w-full" variant="outline">
                        <Icon name="ExternalLink" className="mr-2 h-4 w-4" />
                        Подробнее
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
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

      <section id="museums" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Музеи и экспозиции</h2>
            <p className="text-xl text-muted-foreground">Где увидеть легендарную технику вживую</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="MapPin" className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Музей танка Т-34</CardTitle>
                </div>
                <CardDescription>Московская область, деревня Шолохово</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Единственный в России музей, полностью посвященный легендарному танку Т-34. Более 50 единиц техники.
                </p>
                <Button className="w-full">
                  <Icon name="Navigation" className="mr-2 h-4 w-4" />
                  Построить маршрут
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="MapPin" className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Музей бронетанковой техники</CardTitle>
                </div>
                <CardDescription>Кубинка, Московская область</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Крупнейшая в мире коллекция танков и бронетехники. Более 350 единиц из 14 стран мира.
                </p>
                <Button className="w-full">
                  <Icon name="Navigation" className="mr-2 h-4 w-4" />
                  Построить маршрут
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="articles" className="py-20 px-4 bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Статьи и исследования</h2>
            <p className="text-xl text-muted-foreground">Глубокий анализ и исторические факты</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <Badge className="w-fit mb-2">Техника</Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  Т-34: революция в танкостроении
                </CardTitle>
                <CardDescription>15 октября 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Как советский средний танк изменил ход войны и стал эталоном для танкостроения на десятилетия вперед.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <Badge className="w-fit mb-2">История</Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  Битва гигантов: ИС-2 против Тигра
                </CardTitle>
                <CardDescription>10 октября 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Сравнительный анализ характеристик и боевого применения советских и немецких тяжелых танков.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <Badge className="w-fit mb-2">Конструкторы</Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  Михаил Кошкин: гений танкостроения
                </CardTitle>
                <CardDescription>5 октября 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  История создания Т-34 и трагическая судьба его главного конструктора.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <Badge className="w-fit mb-2">Современность</Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  Т-14 Армата: танк будущего
                </CardTitle>
                <CardDescription>1 октября 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Обзор инновационных решений и перспектив развития российского танкостроения.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              <Icon name="Library" className="mr-2 h-5 w-5" />
              Все статьи
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О проекте</h3>
              <p className="text-sm opacity-90">
                Интерактивный музей истории российского танкостроения с 3D-моделями и историческими материалами.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Разделы</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><a href="#timeline" className="hover:underline">Хронология</a></li>
                <li><a href="#tanks" className="hover:underline">Модели танков</a></li>
                <li><a href="#designers" className="hover:underline">Конструкторы</a></li>
                <li><a href="#museums" className="hover:underline">Музеи</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@tankhistory.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Соцсети</h3>
              <div className="flex gap-3">
                <Button size="icon" variant="secondary">
                  <Icon name="MessageCircle" className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Icon name="Send" className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Icon name="Youtube" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
            <p>© 2024 История танкостроения России. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
