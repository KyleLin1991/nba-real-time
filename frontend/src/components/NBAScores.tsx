import React, { useEffect, useState } from 'react';
import NBABox from './NBABox';
import type { Game } from '../types/nba';
import axios from 'axios';
import { teamChineseNames } from '../records/teamNames';
import { gameStatusChinese } from '../records/gameStatus';

const statusColor = (status: string) => {
  if (status.toLowerCase().includes('finished'))
    return 'bg-red-600 text-white';
  if (status.toLowerCase().includes('progress') || status.toLowerCase().includes('live'))
    return 'bg-green-600 text-white';

  return 'bg-gray-400 text-white';
};

const NBAScores: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

        const result = await axios.get(`${import.meta.env.VITE_API_URL}/games/${today}`);
        console.log(result); // 印出來看是否有成功讀到 .env 的值

        setGames(result.data.response);
        setLoading(false);
      } catch (error) {
        console.error('error fetching scores:', error);
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  // 回上一頁功能（僅當有上一頁時顯示）
  const handleBack = () => {
    setSelectedGame(null);
  };

  if (loading) return <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 z-50"><div className="text-xl font-bold text-gray-700">Loading scores...</div></div>;
  if (selectedGame) return <NBABox game={selectedGame} onBack={handleBack} />;

  return (
    <div className="fixed inset-0 min-h-screen min-w-full bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 overflow-auto">
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-wide drop-shadow">NBA 比分總覽</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-7xl w-full mx-auto">
          {games.map(game => (
            <div
              key={game.id}
              className="bg-white rounded-2xl shadow-xl p-0 flex flex-col border-4 border-gray-200 cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedGame(game)}
              style={{ maxWidth: 540 }}
            >
              <div className="flex flex-row items-stretch w-full px-10 py-8 gap-8">
                {/* Away Team */}
                <div className="flex-1 flex flex-col items-center">
                  <img src={game.teams.visitors.logo} alt={game.teams.visitors.name} className="w-16 h-16 mb-2" />
                  <span className="text-lg md:text-xl font-bold text-gray-700 mb-1 whitespace-nowrap">{teamChineseNames[game.teams.visitors.code] || game.teams.visitors.code}</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{game.scores.visitors.points}</span>
                </div>
                {/* VS & 狀態 */}
                <div className="flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-gray-500 mb-2">VS</span>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs md:text-sm ${statusColor(game.status.long)}`}>
                    {gameStatusChinese[game.status.long] || game.status.long}
                  </span>
                </div>
                {/* Home Team */}
                <div className="flex-1 flex flex-col items-center">
                  <img src={game.teams.home.logo} alt={game.teams.home.name} className="w-16 h-16 mb-2" />
                  <span className="text-lg md:text-xl font-bold text-gray-700 mb-1 whitespace-nowrap">{teamChineseNames[game.teams.home.code] || game.teams.home.code}</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{game.scores.home.points}</span>
                </div>
              </div>
              {/* Quarters Table 雙方比分 */}
              <div className="overflow-x-auto w-full px-10 pb-6">
                <table className="min-w-full text-center border-t border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-1 text-xs md:text-sm text-gray-500 font-semibold"></th>
                      {game.scores.home.linescore.map((_, idx) => (
                        <th key={idx} className="px-3 py-1 text-xs md:text-sm text-gray-500 font-semibold">Q{idx + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-1 font-bold text-gray-700 whitespace-nowrap">{teamChineseNames[game.teams.visitors.code] || game.teams.visitors.code}</td>
                      {game.scores.visitors.linescore.map((score, idx) => (
                        <td key={idx} className="px-3 py-1 text-base md:text-lg font-bold text-gray-800">{score}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-3 py-1 font-bold text-gray-700 whitespace-nowrap">{teamChineseNames[game.teams.home.code] || game.teams.home.code}</td>
                      {game.scores.home.linescore.map((score, idx) => (
                        <td key={idx} className="px-3 py-1 text-base md:text-lg font-bold text-gray-800">{score}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NBAScores;
