import React, { useState, useEffect } from 'react';
import styled, { injectGlobal }  from 'styled-components'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ImageIcon from '@material-ui/icons/Image';
import LanguageIcon from '@material-ui/icons/Language';
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded';

function Searchbar({}){

    return (
        <SearchBox>
            <PlusIcon style={{ fontSize: 60, float: 'left' }} />
            <InsertImageIcon style={{ fontSize: 60, float: 'left' }} />
            <SearchDiv>
                <LanguageIcon style={{ fontSize: 45, float: 'left', margin: '8px 18px', color: 'gray' }} />
                <input type='text' style={{ fontSize: 30, width: 'calc(100% - 90px)', margin: '13px 0px', border: '0px' }} />
            </SearchDiv>
            <SentimentSatisfiedRoundedIcon style={{ fontSize: 60, float: 'left', margin: '20px 40px 0px 30px', color: 'rgba(0,131,255,1)' }} />
        </SearchBox>
    )
}

export default Searchbar;


const SearchBox = styled.div`
    display: flex;
    background-color: rgba(242,246,251,1);
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.31));
    position: absolute;
    overflow: visible;
    width: 100%;
    height: 180px;
    bottom: 0px;
`
const PlusIcon = styled(AddCircleRoundedIcon)`
    position: relative;
    margin: 20px 0px 0px 30px;
    fill: rgba(0,131,255,1);
`
const InsertImageIcon = styled(ImageIcon)`
    color: gray;
    float: left; 
    margin: 20px 0px 0px 30px;
`
const SearchDiv = styled.div`
    display: flex;
    background-color: white;
    border: 1px solid #DFDFDF;
    float: left;
    position: relative;
	overflow: visible;
	width: 100%;
    height: 65px;
    margin: 16px 0px 0px 40px;
    border-radius: 30px 30px;
`