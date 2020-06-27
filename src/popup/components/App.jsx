import React from 'react';
import './App.scss';
import levelToClass from '../config/levelToClass';
import UserName from './UserName';

const status = {
  initial: 'initial',
  waiting_opponent: 'waiting',
  playing: 'playing',
  game_over: 'game_over',
  stored: 'stored',
  timeout: 'timeout',
  rematch_rejected: 'rematch_rejected',
  rematch_in_approval: 'rematch_in_approval',
};
const renderGameLevelBadge = level => (
  <div>
    <span className={`badge badge-pill badge-${levelToClass[level]} mr-1`}>
      {level}
    </span>
  </div>
);
const dateToHHMM = date => {
  const formatLeadZero = num => ((num < 10) ? `0${num}` : num);
  const hour = formatLeadZero(date.getHours());
  const minute = formatLeadZero(date.getMinutes());
  return `${hour}:${minute}`;
};

export default ({ state }) => {
  console.log('State in popup = ', state);
  const { active_games: activeGames } = state.games;
  const showGameInfo = () => activeGames.map(game => {
    const {
      id, level, players, state: gameState, inserted_at: startedAt,
    } = game;
    const link = `https://codebattle.hexlet.io/games/${id}`;
    const showPlayersInfo = ([first, second]) => (
      <>
        <UserName user={first} />
        {second && <UserName user={second} />}
      </>
    );
    return (
      <tr key={id}>
        <td className="align-middle">{renderGameLevelBadge(level)}</td>
        <td className="align-middle">{status[gameState]}</td>
        <td className="align-middle">{showPlayersInfo(players)}</td>
        <td className="align-middle">{dateToHHMM(new Date(startedAt))}</td>
        <td className="align-middle">
          <a href={link} className="btn btn-outline-primary btn-sm" tabIndex="-1" role="button" aria-disabled="true" target="_ablank">Join</a>
        </td>
      </tr>
    );
  });
  return (
    <>
      <header>
        <a className="d-flex align-items-center" href="https://codebattle.hexlet.io/" target="_ablank">
          <img src="../../assets/128.png" alt="Logo" />
          <div className="btn btn-lg btn-outline-primary">Welcome to CodeBattle</div>
        </a>
      </header>
      <main>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Level</th>
              <th>Game status</th>
              <th>Players</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeGames && showGameInfo()}
          </tbody>
        </table>
      </main>
      <footer />
    </>
  );
};
