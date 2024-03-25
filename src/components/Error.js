import React from 'react';
import PropTypes from 'prop-types';

const Error = ({msg}) => {
    return ( 
        <p className="my-3 p-4 text-center alert alert-primary">{msg}</p>
     );
}
 
Error.propTypes = {
    msg: PropTypes.string.isRequired
}
export default Error;