import { useState } from "react";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export function App() {
  const [input, setInput] = useState("");

  const [response, setResponse] = useState<ViaCepResponse | undefined>();

  async function getCep(cep: string) {
    try {
      const response = await (
        await fetch(`https://viacep.com.br/ws/${cep}/json`)
      ).json();

      if (response.erro) {
        setResponse(undefined);
        return;
      }

      setResponse(response as ViaCepResponse);
    } catch (err) {
      console.log(err);
      setResponse(undefined)
    }
  }

  return (
    <main className="h-screen w-full flex flex-col gap-3 justify-center items-center">
      <div className="w-1/2 flex flex-col gap-8 justify-center bg-white items-center p-6 rounded-xl drop-shadow-black drop-shadow-sm/90">
        <h1 className="font-bold text-2xl">Buscar pelo CEP</h1>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="cep">Digite um CEP:</label>
          <input
            id="cep"
            type="text"
            className="border-1 border-black/30 rounded-md px-2 py-1"
            onChange={(event) => setInput(event.target.value)}
          />
        </div>

        <button
          className="bg-black text-white px-3 py-2 rounded-xl cursor-pointer hover:"
          onClick={async () => await getCep(input)}
        >
          Enviar
        </button>
      </div>
      {response && (
        <div className="w-1/2 flex flex-col justify-center bg-white p-6 rounded-xl drop-shadow-black drop-shadow-sm/90">
          <p>
            <b>CEP:</b> {response.cep}
          </p>
          <p>
            <b>Logradouro:</b> {response.logradouro}
          </p>
          <p>
            <b>Complemento:</b> {response.complemento}
          </p>
          <p>
            <b>Unidade:</b> {response.unidade}
          </p>
          <p>
            <b>Bairro:</b> {response.bairro}
          </p>
          <p>
            <b>Localidade:</b> {response.localidade}
          </p>
          <p>
            <b>UF:</b> {response.uf}
          </p>
          <p>
            <b>Estado:</b> {response.estado}
          </p>
          <p>
            <b>Regiao:</b> {response.regiao}
          </p>
          <p>
            <b>Ibge:</b> {response.ibge}
          </p>
          <p>
            <b>Gia:</b> {response.gia}
          </p>
          <p>
            <b>DDD:</b> {response.ddd}
          </p>
          <p>
            <b>Siafi:</b> {response.siafi}
          </p>
        </div>
      )}
    </main>
  );
}
