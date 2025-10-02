import { useState, useEffect } from 'react';
import { TankSpecs } from '@/data/tanks';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Icon from './ui/icon';

interface PenetrationAnimationProps {
  tank: TankSpecs;
}

export const PenetrationAnimation = ({ tank }: PenetrationAnimationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shellPosition, setShellPosition] = useState({ x: 50, y: 200 });
  const [impactStage, setImpactStage] = useState(0);
  const [selectedTarget, setSelectedTarget] = useState<'front' | 'side' | 'turret'>('front');

  const targets = {
    front: { armor: tank.armorFront, label: 'Лоб корпуса', x: 450, y: 200 },
    side: { armor: tank.armorSide, label: 'Борт', x: 450, y: 200 },
    turret: { armor: tank.armorTurretFront, label: 'Башня', x: 450, y: 150 },
  };

  const currentTarget = targets[selectedTarget];
  const canPenetrate = tank.penetration >= currentTarget.armor;

  useEffect(() => {
    if (isAnimating) {
      const duration = 2000;
      const frames = 60;
      const frameTime = duration / frames;
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        const progress = frame / frames;

        if (progress < 0.5) {
          setShellPosition({
            x: 50 + (currentTarget.x - 100) * (progress * 2),
            y: currentTarget.y,
          });
        } else if (progress < 0.6) {
          setImpactStage(1);
        } else if (progress < 0.75) {
          setImpactStage(2);
        } else if (progress < 0.9) {
          setImpactStage(canPenetrate ? 3 : 4);
        } else {
          setImpactStage(0);
          setIsAnimating(false);
          setShellPosition({ x: 50, y: currentTarget.y });
        }

        if (frame >= frames) {
          clearInterval(interval);
        }
      }, frameTime);

      return () => clearInterval(interval);
    }
  }, [isAnimating, currentTarget, canPenetrate]);

  const startAnimation = () => {
    if (!isAnimating) {
      setImpactStage(0);
      setShellPosition({ x: 50, y: currentTarget.y });
      setIsAnimating(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          variant={selectedTarget === 'front' ? 'default' : 'outline'}
          onClick={() => setSelectedTarget('front')}
          disabled={isAnimating}
        >
          Лоб корпуса ({tank.armorFront} мм)
        </Button>
        <Button
          variant={selectedTarget === 'side' ? 'default' : 'outline'}
          onClick={() => setSelectedTarget('side')}
          disabled={isAnimating}
        >
          Борт ({tank.armorSide} мм)
        </Button>
        <Button
          variant={selectedTarget === 'turret' ? 'default' : 'outline'}
          onClick={() => setSelectedTarget('turret')}
          disabled={isAnimating}
        >
          Башня ({tank.armorTurretFront} мм)
        </Button>
      </div>

      <div className="relative w-full aspect-[16/9] bg-gradient-to-r from-secondary/20 via-background to-secondary/20 rounded-lg border-2 border-border overflow-hidden">
        <svg viewBox="0 0 600 400" className="w-full h-full">
          <defs>
            <linearGradient id="gunBarrel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <radialGradient id="explosion" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="armor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          <rect x="20" y={currentTarget.y - 30} width="80" height="60" rx="5" fill="url(#gunBarrel)" stroke="#0f172a" strokeWidth="2"/>
          <rect x="80" y={currentTarget.y - 15} width="40" height="30" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1"/>
          
          <text x="60" y={currentTarget.y - 40} textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
            {tank.name}
          </text>
          <text x="60" y={currentTarget.y - 25} textAnchor="middle" fill="currentColor" fontSize="10">
            Пробитие: {tank.penetration} мм
          </text>

          <g transform={`translate(${currentTarget.x}, ${selectedTarget === 'turret' ? currentTarget.y + 20 : currentTarget.y})`}>
            {selectedTarget === 'turret' ? (
              <>
                <circle cx="0" cy="0" r="40" fill="url(#armor)" stroke="#0f172a" strokeWidth="3"/>
                <rect x="-10" y="-5" width="50" height="10" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
              </>
            ) : (
              <rect x="-30" y="-60" width="60" height="120" fill="url(#armor)" stroke="#0f172a" strokeWidth="3"/>
            )}
          </g>

          <text x={currentTarget.x} y={selectedTarget === 'turret' ? currentTarget.y + 90 : currentTarget.y + 80} 
                textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
            {currentTarget.label}
          </text>
          <text x={currentTarget.x} y={selectedTarget === 'turret' ? currentTarget.y + 105 : currentTarget.y + 95} 
                textAnchor="middle" fill="currentColor" fontSize="10">
            Броня: {currentTarget.armor} мм
          </text>

          {isAnimating && (
            <>
              <circle
                cx={shellPosition.x}
                cy={shellPosition.y}
                r="5"
                fill="#dc2626"
                stroke="#7f1d1d"
                strokeWidth="2"
              />
              <rect
                x={shellPosition.x - 15}
                y={shellPosition.y - 2}
                width="10"
                height="4"
                fill="#fbbf24"
                opacity="0.6"
              />
            </>
          )}

          {impactStage === 1 && (
            <circle
              cx={currentTarget.x - 30}
              cy={currentTarget.y}
              r="20"
              fill="url(#explosion)"
              opacity="0.8"
            />
          )}

          {impactStage === 2 && (
            <>
              <circle cx={currentTarget.x - 30} cy={currentTarget.y} r="35" fill="url(#explosion)" opacity="0.6"/>
              <circle cx={currentTarget.x - 30} cy={currentTarget.y} r="25" fill="#fbbf24" opacity="0.4"/>
            </>
          )}

          {impactStage === 3 && canPenetrate && (
            <>
              <circle cx={currentTarget.x - 30} cy={currentTarget.y} r="40" fill="url(#explosion)" opacity="0.4"/>
              <line x1={currentTarget.x - 30} y1={currentTarget.y} x2={currentTarget.x + 40} y2={currentTarget.y} 
                    stroke="#dc2626" strokeWidth="4" strokeDasharray="5,5"/>
              <circle cx={currentTarget.x + 40} cy={currentTarget.y} r="20" fill="#dc2626" opacity="0.6"/>
              <text x={currentTarget.x} y={currentTarget.y + 150} textAnchor="middle" fill="#dc2626" 
                    fontSize="20" fontWeight="bold">
                ПРОБИТИЕ!
              </text>
            </>
          )}

          {impactStage === 4 && !canPenetrate && (
            <>
              <circle cx={currentTarget.x - 30} cy={currentTarget.y} r="30" fill="url(#explosion)" opacity="0.3"/>
              <path d={`M ${currentTarget.x - 35} ${currentTarget.y - 10} Q ${currentTarget.x - 40} ${currentTarget.y - 30} ${currentTarget.x - 50} ${currentTarget.y - 35}`}
                    stroke="#64748b" strokeWidth="3" fill="none"/>
              <circle cx={currentTarget.x - 50} cy={currentTarget.y - 35} r="4" fill="#64748b"/>
              <text x={currentTarget.x} y={currentTarget.y + 150} textAnchor="middle" fill="#65a30d" 
                    fontSize="20" fontWeight="bold">
                РИКОШЕТ
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button onClick={startAnimation} disabled={isAnimating} size="lg" className="gap-2">
          {isAnimating ? (
            <>
              <Icon name="Loader2" className="h-5 w-5 animate-spin" />
              Выстрел...
            </>
          ) : (
            <>
              <Icon name="Crosshair" className="h-5 w-5" />
              Выстрелить
            </>
          )}
        </Button>

        <div className="flex gap-2 items-center">
          <Badge variant={canPenetrate ? 'destructive' : 'default'} className="text-lg px-4 py-2">
            {canPenetrate ? (
              <>
                <Icon name="CheckCircle2" className="mr-2 h-5 w-5" />
                Пробивает ({tank.penetration} мм &gt; {currentTarget.armor} мм)
              </>
            ) : (
              <>
                <Icon name="Shield" className="mr-2 h-5 w-5" />
                Не пробивает ({tank.penetration} мм &lt; {currentTarget.armor} мм)
              </>
            )}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-md">
          {canPenetrate 
            ? `Орудие ${tank.name} (${tank.mainGun}) способно пробить ${currentTarget.label.toLowerCase()} с бронированием ${currentTarget.armor} мм`
            : `Орудие ${tank.name} (${tank.mainGun}) не способно пробить ${currentTarget.label.toLowerCase()} с бронированием ${currentTarget.armor} мм - снаряд рикошетирует`
          }
        </p>
      </div>
    </div>
  );
};
