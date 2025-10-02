import { useParams, Link } from 'react-router-dom';
import { getTankById } from '@/data/tanks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { ArmorVisualization } from '@/components/ArmorVisualization';
import { PenetrationAnimation } from '@/components/PenetrationAnimation';

const TankDetail = () => {
  const { id } = useParams<{ id: string }>();
  const tank = id ? getTankById(id) : undefined;

  if (!tank) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">Танк не найден</p>
            <Link to="/#tanks">
              <Button className="w-full mt-4">Вернуться к списку</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxArmor = 1000;
  const maxSpeed = 80;
  const maxPenetration = 800;
  const maxHorsepower = 1600;

  const typeLabels: Record<string, string> = {
    light: 'Легкий',
    medium: 'Средний',
    heavy: 'Тяжелый',
    'tank-destroyer': 'ПТ-САУ',
    modern: 'ОБТ'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <Link to="/#tanks">
          <Button variant="ghost" className="mb-6">
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Назад к списку танков
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-4xl mb-2">{tank.name}</CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-lg">{tank.country}</Badge>
                      <Badge className="text-lg">{tank.year}</Badge>
                      <Badge variant="secondary" className="text-lg">{typeLabels[tank.type]}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Основные характеристики</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Вес:</span>
                <span className="font-bold">{tank.weight} т</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Экипаж:</span>
                <span className="font-bold">{tank.crew} чел.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Произведено:</span>
                <span className="font-bold">{tank.produced.toLocaleString()} шт.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Годы службы:</span>
                <span className="font-bold text-xs">{tank.inService}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="armor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="armor">
              <Icon name="Shield" className="h-4 w-4 mr-2" />
              Броня
            </TabsTrigger>
            <TabsTrigger value="weapon">
              <Icon name="Target" className="h-4 w-4 mr-2" />
              Вооружение
            </TabsTrigger>
            <TabsTrigger value="mobility">
              <Icon name="Gauge" className="h-4 w-4 mr-2" />
              Подвижность
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="Book" className="h-4 w-4 mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="penetration">
              <Icon name="Crosshair" className="h-4 w-4 mr-2" />
              Пробитие
            </TabsTrigger>
          </TabsList>

          <TabsContent value="armor" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>3D Схема бронирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <ArmorVisualization tank={tank} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Толщина брони</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Лоб корпуса</span>
                      <span className="font-bold">{tank.armorFront} мм</span>
                    </div>
                    <Progress value={(tank.armorFront / maxArmor) * 100} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Борт корпуса</span>
                      <span className="font-bold">{tank.armorSide} мм</span>
                    </div>
                    <Progress value={(tank.armorSide / maxArmor) * 100} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Корма корпуса</span>
                      <span className="font-bold">{tank.armorRear} мм</span>
                    </div>
                    <Progress value={(tank.armorRear / maxArmor) * 100} className="h-3" />
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Лоб башни</span>
                      <span className="font-bold">{tank.armorTurretFront} мм</span>
                    </div>
                    <Progress value={(tank.armorTurretFront / maxArmor) * 100} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Борт башни</span>
                      <span className="font-bold">{tank.armorTurretSide} мм</span>
                    </div>
                    <Progress value={(tank.armorTurretSide / maxArmor) * 100} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Крыша</span>
                      <span className="font-bold">{tank.armorTop} мм</span>
                    </div>
                    <Progress value={(tank.armorTop / maxArmor) * 100} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weapon" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основное орудие</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Орудие:</span>
                    <span className="font-bold">{tank.mainGun}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Калибр:</span>
                    <span className="font-bold">{tank.gunCaliber} мм</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Боекомплект:</span>
                    <span className="font-bold">{tank.ammunition} снарядов</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Скорострельность:</span>
                    <span className="font-bold">{tank.rateOfFire} выстр/мин</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Бронепробиваемость</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Пробитие на 500м</span>
                      <span className="font-bold">{tank.penetration} мм</span>
                    </div>
                    <Progress value={(tank.penetration / maxPenetration) * 100} className="h-4" />
                  </div>
                  <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {tank.penetration > 600 ? 
                        'Способно пробить любую современную броню' :
                        tank.penetration > 400 ?
                        'Эффективно против большинства целей' :
                        tank.penetration > 150 ?
                        'Пробивает средние и легкие танки' :
                        'Эффективно против легкобронированных целей'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mobility" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Двигатель и скорость</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Двигатель:</span>
                    <span className="font-bold text-sm">{tank.engine}</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Мощность:</span>
                      <span className="font-bold">{tank.horsepower} л.с.</span>
                    </div>
                    <Progress value={(tank.horsepower / maxHorsepower) * 100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Макс. скорость:</span>
                      <span className="font-bold">{tank.speed} км/ч</span>
                    </div>
                    <Progress value={(tank.speed / maxSpeed) * 100} className="h-3" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Запас хода:</span>
                    <span className="font-bold">{tank.range} км</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Удельная мощность:</span>
                    <span className="font-bold">{tank.powerToWeight} л.с./т</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Габариты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Длина:</span>
                    <span className="font-bold">{tank.length} м</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ширина:</span>
                    <span className="font-bold">{tank.width} м</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Высота:</span>
                    <span className="font-bold">{tank.height} м</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Экипаж:</span>
                    <span className="font-bold">{tank.crew} человек</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>История создания</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tank.history}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Боевое применение</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tank.combatUse}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="h-5 w-5 text-green-500" />
                      Преимущества
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tank.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon name="Plus" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="XCircle" className="h-5 w-5 text-red-500" />
                      Недостатки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tank.disadvantages.map((disadvantage, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon name="Minus" className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="penetration">
            <Card>
              <CardHeader>
                <CardTitle>Анимация пробития брони</CardTitle>
              </CardHeader>
              <CardContent>
                <PenetrationAnimation tank={tank} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Link to="/compare">
            <Button size="lg" className="gap-2">
              <Icon name="ArrowLeftRight" className="h-5 w-5" />
              Сравнить с другими танками
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TankDetail;
