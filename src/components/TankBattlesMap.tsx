import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MapLocation {
  id: string;
  name: string;
  type: 'battle' | 'museum';
  coordinates: [number, number];
  year?: string;
  description: string;
  details: string;
  casualties?: string;
  tanks?: string;
}

const createCustomIcon = (type: 'battle' | 'museum') => {
  const iconHtml = type === 'battle'
    ? `<div style="background: #8B0000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
         </svg>
       </div>`
    : `<div style="background: #E74C3C; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
           <circle cx="12" cy="10" r="3"/>
         </svg>
       </div>`;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const TankBattlesMap = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'battle' | 'museum'>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([55.7558, 37.6173]);

  const locations: MapLocation[] = [
    {
      id: 'kursk',
      name: 'Курская дуга',
      type: 'battle',
      coordinates: [51.7373, 36.1873],
      year: '1943',
      description: 'Крупнейшее танковое сражение в истории',
      details: 'Битва под Курском стала переломным моментом Второй мировой войны. В сражении участвовало более 6000 танков с обеих сторон.',
      casualties: 'Потери: СССР ~860 тыс., Германия ~500 тыс.',
      tanks: 'Задействовано: СССР - 3600 танков, Германия - 2700 танков'
    },
    {
      id: 'prokhorovka',
      name: 'Прохоровка',
      type: 'battle',
      coordinates: [51.0458, 37.7058],
      year: '1943',
      description: 'Крупнейшее встречное танковое сражение',
      details: 'Битва под Прохоровкой - часть Курской битвы. Столкнулись сотни танков Т-34 и немецких Тигров и Пантер.',
      casualties: 'Потери танков: СССР ~300, Германия ~70',
      tanks: 'В бою: СССР - 500+ танков, Германия - 300+ танков'
    },
    {
      id: 'moscow',
      name: 'Битва за Москву',
      type: 'battle',
      coordinates: [55.7558, 37.6173],
      year: '1941',
      description: 'Оборона столицы СССР',
      details: 'Первое крупное поражение вермахта. Советские танковые части сыграли ключевую роль в контрнаступлении.',
      casualties: 'Потери: СССР ~1.8 млн, Германия ~500 тыс.',
      tanks: 'Участвовало: ~1000 советских танков'
    },
    {
      id: 'stalingrad',
      name: 'Сталинградская битва',
      type: 'battle',
      coordinates: [48.7080, 44.5133],
      year: '1942-1943',
      description: 'Окружение армии Паулюса',
      details: 'Танковые корпуса сыграли решающую роль в операции "Уран" - окружении 6-й армии вермахта.',
      casualties: 'Потери: СССР ~1.1 млн, Германия ~840 тыс.',
      tanks: 'Окружение: 1100+ советских танков'
    },
    {
      id: 'museum-kubinka',
      name: 'Музей бронетанковой техники',
      type: 'museum',
      coordinates: [55.5694, 36.7108],
      description: 'Кубинка, Московская область',
      details: 'Крупнейшая в мире коллекция танков и бронетехники. Более 350 единиц из 14 стран мира. Уникальные экспонаты: немецкий Маус, Тигр, советские ИС-3, Т-34.',
      tanks: 'Экспонатов: 350+ единиц техники'
    },
    {
      id: 'museum-t34',
      name: 'Музей танка Т-34',
      type: 'museum',
      coordinates: [55.6928, 37.7503],
      description: 'Деревня Шолохово',
      details: 'Единственный в России музей, полностью посвященный легендарному танку Т-34. Открыт в 2001 году на месте где остановили немцев в 1941.',
      tanks: 'Коллекция: 50+ единиц техники, все модификации Т-34'
    },
    {
      id: 'museum-leningrad',
      name: 'Музей "Прорыв блокады Ленинграда"',
      type: 'museum',
      coordinates: [59.8469, 31.0187],
      description: 'Кировский район, Ленинградская область',
      details: 'Музей на месте прорыва блокады. Экспозиция включает настоящие танки, участвовавшие в боях за Ленинград.',
      tanks: 'Экспонаты: танки КВ-1, Т-34, артиллерия'
    },
    {
      id: 'museum-sevastopol',
      name: 'Музей героической обороны Севастополя',
      type: 'museum',
      coordinates: [44.6054, 33.5229],
      description: 'Севастополь, Крым',
      details: 'Музей с уникальной экспозицией военной техники периода обороны Севастополя 1941-1942 и освобождения 1944.',
      tanks: 'Выставка под открытым небом: танки, САУ, артиллерия'
    },
    {
      id: 'khalkhin-gol',
      name: 'Халхин-Гол',
      type: 'battle',
      coordinates: [47.7383, 118.6617],
      year: '1939',
      description: 'Первое массовое применение советских танков',
      details: 'Победа Красной Армии над Японией. Танки БТ-7 показали превосходство советской тактики.',
      casualties: 'Потери: СССР ~9.7 тыс., Япония ~18 тыс.',
      tanks: 'Участвовало: 500+ советских танков БТ'
    }
  ];

  const filteredLocations = locations.filter(loc => 
    activeFilter === 'all' || loc.type === activeFilter
  );

  const handleLocationClick = (coordinates: [number, number]) => {
    setMapCenter(coordinates);
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all" className="gap-2">
            <Icon name="Globe" className="h-4 w-4" />
            Все
          </TabsTrigger>
          <TabsTrigger value="battle" className="gap-2">
            <Icon name="Shield" className="h-4 w-4" />
            Сражения
          </TabsTrigger>
          <TabsTrigger value="museum" className="gap-2">
            <Icon name="MapPin" className="h-4 w-4" />
            Музеи
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border-4 border-border shadow-2xl">
          <MapContainer
            center={mapCenter}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <MapController center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={createCustomIcon(location.type)}
              >
                <Popup maxWidth={300}>
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={location.type === 'battle' ? 'destructive' : 'default'}>
                        {location.type === 'battle' ? 'Сражение' : 'Музей'}
                      </Badge>
                      {location.year && <Badge variant="outline">{location.year}</Badge>}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{location.description}</p>
                    <p className="text-xs">{location.details}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#8B0000] border-2 border-white" />
              <span className="text-sm">Сражения</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-4 h-4 rounded-full bg-[#E74C3C] border-2 border-white" />
              <span className="text-sm">Музеи</span>
            </div>
          </div>

          {filteredLocations.map((location) => (
            <Card
              key={location.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLocationClick(location.coordinates)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base">{location.name}</CardTitle>
                    <CardDescription className="text-xs">{location.description}</CardDescription>
                  </div>
                  <Badge variant={location.type === 'battle' ? 'destructive' : 'default'}>
                    {location.year || 'Музей'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{location.details}</p>
                {location.casualties && (
                  <div className="flex items-start gap-2 text-xs mb-1">
                    <Icon name="Users" className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{location.casualties}</span>
                  </div>
                )}
                {location.tanks && (
                  <div className="flex items-start gap-2 text-xs">
                    <Icon name="Shield" className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{location.tanks}</span>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClick(location.coordinates);
                  }}
                >
                  <Icon name="MapPin" className="mr-2 h-3 w-3" />
                  Показать на карте
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TankBattlesMap;
