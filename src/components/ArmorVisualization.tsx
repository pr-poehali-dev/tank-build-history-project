import { useState, useEffect } from 'react';
import { TankSpecs } from '@/data/tanks';
import { Badge } from './ui/badge';

interface ArmorVisualizationProps {
  tank: TankSpecs;
}

export const ArmorVisualization = ({ tank }: ArmorVisualizationProps) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getArmorColor = (thickness: number): string => {
    if (thickness >= 600) return '#DC2626';
    if (thickness >= 400) return '#EA580C';
    if (thickness >= 200) return '#D97706';
    if (thickness >= 100) return '#CA8A04';
    if (thickness >= 50) return '#65A30D';
    return '#16A34A';
  };

  const armorZones = [
    { id: 'front', label: 'Лоб корпуса', thickness: tank.armorFront, x: 200, y: 250, width: 80, height: 120 },
    { id: 'side', label: 'Борт', thickness: tank.armorSide, x: 100, y: 250, width: 90, height: 120 },
    { id: 'rear', label: 'Корма', thickness: tank.armorRear, x: 10, y: 260, width: 80, height: 100 },
    { id: 'turret-front', label: 'Лоб башни', thickness: tank.armorTurretFront, x: 210, y: 180, width: 60, height: 60 },
    { id: 'turret-side', label: 'Борт башни', thickness: tank.armorTurretSide, x: 130, y: 190, width: 70, height: 50 },
    { id: 'top', label: 'Крыша', thickness: tank.armorTop, x: 200, y: 160, width: 80, height: 15 },
  ];

  return (
    <div className="relative w-full">
      <div className="aspect-[4/3] bg-gradient-to-b from-secondary/20 to-secondary/5 rounded-lg overflow-hidden border-2 border-border relative">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="tankBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>

          <g transform={`rotate(${rotation} 200 250)`}>
            <rect
              x="10"
              y="260"
              width="80"
              height="100"
              fill={getArmorColor(tank.armorRear)}
              stroke="#1e293b"
              strokeWidth="3"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('rear')}
              onMouseLeave={() => setActiveZone(null)}
              filter="url(#shadow)"
            />
            <text x="50" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {tank.armorRear}
            </text>

            <rect
              x="100"
              y="250"
              width="90"
              height="120"
              fill={getArmorColor(tank.armorSide)}
              stroke="#1e293b"
              strokeWidth="3"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('side')}
              onMouseLeave={() => setActiveZone(null)}
              filter="url(#shadow)"
            />
            <text x="145" y="315" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              {tank.armorSide}
            </text>

            <rect
              x="200"
              y="250"
              width="80"
              height="120"
              fill={getArmorColor(tank.armorFront)}
              stroke="#1e293b"
              strokeWidth="4"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('front')}
              onMouseLeave={() => setActiveZone(null)}
              filter="url(#shadow)"
            />
            <text x="240" y="315" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
              {tank.armorFront}
            </text>

            <rect
              x="200"
              y="160"
              width="80"
              height="15"
              fill={getArmorColor(tank.armorTop)}
              stroke="#1e293b"
              strokeWidth="2"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('top')}
              onMouseLeave={() => setActiveZone(null)}
            />

            <ellipse
              cx="240"
              cy="210"
              rx="50"
              ry="50"
              fill={getArmorColor(tank.armorTurretFront)}
              stroke="#1e293b"
              strokeWidth="3"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('turret-front')}
              onMouseLeave={() => setActiveZone(null)}
              filter="url(#shadow)"
            />
            <text x="240" y="218" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
              {tank.armorTurretFront}
            </text>

            <ellipse
              cx="170"
              cy="215"
              rx="45"
              ry="40"
              fill={getArmorColor(tank.armorTurretSide)}
              stroke="#1e293b"
              strokeWidth="3"
              className="cursor-pointer transition-all hover:opacity-80"
              onMouseEnter={() => setActiveZone('turret-side')}
              onMouseLeave={() => setActiveZone(null)}
              filter="url(#shadow)"
            />
            <text x="170" y="222" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {tank.armorTurretSide}
            </text>

            <rect x="290" y="280" width="40" height="60" fill="url(#tankBody)" stroke="#1e293b" strokeWidth="2"/>
            <circle cx="120" cy="375" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
            <circle cx="160" cy="375" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
            <circle cx="200" cy="375" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
            <circle cx="240" cy="375" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
            <circle cx="260" cy="375" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>

            <rect x="295" y="195" width="60" height="8" fill="#1e293b" stroke="#64748b" strokeWidth="1"/>
          </g>
        </svg>

        {activeZone && (
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border-2 border-border">
            {armorZones.find(z => z.id === activeZone) && (
              <>
                <p className="font-bold text-sm">
                  {armorZones.find(z => z.id === activeZone)?.label}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {armorZones.find(z => z.id === activeZone)?.thickness} мм
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#16A34A' }} />
          &lt;50 мм
        </Badge>
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#65A30D' }} />
          50-100 мм
        </Badge>
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#CA8A04' }} />
          100-200 мм
        </Badge>
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D97706' }} />
          200-400 мм
        </Badge>
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EA580C' }} />
          400-600 мм
        </Badge>
        <Badge variant="outline" className="gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#DC2626' }} />
          &gt;600 мм
        </Badge>
      </div>
    </div>
  );
};
