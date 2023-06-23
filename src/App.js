import { useEffect, useState } from 'react';
import { DivContainer, InputsContainer, ListaDeTarefas, Tarefa } from './style';

function App() {

const [tarefas, setTarefas] = useState([]);
const [valorDoInput, setValorDoInput] = useState('');
const [filtro, setFiltro] = useState('');

useEffect(() => {
  const tarefasArmazenadas = JSON.parse(localStorage.getItem("listaTarefas"));

  tarefasArmazenadas && setTarefas(tarefasArmazenadas);
}, []);

useEffect(() => {
  tarefas.length &&
    localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
}, [tarefas]);

const pegarValorDoInput = (event) => {
    setValorDoInput(event.target.value);
};

const criarTarefa = () => {
    if (valorDoInput.length && valorDoInput !== '') {
        const novaTarefa = {
            id: Date.now(),
            texto: valorDoInput,
            completa: false,
        };

        const novasTarefas = [...tarefas, novaTarefa];
        setTarefas(novasTarefas);
        setValorDoInput('');
    }
};

useEffect(() => {
    criarTarefa();
}, [tarefas]);

const adicionaTarefaComEnter = (event) => {
    if (event.keyCode === 13) {
        criarTarefa();
    }
};

const selecionarTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
        if (tarefa.id === id) {
            return {
                ...tarefa,
                completa: !tarefa.completa,
            };
        }
        return tarefa;
    });

    setTarefas(tarefasAtualizadas);
};

const pegarValorDoSelect = (event) => {
    setFiltro(event.target.value);
};

const listaFiltrada = tarefas.filter((tarefa) => {
    switch (filtro) {
        case 'pendentes':
            return !tarefa.completa;
        case 'completas':
            return tarefa.completa;
        default:
            return true;
    }
});

return (
    <DivContainer>
        <h1>Lista de tarefas</h1>
        <InputsContainer>
            <input
                value={valorDoInput}
                onChange={pegarValorDoInput}
                onKeyDown={(event) => adicionaTarefaComEnter(event)}
            />
            <button onClick={criarTarefa}>Adicionar</button>
        </InputsContainer>
        <br />

        <InputsContainer>
            <label>Filtro</label>
            <select value={filtro} onChange={pegarValorDoSelect}>
                <option value="">Nenhum</option>
                <option value="pendentes">Pendentes</option>
                <option value="completas">Completas</option>
            </select>
        </InputsContainer>
        <ListaDeTarefas>
            {listaFiltrada.map((tarefa) => {
                return (
                    <Tarefa
                        key={tarefa.id}
                        completa={tarefa.completa}
                        onClick={() => selecionarTarefa(tarefa.id)}
                    >
                        {tarefa.texto}
                    </Tarefa>
                );
            })}
        </ListaDeTarefas>
    </DivContainer>
);
}


export default App