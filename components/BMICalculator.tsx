import React, { useState } from 'react';
import { RefreshCcw, Info } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');
  const [color, setColor] = useState<string>('bg-gray-100');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) {
        setStatus('Kekurangan Berat Badan');
        setColor('bg-yellow-100 text-yellow-800 border-yellow-200');
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus('Berat Badan Ideal (Normal)');
        setColor('bg-green-100 text-green-800 border-green-200');
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus('Kelebihan Berat Badan');
        setColor('bg-orange-100 text-orange-800 border-orange-200');
      } else {
        setStatus('Obesitas');
        setColor('bg-red-100 text-red-800 border-red-200');
      }
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
    setColor('bg-gray-100');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kalkulator BMI</h2>
        <p className="text-sm text-gray-500 mt-1">Cek apakah berat badan Anda ideal (Poin B)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Berat Badan (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Contoh: 65"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tinggi Badan (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Contoh: 170"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md mt-2"
        >
          Hitung Sekarang
        </button>
      </div>

      {bmi !== null && (
        <div className={`mt-6 p-4 rounded-xl border ${color} text-center animate-fade-in`}>
          <p className="text-sm opacity-80 uppercase tracking-wide font-semibold">Hasil BMI Anda</p>
          <div className="text-4xl font-bold my-2">{bmi}</div>
          <div className="font-medium text-lg">{status}</div>
          
          <div className="mt-3 text-xs opacity-75 flex items-start justify-center gap-1">
             <Info size={14} className="mt-0.5" />
             <p>Jaga BMI di rentang 18.5 - 24.9 untuk mencegah hipertensi.</p>
          </div>
        </div>
      )}

      {bmi !== null && (
        <button 
          onClick={reset}
          className="w-full mt-4 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-2 text-sm"
        >
          <RefreshCcw size={16} /> Hitung Ulang
        </button>
      )}
    </div>
  );
};

export default BMICalculator;