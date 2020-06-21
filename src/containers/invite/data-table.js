import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import { getRelations } from '../../apis/relation';
import { inviteChannel } from '../../apis/chatting';
import InviteFilter from './invite-filter';
import BaekToggle from '../../components/baek/baek-toggle';

function DataTable({
    usePaging,
    pageNo,
    pageScale,
    totalCount,
}) {

    const [selected, setSelected] = useState([]);
    const [friends, setFriends] = useState([{ email: "Loading..." }]);
    const [keyword, setKeyword] = useState();

    /**
     * 파라미터 담을때 channelNo를 
     * 현재는 로컬스토리지에저장하고 뽑아오는데
     * channelNo를 리스트에서 선택할수있도록하는 것이 최선인것같다
     * 이부분에 대해선 건회와 얘기를 해보자
     * @param {*} params 
     */
    const inviteUsers = async () => {
        try {
            if (!window.confirm("정말 채널로 초대 하시겠습니까?\n")) {
                return;
            }
            const params = {
                channelNo: parseInt(localStorage.getItem("channelNo")),
                users: selected.toString()
            }
            await inviteChannel(params);
            alert("초대를 완료했습니다.");

        } catch (e) {
            alert("초대를 실패했습니다!!");
            console.log(e);
        }
    }

    const getFriendList = async () => {
        try {
            const data = await getRelations('friend');
            const list = [];
            data.forEach(element => {
                list.push(element.relatedUser);
            });

            setFriends(list);
        } catch (e) {
            console.log(e);
        }
    }

    const handleChangeParams = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setKeyword(value);
        console.log(keyword);
    }

    useEffect(() => {
        getFriendList();
    }, []);
    console.log(selected);
    
    return (
        <div>
            {/* TODO : style 부분 체크해서 양옆(X축) overflow 설정해야함. 지금은 style적용해도 안되므로 찾아봐야함 */}
            <div style={{ width: '320px' }}>
                <div style={{ display: 'inline-block' }}>
                    {selected.map(c => {
                        return (
                            <button>{c.email}</button>
                        )
                    })}
                </div>
            </div>
            <InviteFilter
                onChange={handleChangeParams}
            />
            <Table>
                <TableBody>
                    {friends.map(c => {
                        if(c.email.indexOf(keyword) === 0 || keyword === undefined){
                            return (
                                <TableRow>
                                    <TableCell>
                                        <BaekToggle
                                            handleToggleOn={() => setSelected([...selected, c])}
                                            handleToggleOff={() => setSelected(selected.filter(selectdUser => selectdUser.id !== c.id))}
                                            text={c.email}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
                <Button onClick={() => inviteUsers()}>
                    초대하기
                </Button>
            </Table>
        </div>
    )

}

export default DataTable;

const Button = styled.button`
  border: 0;
  width: 75px;
  height: 35px;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 8px;
  font-size: 12px;
  float: right;
  color: white;
  background-color: green;
  border-radius: 4px;
  margin: 4px;
  cursor: pointer;
  &:hover {
    background-color: #316b88;
  }
`;