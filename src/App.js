import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda] = useState('');
  const [ imagenes, setImagenes] = useState([]);
  const [ paginado, setPaginado] = useState({
    current: 1,
    total_pages: 1,
    total_results: 0
  });
  const [ paginaactual, setPaginaactual] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;
    
      const imPerPage = 30;
      const key = '24231955-5cc4d1c1d1fc40b0f72258fc2';
      const url = `https://pixabay.com/api/?key=${key}&q=
      ${busqueda}&per_page=${imPerPage}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);
      // console.warn(resultado);

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imPerPage);
      // setTotalpaginas(calcularTotalPaginas);
      setPaginado(
        {
          current: paginaactual,
          total_pages: calcularTotalPaginas,
          total_results: resultado.totalHits
        }
      )

      // Mover a la parte de arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView( { behavior: 'smooth' } )
    }
    consultarAPI();
  }, [busqueda, paginaactual])

  // paginado
  const paginaAnterior = () => {
    const nuevapaginaactual = paginaactual -1;

    if(nuevapaginaactual <= 0) return;
    setPaginaactual(nuevapaginaactual);
  }
  const paginaSiguiente = () => {
    const nuevasiguiente = paginaactual +1;

    if(nuevasiguiente >= paginado.total_pages) return;
    setPaginaactual(nuevasiguiente);
  }
  return (
    <div className="container">
     <div className="jumbotron">
       <p className="lead text-center">Buscador de imágenes</p>
       <Formulario setBusqueda={setBusqueda} />
       { busqueda ? <span className="float-right">Total de resultados: {paginado.total_results}</span> : null }
       
     </div>
     <div className="row justify-content-center">
      <ListadoImagenes imagenes={imagenes} />

      { (paginaactual > 1) ? (
        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >&laquo; Anterior</button>
      ) : null}

      { (paginaactual < paginado.total_pages) ? (
        <button
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
      ) : null}

     </div>
    </div>
  );
}

export default App;
