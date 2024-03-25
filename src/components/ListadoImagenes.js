import React from 'react';
import Imagen from './Imagen';
import PropTypes from 'prop-types';

const ListadoImagenes = ({imagenes}) => {
    return ( 
        <div className="col-12 p5 row">
            { imagenes.map(imagen => (
                <Imagen 
                    img={imagen}
                    key={imagen.id}
                />
            )) }
        </div>
     );
}
 
ListadoImagenes.propTypes = {
    imagenes: PropTypes.array.isRequired
}
export default ListadoImagenes;