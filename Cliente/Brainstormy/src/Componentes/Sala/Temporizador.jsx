
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Temporizador.css';

const socket = io('http://localhost:3001'); 

const Contador = () => {
  const [tempo, setTempo] = useState(120); // 120 segundos = 2 minutos
  const [statusPergunta, setStatusPergunta] = useState(1); // Status inicial da pergunta

  useEffect(() => {
    // Listener para o evento 'tempoAtualizado'
    socket.on('tempoAtualizado', (novoTempo) => {
      setTempo(novoTempo);
    });

    // Listener para o evento 'statusPerguntaAtualizado'
    socket.on('statusPerguntaAtualizado', (novoStatusPergunta) => {
      setStatusPergunta(novoStatusPergunta);
    });

    // Limpeza dos listeners ao desmontar o componente
    return () => {
      socket.off('tempoAtualizado');
      socket.off('statusPerguntaAtualizado');
    };
  }, []);

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  };

  return (
    <div className='conteinerTop'>
      <div className='bloco'>
        <p className='tempo'>TEMPO RESTANTE: {formatarTempo(tempo)}</p> {/* temporizador */}
      </div>

      <div className='bloco'>
        <p>PERGUNTA {statusPergunta}/10</p> {/* status perguntas */}
      </div>
    </div>
  );
};

export default Contador;
