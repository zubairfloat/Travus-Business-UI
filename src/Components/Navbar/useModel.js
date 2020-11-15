import {useState} from 'react';

const useModel =() => {
    const [isShowing , setIsShowin] = useState(false);
    function openToggle() {
        setIsShowin(!isShowing);
    }
    return{
        isShowing,
        openToggle
    }
};

export default useModel;