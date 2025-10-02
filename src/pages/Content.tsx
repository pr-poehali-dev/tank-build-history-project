import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { tanks, getAllCountries } from '@/data/tanks';

const Content = () => {
  const countries = getAllCountries();
  const tanksByType = {
    light: tanks.filter(t => t.type === 'light'),
    medium: tanks.filter(t => t.type === 'medium'),
    heavy: tanks.filter(t => t.type === 'heavy'),
    modern: tanks.filter(t => t.type === 'modern'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            На главную
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Содержание энциклопедии</h1>
          <p className="text-lg text-muted-foreground">
            Полный каталог танков с навигацией по типам и странам
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Статистика энциклопедии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{tanks.length}</div>
                  <div className="text-sm text-muted-foreground">Всего танков</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold">{countries.length}</div>
                  <div className="text-sm text-muted-foreground">Страны</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold">
                    {tanks.reduce((sum, t) => sum + t.produced, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Произведено</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-3xl font-bold">1931-2024</div>
                  <div className="text-sm text-muted-foreground">Годы</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ListTree" className="h-6 w-6" />
                Танки по типам
              </CardTitle>
              <CardDescription>Классификация по назначению и эпохе</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Icon name="Gauge" className="h-5 w-5 text-primary" />
                    Легкие танки ({tanksByType.light.length})
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tanksByType.light.map(tank => (
                    <Link key={tank.id} to={`/tank/${tank.id}`}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                        <span className="font-semibold">{tank.name}</span>
                        <span className="text-xs text-muted-foreground">({tank.year})</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Icon name="Shield" className="h-5 w-5 text-primary" />
                    Средние танки ({tanksByType.medium.length})
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tanksByType.medium.map(tank => (
                    <Link key={tank.id} to={`/tank/${tank.id}`}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                        <span className="font-semibold">{tank.name}</span>
                        <span className="text-xs text-muted-foreground">({tank.year})</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Icon name="ShieldCheck" className="h-5 w-5 text-primary" />
                    Тяжелые танки ({tanksByType.heavy.length})
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tanksByType.heavy.map(tank => (
                    <Link key={tank.id} to={`/tank/${tank.id}`}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                        <span className="font-semibold">{tank.name}</span>
                        <span className="text-xs text-muted-foreground">({tank.year})</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Icon name="Rocket" className="h-5 w-5 text-primary" />
                    Современные ОБТ ({tanksByType.modern.length})
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tanksByType.modern.map(tank => (
                    <Link key={tank.id} to={`/tank/${tank.id}`}>
                      <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                        <span className="font-semibold">{tank.name}</span>
                        <span className="text-xs text-muted-foreground">({tank.year})</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Flag" className="h-6 w-6" />
                Танки по странам
              </CardTitle>
              <CardDescription>Группировка по производителям</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {countries.map(country => {
                const countryTanks = tanks.filter(t => t.country === country);
                return (
                  <div key={country}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{country}</h3>
                      <span className="text-sm text-muted-foreground">{countryTanks.length} танков</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {countryTanks.map(tank => (
                        <Link key={tank.id} to={`/tank/${tank.id}`}>
                          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-2">
                            <span className="font-semibold">{tank.name}</span>
                            <span className="text-xs text-muted-foreground">({tank.year})</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ArrowLeftRight" className="h-6 w-6" />
                Дополнительные разделы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/compare">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon name="BarChart3" className="h-5 w-5 text-primary" />
                        Сравнение танков
                      </CardTitle>
                      <CardDescription>
                        Детальное сравнение характеристик до 3 танков одновременно
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link to="/">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon name="Home" className="h-5 w-5 text-primary" />
                        Главная страница
                      </CardTitle>
                      <CardDescription>
                        Вернуться к главной странице энциклопедии
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Content;
