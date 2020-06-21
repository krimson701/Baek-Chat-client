import React from 'react';
import styled from 'styled-components';
import BaekInput from '../../components/baek/baek-input'

const FriendFilter = ({
    onSubmit,
    onChange,
}) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <BaekInput
                type="text"
                name="ID 혹은 Email"
                label={'Google Email or ID'}
                placeholder={'Email or ID'}
                onChange={onChange}
            />
            <Button type="submit">검색</Button>
        </form>
    );
};

export default FriendFilter;

const Button = styled.button`
    border: 0;
    width: 100px;
    height: 30px;
    text-decoration: none;
    font-weight: bold;
    padding: 6px 8px;
    font-size: 14px;
    color: white;
    background-color: green;
    border-radius: 4px;
    margin: 4px;
    cursor: pointer;
    &:hover {
      background-color: #316b88;
    }
  `;