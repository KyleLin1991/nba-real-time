import React, { useEffect, useState } from 'react';
import type { PlayerStatistics, Team, Scores, Status } from '../types/nba';
import axios from 'axios';
import { teamChineseNames } from '../records/teamNames';
import { gameStatusChinese } from '../records/gameStatus';

const statusColor = (status: string) => {
    if (status.toLowerCase().includes('finished')) return 'bg-red-600 text-white';
    if (status.toLowerCase().includes('progress') || status.toLowerCase().includes('live')) return 'bg-green-600 text-white';
    return 'bg-gray-400 text-white';
};

const playerTableHeaders = [
    '球員', '時間', '得分', '投籃', '三分球', '罰球', '正負值', '進攻籃板', '總籃板', '助攻', '抄截', '阻攻', '失誤', '犯規'
];

interface NBABoxProps {
    gameId: number;
    status: Status;
    teams: {
        visitors: Team;
        home: Team;
    };
    scores: {
        visitors: Scores;
        home: Scores;
    };
    onBack: () => void;
}

const NBABox: React.FC<NBABoxProps> = ({ gameId, teams, scores, status, onBack }) => {
    const [playerStatistics, setPlayerStatistics] = useState<PlayerStatistics[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/players/statistics/${gameId}`);
                setPlayerStatistics(result.data.response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching game details:', error);
                setLoading(false);
            }
        };

        fetchPlayerData();
    }, [gameId]);

    if (loading) return <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 z-50"><div className="text-xl font-bold text-gray-700">Loading game details...</div></div>;
    if (!playerStatistics) return <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 z-50"><div className="text-xl font-bold text-gray-700">Game not found</div></div>;

    // 篩選客隊隊員
    const visitorsPlayers = playerStatistics.filter(player => player.team.id === teams.visitors.id);
    // 篩選主隊隊員
    const homePlayers = playerStatistics.filter(player => player.team.id === teams.home.id);

    return (
        <div className="bg-gradient-to-br from-blue-100 via-pink-50 to-yellow-100 min-h-screen flex justify-center">
            <div className="bg-white w-full max-w-5xl px-6 py-8 rounded-2xl shadow-2xl">
                <button onClick={onBack} className="w-full text-left px-8 mb-8 text-blue-600 underline text-lg font-bold bg-transparent">← 返回比分總覽</button>
                <div className="flex flex-row items-center justify-between w-full px-8 mb-6">
                    {/* Away Team */}
                    <div className="flex flex-col items-center w-1/3">
                        <img src={teams.visitors.logo} alt={teams.visitors.name} className="w-16 h-16 mb-2" />
                        <span className="text-lg md:text-2xl font-bold mt-2 mb-1 text-gray-700 whitespace-nowrap">{teamChineseNames[teams.visitors.code]}</span>
                    </div>
                    {/* Score & Status */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="flex flex-row items-end mb-2">
                            <span className="text-4xl md:text-6xl font-extrabold text-gray-900 mr-2">{scores.visitors.points}</span>
                            <span className="text-2xl md:text-4xl font-bold text-gray-500 mx-1">-</span>
                            <span className="text-4xl md:text-6xl font-extrabold text-gray-900 ml-2">{scores.home.points}</span>
                        </div>
                        <span className={`px-4 py-1 rounded-full font-bold text-base md:text-lg ${statusColor(status.long)}`}>
                            {gameStatusChinese[status.long] || status.long}
                        </span>
                    </div>
                    {/* Home Team */}
                    <div className="flex flex-col items-center w-1/3">
                        <img src={teams.home.logo} alt={teams.home.name} className="w-16 h-16 mb-2" />
                        <span className="text-lg md:text-2xl font-bold mt-2 mb-1 text-gray-700 whitespace-nowrap">{teamChineseNames[teams.home.code]}</span>
                    </div>
                </div>
                {/* Quarters Table 雙方比分 */}
                <div className="w-full px-8 mb-8 flex justify-center">
                    <table className="w-full text-center border-t border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-sm md:text-base text-gray-500 font-semibold"></th>
                                {scores.home.linescore.map((_, idx) => (
                                    <th key={idx} className="px-4 py-2 text-sm md:text-base text-gray-500 font-semibold">Q{idx + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 font-bold text-gray-700 flex items-center gap-2">
                                    <img src={teams.visitors.logo} alt={teams.visitors.name} className="w-6 h-6" />
                                    <span>{teamChineseNames[teams.visitors.code]}</span>
                                </td>
                                {scores.visitors.linescore.map((score, idx) => (
                                    <td key={idx} className="px-4 py-2 text-lg md:text-xl font-bold text-gray-800">{score}</td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-2 font-bold text-gray-700 flex items-center gap-2">
                                    <img src={teams.home.logo} alt={teams.home.name} className="w-6 h-6" />
                                    <span>{teamChineseNames[teams.home.code]}</span>
                                </td>
                                {scores.home.linescore.map((score, idx) => (
                                    <td key={idx} className="px-4 py-2 text-lg md:text-xl font-bold text-gray-800">{score}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Players Table - Away Team */}
                <div className="mb-4 overflow-x-auto">
                    <h2 className="text-lg font-bold text-gray-700 border-l-4 border-blue-400 pl-2 mb-1 flex items-center gap-2">
                        <img src={teams.visitors.logo} alt={teams.visitors.name} className="w-6 h-6" />
                        <span>{teamChineseNames[teams.visitors.code]} 球員數據</span>
                    </h2>
                    <table className="w-full text-left border border-gray-200 mb-4">
                        <colgroup>
                            <col style={{ width: '120px' }} />
                            {Array.from({ length: playerTableHeaders.length - 1 }).map((_, idx) => (
                                <col key={idx} style={{ width: '70px' }} />
                            ))}
                        </colgroup>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="min-w-[60px] w-40 px-3 py-1 text-[10px] sm:text-xs md:text-sm text-gray-500 font-semibold border-b border-gray-200 sm:whitespace-nowrap text-left">球員</th>
                                {playerTableHeaders.slice(1).map((header) => (
                                    <th key={header} className="min-w-[60px] px-3 py-1 text-[10px] sm:text-xs md:text-sm text-gray-500 font-semibold border-b border-gray-200 sm:whitespace-nowrap text-center">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* 先發球員 */}
                            <tr>
                                <td colSpan={playerTableHeaders.length} className="bg-blue-100 text-blue-800 font-bold px-3 py-1">先發球員</td>
                            </tr>
                            {visitorsPlayers.slice(0, 5).map((player, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50">
                                    <td className="min-w-[60px] w-40 px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-left leading-tight">{player.player.firstname} {player.player.lastname}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.min}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.points}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.fgm}/${player.fga} (${player.fgp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.tpm}/${player.tpa} (${player.tpp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.ftm}/${player.fta} (${player.ftp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.plusMinus}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.offReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.totReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.assists}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.steals}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.blocks}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.turnovers}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.pFouls}</td>
                                </tr>
                            ))}
                            {/* 替補球員 */}
                            <tr>
                                <td colSpan={playerTableHeaders.length} className="bg-blue-50 text-blue-600 font-bold px-3 py-1">替補球員</td>
                            </tr>
                            {visitorsPlayers.slice(5).map((player, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50">
                                    <td className="min-w-[60px] w-40 px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-left leading-tight">{player.player.firstname} {player.player.lastname}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.min}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.points}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.fgm}/${player.fga} (${player.fgp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.tpm}/${player.tpa} (${player.tpp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.ftm}/${player.fta} (${player.ftp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.plusMinus}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.offReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.totReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.assists}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.steals}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.blocks}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.turnovers}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.pFouls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Players Table - Home Team */}
                <div className="mb-4 overflow-x-auto">
                    <h2 className="text-lg font-bold text-gray-700 border-l-4 border-green-400 pl-2 mb-1 flex items-center gap-2">
                        <img src={teams.home.logo} alt={teams.home.name} className="w-6 h-6" />
                        <span>{teamChineseNames[teams.home.code]} 球員數據</span>
                    </h2>
                    <table className="w-full text-left border border-gray-200 mb-4">
                        <colgroup>
                            <col style={{ width: '120px' }} />
                            {Array.from({ length: playerTableHeaders.length - 1 }).map((_, idx) => (
                                <col key={idx} style={{ width: '70px' }} />
                            ))}
                        </colgroup>
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="min-w-[60px] w-40 px-3 py-1 text-[10px] sm:text-xs md:text-sm text-gray-500 font-semibold border-b border-gray-200 sm:whitespace-nowrap text-left">球員</th>
                                {playerTableHeaders.slice(1).map((header) => (
                                    <th key={header} className="min-w-[60px] px-3 py-1 text-[10px] sm:text-xs md:text-sm text-gray-500 font-semibold border-b border-gray-200 sm:whitespace-nowrap text-center">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* 先發球員 */}
                            <tr>
                                <td colSpan={playerTableHeaders.length} className="bg-green-100 text-green-800 font-bold px-3 py-1">先發球員</td>
                            </tr>
                            {homePlayers.slice(0, 5).map((player, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-green-50">
                                    <td className="min-w-[60px] w-40 px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-left leading-tight">{player.player.firstname} {player.player.lastname}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.min}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.points}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.fgm}/${player.fga} (${player.fgp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.tpm}/${player.tpa} (${player.tpp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.ftm}/${player.fta} (${player.ftp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.plusMinus}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.offReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.totReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.assists}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.steals}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.blocks}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.turnovers}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.pFouls}</td>
                                </tr>
                            ))}
                            {/* 替補球員 */}
                            <tr>
                                <td colSpan={playerTableHeaders.length} className="bg-green-50 text-green-600 font-bold px-3 py-1">替補球員</td>
                            </tr>
                            {homePlayers.slice(5).map((player, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-green-50">
                                    <td className="min-w-[60px] w-40 px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-left leading-tight">{player.player.firstname} {player.player.lastname}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.min}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.points}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.fgm}/${player.fga} (${player.fgp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.tpm}/${player.tpa} (${player.tpp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{`${player.ftm}/${player.fta} (${player.ftp}%)`}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.plusMinus}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.offReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.totReb}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.assists}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.steals}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.blocks}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.turnovers}</td>
                                    <td className="min-w-[60px] px-2 py-1 text-[10px] sm:text-xs md:text-sm text-gray-800 font-normal border-b border-gray-200 sm:whitespace-nowrap text-center leading-tight">{player.pFouls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NBABox;