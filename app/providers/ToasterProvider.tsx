'use client';

import {Toaster} from 'react-hot-toast';

const ToasterProvider=()=>{
    return(
        <Toaster/>
    );
}

export default ToasterProvider;

// useEffect kullanımı olduğu için en az bir tane ana kapsayıcı olmalı
// bu yüzden ToasterProvider içerisinde Toaster componentini döndürdük