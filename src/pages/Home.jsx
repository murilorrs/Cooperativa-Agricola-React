import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mesEscolhido, setMes] = useState('');
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const handleChange = (e) => {
    setMes(e.target.value);
  };

  const buscaDados = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dados/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();

      const formattedData = jsonData.map(item => ({
        mes: item.MM,
        origem: item.origem,
        carga: item.carga,
        percUmidade: item.percUmidade,
        tipo: item.tipo,
        peso: item.peso,
        pesoLimpo: item.pesoLimpo
      }));
      setData(formattedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    buscaDados();
  }, []);

  useEffect(() => {
    if (mesEscolhido !== '') {
      const filtered = data.filter(item => item.mes === parseInt(mesEscolhido));
      setDataFiltrada(filtered);
    } else {
      setDataFiltrada(data);
    }
  }, [mesEscolhido, data]);

  if (loading) return <h1>Carregando...</h1>;
  if (error) return <h1>Erro: {error}</h1>;

  return (
    <div className="about-container-principal">
      <h2 className="about-titulo">RELATÓRIOS DA <span>COOPERATIVA</span></h2>
            <select id="monthSelect" onChange={handleChange} value={mesEscolhido}>
              <option value="">Selecione um mês...</option>
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
            <p>Mês selecionado: {!mesEscolhido ? 'Todos' : mesEscolhido}</p>

      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h3>COOPERATIVA AGRÍCOLA <span>GRÃO DO VALE</span></h3>
            <p>ANO: 2024 - RELATÓRIO ESTATÍSTICO</p>
            <hr className="divider" />
            <table className="data-table">
              <thead>
                <tr>
                  <th>Origem</th>
                  <th>Cargas</th>
                  <th>GU Faixa 1</th>
                  <th>GU Faixa 2</th>
                  <th>GU Faixa 3</th>
                  <th>GU Extra</th>
                </tr>
              </thead>
              <tbody>
                {dataFiltrada.map((item, index) => (
                  <tr key={index}>
                    <td>{item.origem}</td>
                    <td>{item.carga}</td>
                    <td>{item.percUmidade >= 0 && item.percUmidade <= 8.5 ? 'X' : ''}</td>
                    <td>{item.percUmidade >= 8.6 && item.percUmidade <= 15 ? 'X' : ''}</td>
                    <td>{item.percUmidade >= 15.1 && item.percUmidade <= 25 ? 'X' : ''}</td>
                    <td>{item.percUmidade > 25 ? 'X' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h3>COOPERATIVA AGRÍCOLA <span>GRÃO DO VALE</span></h3>
            <p>ANO: 2024 - RELATÓRIO GERAL</p>
            <hr className="divider" />
            <table className="data-table">
              <thead>
                <tr>
                  <th ></th>
                  <th ></th>
                  <th ></th>
                  <th >FAIXA 1</th>
                  <th ></th>
                  <th ></th>
                  <th >FAIXA 2</th>
                  <th ></th>
                  <th ></th>
                  <th >FAIXA 3</th>
                  <th ></th>
                </tr>
                <tr>
                  <th>Ori<br />gem</th>
                  <th>Peso<br /> Total</th>
                  <th>
                    Peso<br /> Limpo
                  </th>
                  <th>
                    <br />Trans
                  </th>
                  <th>
                    <br />Não
                  </th>
                  <th>
                    Peso<br /> Limpo
                  </th>
                  <th>
                    <br />Trans
                  </th>
                  <th>
                    <br />Não
                  </th>
                  <th>
                    Peso<br /> Limpo
                  </th>
                  <th>
                    <br />Trans
                  </th>
                  <th>
                    <br />Não
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataFiltrada.map((item, index) => (
                  <tr key={index}>
                    <td>{item.origem}</td>
                    <td>{item.peso.toFixed(2)}</td>
                    <td className="td-esquerda">{item.percUmidade >= 0 && item.percUmidade <= 8.5 ? item.pesoLimpo.toFixed(2) : ''}</td>
                    <td className="td-esquerda">{item.percUmidade >= 0 && item.percUmidade <= 8.5 ? (item.tipo === 1 ? 'X' : '') : ''}</td>
                    <td className="td-esquerda">{item.percUmidade >= 0 && item.percUmidade <= 8.5 ? (item.tipo === 0 ? 'X' : '') : ''}</td>

                    <td className="td-esquerda">{item.percUmidade >= 8.6 && item.percUmidade <= 15 ? item.pesoLimpo.toFixed(2) : ''}</td>
                    <td className="td-esquerda">{item.percUmidade >= 8.6 && item.percUmidade <= 15 ? (item.tipo === 1 ? 'X' : '') : ''}</td>
                    <td className="td-esquerda">{item.percUmidade >= 8.6 && item.percUmidade <= 15 ? (item.tipo === 0 ? 'X' : '') : ''}</td>

                    <td className="td-esquerda">{item.percUmidade > 15.1 ? item.pesoLimpo.toFixed(2) : ''}</td>
                    <td className="td-esquerda">{item.percUmidade > 15.1 ? (item.tipo === 1 ? 'X' : '') : ''}</td>
                    <td className="td-esquerda">{item.percUmidade > 15.1 ? (item.tipo === 0 ? 'X' : '') : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
