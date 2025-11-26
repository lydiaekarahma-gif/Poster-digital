import React, { useState } from 'react';
import { ABCDItem } from '../types';
import { Dumbbell, Weight, Stethoscope, Apple, ChevronDown, ChevronUp } from 'lucide-react';

const abcdData: ABCDItem[] = [
  {
    id: 'A',
    letter: 'A',
    title: 'Aktivitas Olahraga',
    description: 'Gerak aktif untuk jantung sehat.',
    details: [
      'Lakukan aktivitas rutin minimal 30 menit sehari.',
      'Jalankan hobi untuk menurunkan tingkat stres.',
      'Olahraga ringan seperti jalan kaki sangat dianjurkan.'
    ],
    color: 'bg-orange-500',
    iconName: 'dumbbell'
  },
  {
    id: 'B',
    letter: 'B',
    title: 'Berat Badan Ideal',
    description: 'Cegah obesitas, cegah hipertensi.',
    details: [
      'Obesitas adalah faktor risiko utama hipertensi.',
      'Jaga berat badan untuk menghindari kolesterol tinggi.',
      'Mencegah diabetes yang memperparah risiko jantung.'
    ],
    color: 'bg-green-500',
    iconName: 'weight'
  },
  {
    id: 'C',
    letter: 'C',
    title: 'Cek Tekanan Darah',
    description: 'Ketahui angkanya, cegah dan atasi.',
    details: [
      'Hipertensi jika tekanan darah ≥ 140/90 mmHg.',
      'Cek rutin di rumah atau Puskesmas.',
      'Hipertensi merusak jantung, ginjal, dan otak.'
    ],
    color: 'bg-blue-600',
    iconName: 'stethoscope'
  },
  {
    id: 'D',
    letter: 'D',
    title: 'Diet Sehat',
    description: 'Atur pola makan, kurangi garam.',
    details: [
      'Perbanyak makan buah dan sayur.',
      'Batasi garam maksimal 1 sendok teh (6 gram) per hari.',
      'Hindari konsumsi alkohol dan penyedap rasa berlebih.'
    ],
    color: 'bg-yellow-500',
    iconName: 'apple'
  }
];

const IconMap = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'dumbbell': return <Dumbbell className={className} />;
    case 'weight': return <Weight className={className} />;
    case 'stethoscope': return <Stethoscope className={className} />;
    case 'apple': return <Apple className={className} />;
    default: return null;
  }
};

const ABCDCards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">4 Kiat Anti Hipertensi</h1>
        <p className="text-gray-600">Ingat rumusnya: <span className="font-bold text-red-600">A - B - C - D</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {abcdData.map((item) => (
          <div 
            key={item.id}
            className={`relative overflow-hidden rounded-2xl shadow-md border border-gray-100 transition-all duration-300 ${expandedId === item.id ? 'ring-2 ring-offset-2 ring-red-400' : 'hover:shadow-lg'}`}
          >
            {/* Header Card */}
            <div 
              onClick={() => toggleExpand(item.id)}
              className="bg-white p-5 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shadow-sm shrink-0`}>
                  {item.letter}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="text-gray-400">
                {expandedId === item.id ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* Expanded Content */}
            <div className={`bg-gray-50 px-5 transition-all duration-300 ease-in-out ${expandedId === item.id ? 'max-h-64 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
              <div className="flex items-start gap-4">
                <div className="text-gray-400 mt-1">
                   <IconMap name={item.iconName} className="w-6 h-6" />
                </div>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-700 leading-relaxed list-disc list-outside ml-4">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 p-6 rounded-xl border border-red-100 mt-8">
        <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          Penting Diketahui!
        </h4>
        <p className="text-sm text-red-700 leading-relaxed">
          Hipertensi sering disebut <em>"The Silent Killer"</em> karena sering muncul tanpa gejala. 
          Pastikan Anda mengecek tekanan darah secara rutin. Jika angka menunjukkan <strong>≥ 140/90 mmHg</strong>, segera konsultasikan ke PUSKESMAS terdekat.
        </p>
      </div>
    </div>
  );
};

export default ABCDCards;