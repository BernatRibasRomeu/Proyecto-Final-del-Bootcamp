import { useState } from 'react';
import { Heart } from 'lucide-react';

interface DonationFormProps {
  campaignTitle: string;
  onDonate: (amount: number) => Promise<void>;
}

export function DonationForm({ campaignTitle, onDonate }: DonationFormProps) {
  const [amount, setAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const predefinedAmounts = [10, 25, 50, 100];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onDonate(donationAmount);
      setAmount('');
    } catch (err) {
      setError('Failed to process your donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Heart className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900 ml-4">
          Donar suport {campaignTitle}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo para la cantidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantitat a donar (€)
          </label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className={`py-2 px-4 rounded-lg ${
                  amount === preset.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-500 hover:text-white`}
              >
                {preset}€
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Introdueix una altre quantitat"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campo para el nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="El teu nom complet"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campo para el correo electrónico */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correu electrònic
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elteu@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campo para el mensaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Missatge (opcional)
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriu un missatge..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Donar Ara
        </button>
      </form>
    </div>
  );
}