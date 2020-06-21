import React from 'react';
import BaekInput from '../../components/baek/baek-input'

const InviteFilter = ({
    onChange,
}) => {

    const handleChange = (e) => {
        e.preventDefault();
        onChange(e);
    };

    return (
        <form autoComplete="off" >
            <BaekInput
                type="text"
                width='100%'
                name="ID 혹은 Email"
                label={'Google Email or ID'}
                placeholder={'Email or ID'}
                onChange={handleChange}
            />
        </form>
    );
};

export default InviteFilter;
