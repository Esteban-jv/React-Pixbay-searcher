import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        // console.log(e);

        if(termino.trim() === '')
        {
            setError(true);
            return;
        }
        setError(false);
        setBusqueda(termino);
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: Código o café"
                        value={termino}
                        onChange={ e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>

            </div>
            { error ? <Error msg="Agrega un término de búsqueda" /> : null }
        </form>
     );
}
 
Formulario.propTypes = {
    setBusqueda: PropTypes.func.isRequired
}
export default Formulario;