import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import {
    postRelation
} from '../../apis/relation';
import {
    getUser
} from '../../apis/user';
import FriendFilter from './friend-filter';

function DataTable({
    closeModal,
    usePaging,
    pageNo,
    pageScale,
    totalCount,
}) {
    const [searchUser, setSearchUser] = useState(false);
    const [keyword, setKeyword] = useState(false);

    const postFriend = async(relatedId) => { 
        try {
            if (!window.confirm("정말 친구등록 하시겠습니까?")) {
                return;
            }
            const params = {
                relatedId: relatedId,
                relation: 'friend'
            }
            const result = await postRelation(params);
            alert("친구 등록을 완료했습니다")
            closeModal();
        } catch (e) {
            alert("친구 등록에 실패했습니다!")
            console.log(e);
        }
    }

    function CheckInput(str) {
        var reg_input = /^([0-9a-zA-Z_\.-]+)(@gmail.com)?$/;
        if (!reg_input.test(str)) {
            return false;
        }
        else {
            return true;
        }
    }          

    const userSearch = async(userName) => { 
        try {
            if(!CheckInput(userName))
                throw new Error("Unpassed REG");
            
            const user = await getUser(userName.split('@')[0]);
            // 백 서버 '.com'과 같이 '.' 인식 문제로 인해 클라이언트에서 파싱
            setSearchUser(user);
        } catch (e) {
            setSearchUser({});
            alert("정확한 ID 혹은 Email을 입력해주세요!")
        }
    }

    const handleChangeParams = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setKeyword(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        userSearch(keyword);
    }

    useEffect(() => {
    }, []);

    return(
        <div>
            <FriendFilter
                onChange={handleChangeParams}
                onSubmit={handleSearch}
            />
            <Table>
                <TableBody>
                    <TableRow onClick={() => postFriend(searchUser.id)}>
                        <TableCell>
                            <Button>{searchUser.email}</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )

}

export default DataTable;

const Button = styled.button`
  border: 0;
  width: 100%;
  height: 50px;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 8px;
  font-size: 14px;
  color: white;
  background-color: #00567f;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    background-color: #316b88;
  }
`;