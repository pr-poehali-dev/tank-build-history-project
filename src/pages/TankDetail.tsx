import { useParams, Link } from 'react-router-dom';
import { getTankById } from '@/data/tanks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

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

  const typeLabels: Record<string, string> = {
    light: 'Легкий танк',
    medium: 'Средний танк',
    heavy: 'Тяжелый танк',
    'tank-destroyer': 'ПТ-САУ',
    modern: 'ОБТ'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/#tanks">
          <Button variant="ghost" className="mb-6">
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Назад к списку танков
          </Button>
        </Link>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <CardTitle className="text-4xl mb-3">{tank.name}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-base">{tank.country}</Badge>
                    <Badge className="text-base">{tank.year}</Badge>
                    <Badge variant="secondary" className="text-base">{typeLabels[tank.type]}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                <img 
                  src={tank.image} 
                  alt={tank.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold">{tank.weight} т</div>
                  <div className="text-sm text-muted-foreground">Масса</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold">{tank.crew} чел.</div>
                  <div className="text-sm text-muted-foreground">Экипаж</div>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="text-2xl font-bold">{tank.produced.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Произведено</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" className="h-5 w-5" />
                История создания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tank.history}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Crosshair" className="h-5 w-5" />
                Боевое применение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tank.combatUse}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wrench" className="h-5 w-5" />
                Технические детали
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                {tank.technicalDetails}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="Shield" className="h-5 w-5 text-primary" />
                    Бронирование
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Лоб корпуса:</span>
                      <span className="font-bold">{tank.armorFront} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Борт корпуса:</span>
                      <span className="font-bold">{tank.armorSide} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Корма:</span>
                      <span className="font-bold">{tank.armorRear} мм</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Лоб башни:</span>
                      <span className="font-bold">{tank.armorTurretFront} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Борт башни:</span>
                      <span className="font-bold">{tank.armorTurretSide} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Крыша:</span>
                      <span className="font-bold">{tank.armorTop} мм</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="Target" className="h-5 w-5 text-primary" />
                    Вооружение
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Орудие:</span>
                      <span className="font-bold text-xs">{tank.mainGun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Калибр:</span>
                      <span className="font-bold">{tank.gunCaliber} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Пробитие (500м):</span>
                      <span className="font-bold">{tank.penetration} мм</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Скорострельность:</span>
                      <span className="font-bold">{tank.rateOfFire} выстр/мин</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Боекомплект:</span>
                      <span className="font-bold">{tank.ammunition} снарядов</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="Gauge" className="h-5 w-5 text-primary" />
                    Подвижность
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Двигатель:</span>
                      <span className="font-bold text-xs">{tank.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Мощность:</span>
                      <span className="font-bold">{tank.horsepower} л.с.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Скорость:</span>
                      <span className="font-bold">{tank.speed} км/ч</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Запас хода:</span>
                      <span className="font-bold">{tank.range} км</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Удельная мощность:</span>
                      <span className="font-bold">{tank.powerToWeight} л.с./т</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <Icon name="Ruler" className="h-5 w-5 text-primary" />
                    Габариты
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Длина:</span>
                      <span className="font-bold">{tank.length} м</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ширина:</span>
                      <span className="font-bold">{tank.width} м</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Высота:</span>
                      <span className="font-bold">{tank.height} м</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Период службы:</span>
                      <span className="font-bold text-xs">{tank.inService}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="GitBranch" className="h-5 w-5" />
                Модификации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tank.modifications}
              </p>
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

          <div className="flex gap-4 justify-center mt-4">
            <Link to="/compare">
              <Button size="lg" className="gap-2">
                <Icon name="ArrowLeftRight" className="h-5 w-5" />
                Сравнить с другими танками
              </Button>
            </Link>
            <Link to="/#tanks">
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="List" className="h-5 w-5" />
                Все танки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankDetail;
