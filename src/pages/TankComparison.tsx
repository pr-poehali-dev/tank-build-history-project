import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tanks, TankSpecs, getAllCountries } from '@/data/tanks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const TankComparison = () => {
  const [tank1, setTank1] = useState<TankSpecs | null>(tanks[0]);
  const [tank2, setTank2] = useState<TankSpecs | null>(tanks[7]);
  const [tank3, setTank3] = useState<TankSpecs | null>(null);

  const compareTanks = [tank1, tank2, tank3].filter(Boolean) as TankSpecs[];

  const maxValues = {
    armorFront: Math.max(...compareTanks.map(t => t.armorFront)),
    armorTurretFront: Math.max(...compareTanks.map(t => t.armorTurretFront)),
    penetration: Math.max(...compareTanks.map(t => t.penetration)),
    speed: Math.max(...compareTanks.map(t => t.speed)),
    horsepower: Math.max(...compareTanks.map(t => t.horsepower)),
    weight: Math.max(...compareTanks.map(t => t.weight)),
    rateOfFire: Math.max(...compareTanks.map(t => t.rateOfFire)),
    powerToWeight: Math.max(...compareTanks.map(t => t.powerToWeight)),
  };

  const typeLabels: Record<string, string> = {
    light: 'Легкий',
    medium: 'Средний',
    heavy: 'Тяжелый',
    'tank-destroyer': 'ПТ-САУ',
    modern: 'ОБТ'
  };

  const ComparisonRow = ({ label, getValue, unit = '', format = 'number' }: { 
    label: string; 
    getValue: (tank: TankSpecs) => number; 
    unit?: string;
    format?: 'number' | 'progress';
  }) => {
    const values = compareTanks.map(getValue);
    const maxValue = Math.max(...values);

    return (
      <div className="grid gap-4 py-3" style={{ gridTemplateColumns: `200px repeat(${compareTanks.length}, 1fr)` }}>
        <div className="font-medium flex items-center">{label}</div>
        {compareTanks.map((tank, idx) => {
          const value = getValue(tank);
          const isMax = value === maxValue && compareTanks.length > 1;
          
          return (
            <div key={tank.id} className={`flex flex-col gap-2 ${isMax ? 'font-bold text-primary' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="text-lg">
                  {value.toLocaleString()} {unit}
                </span>
                {isMax && <Icon name="Crown" className="h-4 w-4 text-yellow-500" />}
              </div>
              {format === 'progress' && (
                <Progress 
                  value={(value / maxValue) * 100} 
                  className="h-2"
                />
              )}
            </div>
          );
        })}
      </div>
    );
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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Сравнение танков</h1>
          <p className="text-muted-foreground">Выберите танки для детального сравнения характеристик</p>
        </div>

        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${Math.min(compareTanks.length + (compareTanks.length < 3 ? 1 : 0), 3)}, 1fr)` }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Танк 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={tank1?.id} onValueChange={(id) => setTank1(tanks.find(t => t.id === id) || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите танк" />
                </SelectTrigger>
                <SelectContent>
                  {tanks.map((tank) => (
                    <SelectItem key={tank.id} value={tank.id}>
                      {tank.name} ({tank.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tank1 && (
                <div className="mt-4">
                  <div className="flex gap-2 flex-wrap mb-2">
                    <Badge variant="outline">{tank1.country}</Badge>
                    <Badge>{tank1.year}</Badge>
                    <Badge variant="secondary">{typeLabels[tank1.type]}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Танк 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={tank2?.id} onValueChange={(id) => setTank2(tanks.find(t => t.id === id) || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите танк" />
                </SelectTrigger>
                <SelectContent>
                  {tanks.map((tank) => (
                    <SelectItem key={tank.id} value={tank.id}>
                      {tank.name} ({tank.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {tank2 && (
                <div className="mt-4">
                  <div className="flex gap-2 flex-wrap mb-2">
                    <Badge variant="outline">{tank2.country}</Badge>
                    <Badge>{tank2.year}</Badge>
                    <Badge variant="secondary">{typeLabels[tank2.type]}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {!tank3 ? (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center h-full pt-6">
                <Button variant="outline" onClick={() => setTank3(tanks[10])}>
                  <Icon name="Plus" className="mr-2 h-4 w-4" />
                  Добавить третий танк
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm text-muted-foreground">Танк 3</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setTank3(null)}>
                  <Icon name="X" className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <Select value={tank3.id} onValueChange={(id) => setTank3(tanks.find(t => t.id === id) || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите танк" />
                  </SelectTrigger>
                  <SelectContent>
                    {tanks.map((tank) => (
                      <SelectItem key={tank.id} value={tank.id}>
                        {tank.name} ({tank.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4">
                  <div className="flex gap-2 flex-wrap mb-2">
                    <Badge variant="outline">{tank3.country}</Badge>
                    <Badge>{tank3.year}</Badge>
                    <Badge variant="secondary">{typeLabels[tank3.type]}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {compareTanks.length >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" className="h-6 w-6" />
                Детальное сравнение
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="grid gap-4 py-4" style={{ gridTemplateColumns: `200px repeat(${compareTanks.length}, 1fr)` }}>
                <div className="font-bold text-lg">Танк</div>
                {compareTanks.map((tank) => (
                  <Link key={tank.id} to={`/tank/${tank.id}`}>
                    <div className="font-bold text-lg hover:text-primary transition-colors cursor-pointer">
                      {tank.name}
                    </div>
                  </Link>
                ))}
              </div>

              <Separator />

              <div className="pt-4">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Shield" className="h-5 w-5" />
                  Бронирование
                </h3>
                <ComparisonRow label="Лоб корпуса" getValue={(t) => t.armorFront} unit="мм" format="progress" />
                <Separator />
                <ComparisonRow label="Борт корпуса" getValue={(t) => t.armorSide} unit="мм" format="progress" />
                <Separator />
                <ComparisonRow label="Лоб башни" getValue={(t) => t.armorTurretFront} unit="мм" format="progress" />
                <Separator />
                <ComparisonRow label="Борт башни" getValue={(t) => t.armorTurretSide} unit="мм" format="progress" />
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Target" className="h-5 w-5" />
                  Вооружение
                </h3>
                <ComparisonRow label="Калибр орудия" getValue={(t) => t.gunCaliber} unit="мм" format="progress" />
                <Separator />
                <ComparisonRow label="Пробитие (500м)" getValue={(t) => t.penetration} unit="мм" format="progress" />
                <Separator />
                <ComparisonRow label="Скорострельность" getValue={(t) => t.rateOfFire} unit="выстр/мин" format="progress" />
                <Separator />
                <ComparisonRow label="Боекомплект" getValue={(t) => t.ammunition} unit="снарядов" format="progress" />
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Gauge" className="h-5 w-5" />
                  Подвижность
                </h3>
                <ComparisonRow label="Мощность двигателя" getValue={(t) => t.horsepower} unit="л.с." format="progress" />
                <Separator />
                <ComparisonRow label="Максимальная скорость" getValue={(t) => t.speed} unit="км/ч" format="progress" />
                <Separator />
                <ComparisonRow label="Удельная мощность" getValue={(t) => t.powerToWeight} unit="л.с./т" format="progress" />
                <Separator />
                <ComparisonRow label="Запас хода" getValue={(t) => t.range} unit="км" format="progress" />
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Info" className="h-5 w-5" />
                  Общие характеристики
                </h3>
                <ComparisonRow label="Вес" getValue={(t) => t.weight} unit="т" />
                <Separator />
                <ComparisonRow label="Экипаж" getValue={(t) => t.crew} unit="чел." />
                <Separator />
                <ComparisonRow label="Произведено" getValue={(t) => t.produced} unit="шт." />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            <Icon name="Crown" className="h-4 w-4 text-yellow-500 inline" /> отмечены лучшие характеристики
          </p>
        </div>
      </div>
    </div>
  );
};

export default TankComparison;
